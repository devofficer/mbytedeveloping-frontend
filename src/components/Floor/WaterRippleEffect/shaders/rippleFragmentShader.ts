const rippleFragmentShader = `
uniform samplerCube uEnvironmentTexture;
uniform float uTime;
uniform vec3 uEyePosition;
uniform float uNoise;

varying vec2 vUV;
varying vec3 vPosition;

vec3 hash3(vec2 p) {
  vec3 q = vec3(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)), dot(p, vec2(419.2, 371.9)));
  return fract(sin(q) * 43758.5453);
}

float noise(in vec2 x) {
  vec2 p = floor(x);
  vec2 f = fract(x);

  float va = 0.0;
  for(int j = -2; j <= 3; j++) {
    for(int i = -2; i <= 2; i++) {
      vec2 g = vec2(float(i), float(j));
      vec3 o = hash3(p + g);
      vec2 r = g - f + o.xy;
      float d = sqrt(dot(r, r));
      float ripple = max(
        mix(
          smoothstep(
            0.99, 
            0.999, 
            max(cos(d - uTime * 22. + (o.x + o.y) * 5.0), 0.)
          ), 
          0., 
          d
        ), 
        0.
      );
      va += ripple;
    }
  }
  return va;
}

void main(void) {
  vec3 rayDir = normalize(vPosition - uEyePosition);

  float f = noise(uNoise * vUV);
  vec3 normal = normalize(vec3(dFdx(f), 0.0, dFdy(f)) + 0.2);
  normal = normalize(normal * 0.9 + rayDir);
  vec4 ref = texture(uEnvironmentTexture, reflect(normal, rayDir));
  gl_FragColor = vec4(ref.xyz, 0.35 - sin(sqrt(dot(vUV - 0.5, vUV - 0.5)) * 1.25));
}
`;

export default rippleFragmentShader;
