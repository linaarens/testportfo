import { v3 } from "./engine.js";

function pushVertex(out, p, n, uv, c){
  out.pos.push(p.x,p.y,p.z);
  out.nor.push(n.x,n.y,n.z);
  out.uv.push(uv[0],uv[1]);
  out.col.push(c[0],c[1],c[2],c[3]);
}

function addQuad(out, p0,p1,p2,p3, n, c, uvScale=[1,1]){
  const base = out.pos.length/3;
  pushVertex(out,p0,n,[0,0],c);
  pushVertex(out,p1,n,[uvScale[0],0],c);
  pushVertex(out,p2,n,[uvScale[0],uvScale[1]],c);
  pushVertex(out,p3,n,[0,uvScale[1]],c);
  out.idx.push(base, base+1, base+2, base, base+2, base+3);
}

function addBox(out, min, max, c){
  
  const x0=min.x, y0=min.y, z0=min.z;
  const x1=max.x, y1=max.y, z1=max.z;

  // +X
  addQuad(out,
    v3.create(x1,y0,z0), v3.create(x1,y0,z1), v3.create(x1,y1,z1), v3.create(x1,y1,z0),
    v3.create(1,0,0), c, [1,1]
  );
  // -X
  addQuad(out,
    v3.create(x0,y0,z1), v3.create(x0,y0,z0), v3.create(x0,y1,z0), v3.create(x0,y1,z1),
    v3.create(-1,0,0), c, [1,1]
  );
  // +Z
  addQuad(out,
    v3.create(x0,y0,z1), v3.create(x1,y0,z1), v3.create(x1,y1,z1), v3.create(x0,y1,z1),
    v3.create(0,0,1), c, [1,1]
  );
  // -Z
  addQuad(out,
    v3.create(x1,y0,z0), v3.create(x0,y0,z0), v3.create(x0,y1,z0), v3.create(x1,y1,z0),
    v3.create(0,0,-1), c, [1,1]
  );
  // +Y
  addQuad(out,
    v3.create(x0,y1,z0), v3.create(x1,y1,z0), v3.create(x1,y1,z1), v3.create(x0,y1,z1),
    v3.create(0,1,0), c, [1,1]
  );
  // -Y
  addQuad(out,
    v3.create(x0,y0,z1), v3.create(x1,y0,z1), v3.create(x1,y0,z0), v3.create(x0,y0,z0),
    v3.create(0,-1,0), c, [1,1]
  );
}

function rect(minX,maxX,minZ,maxZ){ return {minX,maxX,minZ,maxZ}; }

