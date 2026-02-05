import { MUSEUM, ROOMS } from "./config.js";
import { buildWorld } from "./world.js";
import { clamp, v3, m4, cameraDirFromYawPitch, compileProgram, createSolidTexture, loadTexture, textureFromCanvas, makeSignCanvas, makeWallLabelCanvas } from "./engine.js";

const canvas = document.getElementById("gl");
const overlay = document.getElementById("overlay");
const loadFill = document.getElementById("loadFill");
const loadText = document.getElementById("loadText");
const tooltipEl = document.getElementById("tooltip");

const modal = document.getElementById("modal");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalRoom = document.getElementById("modalRoom");
const modalDesc = document.getElementById("modalDesc");
const modalImg = document.getElementById("modalImg");
const modalLink = document.getElementById("modalLink");

// Menu 
const menuWrap = document.getElementById("menuWrap");
const menuBtn = document.getElementById("menuBtn");
const menuPanel = document.getElementById("menuPanel");
const menuBrowse = document.getElementById("menuBrowse");
const menuRooms = document.getElementById("menuRooms");
let modalOpen = false;



function setOverlayVisible(v){
  overlay.classList.toggle("hidden", !v);
}

function setTooltip(text){
  if(!text){
    tooltipEl.classList.add("hidden");
    tooltipEl.textContent = "";
  } else {
    tooltipEl.textContent = text;
    tooltipEl.classList.remove("hidden");
  }
}

function openProjectModal(roomTitle, project){
  modalOpen = true;

  // Menü schließen 
  if(typeof setMenuOpen === "function") setMenuOpen(false);

  modalTitle.textContent = project.title ?? "";
  modalRoom.textContent = roomTitle ? `in ${roomTitle}` : "";
  modalDesc.textContent = project.desc ?? "";
  modalImg.src = project.image ?? "";
  modalImg.alt = project.title ?? "";

  if(project.link){
    modalLink.href = project.link;
    modalLink.classList.remove("hidden");
  } else {
    modalLink.href = "#";
    modalLink.classList.add("hidden");
  }

  
  setOverlayVisible(false);

 
  if(pointerLocked()) document.exitPointerLock();

 
  requestAnimationFrame(() => {
    modal.classList.remove("hidden");
  });
}

function closeModal(){
  modalOpen = false;
  modal.classList.add("hidden");

  
  setOverlayVisible(true);

  
  setTooltip(null);
}


modalClose.addEventListener("click", ()=>{
  closeModal();
  
});

modal.addEventListener("click", (e)=>{
  if(e.target === modal) closeModal();
});

window.addEventListener("keydown", (e)=>{
  if(e.code==="Escape"){
    if(!modal.classList.contains("hidden")){
      closeModal();
      return;
    }
    
    setOverlayVisible(true);
  }
});

function pointerLocked(){
  return document.pointerLockElement === canvas;
}

let gl = canvas.getContext("webgl2", { antialias: true, alpha: false, depth: true });
if(!gl){
  alert("WebGL2 wird nicht unterstützt. Bitte nutze einen aktuellen Browser (Chrome/Firefox/Edge).");
  throw new Error("WebGL2 not available");
}

const MAX_LIGHTS = 32;

const VS = `#version 300 es
in vec3 a_pos;
in vec3 a_normal;
in vec2 a_uv;
in vec4 a_color;

uniform mat4 u_model;
uniform mat4 u_proj;
uniform mat4 u_view;

out vec3 v_pos;
out vec3 v_normal;
out vec2 v_uv;
out vec4 v_color;

void main(){
  vec4 wp = u_model * vec4(a_pos, 1.0);
  v_pos = wp.xyz;
  v_normal = mat3(u_model) * a_normal;
  v_uv = a_uv;
  v_color = a_color;
  gl_Position = u_proj * u_view * wp;
}
`;

