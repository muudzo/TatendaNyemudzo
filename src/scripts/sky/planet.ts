/**
 * The planet beside the statement: a globe drawn like one of the site's diagrams (lines of latitude
 * and longitude), turning slowly under a tilted ring. It is a single quad; the sphere, its lighting
 * and the ring are all worked out per pixel, so there is no mesh to download.
 */
import { planetAt, planetLayout } from '../../lib/sky';
import { link, tokenReader, type Frame, type Layer } from './gl';

const VERTEX = /* glsl */ `
attribute vec2 aCorner;

uniform vec2 uCentre;
uniform float uRadius;
uniform vec2 uViewport;

varying vec2 vLocal;

// The quad reaches past the globe to hold the ring and the glow.
const float EXTENT = 1.9;

void main() {
  vLocal = aCorner * EXTENT;
  vec2 pixel = uCentre + vec2(aCorner.x, -aCorner.y) * uRadius * EXTENT;
  vec2 clip = pixel / uViewport * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
}
`;

const FRAGMENT = /* glsl */ `
precision mediump float;

uniform float uSpin;
uniform float uPixel;
uniform float uGlow;
uniform float uStrength;
uniform vec3 uBody;
uniform vec3 uShade;
uniform vec3 uLine;
uniform vec3 uRing;
uniform vec3 uRim;

varying vec2 vLocal;

const float PI = 3.14159265;
const vec3 LIGHT = vec3(-0.5, 0.6, 0.62);
// The ring (and the equator) lean this far clockwise, and the pole tips this far toward us.
const float LEAN = -0.32;
const float TIP = 0.27;
const float LAT_STEP = PI / 9.0;
const float LON_STEP = PI / 8.0;

vec4 over(vec4 top, vec4 bottom) {
  return top + bottom * (1.0 - top.a);
}

float band(float value, float inner, float outer) {
  float aa = uPixel * 1.5;
  return smoothstep(inner - aa, inner + aa, value) * (1.0 - smoothstep(outer - aa, outer + aa, value));
}

/** One half of the ring: the half behind the globe, or the half in front of it. */
vec4 ring(vec2 q, bool front) {
  vec2 r = mat2(cos(LEAN), sin(LEAN), -sin(LEAN), cos(LEAN)) * q;
  if (front != (r.y < 0.0)) return vec4(0.0);
  float e = length(vec2(r.x, r.y / sin(TIP)));
  float edge = band(e, 1.58, 1.61);
  float amount = band(e, 1.3, 1.52) * 0.9 + edge * 0.75;
  vec3 colour = mix(uRing, uLine, edge);
  return vec4(colour * amount, amount);
}

float gridLine(float angle, float spacing, float squeeze) {
  float f = fract(angle / spacing);
  float gap = min(f, 1.0 - f) * spacing * squeeze;
  return 1.0 - smoothstep(0.0, uPixel * 1.4, gap);
}

vec4 globe(vec2 q) {
  float r = length(q);
  float z = sqrt(max(1.0 - r * r, 0.0));
  vec3 n = vec3(mat2(cos(LEAN), sin(LEAN), -sin(LEAN), cos(LEAN)) * q, z);

  vec3 pole = vec3(0.0, cos(TIP), sin(TIP));
  vec3 across = vec3(0.0, sin(TIP), -cos(TIP));
  float lat = asin(clamp(dot(n, pole), -1.0, 1.0));
  float lon = atan(dot(n, across), n.x) + uSpin;
  // Meridians stop short of the poles, where they would bunch into a smudge.
  float meridians = gridLine(lon, LON_STEP, cos(lat)) * (1.0 - smoothstep(1.1, 1.3, abs(lat)));
  float lines = max(gridLine(lat, LAT_STEP, 1.0), meridians);

  float lit = max(dot(vec3(q, z), normalize(LIGHT)), 0.0);
  vec3 colour = mix(uShade, uBody, smoothstep(0.0, 0.9, lit));
  colour = mix(colour, uLine, lines * mix(0.16, 0.95, lit));

  float facing = smoothstep(-0.3, 0.8, dot(q / max(r, 0.001), normalize(LIGHT.xy)));
  colour = mix(colour, uRim, pow(1.0 - z, 2.5) * facing * 0.85);

  float inside = 1.0 - smoothstep(1.0 - uPixel, 1.0 + uPixel, r);
  vec4 body = vec4(colour * inside, inside);

  // At night the lit edge glows into the dark.
  float halo = uGlow * facing * exp(-(r - 1.0) * 9.0) * 0.5 * step(1.0, r);
  return over(body, vec4(uRim * halo, halo * 0.6));
}

void main() {
  vec4 colour = ring(vLocal, false);
  colour = over(globe(vLocal), colour);
  colour = over(ring(vLocal, true), colour);
  gl_FragColor = colour * uStrength;
}
`;

/** Radians per second it turns, and per pixel of scroll. */
const TURN = 0.12;
const SCROLL_TURN = 0.0015;
/** How far, in CSS pixels, it shifts when the camera leans toward the pointer. */
const LEAN_SHIFT = 40;
/** Where it rests when motion is reduced. */
const STILL_SPIN = 0.7;

/** Find the box the page set aside for the planet, in document coordinates. */
function measure(anchor: Element, scrollY: number) {
  const box = anchor.getBoundingClientRect();
  return planetLayout({ left: box.left, top: box.top + scrollY, width: box.width, height: box.height });
}

/**
 * The page decides where the planet goes by placing an empty [data-planet] box; CSS lays it out at
 * each breakpoint and the planet fills it. With reduced motion it scrolls with the page, like print.
 */
export function planetLayer(gl: WebGLRenderingContext, anchor: Element, still: () => boolean): Layer | null {
  const program = link(gl, VERTEX, FRAGMENT, ['aCorner']);
  if (!program) return null;
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const uniform = (name: string) => gl.getUniformLocation(program, name);

  return {
    paint() {
      const tokens = tokenReader();
      gl.useProgram(program);
      gl.uniform3fv(uniform('uBody'), tokens.colour('--planet-body'));
      gl.uniform3fv(uniform('uShade'), tokens.colour('--planet-shade'));
      gl.uniform3fv(uniform('uLine'), tokens.colour('--planet-line'));
      gl.uniform3fv(uniform('uRing'), tokens.colour('--planet-ring'));
      gl.uniform3fv(uniform('uRim'), tokens.colour('--planet-rim'));
      gl.uniform1f(uniform('uGlow'), tokens.number('--sky-glow', 0));
    },

    draw(frame: Frame) {
      const layout = measure(anchor, frame.scrollY);
      const planet = still()
        ? { ...layout, y: layout.y - frame.scrollY }
        : planetAt(layout, frame.scrollY, frame.height);
      if (planet.strength <= 0 || planet.y + planet.radius * 2 < 0) return;

      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      gl.disableVertexAttribArray(1);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

      const spin = still() ? STILL_SPIN : frame.seconds * TURN + frame.scrollY * SCROLL_TURN;
      gl.uniform2f(
        uniform('uCentre'),
        planet.x - frame.tilt.x * LEAN_SHIFT,
        planet.y + frame.tilt.y * LEAN_SHIFT,
      );
      gl.uniform1f(uniform('uRadius'), planet.radius);
      gl.uniform2f(uniform('uViewport'), frame.width, frame.height);
      gl.uniform1f(uniform('uPixel'), 1 / planet.radius);
      gl.uniform1f(uniform('uSpin'), spin);
      gl.uniform1f(uniform('uStrength'), planet.strength);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    },
  };
}
