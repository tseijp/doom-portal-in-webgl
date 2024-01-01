import * as React from "react";
import * as THREE from "three";
import { useLoader, useThree } from "@react-three/fiber";

const usePrintShader = (name) => {
  const ctx = useThree((state) => {
    const { gl, scene, camera } = state;
    const ctx = state.gl.getContext();

    gl.compile(scene, camera);
    // @ts-ignore
    gl.info.programs.forEach((pg) => {
      // if (pg.name !== name) return;
      if (pg.fragmentShader)
        console.log(ctx.getShaderSource(pg.fragmentShader));
      if (pg.vertexShader)
        console.log(ctx.getShaderSource(pg.vertexShader));
    })
  });
}

const opaque_fragment = "#include <opaque_fragment>";

const fadeout_shader = /* glsl */ `
#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif

#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif

// fadeOut start
float fadeOut = length(vec2(1.0) - 0.5);
fadeOut -= 0.4;
fadeOut *= 2.0;
fadeOut = smoothstep(0.0, 1.0, fadeOut);
outgoingLight = mix(outgoingLight, vec3(0.0), fadeOut);
outgoingLight = vec3(fadeOut);
// fadeOut end

gl_FragColor = vec4( outgoingLight, diffuseColor.a );
`;

export const Environment = () => {
  const color = useLoader(
    THREE.TextureLoader,
    "/GroundForest003_COL_VAR1_3K.jpg"
  );

  color.encoding = THREE.sRGBEncoding;
  color.wrapS = color.wrapT = THREE.RepeatWrapping;
  color.repeat.set(2, 2);

  const normal = useLoader(THREE.TextureLoader, "/GroundForest003_NRM_3K.jpg");

  normal.wrapS = normal.wrapT = THREE.RepeatWrapping;
  normal.repeat.set(2, 2);

  const displacement = useLoader(
    THREE.TextureLoader,
    "/GroundForest003_DISP_3K.jpg"
  );

  displacement.wrapS = displacement.wrapT = THREE.RepeatWrapping;
  displacement.repeat.set(2, 2);

  const roughness = useLoader(
    THREE.TextureLoader,
    "/GroundForest003_ROUGH_3K.jpg"
  );

  roughness.wrapS = roughness.wrapT = THREE.RepeatWrapping;
  roughness.repeat.set(2, 2);

  usePrintShader("test");

  return (
    <mesh
      position-y={-0.95}
      rotation-x={-Math.PI * 0.5}
      name="test"
      receiveShadow
    >
      <planeGeometry args={[10, 10, 500, 500]} />
      <meshStandardMaterial
        needsUpdate
        map={color}
        noprmalMap={normal}
        normalScale-x={1}
        normalScale-y={1}
        displacementMap={roughness}
        displacementScale={0.1}
        roughnessMap={roughness}
        roughness={1}
        onBeforeCompile={(shader) => {
          shader.fragmentShader = shader.fragmentShader.replace(
            opaque_fragment,
            fadeout_shader
          );
        }}
      />
    </mesh>
  );
};

