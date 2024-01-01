import * as React from "react";
import * as THREE from "three";

export const EventHorizon = () => {
  return (
    <mesh>
      <planeGeometry args={[3, 3, 1, 1]} />
      <shaderMaterial
        transparent
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
        depthWrite={false}
        uniforms={{
          uTime: { value: 0.0 },
          uColorStatus: { value: 2 }, // @TODO FIX
          uColorEnd: { value: 1 }, // @TODO FIX
        }}
      />
    </mesh>
  );
};
