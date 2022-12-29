export const vertexSphere = /* glsl */ `
  varying vec2 vUv;
  uniform float uPixelRatio;

  void main() {
      vUv = uv;
      gl_Position = projectionMatrix * (modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0) + vec4(position.x, position.y, 0.0, 0.0));

  }
`;

export const fragment = /* glsl */ `
varying vec2 vUv;
  void main() {
      float distanceToCenter = distance(vUv, vec2(0.5));
      float strength = 0.05 / distanceToCenter - 0.05 * 3.;

      gl_FragColor = vec4(vec3(1.0, 0., 0.), strength);
  }
`;
