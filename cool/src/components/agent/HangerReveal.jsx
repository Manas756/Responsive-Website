import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const HangarReveal = () => {
  const containerRef = useRef(null);
  const modelRef = useRef(null);
  const animationFrameRef = useRef(null);

  // ==========================================
  // TARGET ROTATION
  // Full 360° X + Y rotation
  // ==========================================

  const targetRotationRef = useRef({
    x: -0.08,
    y: Math.PI * 0.25,
  });

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    // ==========================================
    // SCENE
    // ==========================================

    const scene = new THREE.Scene();

    scene.background = new THREE.Color(0xe5e5e5);

    // ==========================================
    // CAMERA
    // ==========================================

    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(
      35,
      width / height,
      0.1,
      1000
    );

    camera.position.set(0, 0, 10);

    camera.lookAt(0, 0, 0);

    // ==========================================
    // RENDERER
    // ==========================================

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
    });

    renderer.setSize(width, height);

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 2)
    );

    renderer.outputColorSpace =
      THREE.SRGBColorSpace;

    renderer.shadowMap.enabled = true;

    renderer.shadowMap.type =
      THREE.PCFSoftShadowMap;

    renderer.domElement.style.position =
      "absolute";

    renderer.domElement.style.left = "0";

    renderer.domElement.style.top = "0";

    renderer.domElement.style.width = "100%";

    renderer.domElement.style.height = "100%";

    renderer.domElement.style.display = "block";

    renderer.domElement.style.zIndex = "1";

    container.appendChild(renderer.domElement);

    // ==========================================
    // LIGHTING
    // ==========================================

    const ambientLight =
      new THREE.AmbientLight(
        0xffffff,
        1.7
      );

    scene.add(ambientLight);

    const keyLight =
      new THREE.DirectionalLight(
        0xffffff,
        2.2
      );

    keyLight.position.set(
      5,
      8,
      10
    );

    keyLight.castShadow = true;

    scene.add(keyLight);

    const fillLight =
      new THREE.DirectionalLight(
        0xffffff,
        1
      );

    fillLight.position.set(
      -5,
      4,
      6
    );

    scene.add(fillLight);

    const rimLight =
      new THREE.DirectionalLight(
        0xffffff,
        0.7
      );

    rimLight.position.set(
      0,
      5,
      -8
    );

    scene.add(rimLight);

    // ==========================================
    // AIRCRAFT GROUP
    // ==========================================

    const planeGroup =
      new THREE.Group();

    scene.add(planeGroup);

    modelRef.current = planeGroup;

    // ==========================================
    // LOAD MODEL
    // ==========================================

    const loader = new GLTFLoader();

    loader.load(
      "/plane.glb",

      (gltf) => {
        console.log(
          "✈️ Plane loaded successfully"
        );

        const model = gltf.scene;

        // ======================================
        // MAKE EVERYTHING VISIBLE
        // ======================================

        model.traverse((child) => {
          if (!child.isMesh) return;

          child.visible = true;

          child.castShadow = true;

          child.receiveShadow = true;

          if (child.material) {
            child.material.needsUpdate = true;
          }
        });

        // ======================================
        // RESET TRANSFORM
        // ======================================

        model.position.set(0, 0, 0);

        model.rotation.set(0, 0, 0);

        model.scale.set(1, 1, 1);

        // ======================================
        // ORIGINAL BOUNDING BOX
        // ======================================

        const box =
          new THREE.Box3().setFromObject(model);

        const size =
          box.getSize(
            new THREE.Vector3()
          );

        const originalCenter =
          box.getCenter(
            new THREE.Vector3()
          );

        console.log(
          "Original size:",
          size
        );

        console.log(
          "Original center:",
          originalCenter
        );

        const maxDimension =
          Math.max(
            size.x,
            size.y,
            size.z
          );

        if (
          !Number.isFinite(maxDimension) ||
          maxDimension <= 0
        ) {
          console.error(
            "Invalid GLB dimensions"
          );

          return;
        }

        // ======================================
        // SCALE
        // ======================================

        /*
         * Do NOT use 15/maxDim.
         *
         * That was making the aircraft
         * much too large for the camera.
         */

        const TARGET_SIZE = 7;

        const scale =
          TARGET_SIZE /
          maxDimension;

        model.scale.setScalar(scale);

        // ======================================
        // CENTER AFTER SCALING
        // ======================================

        const scaledBox =
          new THREE.Box3().setFromObject(
            model
          );

        const scaledCenter =
          scaledBox.getCenter(
            new THREE.Vector3()
          );

        model.position.sub(
          scaledCenter
        );

        // ======================================
        // ADD MODEL
        // ======================================

        planeGroup.add(model);

        // ======================================
        // POSITION
        // ======================================

        planeGroup.position.set(
          0,
          2,
          0
        );

        // ======================================
        // INITIAL ROTATION
        // ======================================

        planeGroup.rotation.set(
          -0.08,
          Math.PI * 0.25,
          0
        );

        // Keep target synchronized
        targetRotationRef.current.x =
          -0.08;

        targetRotationRef.current.y =
          Math.PI * 0.25;

        // ======================================
        // AUTOMATIC CAMERA FRAMING
        // ======================================

        const finalBox =
          new THREE.Box3().setFromObject(
            model
          );

        const sphere =
          finalBox.getBoundingSphere(
            new THREE.Sphere()
          );

        const radius = sphere.radius;

        const verticalFov =
          THREE.MathUtils.degToRad(
            camera.fov
          );

        /*
         * Distance required to fit
         * the entire model vertically.
         */

        let cameraDistance =
          radius /
          Math.tan(
            verticalFov / 2
          );

        // Add breathing room
        cameraDistance *= 0.95;

        // Never allow camera to get too close
        cameraDistance = Math.max(
          cameraDistance,
          8
        );

        camera.position.set(
          0,
          0,
          cameraDistance
        );

        camera.lookAt(
          0,
          0,
          0
        );

        console.log(
          "Model radius:",
          radius
        );

        console.log(
          "Camera distance:",
          cameraDistance
        );

        console.log(
          "Plane ready"
        );
      },

      // ======================================
      // LOADING
      // ======================================

      (progress) => {
        if (progress.total) {
          const percent =
            (progress.loaded /
              progress.total) *
            100;

          console.log(
            `Loading plane: ${percent.toFixed(
              0
            )}%`
          );
        }
      },

      // ======================================
      // ERROR
      // ======================================

      (error) => {
        console.error(
          "❌ Failed to load plane.glb",
          error
        );

        console.error(
          "Make sure plane.glb is inside /public"
        );
      }
    );

    // ==========================================
    // MOUSE
    // ==========================================

    const handleMouseMove = (event) => {
      const rect =
        container.getBoundingClientRect();

      if (
        rect.width === 0 ||
        rect.height === 0
      ) {
        return;
      }

      // ======================================
      // NORMALIZED MOUSE
      // ======================================

      const mouseX =
        (event.clientX -
          rect.left) /
        rect.width;

      const mouseY =
        (event.clientY -
          rect.top) /
        rect.height;

      // ======================================
      // FULL 360° HORIZONTAL
      // ======================================

      targetRotationRef.current.y =
        (mouseX - 0.5) *
        Math.PI *
        2;

      // ======================================
      // FULL 360° VERTICAL
      // ======================================

      targetRotationRef.current.x =
        (mouseY - 0.5) *
        Math.PI *
        2;
    };

    // ==========================================
    // MOUSE LEAVE
    // ==========================================

    const handleMouseLeave = () => {
      targetRotationRef.current.x =
        -0.08;

      targetRotationRef.current.y =
        Math.PI * 0.25;
    };

    container.addEventListener(
      "mousemove",
      handleMouseMove
    );

    container.addEventListener(
      "mouseleave",
      handleMouseLeave
    );

    // ==========================================
    // SMOOTH ANGLE INTERPOLATION
    // ==========================================

    const lerpAngle = (
      current,
      target,
      amount
    ) => {
      let difference =
        target - current;

      // Keep difference between -PI and PI
      difference =
        THREE.MathUtils.euclideanModulo(
          difference + Math.PI,
          Math.PI * 2
        ) - Math.PI;

      return (
        current +
        difference * amount
      );
    };

    // ==========================================
    // ANIMATION LOOP
    // ==========================================

    const animate = () => {
      animationFrameRef.current =
        requestAnimationFrame(
          animate
        );

      if (modelRef.current) {
        const plane =
          modelRef.current;

        // ====================================
        // SMOOTH 360° X ROTATION
        // ====================================

        plane.rotation.x =
          lerpAngle(
            plane.rotation.x,
            targetRotationRef.current.x,
            0.08
          );

        // ====================================
        // SMOOTH 360° Y ROTATION
        // ====================================

        plane.rotation.y =
          lerpAngle(
            plane.rotation.y,
            targetRotationRef.current.y,
            0.08
          );
      }

      renderer.render(
        scene,
        camera
      );
    };

    animate();

    // ==========================================
    // RESIZE
    // ==========================================

    const handleResize = () => {
      if (!container) return;

      const newWidth =
        container.clientWidth;

      const newHeight =
        container.clientHeight;

      if (
        newWidth <= 0 ||
        newHeight <= 0
      ) {
        return;
      }

      camera.aspect =
        newWidth /
        newHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(
        newWidth,
        newHeight
      );
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    const resizeObserver =
      new ResizeObserver(
        handleResize
      );

    resizeObserver.observe(
      container
    );

    handleResize();

    // ==========================================
    // CLEANUP
    // ==========================================

    return () => {
      console.log(
        "HangarReveal: Cleaning up"
      );

      window.removeEventListener(
        "resize",
        handleResize
      );

      container.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      container.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );

      resizeObserver.disconnect();

      if (
        animationFrameRef.current
      ) {
        cancelAnimationFrame(
          animationFrameRef.current
        );
      }

      // Dispose model resources
      if (modelRef.current) {
        modelRef.current.traverse(
          (child) => {
            if (child.isMesh) {
              child.geometry?.dispose();

              if (child.material) {
                if (
                  Array.isArray(
                    child.material
                  )
                ) {
                  child.material.forEach(
                    (material) => {
                      material.dispose();
                    }
                  );
                } else {
                  child.material.dispose();
                }
              }
            }
          }
        );
      }

      if (
        renderer.domElement.parentNode ===
        container
      ) {
        container.removeChild(
          renderer.domElement
        );
      }

      renderer.dispose();
    };
  }, []);

  // ==========================================
  // CONTAINER
  // ==========================================

  return (
    <div
      ref={containerRef}
      className="w-full"
      style={{
        width: "100%",
        height: "630px",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#e5e5e5",
        cursor: "grab",
      }}
    />
  );
};

export default HangarReveal;