export function buildWorld(rooms, layout){
  const geom = {pos:[],nor:[],uv:[],col:[],idx:[]};
  const drawables = [];
  const pickables = [];
  const colliders = [];
  const lights = [];

  const corridorW = 6.0;
  const halfW = corridorW/2;     
  const corridorH = 4.0;
  const roofPeak = 4.8;

  const corridorStartZ = 8.0;
  const corridorEndZ = layout.firstRoomZ - (layout.roomsPerSide-1)*layout.roomSpacing - 22.0;

  const wallT = 0.18; 
  const wallY0 = 0.0;
  const wallY1 = corridorH;

  const floorC = [0.10,0.10,0.12,1];
  
  const wallC  = [0.96,0.96,0.97,1];
  const wallC2 = [0.96,0.96,0.97,1];
  
  const ceilC  = [0.84,0.84,0.86,0.8];
  const frameC = [0.20,0.20,0.22,1];
  const woodC  = [0.20,0.20,0.22,1]; 

  //  floor 
  addQuad(geom,
    v3.create(-halfW, 0, corridorStartZ),
    v3.create( halfW, 0, corridorStartZ),
    v3.create( halfW, 0, corridorEndZ),
    v3.create(-halfW, 0, corridorEndZ),
    v3.create(0,1,0), floorC, [8, 32]
  );

  // ceiling / roof 
  addQuad(geom,
    v3.create(-halfW, corridorH, corridorStartZ),
    v3.create( 0.0, roofPeak, corridorStartZ),
    v3.create( 0.0, roofPeak, corridorEndZ),
    v3.create(-halfW, corridorH, corridorEndZ),
    v3.norm(v3.create(-0.65, 0.76, 0.0)), ceilC, [8, 32]
  );
  addQuad(geom,
    v3.create( 0.0, roofPeak, corridorStartZ),
    v3.create( halfW, corridorH, corridorStartZ),
    v3.create( halfW, corridorH, corridorEndZ),
    v3.create( 0.0, roofPeak, corridorEndZ),
    v3.norm(v3.create(0.65, 0.76, 0.0)), ceilC, [8, 32]
  );

  // end walls
  // front at corridorStartZ
  addQuad(geom,
    v3.create( halfW, wallY0, corridorStartZ),
    v3.create(-halfW, wallY0, corridorStartZ),
    v3.create(-halfW, wallY1, corridorStartZ),
    v3.create( halfW, wallY1, corridorStartZ),
    v3.create(0,0,1), wallC2, [2,1]
  );
  colliders.push(rect(-halfW, halfW, corridorStartZ-wallT, corridorStartZ+wallT));

  // back at corridorEndZ
  addQuad(geom,
    v3.create(-halfW, wallY0, corridorEndZ),
    v3.create( halfW, wallY0, corridorEndZ),
    v3.create( halfW, wallY1, corridorEndZ),
    v3.create(-halfW, wallY1, corridorEndZ),
    v3.create(0,0,-1), wallC2, [2,1]
  );
  colliders.push(rect(-halfW, halfW, corridorEndZ-wallT, corridorEndZ+wallT));

  // Corridor end wall image 
const endCfg = layout.endWall;
if(endCfg){
  
  const zWall = corridorEndZ + 0.02;     
  const zImg  = zWall + 0.03;
  const zText = zWall + 0.06;

  const normal = v3.create(0,0,1); 

  const u = v3.create(1,0,0);
  const v = v3.create(0,1,0);

  const imgW = 2.4;
  const imgH = imgW * 3/4;
  const textW = 3.2;
  const textH = 0.9;

  
  const imgY = 2.0;  
  const imgX = -(imgW/2); 
  const textY = 2.5;
  const textX = (textW/2)-0.15;

  
  if(endCfg.image){
    const center = v3.create(imgX, imgY, zImg);
    const hw = imgW/2, hh = imgH; 

    const p0 = v3.add(v3.add(center, v3.scale(u,-hw)), v3.scale(v,-hh));
    const p1 = v3.add(v3.add(center, v3.scale(u, hw)), v3.scale(v,-hh));
    const p2 = v3.add(v3.add(center, v3.scale(u, hw)), v3.scale(v, hh));
    const p3 = v3.add(v3.add(center, v3.scale(u,-hw)), v3.scale(v, hh));

    drawables.push({
      name: "corridor-end-image",
      kind: "picture", 
      geom: makeQuadGeom(p0,p1,p2,p3, normal, [1,1,1,1]),
      texture: { type: "image", url: endCfg.image },
    });
  }

  // Text 
  if(endCfg.text){
    const center = v3.create(textX, textY, zText);
    const hw = textW/2, hh = textH/2;

    const p0 = v3.add(v3.add(center, v3.scale(u,-hw)), v3.scale(v,-hh));
    const p1 = v3.add(v3.add(center, v3.scale(u, hw)), v3.scale(v,-hh));
    const p2 = v3.add(v3.add(center, v3.scale(u, hw)), v3.scale(v, hh));
    const p3 = v3.add(v3.add(center, v3.scale(u,-hw)), v3.scale(v, hh));

    drawables.push({
      name: "corridor-end-text",
      kind: "label",
      geom: makeQuadGeom(p0,p1,p2,p3, normal, [1,1,1,1]),
      texture: { type: "label", text: endCfg.text },
    });
  }
}


  // corridor lights
  for(const z of [2, -18, -38, -58, -78]){
    lights.push({pos:{x:0,y:4.3,z}, color:{ x: 0.55, y: 0.75, z: 1.0 }, intensity:8.2});
  }

 
  const openingsL = [];
  const openingsR = [];

  // Rooms geometry + openings + lights + pictures
  const roomDepth = 12.0;
  const roomHalfDepth = roomDepth/2; // 6
  const roomW = 8.0;

  const doorW = 3.4;

  function roomZCenter(i){ return layout.firstRoomZ - i*layout.roomSpacing; }

  // Build rooms from config order 
  const sideIndexCount = {L:0, R:0};

  for(const room of rooms){
    const side = room.side === "R" ? "R" : "L";
    const si = sideIndexCount[side]++;
    const zc = roomZCenter(si);

    room._zCenter = zc;

    const z0 = zc - roomHalfDepth;
    const z1 = zc + roomHalfDepth;
    const doorZ0 = zc - doorW/2;
    const doorZ1 = zc + doorW/2;

    if(side==="L") openingsL.push({z0:doorZ0, z1:doorZ1});
    else openingsR.push({z0:doorZ0, z1:doorZ1});

    // room bounds
    const xInner = (side==="L") ? -halfW : halfW;
    const xOuter = (side==="L") ? (xInner - roomW) : (xInner + roomW);

    // room floor
    addQuad(geom,
      v3.create(Math.min(xInner,xOuter), 0, z0),
      v3.create(Math.max(xInner,xOuter), 0, z0),
      v3.create(Math.max(xInner,xOuter), 0, z1),
      v3.create(Math.min(xInner,xOuter), 0, z1),
      v3.create(0,1,0), floorC, [6, 6]
    );

    // room ceiling flat
    addQuad(geom,
      v3.create(Math.min(xInner,xOuter), corridorH, z1),
      v3.create(Math.max(xInner,xOuter), corridorH, z1),
      v3.create(Math.max(xInner,xOuter), corridorH, z0),
      v3.create(Math.min(xInner,xOuter), corridorH, z0),
      v3.create(0,-1,0), ceilC, [6, 6]
    );

    // outer wall
    const nOuter = (side==="L") ? v3.create(-1,0,0) : v3.create(1,0,0);
    addQuad(geom,
      v3.create(xOuter, wallY0, z0),
      v3.create(xOuter, wallY0, z1),
      v3.create(xOuter, wallY1, z1),
      v3.create(xOuter, wallY1, z0),
      nOuter, wallC, [3,2]
    );
    colliders.push(rect(Math.min(xOuter, xOuter-wallT), Math.max(xOuter, xOuter+wallT), z0, z1));

    // side walls z0 and z1
    // wall at z0 facing +Z
    addQuad(geom,
      v3.create(xOuter, wallY0, z0),
      v3.create(xInner, wallY0, z0),
      v3.create(xInner, wallY1, z0),
      v3.create(xOuter, wallY1, z0),
      v3.create(0,0,1), wallC2, [3,2]
    );
    colliders.push(rect(Math.min(xOuter,xInner), Math.max(xOuter,xInner), z0-wallT, z0+wallT));

    // wall at z1 facing -Z
    addQuad(geom,
      v3.create(xInner, wallY0, z1),
      v3.create(xOuter, wallY0, z1),
      v3.create(xOuter, wallY1, z1),
      v3.create(xInner, wallY1, z1),
      v3.create(0,0,-1), wallC2, [3,2]
    );
    colliders.push(rect(Math.min(xOuter,xInner), Math.max(xOuter,xInner), z1-wallT, z1+wallT));

    // door frame 
    const frameTh = 0.12;
    const frameH = corridorH - frameTh;
    const eps = 0.02; 
    const xDoor = xInner + (side==="L" ? eps : -eps);

    const xDoorOut = xDoor + (side==="L" ? -frameTh : frameTh);
    const xMin = Math.min(xDoor, xDoorOut);
    const xMax = Math.max(xDoor, xDoorOut);

    // left jamb
    addBox(geom,
      v3.create(xMin, 0, doorZ0-frameTh),
      v3.create(xMax, frameH, doorZ0),
      woodC
    );
    // right jamb
    addBox(geom,
      v3.create(xMin, 0, doorZ1),
      v3.create(xMax, frameH, doorZ1+frameTh),
      woodC
    );
    // header
    addBox(geom,
      v3.create(xMin, frameH, doorZ0-frameTh),
      v3.create(xMax, frameH+frameTh, doorZ1+frameTh),
      woodC
    );

    // sign stand in corridor 
    const signX = (side==="L") ? -2.35 : 2.35;
    const signZ = zc + 3.1;
    const signW = 1.05;
    const signH = 0.55;
    const postW = 0.08;

    // post
    addBox(geom,
      v3.create(signX-postW, 0, signZ-postW),
      v3.create(signX+postW, 1.15, signZ+postW),
      frameC
    );


    // sign panel 
const signNormal = (side==="L") ? v3.create(1,0,0) : v3.create(-1,0,0);
const sx = signX + (side==="L" ? 0.16 : -0.16);

let p0, p1, p2, p3;

if(side === "L"){
  
  p0 = v3.create(sx, 1.35 - signH/2, signZ + signW/2);
  p1 = v3.create(sx, 1.35 - signH/2, signZ - signW/2);
  p2 = v3.create(sx, 1.35 + signH/2, signZ - signW/2);
  p3 = v3.create(sx, 1.35 + signH/2, signZ + signW/2);
} else {
  
  p0 = v3.create(sx, 1.35 - signH/2, signZ - signW/2);
  p1 = v3.create(sx, 1.35 - signH/2, signZ + signW/2);
  p2 = v3.create(sx, 1.35 + signH/2, signZ + signW/2);
  p3 = v3.create(sx, 1.35 + signH/2, signZ - signW/2);
}


    
    drawables.push({
      name: `sign-${room.id}`,
      kind: "sign",
      roomId: room.id,
      roomTitle: room.title,
      signText: room.signText,
      geom: makeQuadGeom(p0,p1,p2,p3, signNormal, [1,1,1,1]),
      texture: { type: "sign", text: room.signText },
      pick: makePlanePickable(p0,p1,p2,p3, signNormal, {
        type: "sign",
        label: room.title,
        hint: "E: Raum betreten",
        roomId: room.id,
      }),
    });

    // Room ceiling light 
    lights.push({pos:{x:(xInner+xOuter)/2, y:3.65, z:zc}, color:{ x: 0.4, y: 0.65, z: 1.0 }, intensity:5.6});

    // Pictures
    const projs = room.projects ?? [];
    const wPic = 4.9; //2.9
    const hPic = 2.9; //1.9
    const yPic = 2.05; //2.05
    const inset = 0.02;

    function addPicture(id, center, normal, uAxis, vAxis, imgUrl, meta){
      if(!imgUrl) return;
      
      const u = v3.norm(uAxis);
      const v = v3.norm(vAxis);
      const hw = wPic/2, hh = hPic/2;
      const c = center;

      const c0 = v3.add(v3.add(c, v3.scale(u,-hw)), v3.scale(v,-hh));
      const c1 = v3.add(v3.add(c, v3.scale(u, hw)), v3.scale(v,-hh));
      const c2 = v3.add(v3.add(c, v3.scale(u, hw)), v3.scale(v, hh));
      const c3 = v3.add(v3.add(c, v3.scale(u,-hw)), v3.scale(v, hh));

   


      // frame border 
      const framePad = 0.09;
      const thick = 0.06;
      const n = normal;

      
      const bw = wPic + framePad*2;
      const bh = hPic + framePad*2;
      const hwB=bw/2, hhB=bh/2;
      const back = v3.add(c, v3.scale(n, -inset));
      const b0 = v3.add(v3.add(back, v3.scale(u,-hwB)), v3.scale(v,-hhB));
      const b1 = v3.add(v3.add(back, v3.scale(u, hwB)), v3.scale(v,-hhB));
      const b2 = v3.add(v3.add(back, v3.scale(u, hwB)), v3.scale(v, hhB));
      const b3 = v3.add(v3.add(back, v3.scale(u,-hwB)), v3.scale(v, hhB));
      addQuad(geom, b0,b1,b2,b3, n, frameC, [1,1]);

      // picture drawable
      drawables.push({
        name: `pic-${room.id}-${id}`,
        kind: "picture",
        roomId: room.id,
        roomTitle: room.title,
        project: meta,
        geom: makeQuadGeom(c0,c1,c2,c3, n, [1,1,1,1]),
        texture: { type: "image", url: imgUrl },
        pick: makePlanePickable(c0,c1,c2,c3, n, {
          type: "project",
          label: meta.title,
          hint: "Click: Projekt öffnen",
          roomId: room.id,
          roomTitle: room.title,
          project: meta,
        }),
      });

      // spotlight
      lights.push({pos: v3.add(center, v3.create(0, 1.15, 0)), color:{ x: 0.4, y: 0.65, z: 1.0 }, intensity:2.2});
    }

    // Big wall label 
    {
      const text = room.wallLabel ?? "";
      if(String(text).trim().length){
        const wLabel = 11.4;
        const hLabel = 2.35;
        const yLabel = 2.95;
        const zLabel = z0 + 0.02; 

        const normal = v3.create(0,0,1); 
        const u = v3.create(1,0,0);
        const v = v3.create(0,1,0);
        const center = v3.create((xInner+xOuter)/2, yLabel, zLabel);

        const hw = wLabel/2, hh = hLabel/2;
        const p0 = v3.add(v3.add(center, v3.scale(u,-hw)), v3.scale(v,-hh));
        const p1 = v3.add(v3.add(center, v3.scale(u, hw)), v3.scale(v,-hh));
        const p2 = v3.add(v3.add(center, v3.scale(u, hw)), v3.scale(v, hh));
        const p3 = v3.add(v3.add(center, v3.scale(u,-hw)), v3.scale(v, hh));

        drawables.push({
          name: `label-${room.id}`,
          kind: "label",
          roomId: room.id,
          roomTitle: room.title,
          geom: makeQuadGeom(p0,p1,p2,p3, normal, [1,1,1,1]),
          texture: { type: "label", text },
        });
      }
    }

    // Outer wall pictures 
  const xWall = xOuter + (side==="L" ? 0.01 : -0.01);
  const normalIn = (side==="L") ? v3.create(1,0,0) : v3.create(-1,0,0);

   const zA = zc - 2.6;
   const zB = zc + 2.6;

    const projA = projs[0] ?? {title:`${room.title} A`, desc:"", image:""};
    const projB = projs[1] ?? {title:`${room.title} B`, desc:"", image:""};
    const projC = projs[2] ?? {title:`${room.title} C`, desc:"", image:""};

    addPicture("A",
      v3.create(xWall, yPic, zA),
      normalIn,
      v3.create(0,0,1), v3.create(0,1,0),
      projA.image,
      projA
    );
    addPicture("B",
      v3.create(xWall, yPic, zB),
      normalIn,
      v3.create(0,0,1), v3.create(0,1,0),
      projB.image,
      projB
    );

    // Far wall picture  
    const farZ = z1 - 0.01;
    addPicture("C",
      v3.create((xInner+xOuter)/2, yPic, farZ),
      v3.create(0,0,-1),
      v3.create(1,0,0), v3.create(0,1,0),
      projC.image,
      projC
    ); 
  }







  
  function makeQuadGeom(p0,p1,p2,p3,n,c){
    const o = {pos:[],nor:[],uv:[],col:[],idx:[]};
    addQuad(o,p0,p1,p2,p3,n,c,[1,1]);
    return o;
  }

  function makePlanePickable(p0,p1,p2,p3,n, meta){
    
    const u = v3.sub(p1,p0);
    const v = v3.sub(p3,p0);
    const center = v3.scale(v3.add(v3.add(p0,p2), v3.add(p1,p3)), 0.25);
    return {
      ...meta,
      plane: {
        center,
        normal: v3.norm(n),
        uAxis: v3.norm(u),
        vAxis: v3.norm(v),
        halfW: v3.len(u)/2,
        halfH: v3.len(v)/2,
      },
    };
  }

  // corridor walls with door openings
  function addWallSegment(side, z0, z1){
    const x = (side==="L") ? -halfW : halfW;
    const normal = (side==="L") ? v3.create(1,0,0) : v3.create(-1,0,0);
    const c = (side==="L") ? wallC : wallC;
    const p0 = v3.create(x, wallY0, z0);
    const p1 = v3.create(x, wallY0, z1);
    const p2 = v3.create(x, wallY1, z1);
    const p3 = v3.create(x, wallY1, z0);
    addQuad(geom,p0,p1,p2,p3, normal, c, [8,2]);

    // collider rectangle on wall line
    const minX = Math.min(x-wallT, x+wallT);
    const maxX = Math.max(x-wallT, x+wallT);
    colliders.push(rect(minX, maxX, Math.min(z0,z1), Math.max(z0,z1)));
  }

  function buildWall(side, openings){
   
    const eps = 0.001;
    const dir = (corridorEndZ >= corridorStartZ) ? 1 : -1;
    const tStart = corridorStartZ * dir;
    const tEnd = corridorEndZ * dir;

    
    const ops = openings.map(o=>{
      const t0 = o.z0 * dir;
      const t1 = o.z1 * dir;
      return { t0: Math.min(t0,t1), t1: Math.max(t0,t1) };
    }).sort((a,b)=>a.t0-b.t0);

    let t = Math.min(tStart, tEnd);
    const tMax = Math.max(tStart, tEnd);

    for(const o of ops){
      const seg0 = t;
      const seg1 = o.t0 - eps;
      if(seg1 > seg0){
        addWallSegment(side, seg0/dir, seg1/dir);
      }
      t = o.t1 + eps;
    }
    if(t < tMax){
      addWallSegment(side, t/dir, tMax/dir);
    }
  }

  buildWall("L", openingsL);
  buildWall("R", openingsR);

  // world mesh
  drawables.unshift({
    name: "world",
    kind: "world",
    geom,
    texture: null,
  });

  
  for(const d of drawables){
    if(d.pick) pickables.push(d.pick);
  }

  return { drawables, pickables, colliders, lights, corridorEndZ };
}