const FS = `#version 300 es
precision highp float;

in vec3 v_pos;
in vec3 v_normal;
in vec2 v_uv;
in vec4 v_color;

uniform vec3 u_camPos;
uniform vec3 u_ambient;

uniform bool u_useTex;
uniform sampler2D u_tex;

uniform int u_lightCount;
uniform vec3 u_lightPos[${MAX_LIGHTS}];
uniform vec3 u_lightColor[${MAX_LIGHTS}];
uniform float u_lightIntensity[${MAX_LIGHTS}];
uniform float u_unlit;


out vec4 outColor;

void main(){
  vec3 N = normalize(v_normal);
  vec3 V = normalize(u_camPos - v_pos);

  vec4 base4 = v_color;
  
    if(u_useTex){
 
  vec2 uv = v_uv;
  if(!gl_FrontFacing) uv.x = 1.0 - uv.x;

  vec4 t = texture(u_tex, uv);

    base4.rgb *= t.rgb;
    base4.a *= t.a;
    if(base4.a < 0.02) discard;
  }

  vec3 base = base4.rgb;
  if(u_unlit > 0.5){
  outColor = vec4(base, base4.a);
  return;
}

  vec3 col = base * u_ambient;

  for(int i=0;i<${MAX_LIGHTS};i++){
    if(i>=u_lightCount) break;

    vec3 Lvec = u_lightPos[i] - v_pos;
    float dist = length(Lvec);
    vec3 L = Lvec / max(dist, 0.0001);

    // Slightly weaker attenuation for brighter, punchier spotlights.
    float att = 1.0 / (1.0 + 0.07*dist*dist);
    float diff = max(dot(N, L), 0.0);

    vec3 H = normalize(L + V);
    float spec = pow(max(dot(N, H), 0.0), 80.0);

    vec3 lc = u_lightColor[i] * u_lightIntensity[i] * att;
    col += base * diff * lc + spec * lc * 0.35;
  }

  // mild tonemap (keep highlights but allow overall brighter scene)
  col = col / (col + vec3(0.85));
  outColor = vec4(col, base4.a);
}
`;

const prog = compileProgram(gl, VS, FS);

const loc = {
  a_pos: gl.getAttribLocation(prog, "a_pos"),
  a_normal: gl.getAttribLocation(prog, "a_normal"),
  a_uv: gl.getAttribLocation(prog, "a_uv"),
  a_color: gl.getAttribLocation(prog, "a_color"),

  u_model: gl.getUniformLocation(prog, "u_model"),
  u_proj: gl.getUniformLocation(prog, "u_proj"),
  u_view: gl.getUniformLocation(prog, "u_view"),
  u_camPos: gl.getUniformLocation(prog, "u_camPos"),
  u_ambient: gl.getUniformLocation(prog, "u_ambient"),

  u_useTex: gl.getUniformLocation(prog, "u_useTex"),
  u_tex: gl.getUniformLocation(prog, "u_tex"),

  u_lightCount: gl.getUniformLocation(prog, "u_lightCount"),
  u_lightPos: gl.getUniformLocation(prog, "u_lightPos[0]"),
  u_lightColor: gl.getUniformLocation(prog, "u_lightColor[0]"),
  u_lightIntensity: gl.getUniformLocation(prog, "u_lightIntensity[0]"),
  u_unlit: gl.getUniformLocation(prog, "u_unlit"),

};

gl.useProgram(prog);
gl.uniform1i(loc.u_tex, 0);

gl.enable(gl.DEPTH_TEST);

gl.disable(gl.CULL_FACE);
gl.enable(gl.BLEND);
gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

const whiteTex = createSolidTexture(gl, [255,255,255,255]);
const IDENTITY_MODEL = m4.identity();

