(() => {
  const canvas = document.querySelector('#terrain');
  if (!canvas || matchMedia('(max-width: 800px), (prefers-reduced-motion: reduce)').matches) return;
  const gl = canvas.getContext('webgl', { alpha: true, antialias: false });
  if (!gl) return;
  const vertex = `attribute vec2 p; varying vec2 uv; void main(){uv=p*.5+.5;gl_Position=vec4(p,0.,1.);}`;
  const fragment = `precision mediump float; uniform float t; uniform vec2 r; varying vec2 uv;
  float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
  float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);}
  float terrain(vec2 p){float n=0.,a=.56;for(int i=0;i<5;i++){n+=noise(p)*a;p=p*2.03+vec2(4.7,9.2);a*=.49;}return n;}
  void main(){vec2 q=uv;q.x*=r.x/r.y;float h=terrain(q*3.4+vec2(t*.009,0.));float lines=abs(fract((h+noise(q*1.1+t*.004)*.08)*20.)-.5);float ridge=smoothstep(.035,.0,lines);float mask=smoothstep(.1,.8,uv.x)*smoothstep(0.,.14,uv.y)*smoothstep(0.,.16,1.-uv.y);float glow=exp(-length(q-vec2(.65,.54))*3.2);vec3 col=mix(vec3(.57,.68,.43),vec3(.80,.86,.65),glow);float alpha=(ridge*.24+glow*.08)*mask;gl_FragColor=vec4(col,alpha);}`;
  function shader(type, source) { const s = gl.createShader(type); gl.shaderSource(s, source); gl.compileShader(s); return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null; }
  const vs = shader(gl.VERTEX_SHADER, vertex), fs = shader(gl.FRAGMENT_SHADER, fragment);
  if (!vs || !fs) return;
  const program = gl.createProgram(); gl.attachShader(program, vs); gl.attachShader(program, fs); gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
  gl.useProgram(program);
  const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, 'p'); gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  const time = gl.getUniformLocation(program, 't'), resolution = gl.getUniformLocation(program, 'r');
  const resize = () => { const dpr = Math.min(devicePixelRatio || 1, 1.5), w = Math.round(canvas.clientWidth*dpr), h = Math.round(canvas.clientHeight*dpr); if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;gl.viewport(0,0,w,h);gl.uniform2f(resolution,w,h);} };
  let frame, start = performance.now();
  const draw = now => { resize(); gl.uniform1f(time,(now-start)/1000); gl.drawArrays(gl.TRIANGLES,0,6); frame=requestAnimationFrame(draw); };
  const observer = new IntersectionObserver(([entry]) => { if(entry.isIntersecting&&!frame) frame=requestAnimationFrame(draw); else if(!entry.isIntersecting&&frame){cancelAnimationFrame(frame);frame=0;} }); observer.observe(canvas);
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&frame){cancelAnimationFrame(frame);frame=0;}else if(!document.hidden&&frame===0&&observer.takeRecords().length===0)frame=requestAnimationFrame(draw);});
  addEventListener('resize',resize,{passive:true});
})();
