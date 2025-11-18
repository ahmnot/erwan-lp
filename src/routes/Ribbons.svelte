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
  
  export let colors: string[] = ['#FF0000', '#00FF00', '#0000FF']; // Bright colors
  export let baseSpring: number = 0.1;
  export let baseFriction: number = 0.7;
  export let baseThickness: number = 80; // Very thick
  export let offsetFactor: number = 0.05;
  export let maxAge: number = 500;
  export let pointCount: number = 30;
  export let speedMultiplier: number = 1.5;
  export let enableFade: boolean = false; // No fade
  export let enableShaderEffect: boolean = false;
  export let effectAmplitude: number = 2;
  export let backgroundColor: number[] = [0, 0, 0, 0];

  let container: HTMLDivElement | null = null;
  let renderer: any = null;
  let frameId: number | null = null;
  let debugInfo: string = 'Initializing...';

  onMount(() => {
    console.log('🎀 Ribbons component mounted');
    debugInfo = 'Component mounted';
    
    const init = async () => {
      debugInfo = 'Loading OGL...';
      console.log('🔧 Loading OGL...');
      
      try {
        OGL = await import('ogl');
        debugInfo = 'OGL loaded';
        console.log('✅ OGL loaded successfully');
      } catch (error) {
        debugInfo = 'OGL load failed';
        console.error('❌ Failed to load OGL:', error);
        return;
      }

      if (!OGL) {
        debugInfo = 'OGL is null';
        return;
      }

      const { Renderer, Transform, Vec3, Color, Polyline } = OGL;

      if (!container) {
        debugInfo = 'Container is null';
        return;
      }

      debugInfo = 'Creating renderer...';
      console.log('🎨 Creating WebGL renderer...');

      try {
        // Initialize OGL renderer
        renderer = new Renderer({ 
          dpr: window.devicePixelRatio || 2, 
          alpha: true,
          powerPreference: 'high-performance'
        });
        const gl = renderer.gl;
        
        // Set clear color to transparent
        gl.clearColor(0, 0, 0, 0);
        
        // Make canvas highly visible for debugging
        const canvas = gl.canvas;
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '99999';
        
        // Debug styling - make canvas background semi-transparent red
        canvas.style.background = 'rgba(255, 0, 0, 0.1)';
        canvas.style.border = '2px solid #00FF00';
        
        container.appendChild(canvas);
        debugInfo = 'Canvas added to DOM';
        console.log('✅ WebGL canvas added to DOM');

        const scene = new Transform();
        const lines: Line[] = [];

        // Simple shader code
        const vertex = `
          attribute vec3 position;
          attribute vec3 next;
          attribute vec3 prev;
          attribute vec2 uv;
          attribute float side;
          
          uniform vec2 uResolution;
          uniform float uDPR;
          uniform float uThickness;
          
          void main() {
            vec4 current = vec4(position, 1.0);
            vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
            vec2 nextScreen = next.xy * aspect;
            vec2 prevScreen = prev.xy * aspect;
            vec2 tangent = normalize(nextScreen - prevScreen);
            vec2 normal = vec2(-tangent.y, tangent.x);
            normal /= aspect;
            float pixelWidthRatio = 1.0 / (uResolution.y / uDPR);
            float pixelWidth = current.w * pixelWidthRatio;
            normal *= pixelWidth * uThickness;
            current.xy -= normal * side;
            gl_Position = current;
          }
        `;

        const fragment = `
          precision highp float;
          uniform vec3 uColor;
          uniform float uOpacity;
          void main() {
            gl_FragColor = vec4(uColor, uOpacity);
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
        resize();

        // Create lines with bright colors
        const center = (colors.length - 1) / 2;
        colors.forEach((color, index) => {
          const spring = baseSpring;
          const friction = baseFriction;
          const thickness = baseThickness;
          const mouseOffset = new Vec3(
            (index - center) * offsetFactor,
            0, 0
          );

          const line: Line = {
            spring,
            friction,
            mouseVelocity: new Vec3(),
            mouseOffset,
            points: [],
            polyline: null
          };

          // Initialize points at center
          const points = [];
          for (let i = 0; i < pointCount; i++) {
            const point = new Vec3(0, 0, 0);
            points.push(point);
          }
          line.points = points;

          line.polyline = new Polyline(gl, {
            points,
            vertex,
            fragment,
            uniforms: {
              uColor: { value: new Color(color) },
              uThickness: { value: thickness },
              uOpacity: { value: 1.0 }
            }
          });
          
          if (line.polyline.mesh) {
            line.polyline.mesh.setParent(scene);
          }
          
          lines.push(line);
        });

        debugInfo = `Created ${lines.length} lines`;
        console.log('✅ Created', lines.length, 'ribbon lines');

        // Mouse tracking
        const mouse = new Vec3(0, 0, 0);
        function updateMouse(e: MouseEvent) {
          if (!container) return;
          const rect = container.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const width = container.clientWidth;
          const height = container.clientHeight;
          mouse.set((x / width) * 2 - 1, (y / height) * -2 + 1, 0);
        }

        container.addEventListener('mousemove', updateMouse);
        debugInfo = 'Mouse listeners active';

        // Animation with forced movement for testing
        const tmp = new Vec3();
        let lastTime = performance.now();
        
        function update() {
          if (!renderer) return;
          
          frameId = requestAnimationFrame(update);
          const currentTime = performance.now();

          // Force some movement for testing
          mouse.x = Math.sin(currentTime * 0.001) * 0.5;
          mouse.y = Math.cos(currentTime * 0.001) * 0.5;

          lines.forEach(line => {
            if (!line.points || !line.points.length) return;
            
            tmp.copy(mouse).add(line.mouseOffset).sub(line.points[0]).multiply(line.spring);
            line.mouseVelocity.add(tmp).multiply(line.friction);
            line.points[0].add(line.mouseVelocity);

            for (let i = 1; i < line.points.length; i++) {
              line.points[i].lerp(line.points[i - 1], 0.9);
            }
            
            if (line.polyline && line.polyline.updateGeometry) {
              line.polyline.updateGeometry();
            }
          });

          renderer.render({ scene });
        }
        
        update();
        debugInfo = 'Animation running';
        console.log('✅ Animation started - ribbons should be visible');

      } catch (error) {
        debugInfo = `Error: ${error}`;
        console.error('❌ WebGL error:', error);
      }
    };

    init();
  });

  onDestroy(() => {
    if (frameId) {
      cancelAnimationFrame(frameId);
    }
    if (renderer && container && renderer.gl?.canvas) {
      container.removeChild(renderer.gl.canvas);
    }
  });
</script>

<div bind:this={container} class="ribbons-container">
  <div class="debug-overlay">
    <div class="debug-info">Ribbons: {debugInfo}</div>
    <div class="debug-hint">Move mouse to see ribbons!</div>
  </div>
</div>

<style>
  .ribbons-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 99999;
  }
  
  .debug-overlay {
    position: fixed;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.8);
    color: #00FF00;
    padding: 10px;
    border-radius: 5px;
    font-family: monospace;
    font-size: 12px;
    pointer-events: auto;
    z-index: 100000;
  }
  
  .debug-info {
    margin-bottom: 5px;
  }
  
  .debug-hint {
    color: #FFFF00;
    font-weight: bold;
  }
</style>