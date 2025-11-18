<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  
  type OGLTypes = {
    Renderer: any;
    Transform: any;
    Vec3: any;
    Color: any;
    Polyline: any;
  };

  interface Line {
    spring: number;
    friction: number;
    mouseVelocity: any;
    mouseOffset: any;
    points: any[];
    polyline: any;
  }
  
  let OGL: OGLTypes | null = null;
  
  export let colors: string[] = ['#FC8EAC', '#8EFCAC', '#8EACFC']; // Original soft colors
  export let baseSpring: number = 0.03;
  export let baseFriction: number = 0.9;
  export let baseThickness: number = 25;
  export let offsetFactor: number = 0.05;
  export let maxAge: number = 500;
  export let pointCount: number = 50;
  export let speedMultiplier: number = 0.8;
  export let enableFade: boolean = true;
  export let enableShaderEffect: boolean = false;
  export let effectAmplitude: number = 2;
  export let backgroundColor: number[] = [0, 0, 0, 0];

  let container: HTMLDivElement | null = null;
  let renderer: any = null;
  let frameId: number | null = null;

  onMount(() => {
    const init = async () => {
      try {
        OGL = await import('ogl');
      } catch (error) {
        console.error('Failed to load OGL library:', error);
        return;
      }

      if (!OGL || !container) return;

      const { Renderer, Transform, Vec3, Color, Polyline } = OGL;

      // Initialize OGL renderer
      renderer = new Renderer({ 
        dpr: window.devicePixelRatio || 2, 
        alpha: true 
      });
      const gl = renderer.gl;
      
      gl.clearColor(0, 0, 0, 0);

      const canvas = gl.canvas;
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '9999';
      
      container.appendChild(canvas);

      const scene = new Transform();
      const lines: Line[] = [];

      // Shader code
      const vertex = `
        precision highp float;
        
        attribute vec3 position;
        attribute vec3 next;
        attribute vec3 prev;
        attribute vec2 uv;
        attribute float side;
        
        uniform vec2 uResolution;
        uniform float uDPR;
        uniform float uThickness;
        uniform float uTime;
        uniform float uEnableShaderEffect;
        uniform float uEffectAmplitude;
        
        varying vec2 vUV;
        
        vec4 getPosition() {
            vec4 current = vec4(position, 1.0);
            vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
            vec2 nextScreen = next.xy * aspect;
            vec2 prevScreen = prev.xy * aspect;
            vec2 tangent = normalize(nextScreen - prevScreen);
            vec2 normal = vec2(-tangent.y, tangent.x);
            normal /= aspect;
            normal *= mix(1.0, 0.1, pow(abs(uv.y - 0.5) * 2.0, 2.0));
            float dist = length(nextScreen - prevScreen);
            normal *= smoothstep(0.0, 0.02, dist);
            float pixelWidthRatio = 1.0 / (uResolution.y / uDPR);
            float pixelWidth = current.w * pixelWidthRatio;
            normal *= pixelWidth * uThickness;
            current.xy -= normal * side;
            if(uEnableShaderEffect > 0.5) {
              current.xy += normal * sin(uTime + current.x * 10.0) * uEffectAmplitude;
            }
            return current;
        }
        
        void main() {
            vUV = uv;
            gl_Position = getPosition();
        }
      `;

      const fragment = `
        precision highp float;
        uniform vec3 uColor;
        uniform float uOpacity;
        uniform float uEnableFade;
        varying vec2 vUV;
        void main() {
            float fadeFactor = 1.0;
            if(uEnableFade > 0.5) {
                fadeFactor = 1.0 - smoothstep(0.0, 1.0, vUV.y);
            }
            gl_FragColor = vec4(uColor, uOpacity * fadeFactor);
        }
      `;

      function resize() {
        if (!container || !renderer) return;
        const width = container.clientWidth;
        const height = container.clientHeight;
        renderer.setSize(width, height);
        lines.forEach(line => {
          if (line.polyline && line.polyline.resize) {
            line.polyline.resize();
          }
        });
      }

      window.addEventListener('resize', resize);

      // Create lines
      const center = (colors.length - 1) / 2;
      colors.forEach((color, index) => {
        const spring = baseSpring + (Math.random() - 0.5) * 0.05;
        const friction = baseFriction + (Math.random() - 0.5) * 0.05;
        const thickness = baseThickness + (Math.random() - 0.5) * 3;
        const mouseOffset = new Vec3(
          (index - center) * offsetFactor + (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.1,
          0
        );

        const line: Line = {
          spring,
          friction,
          mouseVelocity: new Vec3(),
          mouseOffset,
          points: [],
          polyline: null
        };

        const count = pointCount;
        const points = [];
        for (let i = 0; i < count; i++) {
          points.push(new Vec3());
        }
        line.points = points;

        line.polyline = new Polyline(gl, {
          points,
          vertex,
          fragment,
          uniforms: {
            uColor: { value: new Color(color) },
            uThickness: { value: thickness },
            uOpacity: { value: 1.0 },
            uTime: { value: 0.0 },
            uEnableShaderEffect: { value: enableShaderEffect ? 1.0 : 0.0 },
            uEffectAmplitude: { value: effectAmplitude },
            uEnableFade: { value: enableFade ? 1.0 : 0.0 }
          }
        });
        
        if (line.polyline.mesh) {
          line.polyline.mesh.setParent(scene);
        }
        
        lines.push(line);
      });

      resize();

      // Mouse tracking
      const mouse = new Vec3();
      function updateMouse(e: MouseEvent | TouchEvent) {
        if (!container) return;
        let x: number, y: number;
        const rect = container.getBoundingClientRect();
        if ('changedTouches' in e && e.changedTouches && e.changedTouches.length) {
          x = e.changedTouches[0].clientX - rect.left;
          y = e.changedTouches[0].clientY - rect.top;
        } else if ('clientX' in e) {
          x = e.clientX - rect.left;
          y = e.clientY - rect.top;
        } else {
          return;
        }
        const width = container.clientWidth;
        const height = container.clientHeight;
        mouse.set((x / width) * 2 - 1, (y / height) * -2 + 1, 0);
      }

      container.addEventListener('mousemove', updateMouse);
      container.addEventListener('touchstart', updateMouse);
      container.addEventListener('touchmove', updateMouse);

      // Animation
      const tmp = new Vec3();
      let lastTime = performance.now();
      
      function update() {
        if (!renderer) return;
        
        frameId = requestAnimationFrame(update);
        const currentTime = performance.now();
        const dt = currentTime - lastTime;
        lastTime = currentTime;

        lines.forEach(line => {
          if (!line.points || !line.points.length) return;
          
          tmp.copy(mouse).add(line.mouseOffset).sub(line.points[0]).multiply(line.spring);
          line.mouseVelocity.add(tmp).multiply(line.friction);
          line.points[0].add(line.mouseVelocity);

          for (let i = 1; i < line.points.length; i++) {
            if (isFinite(maxAge) && maxAge > 0) {
              const segmentDelay = maxAge / (line.points.length - 1);
              const alpha = Math.min(1, (dt * speedMultiplier) / segmentDelay);
              line.points[i].lerp(line.points[i - 1], alpha);
            } else {
              line.points[i].lerp(line.points[i - 1], 0.9);
            }
          }
          
          if (line.polyline && line.polyline.mesh && line.polyline.mesh.program && line.polyline.mesh.program.uniforms.uTime) {
            line.polyline.mesh.program.uniforms.uTime.value = currentTime * 0.001;
          }
          
          if (line.polyline && line.polyline.updateGeometry) {
            line.polyline.updateGeometry();
          }
        });

        renderer.render({ scene });
      }
      
      update();
    };

    init();
  });

  onDestroy(() => {
    if (frameId) {
      cancelAnimationFrame(frameId);
    }
    if (renderer && container && renderer.gl?.canvas && container.contains(renderer.gl.canvas)) {
      container.removeChild(renderer.gl.canvas);
    }
  });
</script>

<div bind:this={container} class="ribbons-container" />

<style>
  .ribbons-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 9999;
  }
</style>