function createMesh(geom){
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);

  function bufAttrib(data, locIndex, size){
    const b = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, b);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(locIndex);
    gl.vertexAttribPointer(locIndex, size, gl.FLOAT, false, 0, 0);
    return b;
  }

  const bPos = bufAttrib(geom.pos, loc.a_pos, 3);
  const bNor = bufAttrib(geom.nor, loc.a_normal, 3);
  const bUv  = bufAttrib(geom.uv,  loc.a_uv, 2);
  const bCol = bufAttrib(geom.col, loc.a_color, 4);

  const ib = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(geom.idx), gl.STATIC_DRAW);

  gl.bindVertexArray(null);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  return { vao, idxCount: geom.idx.length, _buffers:[bPos,bNor,bUv,bCol], _ib:ib };
}

// Build world
const layout = MUSEUM.layout;
const worldData = buildWorld(ROOMS, layout);


const drawables = worldData.drawables.map(d => ({
  ...d,
  mesh: createMesh(d.geom),
  tex: whiteTex,
  useTex: false,
  model: m4.identity(),
}));

// Player 
function makePlayerGeom(){
  const out = {pos:[],nor:[],uv:[],col:[],idx:[]};
  const C = [0.20,0.20,0.22, 0.72];

  function pushVertex(p,n,uv){
    out.pos.push(p[0],p[1],p[2]);
    out.nor.push(n[0],n[1],n[2]);
    out.uv.push(uv[0],uv[1]);
    out.col.push(C[0],C[1],C[2],C[3]);
  }
  function addTri(a,b,c){
    const base = out.pos.length/3;
    pushVertex(a.p,a.n,a.uv);
    pushVertex(b.p,b.n,b.uv);
    pushVertex(c.p,c.n,c.uv);
    out.idx.push(base,base+1,base+2);
  }
  function addQuad(v0,v1,v2,v3){
    addTri(v0,v1,v2);
    addTri(v0,v2,v3);
  }

  function addCylinder(r, y0, y1, cx, cz, seg=18){
    for(let i=0;i<seg;i++){
      const a0=(i/seg)*Math.PI*2;
      const a1=((i+1)/seg)*Math.PI*2;
      const c0=Math.cos(a0), s0=Math.sin(a0);
      const c1=Math.cos(a1), s1=Math.sin(a1);

      const p00=[cx+r*c0, y0, cz+r*s0];
      const p01=[cx+r*c1, y0, cz+r*s1];
      const p11=[cx+r*c1, y1, cz+r*s1];
      const p10=[cx+r*c0, y1, cz+r*s0];

      const n0=[c0,0,s0];
      const n1=[c1,0,s1];

      addQuad(
        {p:p00,n:n0,uv:[i/seg,0]},
        {p:p01,n:n1,uv:[(i+1)/seg,0]},
        {p:p11,n:n1,uv:[(i+1)/seg,1]},
        {p:p10,n:n0,uv:[i/seg,1]},
      );

      // caps 
      const topN=[0,1,0];
      const botN=[0,-1,0];
      const topC=[cx,y1,cz];
      const botC=[cx,y0,cz];
      addTri(
        {p:[topC[0],topC[1],topC[2]], n:topN, uv:[0.5,0.5]},
        {p:p10, n:topN, uv:[0.5+0.5*c0,0.5+0.5*s0]},
        {p:p11, n:topN, uv:[0.5+0.5*c1,0.5+0.5*s1]},
      );
      addTri(
        {p:[botC[0],botC[1],botC[2]], n:botN, uv:[0.5,0.5]},
        {p:p01, n:botN, uv:[0.5+0.5*c1,0.5+0.5*s1]},
        {p:p00, n:botN, uv:[0.5+0.5*c0,0.5+0.5*s0]},
      );
    }
  }

  function addSphere(r, cy, cx=0, cz=0, rings=11, seg=18){
    for(let j=0;j<rings;j++){
      const v0=j/rings;
      const v1=(j+1)/rings;
      const th0=v0*Math.PI;
      const th1=v1*Math.PI;
      const y0=cy + r*Math.cos(th0);
      const y1=cy + r*Math.cos(th1);
      const rr0=r*Math.sin(th0);
      const rr1=r*Math.sin(th1);
      for(let i=0;i<seg;i++){
        const u0=i/seg;
        const u1=(i+1)/seg;
        const a0=u0*Math.PI*2;
        const a1=u1*Math.PI*2;
        const c0=Math.cos(a0), s0=Math.sin(a0);
        const c1=Math.cos(a1), s1=Math.sin(a1);
        const p00=[cx+rr0*c0, y0, cz+rr0*s0];
        const p01=[cx+rr0*c1, y0, cz+rr0*s1];
        const p11=[cx+rr1*c1, y1, cz+rr1*s1];
        const p10=[cx+rr1*c0, y1, cz+rr1*s0];

        const n00=[(p00[0]-cx)/r,(p00[1]-cy)/r,(p00[2]-cz)/r];
        const n01=[(p01[0]-cx)/r,(p01[1]-cy)/r,(p01[2]-cz)/r];
        const n11=[(p11[0]-cx)/r,(p11[1]-cy)/r,(p11[2]-cz)/r];
        const n10=[(p10[0]-cx)/r,(p10[1]-cy)/r,(p10[2]-cz)/r];

        addQuad(
          {p:p00,n:n00,uv:[u0,v0]},
          {p:p01,n:n01,uv:[u1,v0]},
          {p:p11,n:n11,uv:[u1,v1]},
          {p:p10,n:n10,uv:[u0,v1]},
        );
      }
    }
  }

  // legs
  addCylinder(0.11, 0.0, 0.65, -0.12, 0.0);
  addCylinder(0.11, 0.0, 0.65,  0.12, 0.0);
  // oberkoerper
  addCylinder(0.22, 0.75, 1.55, 0.0, 0.0);
  // head
  addSphere(0.22, 1.82, 0.0, 0.0);
  // arms 
  addCylinder(0.085, 0.90, 1.40, -0.36, -0.03, 16);
  addCylinder(0.085, 0.90, 1.40,  0.36, -0.03, 16);

  return out;
}

