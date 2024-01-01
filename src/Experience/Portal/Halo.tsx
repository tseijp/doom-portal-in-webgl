import * as React from "react";
import * as THREE from "three";

import vertexShader from "../shaders/portalHalo/vertex.glsl";
import fragmentShader from "../shaders/portalHalo/fragment.glsl";

export const Halo = () => {
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      {/* @ts-ignore */}
      <meshShaderMaterial
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
        depthWrite={false}
        uniforms={{
          uTime: { value: 0 },
          uColorA: { value: this.colors.a.instance },
          uColorB: { value: this.colors.b.instance },
          uColorC: { value: this.colors.c.instance },
        }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
};
