

export function clamp(v, a, b){ return Math.max(a, Math.min(b, v)); }
export function lerp(a,b,t){ return a + (b-a)*t; }

export const v3 = {
  create:(x=0,y=0,z=0)=>({x,y,z}),
  add:(a,b)=>({x:a.x+b.x,y:a.y+b.y,z:a.z+b.z}),
  sub:(a,b)=>({x:a.x-b.x,y:a.y-b.y,z:a.z-b.z}),
  scale:(a,s)=>({x:a.x*s,y:a.y*s,z:a.z*s}),
  dot:(a,b)=>a.x*b.x+a.y*b.y+a.z*b.z,
  cross:(a,b)=>({x:a.y*b.z-a.z*b.y,y:a.z*b.x-a.x*b.z,z:a.x*b.y-a.y*b.x}),
  len:(a)=>Math.hypot(a.x,a.y,a.z),
  norm:(a)=>{ const l=Math.hypot(a.x,a.y,a.z)||1; return {x:a.x/l,y:a.y/l,z:a.z/l}; },
};

export const m4 = {
  identity:()=>{
    const m=new Float32Array(16);
    m[0]=m[5]=m[10]=m[15]=1;
    return m;
  },
  
  mul:(a,b)=>{
    const out=new Float32Array(16);
    for(let i=0;i<4;i++){
      const ai0=a[i],   ai1=a[i+4], ai2=a[i+8],  ai3=a[i+12];
      out[i]    = ai0*b[0]  + ai1*b[1]  + ai2*b[2]  + ai3*b[3];
      out[i+4]  = ai0*b[4]  + ai1*b[5]  + ai2*b[6]  + ai3*b[7];
      out[i+8]  = ai0*b[8]  + ai1*b[9]  + ai2*b[10] + ai3*b[11];
      out[i+12] = ai0*b[12] + ai1*b[13] + ai2*b[14] + ai3*b[15];
    }
    return out;
  },
  translate:(x,y,z)=>{
    const m=m4.identity();
    m[12]=x; m[13]=y; m[14]=z;
    return m;
  },
  rotateY:(rad)=>{
    const c=Math.cos(rad), s=Math.sin(rad);
    const m=m4.identity();
    
    m[0]= c;  m[8]= -s;
    m[2]= s;  m[10]= c;
    return m;
  },
  
  fromTR:(x,y,z, yawRad)=>{
    const c=Math.cos(yawRad), s=Math.sin(yawRad);
    const m=m4.identity();
    m[0]= c;  m[8]= -s;
    m[2]= s;  m[10]= c;
    m[12]=x; m[13]=y; m[14]=z;
    return m;
  },
  perspective:(fovyRad, aspect, near, far)=>{
    const f=1/Math.tan(fovyRad/2);
    const m=new Float32Array(16);
    m[0]=f/aspect;
    m[5]=f;
    m[11]=-1;
    m[15]=0;
    if(far!==Infinity){
      m[10]=(far+near)/(near-far);
      m[14]=(2*far*near)/(near-far);
    } else {
      m[10]=-1;
      m[14]=-2*near;
    }
    return m;
  },
  lookAt:(eye, target, up)=>{
    const z = v3.norm(v3.sub(eye, target));     
    const x = v3.norm(v3.cross(up, z));         
    const y = v3.cross(z, x);                   
    const m=m4.identity();
    m[0]=x.x; m[4]=x.y; m[8]=x.z;
    m[1]=y.x; m[5]=y.y; m[9]=y.z;
    m[2]=z.x; m[6]=z.y; m[10]=z.z;
    m[12]=-(x.x*eye.x + x.y*eye.y + x.z*eye.z);
    m[13]=-(y.x*eye.x + y.y*eye.y + y.z*eye.z);
    m[14]=-(z.x*eye.x + z.y*eye.y + z.z*eye.z);
    return m;
  }
};

