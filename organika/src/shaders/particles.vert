uniform float uTime;
uniform float uSize;
uniform vec2 uMouse;
uniform float uMouseSpeed;

attribute vec3 aRandom;
attribute float aScale;

varying float vAlpha;
varying float vScale;

void main() {
  vec3 pos = position;
  
  // Orbit animation
  float angle = uTime * (0.2 + aRandom.x * 0.5) + aRandom.y * 6.28;
  float radius = 2.0 + aRandom.z * 4.0;
  
  // Particle movement
  float t = uTime * 0.3;
  pos.x += sin(t + aRandom.x * 10.0) * 0.5;
  pos.y += cos(t * 0.7 + aRandom.y * 10.0) * 0.5;
  pos.z += sin(t * 0.5 + aRandom.z * 10.0) * 0.3;
  
  // Mouse repulsion
  vec2 mousePos = uMouse * 5.0;
  float mouseDist = distance(pos.xy, mousePos);
  float mouseInfluence = smoothstep(2.0, 0.0, mouseDist) * uMouseSpeed;
  pos.xy += normalize(pos.xy - mousePos) * mouseInfluence * 0.5;
  
  // Scale based on mouse proximity
  float scale = aScale * (1.0 + mouseInfluence * 0.5);
  
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  
  // Size attenuation
  gl_PointSize = uSize * scale * (300.0 / -mvPosition.z);
  
  // Pass to fragment
  vAlpha = 0.6 + mouseInfluence * 0.4;
  vScale = scale;
}