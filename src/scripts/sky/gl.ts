/** Small WebGL helpers shared by the layers of the sky. */

export type Rgb = [number, number, number];

/** What every layer needs to draw one frame. Sizes are in CSS pixels. */
export interface Frame {
  readonly seconds: number;
  readonly travel: number;
  readonly tilt: { readonly x: number; readonly y: number };
  readonly scrollY: number;
  readonly width: number;
  readonly height: number;
  readonly dpr: number;
}

export interface Layer {
  /** Re-read the layer's colours from the CSS tokens (on load and whenever the theme changes). */
  paint(): void;
  draw(frame: Frame): void;
}

function compile(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
}

/** Build a program, pinning attributes to fixed slots in order so layers can share them. */
export function link(
  gl: WebGLRenderingContext,
  vertexSource: string,
  fragmentSource: string,
  attributes: readonly string[],
): WebGLProgram | null {
  const vertex = compile(gl, gl.VERTEX_SHADER, vertexSource);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, fragmentSource);
  const program = gl.createProgram();
  if (!vertex || !fragment || !program) return null;
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  attributes.forEach((name, slot) => gl.bindAttribLocation(program, slot, name));
  gl.linkProgram(program);
  return gl.getProgramParameter(program, gl.LINK_STATUS) ? program : null;
}

/** Resolve colour tokens (oklch, var() chains) to 8-bit sRGB through a 1px 2D canvas. */
export function tokenReader(): { colour(token: string): Rgb; number(token: string, fallback: number): number } {
  const style = getComputedStyle(document.documentElement);
  const probe = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  return {
    colour(token) {
      if (!probe) return [1, 1, 1];
      probe.fillStyle = '#fff';
      probe.fillStyle = style.getPropertyValue(token).trim();
      probe.fillRect(0, 0, 1, 1);
      const [r, g, b] = probe.getImageData(0, 0, 1, 1).data;
      return [r / 255, g / 255, b / 255];
    },
    number(token, fallback) {
      const value = Number.parseFloat(style.getPropertyValue(token));
      return Number.isFinite(value) ? value : fallback;
    },
  };
}
