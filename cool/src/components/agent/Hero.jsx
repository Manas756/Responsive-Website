import { Sky } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Suspense, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import Plane from "./Plane";
import Clouds from "./Clouds";

gsap.registerPlugin(ScrollTrigger);

function CameraRig({ planeRef, scrollProgress }) {
  const lookAtTarget = useMemo(() => new THREE.Vector3(), []);
  const desiredPosition = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const progress = scrollProgress.current;
    const planeX = planeRef.current?.position.x ?? -12;
    const planeY = planeRef.current?.position.y ?? 0;

    desiredPosition.set(
      planeX * 0.2,
      1.8 + planeY * 0.18,
      9.2 - progress * 1.4,
    );
    lookAtTarget.set(planeX + 1.9, 1 + planeY * 0.1, -6 - progress * 2.2);

    const damping = 1 - Math.exp(-delta * 2.6);
    state.camera.position.lerp(desiredPosition, damping);
    state.camera.lookAt(lookAtTarget);
  });

  return null;
}

export default function Hero() {
  const heroRef = useRef(null);
  const planeRef = useRef(null);
  const cloudsRef = useRef(null);
  const scrollProgress = useRef(0);

  useLayoutEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 2.6,
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section ref={heroRef} className="relative h-[500vh] w-full bg-sky-100">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <Canvas
          shadows
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: false }}
          camera={{ position: [0, 1.8, 9.2], fov: 42, near: 0.1, far: 260 }}
        >
          <color attach="background" args={["#b9ddff"]} />
          <fog attach="fog" args={["#b9ddff", 25, 120]} />

          <ambientLight intensity={0.78} color="#f4f8ff" />
          <hemisphereLight intensity={0.62} skyColor="#d8ecff" groundColor="#9aa7bf" />
          <directionalLight
            castShadow
            position={[12, 14, 9]}
            intensity={1.6}
            color="#fff7e8"
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />

          <Sky
            distance={450000}
            sunPosition={[10, 9, 3]}
            inclination={0.54}
            azimuth={0.18}
            turbidity={8}
            rayleigh={1.4}
          />

          <Suspense fallback={null}>
            <Clouds cloudsRef={cloudsRef} scrollProgress={scrollProgress} />
            <Plane planeRef={planeRef} scrollProgress={scrollProgress} />
          </Suspense>

          <CameraRig planeRef={planeRef} scrollProgress={scrollProgress} />
        </Canvas>
      </div>
    </section>
  );
}