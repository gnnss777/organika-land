uniform vec3 uColor;
uniform float uTime;

varying float vAlpha;
varying float vScale;

void main() {
  // Circular particle
  vec2 uv = gl_PointCoord - 0.5;
  float dist = length(uv);
  
  // Soft circle with glow
  float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
  alpha *= vAlpha;
  
  // Discard transparent pixels
  if (alpha < 0.01) discard;
  
  // Color with slight variation
  vec3 color = uColor;
  color += 0.1 * vScale;
  
  gl_FragColor = vec4(color, alpha * 0.85);
}