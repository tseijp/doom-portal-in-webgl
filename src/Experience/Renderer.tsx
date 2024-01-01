      {/* @ts-ignore */}
import * as React from "react";
import { extend } from "@react-three/fiber";
import { Effects } from "@react-three/drei";
import { RenderPass, UnrealBloomPass } from "three-stdlib";

extend({ RenderPass, UnrealBloomPass });

export const Renderer = () => {
  return (
    <Effects>
      {/* @ts-ignore */}
      {/* <renderPass /> */}
      {/* @ts-ignore */}
      <unrealBloomPass />
    </Effects>
  );
};
