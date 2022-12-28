export const vertex =
  /* glsl */
  ` #define PI 3.14159265359
      #include "lygia/generative/pnoise.glsl"
      varying vec2 vUv;
      uniform float uDataArr;
      uniform float uTime;
      uniform float uPixelRatio;
      uniform float uWaveHeight;

      vec3 fromSpherical(float radius, float phi, float theta){
        float sinPhiRadius = sin( phi ) * radius;
  
        float x = sinPhiRadius * sin( theta  );
        float y = cos( phi ) * radius;
        float z = sinPhiRadius * cos( theta );
  
        return vec3(x, y, z);
      }

      void main() {
        float frequency = smoothstep(0., 1.0, uDataArr / 10000.);
        float noise = pnoise(vec2(position.x, position.y * 3.)  + uTime, vec2(0.0, 0.0));
        float phi = (1. - uv.y) * PI;
        float theta = uv.x * PI * 0.15 + PI + 1.;
        vec3 pos = vec3(position);
        float r = 1.;
        vec3 transform = mix(pos, fromSpherical(r, phi, theta), vec3(1.0, 1.0, -0.5));

        transform.x *= noise * frequency * uWaveHeight;
        vec4 viewPosition = viewMatrix * modelMatrix * vec4(pos, 1.0);
        vUv = uv;
  
        gl_Position = projectionMatrix * modelViewMatrix * vec4(transform, 1.0);
        gl_PointSize = 100.0 * uPixelRatio;
        gl_PointSize *= (1.0 / - viewPosition.z);
      }`;

export const fragment = `
varying vec3 vNormal;
uniform float uDataArr;
varying vec2 vUv;
uniform vec3 uColor;

void main() {
  float opacity = smoothstep(0., 1.0, uDataArr / 10000.);
  float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
float strength = 0.01 / distanceToCenter - 0.01 * 6.5;
gl_FragColor = vec4(vec3(uColor), strength * opacity);
}
`;
