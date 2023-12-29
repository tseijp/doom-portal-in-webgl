import * as React from "react";
export const Environment = () => {
  return (
    <group>
      <mesh>
        <planeGeometry args={[10, 10, 500, 500]} rotation-x={-Math.PI * 0.5} />
        <meshStandardMaterial
          color="#000000"
          normalScale-x={1}
          normalScale-y={1}
          roughness={1}
        />
      </mesh>
    </group>
  );
};