const playerDrawable = {
  name: "player",
  kind: "player",
  geom: makePlayerGeom(),
  texture: null,
  mesh: null,
  tex: whiteTex,
  useTex: false,
  model: m4.identity(),
};
playerDrawable.mesh = createMesh(playerDrawable.geom);
drawables.push(playerDrawable);


async function loadAllTextures(){
  const texJobs = [];
  let total = 0;
  for(const d of drawables){
    if(!d.texture) continue;
    total++;
    if(d.texture.type==="image") texJobs.push({drawable:d, type:"image", url:d.texture.url});
    if(d.texture.type==="sign") texJobs.push({drawable:d, type:"sign", text:d.texture.text});
    if(d.texture.type==="label") texJobs.push({drawable:d, type:"label", text:d.texture.text});
  }

  let done = 0;
  function progress(){
    const p = total===0 ? 1 : done/total;
    loadFill.style.width = `${Math.round(p*100)}%`;
    loadText.textContent = `Lade Assets… (${done}/${total})`;
  }
  progress();

  for(const job of texJobs){
    try{
      if(job.type==="image"){
        job.drawable.tex = await loadTexture(gl, job.url);
        job.drawable.useTex = true;
      } else if(job.type==="sign"){
        const c = makeSignCanvas(job.text);
        job.drawable.tex = textureFromCanvas(gl, c);
        job.drawable.useTex = true;
      } else if(job.type==="label"){
        const c = makeWallLabelCanvas(job.text);
        job.drawable.tex = textureFromCanvas(gl, c);
        job.drawable.useTex = true;
      }
    } catch(err){
      console.warn(err);
      
      job.drawable.tex = whiteTex;
      job.drawable.useTex = false;
    } finally {
      done++;
      progress();
    }
  }

  loadText.textContent = "Assets geladen.";
}
await loadAllTextures();

let ready = true;

// Pointer lock 
overlay.addEventListener("click", ()=>{
  if(!ready) return;
  if(!pointerLocked()){
    canvas.requestPointerLock();
  }
});

