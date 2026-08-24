// this is code injected into the three.js standard material at #include <begin_vertex>
// this file should modify a transformed vec3 created by <begin_vertex>

#include <begin_vertex>
//#include "../includes/noise.glsl"

transformed += min(abs(perlinClassic3D(transformed + uTime * 0.5)), 0.7) * normal * 0.05;
