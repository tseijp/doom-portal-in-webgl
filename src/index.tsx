import * as React from "react";
import * as THREE from "three";
import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { Model } from "./Experience/Model";
import { OrbitControls } from "@react-three/drei";
import { Portal } from "./Experience/Portal/Portal";
import { Environment } from "./Experience/Environment";

import { Renderer } from "./Experience/Renderer";
import "./style.css";

createRoot(document.getElementById("root")!).render(
  <Canvas style={{ position: "fixed" }}>
    <color attach="background" args={["#000"]} />
    {/* <pointLight intensity={2}/> */}
    <React.Suspense>
      <Model
        scale={0.017}
        position-y={-0.93}
        rotation-y={-2.595}
        traverse={(child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        }}
      />
    </React.Suspense>
    <OrbitControls screenSpacePanning zoomSpeed={0.25} enableDamping />
    <ambientLight />
    <Portal a="#130000" b="#ff000a" c="#ff661e" />
    <Portal a="#000813" b="#0078ff" c="#279fff" />
    <React.Suspense>
      <Environment />
    </React.Suspense>
    {/* <Renderer /> */}
  </Canvas>
);
