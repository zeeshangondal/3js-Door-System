import React, { useEffect, useRef } from 'react';
import { Canvas, useThree, extend } from '@react-three/fiber';
import { Box, OrbitControls } from '@react-three/drei';
import { MeshPhysicalMaterial, DoubleSide, DirectionalLight, MeshStandardMaterial } from 'three';

// Extend the use of MeshPhysicalMaterial
extend({ MeshPhysicalMaterial, MeshStandardMaterial });

function DoorScene({ sWidth, sHeight, doorHandleVisible }) {

    // Nested DoorHandle function
    function DoorHandle() {
        const handleWidth = 0.05;
        const handleHeight = 0.5;
        const handleDepth = 0.2;
        const handlePositionX = -sWidth / 2 + handleWidth / 2;

        if (!doorHandleVisible) {
            return null;
        }

        return (
            <Box args={[handleWidth, handleHeight, handleDepth]} position={[handlePositionX, 0, 0]}>
                <meshStandardMaterial color="black" />
            </Box>
        );
    }

    // Nested GlassRectangle function
    function GlassRectangle() {
        const frameThickness = 0.08;
        const frameDepth = 0.08;

        return (
            <>
                <Box args={[sWidth, sHeight, 0.07]} position={[0, 0, 0]}>
                    <meshPhysicalMaterial
                        attach="material"
                        color="lightgray"
                        transmission={0.9}
                        roughness={0.1}
                        metalness={0.1}
                        reflectivity={0.5}
                        clearcoat={1.0}
                        side={DoubleSide}
                    />
                </Box>
                <Box args={[sWidth + frameThickness * 2, frameThickness, frameDepth]} position={[0, sHeight / 2 + frameThickness / 2, 0]}>
                    <meshStandardMaterial color="black" />
                </Box>
                <Box args={[sWidth + frameThickness * 2, frameThickness, frameDepth]} position={[0, -sHeight / 2 - frameThickness / 2, 0]}>
                    <meshStandardMaterial color="black" />
                </Box>
                <Box args={[frameThickness, sHeight, frameDepth]} position={[-sWidth / 2 - frameThickness / 2, 0, 0]}>
                    <meshStandardMaterial color="black" />
                </Box>
                <Box args={[frameThickness, sHeight, frameDepth]} position={[sWidth / 2 + frameThickness / 2, 0, 0]}>
                    <meshStandardMaterial color="black" />
                </Box>
            </>
        );
    }

    // Nested LimitedOrbitControls function
    function LimitedOrbitControls() {
        const { camera, gl } = useThree();
        const controlsRef = useRef();

        useEffect(() => {
            if (controlsRef.current) {
                // Lock the controls to only allow rotation around the y-axis (x-axis movement)
                controlsRef.current.minAzimuthAngle = -Infinity; // Full rotation
                controlsRef.current.maxAzimuthAngle = Infinity; // Full rotation

                // Lock polar angle to prevent rotation up/down
                const currentPolarAngle = controlsRef.current.getPolarAngle();
                controlsRef.current.minPolarAngle = currentPolarAngle;
                controlsRef.current.maxPolarAngle = currentPolarAngle;
            }
        }, [controlsRef]);

        return <OrbitControls ref={controlsRef} args={[camera, gl.domElement]} />;
    }


    // Main scene render function
    const lightRef = useRef();

    return (
        <Canvas>
            <ambientLight intensity={0.9} />
            <directionalLight ref={lightRef} position={[0, 0, 5]} intensity={2} color="white" />
            <directionalLight position={[-5, 0, -5]} intensity={1.5} color="white" />

            <GlassRectangle />
            <DoorHandle />
            <LimitedOrbitControls />
        </Canvas>
    );
}

export default DoorScene;