canvas.addEventListener("click", ()=>{
  if(!ready) return;

 
  if(modalOpen) return;

  if(!pointerLocked()){
    if(typeof menuIsOpen === "function" && menuIsOpen()) return;
    canvas.requestPointerLock();
    return;
  }

  
  if(hovered && hovered.type === "project"){
    openProjectModal(hovered.roomTitle, hovered.project);
  }
});


document.addEventListener("pointerlockchange", ()=>{
  if(pointerLocked()){
    setOverlayVisible(false);
  } else {
    
    if(!modalOpen) setOverlayVisible(true);
  }
});


const keys = new Set();
window.addEventListener("keydown", (e)=>{
  keys.add(e.code);
  if(e.code==="KeyE" && hovered){
    if(hovered.type==="sign"){
      const room = ROOMS.find(r => r.id === hovered.roomId);
      if(room && typeof room._zCenter === "number"){
        const x = (room.side==="L") ? -4.2 : 4.2;
        player.pos.x = x;
        player.pos.z = room._zCenter;
      }
    }
  }
});
window.addEventListener("keyup", (e)=> keys.delete(e.code));

let yaw = (MUSEUM.corridor.start.yawDeg ?? 0) * Math.PI/180;

let pitch = ((MUSEUM.corridor.start.pitchDeg ?? -10) * Math.PI/180);

const player = {
  
  pos: { x: MUSEUM.corridor.start.x, y: 0.0, z: MUSEUM.corridor.start.z },
  radius: 0.38,
  height: 1.7,
  eyeHeight: (MUSEUM.corridor.start.y ?? 1.7),
  facingYaw: yaw,
};




// Top-right menu teleporting 
function menuIsOpen(){
  return menuPanel && !menuPanel.classList.contains("hidden");
}

function setMenuOpen(open){
  if(!menuPanel || !menuBtn) return;
  menuPanel.classList.toggle("hidden", !open);
  menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
}

function jumpToRoomById(roomId){
  const room = ROOMS.find(r => r.id === roomId);
  if(!room || typeof room._zCenter !== "number") return;

  // Spawn point
  const x = (room.side === "L") ? -4.2 : 4.2;
  player.pos.x = x;
  player.pos.z = room._zCenter;
  
if ((room.id % 2) === 0) {
  
  const targetX = (room.side === "L") ? (player.pos.x - 6.0) : (player.pos.x + 6.0);
  const targetZ = player.pos.z;

  const dx = targetX - player.pos.x;
  const dz = targetZ - player.pos.z;

  
  player.yaw = Math.atan2(dx, dz);
  player.pitch = 0; 
}

}

function buildMenuRooms(){
  if(!menuRooms) return;
  menuRooms.textContent = "";

  const roomsSorted = [...ROOMS].slice().sort((a,b) => (a.id??0) - (b.id??0));
  for(const room of roomsSorted){
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "menuItem";
    btn.textContent = room.menuTitle ?? `Raum ${room.id ?? ""}`;

    if(room.signText) btn.title = room.signText.replace(/\n/g, " ");

    btn.addEventListener("click", (e)=>{
      e.stopPropagation();
      if(!ready) return;

      setMenuOpen(false);
      closeModal();
      jumpToRoomById(room.id);
      setOverlayVisible(false);

      
      if(!pointerLocked()){
        try { canvas.requestPointerLock(); } catch(_) {}
      }
    });

    menuRooms.appendChild(btn);
  }
}


if(menuBtn && menuPanel){
  buildMenuRooms();

  menuBtn.addEventListener("click", (e)=>{
    e.stopPropagation();
    if(!ready) return;
    setMenuOpen(!menuIsOpen());
  });



  
  document.addEventListener("click", (e)=>{
    if(menuIsOpen() && menuWrap && !menuWrap.contains(e.target)) setMenuOpen(false);
  });

  
  document.addEventListener("pointerlockchange", ()=>{
    if(pointerLocked()) setMenuOpen(false);
  });


  window.addEventListener("keydown", (e)=>{
 
  if(e.code === "KeyM"){
    e.preventDefault();

    if(pointerLocked()){
      document.exitPointerLock();
     
      setMenuOpen(true);
    } else {
      setMenuOpen(!menuIsOpen());
    }
  }

 
  if(e.code === "Escape" && menuIsOpen()){
    setMenuOpen(false);
  }
});

}