// "#define STANDARD
// #ifdef PHYSICAL
// 	#define IOR
// 	#define USE_SPECULAR
// #endif
// uniform vec3 diffuse;
// uniform vec3 emissive;
// uniform float roughness;
// uniform float metalness;
// uniform float opacity;
// #ifdef IOR
// 	uniform float ior;
// #endif
// #ifdef USE_SPECULAR
// 	uniform float specularIntensity;
// 	uniform vec3 specularColor;
// 	#ifdef USE_SPECULAR_COLORMAP
// 		uniform sampler2D specularColorMap;
// 	#endif
// 	#ifdef USE_SPECULAR_INTENSITYMAP
// 		uniform sampler2D specularIntensityMap;
// 	#endif
// #endif
// #ifdef USE_CLEARCOAT
// 	uniform float clearcoat;
// 	uniform float clearcoatRoughness;
// #endif
// #ifdef USE_IRIDESCENCE
// 	uniform float iridescence;
// 	uniform float iridescenceIOR;
// 	uniform float iridescenceThicknessMinimum;
// 	uniform float iridescenceThicknessMaximum;
// #endif
// #ifdef USE_SHEEN
// 	uniform vec3 sheenColor;
// 	uniform float sheenRoughness;
// 	#ifdef USE_SHEEN_COLORMAP
// 		uniform sampler2D sheenColorMap;
// 	#endif
// 	#ifdef USE_SHEEN_ROUGHNESSMAP
// 		uniform sampler2D sheenRoughnessMap;
// 	#endif
// #endif
// #ifdef USE_ANISOTROPY
// 	uniform vec2 anisotropyVector;
// 	#ifdef USE_ANISOTROPYMAP
// 		uniform sampler2D anisotropyMap;
// 	#endif
// #endif
// varying vec3 vViewPosition;
// #include <common>
// #include <packing>
// #include <dithering_pars_fragment>
// #include <color_pars_fragment>
// #include <uv_pars_fragment>
// #include <map_pars_fragment>
// #include <alphamap_pars_fragment>
// #include <alphatest_pars_fragment>
// #include <alphahash_pars_fragment>
// #include <aomap_pars_fragment>
// #include <lightmap_pars_fragment>
// #include <emissivemap_pars_fragment>
// #include <iridescence_fragment>
// #include <cube_uv_reflection_fragment>
// #include <envmap_common_pars_fragment>
// #include <envmap_physical_pars_fragment>
// #include <fog_pars_fragment>
// #include <lights_pars_begin>
// #include <normal_pars_fragment>
// #include <lights_physical_pars_fragment>
// #include <transmission_pars_fragment>
// #include <shadowmap_pars_fragment>
// #include <bumpmap_pars_fragment>
// #include <normalmap_pars_fragment>
// #include <clearcoat_pars_fragment>
// #include <iridescence_pars_fragment>
// #include <roughnessmap_pars_fragment>
// #include <metalnessmap_pars_fragment>
// #include <logdepthbuf_pars_fragment>
// #include <clipping_planes_pars_fragment>
// void main() {
// 	#include <clipping_planes_fragment>
// 	vec4 diffuseColor = vec4( diffuse, opacity );
// 	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
// 	vec3 totalEmissiveRadiance = emissive;
// 	#include <logdepthbuf_fragment>
// 	#include <map_fragment>
// 	#include <color_fragment>
// 	#include <alphamap_fragment>
// 	#include <alphatest_fragment>
// 	#include <alphahash_fragment>
// 	#include <roughnessmap_fragment>
// 	#include <metalnessmap_fragment>
// 	#include <normal_fragment_begin>
// 	#include <normal_fragment_maps>
// 	#include <clearcoat_normal_fragment_begin>
// 	#include <clearcoat_normal_fragment_maps>
// 	#include <emissivemap_fragment>
// 	#include <lights_physical_fragment>
// 	#include <lights_fragment_begin>
// 	#include <lights_fragment_maps>
// 	#include <lights_fragment_end>
// 	#include <aomap_fragment>
// 	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
// 	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
// 	#include <transmission_fragment>
// 	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
// 	#ifdef USE_SHEEN
// 		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
// 		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
// 	#endif
// 	#ifdef USE_CLEARCOAT
// 		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
// 		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
// 		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
// 	#endif
	
// #ifdef OPAQUE
// diffuseColor.a = 1.0;
// #endif

// #ifdef USE_TRANSMISSION
// diffuseColor.a *= material.transmissionAlpha;
// #endif

// // fadeOut start
// float fadeOut = length(vec2(2.0) - 0.5);
// fadeOut -= 0.4;
// fadeOut *= 2.0;
// fadeOut = smoothstep(0.0, 1.0, fadeOut);
// outgoingLight = mix(outgoingLight, vec3(0.0), fadeOut);
// outgoingLight = vec3(fadeOut);
// // fadeOut end

// gl_FragColor = vec4( outgoingLight, diffuseColor.a );

// 	#include <tonemapping_fragment>
// 	#include <colorspace_fragment>
// 	#include <fog_fragment>
// 	#include <premultiplied_alpha_fragment>
// 	#include <dithering_fragment>
// }"