export function cameraDirFromYawPitch(yawRad, pitchRad){
  
  const cp=Math.cos(pitchRad), sp=Math.sin(pitchRad);
  const sy=Math.sin(yawRad), cy=Math.cos(yawRad);
  return v3.norm({x: sy*cp, y: sp, z: -cy*cp});
}

export function compileProgram(gl, vsSrc, fsSrc){
  const vs = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vs, vsSrc);
  gl.compileShader(vs);
  if(!gl.getShaderParameter(vs, gl.COMPILE_STATUS)){
    const log = gl.getShaderInfoLog(vs);
    gl.deleteShader(vs);
    throw new Error("VS compile error:\n"+log);
  }
  const fs = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fs, fsSrc);
  gl.compileShader(fs);
  if(!gl.getShaderParameter(fs, gl.COMPILE_STATUS)){
    const log = gl.getShaderInfoLog(fs);
    gl.deleteShader(vs); gl.deleteShader(fs);
    throw new Error("FS compile error:\n"+log);
  }
  const prog=gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  gl.deleteShader(vs); gl.deleteShader(fs);
  if(!gl.getProgramParameter(prog, gl.LINK_STATUS)){
    const log = gl.getProgramInfoLog(prog);
    gl.deleteProgram(prog);
    throw new Error("Program link error:\n"+log);
  }
  return prog;
}

export function createSolidTexture(gl, rgba){
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  const data = new Uint8Array(rgba);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1,1,0, gl.RGBA, gl.UNSIGNED_BYTE, data);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  return tex;
}

export function loadTexture(gl, url){
  return new Promise((resolve, reject)=>{
    const img = new Image();
    img.onload=()=>{
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      resolve(tex);
    };
    img.onerror=()=>reject(new Error("Texture load failed: "+url));
    img.src=url;
  });
}

export function textureFromCanvas(gl, canvas){
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  return tex;
}

export function makeSignCanvas(text){
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");

  // background
  ctx.fillStyle = "rgba(12, 13, 16, 0.92)";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  // border
  ctx.strokeStyle = "rgba(255,255,255,0.25)";
  ctx.lineWidth = 8;
  ctx.strokeRect(10,10,canvas.width-20,canvas.height-20);

  // text
  ctx.fillStyle = "rgba(255,255,255,0.92)";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const lines = String(text ?? "").split("\n").slice(0,4);
  const baseSize = 44;
  for(let i=0;i<lines.length;i++){
    const line = lines[i].trim();
    const size = (i===0) ? baseSize : 30;
    ctx.font = `700 ${size}px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial`;
    const y = canvas.height/2 + (i-(lines.length-1)/2)*44;
    ctx.fillText(line, canvas.width/2, y);
  }


  return canvas;
}

// wall title 
export function makeWallLabelCanvas(text){
  const canvas = document.createElement("canvas");
  canvas.width = 1800; //1400
  canvas.height = 256; //256
  const ctx = canvas.getContext("2d");

  
  ctx.clearRect(0,0,canvas.width,canvas.height);

  
  const lines = String(text ?? "").replace(/\r/g,"").split("\n");
  if(lines.length===0) return canvas;

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  
  ctx.shadowColor = "rgba(0,0,0,0.18)";
  ctx.shadowBlur = 6;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 2;

  const maxLen = Math.max(...lines.map(l=>l.length));
  const base = maxLen > 18 ? 108 : maxLen > 12 ? 124 : 140;
  const second = Math.max(80, Math.round(base*0.72));

  for(let i=0;i<lines.length;i++){
    const size = (i===0) ? base : second;
    ctx.font = `900 ${size}px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial`;
    ctx.fillStyle = "rgba(10,10,12,1.0)";
    const y = canvas.height/2 + (i-(lines.length-1)/2) * (size*0.82);
    ctx.fillText(lines[i], canvas.width/2, y);
  }

  
  ctx.shadowColor = "rgba(0,0,0,0)";
  ctx.shadowBlur = 0;
  return canvas;
}
