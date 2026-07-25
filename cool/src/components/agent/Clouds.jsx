import { Clone, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";

const CLOUD_COUNT = 52;

function pseudoRandom(index) {
  const x = Math.sin(index * 127.1) * 43758.5453123;
  return x - Math.floor(x);
}

function Clouds({ cloudsRef, scrollProgress }) {
  const { scene } = useGLTF("/cloud.glb");
  const localRef = useRef(null);

  const transforms = useMemo(() => {
    return Array.from({ length: CLOUD_COUNT }, (_, index) => {
      const rx = pseudoRandom(index + 1);
      const ry = pseudoRandom(index + 7);
      const rz = pseudoRandom(index + 17);
      const depthMix = pseudoRandom(index + 29);

      const z = -10 - depthMix * 130;
      const depthScale = 1 + (1 - depthMix) * 2.6;

      return {
        position: [
          -85 + rx * 170,
          -4 + ry * 20,
          z,
        ],
        scale: [
          1.1 * depthScale + rz * 1.4,
          0.95 * depthScale + ry * 1.2,
          1.2 * depthScale,
        ],
        rotation: [
          (ry - 0.5) * 0.18,
          rx * Math.PI * 2,
          (rz - 0.5) * 0.18,
        ],
      };
    });
  }, []);

  const setRefs = (node) => {
    localRef.current = node;
    if (cloudsRef) {
      cloudsRef.current = node;
    }
  };

  useFrame((state) => {
    if (!localRef.current) {
      return;
    }

    const progress = scrollProgress?.current ?? 0;
    const drift = Math.sin(state.clock.elapsedTime * 0.12) * 0.9;

    localRef.current.position.x = -progress * 20 + drift;
    localRef.current.position.z = progress * 8;
  });

  return (
    <group ref={setRefs}>
      {transforms.map((transform, index) => (
        <group
          key={`cloud-${index}`}
          position={transform.position}
          rotation={transform.rotation}
          scale={transform.scale}
        >
          <Clone object={scene} />
        </group>
      ))}
    </group>
  );
}

useGLTF.preload("/cloud.glb");

export default Clouds;