document.addEventListener("mousemove", (e)=>{
  if(!pointerLocked()) return;
  const sens = 0.0022;
  yaw -= e.movementX * sens;
  pitch -= e.movementY * sens;
  pitch = clamp(pitch, -1.45, 1.45);
});

// Collision
function collidesWithRadius(x, z, r){
  for(const c of worldData.colliders){
    if(x > (c.minX - r) && x < (c.maxX + r) && z > (c.minZ - r) && z < (c.maxZ + r)){
      return true;
    }
  }
  return false;
}

function collides(x, z){
  return collidesWithRadius(x, z, player.radius);
}

// Ray picking
function intersectPlaneRect(rayO, rayD, pr){
  const n = pr.normal;
  const denom = v3.dot(rayD, n);
  if(Math.abs(denom) < 1e-6) return null;

  const t = v3.dot(v3.sub(pr.center, rayO), n) / denom;
  if(t < 0) return null;

  const hit = v3.add(rayO, v3.scale(rayD, t));
  const rel = v3.sub(hit, pr.center);
  const u = v3.dot(rel, pr.uAxis);
  const v = v3.dot(rel, pr.vAxis);

  if(Math.abs(u) <= pr.halfW && Math.abs(v) <= pr.halfH){
    return { t, hit };
  }
  return null;
}

let hovered = null;

// Third-person camera 
let camState = {
  eye: {x:0,y:1.7,z:0},
  dir: {x:0,y:0,z:-1},
};

function computeCameraState(){
  const back = { x: Math.sin(yaw), y: 0, z: -Math.cos(yaw) };
  const camDist = 4.6;
  const camHeight = 1.9;

  const origin = { x: player.pos.x, y: camHeight, z: player.pos.z };
  const desired = {
    x: player.pos.x - back.x * camDist,
    y: camHeight,
    z: player.pos.z - back.z * camDist,
  };

  // camera clipping
  let eye = desired;
  let lastGood = origin;
  const steps = 12;
  for(let i=1;i<=steps;i++){
    const t = i/steps;
    const x = origin.x + (desired.x - origin.x) * t;
    const z = origin.z + (desired.z - origin.z) * t;
    if(collidesWithRadius(x, z, 0.22)){
      eye = lastGood;
      break;
    }
    lastGood = {
      x,
      y: origin.y + (desired.y - origin.y) * t,
      z,
    };
    eye = lastGood;
  }

  const dir = cameraDirFromYawPitch(yaw, pitch);
  return { eye, dir };
}

function updateHover(){
  hovered = null;
  if(!pointerLocked()) { setTooltip(null); return; }

  const rayO = camState.eye;
  const rayD = camState.dir;

  let bestT = Infinity;
  let best = null;

  for(const p of worldData.pickables){
    const it = intersectPlaneRect(rayO, rayD, p.plane);
    if(!it) continue;
    if(it.t < bestT && it.t < 7.0){
      bestT = it.t;
      best = p;
    }
  }

  hovered = best;

  if(hovered){
    setTooltip(`${hovered.label} — ${hovered.hint}`);
  } else {
    setTooltip(null);
  }
}

// Resize
function resize(){
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const w = Math.floor(canvas.clientWidth * dpr);
  const h = Math.floor(canvas.clientHeight * dpr);
  if(canvas.width!==w || canvas.height!==h){
    canvas.width = w;
    canvas.height = h;
    gl.viewport(0,0,w,h);
  }
}
window.addEventListener("resize", resize);

// Render loop
let last = performance.now();

