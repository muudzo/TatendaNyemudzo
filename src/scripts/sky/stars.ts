/**
 * The starfield. Each star is a point in a box in front of the camera; travel pulls the box toward
 * the reader and wraps it, so the field never runs out, and perspective does the rest.
 */
import { FLOATS_PER_STAR, SKY, createStars } from '../../lib/sky';
import { link, tokenReader, type Frame, type Layer } from './gl';

const VERTEX = /* glsl */ `
attribute vec3 aPosition;
attribute vec3 aStyle;

uniform float uTravel;
uniform float uTime;
uniform float uAngle;
uniform float uAspect;
uniform float uDpr;
uniform float uHalo;
uniform vec2 uTilt;

varying float vAlpha;
varying float vAccent;

const float DEPTH = ${SKY.depth.toFixed(1)};
const float NEAR = 0.05;
const float SPREAD = 3.0;

void main() {
  float z = mod(aPosition.z * DEPTH - uTravel, DEPTH) + NEAR;

  float c = cos(uAngle);
  float s = sin(uAngle);
  vec2 world = mat2(c, s, -s, c) * aPosition.xy * SPREAD * max(uAspect, 1.0);
  vec2 projected = (world - uTilt) / z;
  gl_Position = vec4(projected.x / uAspect, projected.y, 0.0, 1.0);

  // By day, accent stars are drawn larger to make room for their lime ring.
  float size = aStyle.x * mix(1.0, 2.6, aStyle.y * uHalo);
  gl_PointSize = size * clamp(1.6 / z, 0.6, 3.2) * uDpr;

  float fade = (1.0 - smoothstep(DEPTH * 0.7, DEPTH, z)) * smoothstep(NEAR, 0.4, z);
  float twinkle = 0.7 + 0.3 * sin(uTime * (0.6 + aStyle.z) + aStyle.z * 6.2832);
  vAlpha = fade * twinkle;
  vAccent = aStyle.y;
}
`;

/**
 * At night (glow = 1) stars are soft, additive light. By day (glow = 0) they are printed dots, as in
 * a star atlas, and the accent stars become a lime ring round a cobalt core.
 */
const FRAGMENT = /* glsl */ `
precision mediump float;

uniform vec3 uStar;
uniform vec3 uAccent;
uniform vec3 uCore;
uniform float uGlow;
uniform float uStrength;

varying float vAlpha;
varying float vAccent;

void main() {
  float d = length(gl_PointCoord * 2.0 - 1.0);
  if (d > 1.0) discard;

  float soft = exp(-d * d * 4.0);
  float printed = 1.0 - smoothstep(0.6, 0.9, d);
  float shape = mix(printed, soft, uGlow);

  vec3 colour = mix(uStar, uAccent, vAccent);
  float core = (1.0 - smoothstep(0.3, 0.42, d)) * vAccent * (1.0 - uGlow);
  colour = mix(colour, uCore, core);

  float alpha = shape * vAlpha * uStrength;
  gl_FragColor = vec4(colour * alpha, alpha);
}
`;

const SEED = 7;
/** The field turns very slowly, in radians per second. */
const SPIN = 0.005;
const BYTES = Float32Array.BYTES_PER_ELEMENT;

export function starLayer(gl: WebGLRenderingContext, count: number): Layer | null {
  const program = link(gl, VERTEX, FRAGMENT, ['aPosition', 'aStyle']);
  if (!program) return null;
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, createStars(count, SEED), gl.STATIC_DRAW);
  const uniform = (name: string) => gl.getUniformLocation(program, name);
  let additive = false;

  return {
    paint() {
      const tokens = tokenReader();
      const glow = tokens.number('--sky-glow', 0);
      additive = glow > 0;
      gl.useProgram(program);
      gl.uniform3fv(uniform('uStar'), tokens.colour('--sky-star'));
      gl.uniform3fv(uniform('uAccent'), tokens.colour('--sky-accent'));
      gl.uniform3fv(uniform('uCore'), tokens.colour('--sky-core'));
      gl.uniform1f(uniform('uGlow'), glow);
      gl.uniform1f(uniform('uHalo'), 1 - glow);
      gl.uniform1f(uniform('uStrength'), tokens.number('--sky-strength', 1));
    },

    draw(frame: Frame) {
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      const stride = FLOATS_PER_STAR * BYTES;
      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 3, gl.FLOAT, false, stride, 0);
      gl.enableVertexAttribArray(1);
      gl.vertexAttribPointer(1, 3, gl.FLOAT, false, stride, 3 * BYTES);
      // Light adds up at night; by day, dots are printed over the paper.
      gl.blendFunc(gl.ONE, additive ? gl.ONE : gl.ONE_MINUS_SRC_ALPHA);

      gl.uniform1f(uniform('uTravel'), frame.travel % SKY.depth);
      gl.uniform1f(uniform('uTime'), frame.seconds);
      gl.uniform1f(uniform('uAngle'), frame.seconds * SPIN);
      gl.uniform1f(uniform('uAspect'), frame.width / frame.height);
      gl.uniform1f(uniform('uDpr'), frame.dpr);
      gl.uniform2f(uniform('uTilt'), frame.tilt.x, frame.tilt.y);
      gl.drawArrays(gl.POINTS, 0, count);
    },
  };
}
