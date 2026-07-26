import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";

function Plane({ planeRef, scrollProgress,planeSound }) {
    const { scene } = useGLTF("/plane.glb");
    const localRef = useRef(null);
    const model = useMemo(() => scene.clone(), [scene]);
    const hasStarted = useRef(false);

    const setRefs = (node) => {
        localRef.current = node;
        if (planeRef) {
            planeRef.current = node;
        }
    };

    useFrame((state) => {
        if (!localRef.current) {
            return;
        }

        const progress = scrollProgress?.current ?? 0;
        if (progress > 0.01 && progress < 0.78) {
    if (!hasStarted.current) {
        hasStarted.current = true;
        planeSound.current.play().catch((error) => {
            console.error('Error playing plane sound:', error);
        });
    }
} else {
    if (hasStarted.current) {
        planeSound.current.pause();
        planeSound.current.currentTime = 0;
        hasStarted.current = false;
    }
}

        const flightProgress = Math.min(progress * 3, 1);
        const exitProgress = Math.max((progress - 0.78) / 0.22, 0);
        const x = -18 + flightProgress * 50 + exitProgress * 47;
        const volume=Math.max(0.15,1-Math.abs(x)/20);
        planeSound.current.volume=volume;
        planeSound.current.playbackRate=0.9+ flightProgress*0.4;
        const yFloat = Math.sin(state.clock.elapsedTime * 1.25) * 0.09;
        const zFloat = Math.cos(state.clock.elapsedTime * 0.9) * 0.12;

        localRef.current.position.set(x, 0.72 + yFloat, -1.45 + zFloat + flightProgress * 0.45);
        localRef.current.rotation.set(0.03, Math.PI / 2, Math.sin(state.clock.elapsedTime * 0.7) * 0.012);
    });

    return (
        <group ref={setRefs} scale={[1.0, 1.0, 1.0]}>
            <primitive object={model} position={[0, -0.35, 0]} />
        </group>
    );
}

useGLTF.preload("/plane.glb");

export default Plane;