function tick(now){
  const dt = Math.min(0.033, (now - last) / 1000);
  last = now;

  resize();

  // movement
  if(pointerLocked() && modal.classList.contains("hidden")){
    const forward = { x: Math.sin(yaw), y: 0, z: -Math.cos(yaw) };
    const right   = { x: Math.cos(yaw), y: 0, z:  Math.sin(yaw) };

    let mx = 0, mz = 0;
    if(keys.has("KeyW")) { mx += forward.x; mz += forward.z; }
    if(keys.has("KeyS")) { mx -= forward.x; mz -= forward.z; }
    if(keys.has("KeyD")) { mx += right.x;   mz += right.z; }
    if(keys.has("KeyA")) { mx -= right.x;   mz -= right.z; }

    const l = Math.hypot(mx, mz);
    if(l > 0.0001){
      mx /= l; mz /= l;
      const sprint = keys.has("ShiftLeft") || keys.has("ShiftRight");
      const speed = sprint ? 7.5 : 4.5; //5.2 3.2

      const dx = mx * speed * dt;
      const dz = mz * speed * dt;

      const nx = player.pos.x + dx;
      if(!collides(nx, player.pos.z)) player.pos.x = nx;

      const nz = player.pos.z + dz;
      if(!collides(player.pos.x, nz)) player.pos.z = nz;

      
      player.facingYaw = Math.atan2(mx, -mz);
    } else {
      
      player.facingYaw = yaw;
    }
  }

  
  camState = computeCameraState();
  updateHover();

 
  const dir = camState.dir;
  const eye = camState.eye;
  const target = v3.add(eye, dir);

  
  playerDrawable.model = m4.fromTR(player.pos.x, 0.0, player.pos.z, player.facingYaw);

  const view = m4.lookAt(eye, target, {x:0,y:1,z:0});
  const aspect = canvas.width / canvas.height;
  const proj = m4.perspective(60 * Math.PI/180, aspect, 0.05, 250);

 
  gl.clearColor(0.07,0.075,0.09,1);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  gl.useProgram(prog);
  gl.uniformMatrix4fv(loc.u_view, false, view);
  gl.uniformMatrix4fv(loc.u_proj, false, proj);
  gl.uniform3f(loc.u_camPos, eye.x, eye.y, eye.z);
  
  gl.uniform3f(loc.u_ambient, 0.24, 0.24, 0.26);

 
  const lights = worldData.lights.slice(0, MAX_LIGHTS);
  const lp = new Float32Array(MAX_LIGHTS*3);
  const lc = new Float32Array(MAX_LIGHTS*3);
  const li = new Float32Array(MAX_LIGHTS);

  for(let i=0;i<lights.length;i++){
    const L = lights[i];
    lp[i*3+0]=L.pos.x; lp[i*3+1]=L.pos.y; lp[i*3+2]=L.pos.z;
    lc[i*3+0]=L.color.x; lc[i*3+1]=L.color.y; lc[i*3+2]=L.color.z;
    li[i]=L.intensity;
  }
  gl.uniform1i(loc.u_lightCount, lights.length);
  gl.uniform3fv(loc.u_lightPos, lp);
  gl.uniform3fv(loc.u_lightColor, lc);
  gl.uniform1fv(loc.u_lightIntensity, li);

 
  for(const d of drawables){
    gl.bindVertexArray(d.mesh.vao);
    gl.uniformMatrix4fv(loc.u_model, false, d.model || IDENTITY_MODEL);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, d.tex);
    gl.uniform1i(loc.u_useTex, d.useTex ? 1 : 0);
    gl.uniform1f(loc.u_unlit, (d.kind === "picture") ? 1.0 : 0.0);
gl.uniform1f(loc.u_unlit,
  (d.kind === "picture" || d.kind === "sign" || d.kind === "label") ? 1.0 : 0.0
);
    gl.drawElements(gl.TRIANGLES, d.mesh.idxCount, gl.UNSIGNED_INT, 0);
  }
  gl.bindVertexArray(null);

  requestAnimationFrame(tick);
}

resize();
requestAnimationFrame(tick);


setOverlayVisible(true);
