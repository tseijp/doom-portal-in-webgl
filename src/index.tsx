import * as React from "react";
import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { Model } from "./Experience/Model";
import { OrbitControls } from "@react-three/drei";
import "./style.css";

createRoot(document.getElementById("root")!).render(
  <Canvas style={{ position: "fixed" }}>
    <color attach="background" args={["#000"]} />
    <React.Suspense>
      <Model scale={0.03} position-y={-1}/>
    </React.Suspense>
    <OrbitControls screenSpacePanning zoomSpeed={0.25} enableDamping />
    <ambientLight />
  </Canvas>
);
