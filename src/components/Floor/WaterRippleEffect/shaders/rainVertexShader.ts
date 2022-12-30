const rainVertexShader = `
precision highp float;
varying vec2 vUV;
varying vec3 vPosition;

void main(void) {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
  vPosition = modelPosition.xyz;
  vUV = uv;
}
`;

export default rainVertexShader;
