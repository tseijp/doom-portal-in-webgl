import * as React from "react";
import { Portal } from "./Portal";
import { GroupProps } from "@react-three/fiber";


export const World = (props: GroupProps) => {
  return (
    <group {...props}>
      <Portal a="#130000" b="#ff000a" c="#ff661e" />
      <Portal a="#000813" b="#0078ff" c="#279fff" />
    </group>
  );
};
