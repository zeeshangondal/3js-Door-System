import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { Box, OrbitControls } from '@react-three/drei';
import { MeshPhysicalMaterial, DoubleSide, DirectionalLight, PointLight } from 'three';

// Extend the use of MeshPhysicalMaterial
extend({ MeshPhysicalMaterial });


function DoorHandle({ sWidth, sHeight, visible }) {
    // Define the dimensions for the door handle
    const handleWidth = 0.05;
    const handleHeight = 0.5;
    const handleDepth = 0.2;
    const handlePositionX = -sWidth / 2 + handleWidth / 2; // Position it on the left side of the door
    const handlePositionY = 0; // Middle of the door in Y

    // Only render if visible is true
    if (!visible) {
        return null;
    }

    return (
        <Box args={[handleWidth, handleHeight, handleDepth]} position={[handlePositionX, handlePositionY, 0]}>
            <meshStandardMaterial color="black" />
        </Box>
    );
}

function GlassRectangle({ sWidth, sHeight }) {
    const meshRef = useRef();

    const frameThickness = 0.1; // Thickness of the frame
    const frameDepth = 0.08; // Depth of the frame (slightly more than the glass to be visible)

    return (
        <>
            {/* Main Glass Rectangle */}
            <Box ref={meshRef} args={[sWidth, sHeight, 0.07]} position={[0, 0, 0]}>
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

            {/* Frame (Top, Bottom, Left, Right) */}
            <Box args={[sWidth + frameThickness * 2, frameThickness, frameDepth]} position={[0, sHeight / 2 + frameThickness / 2, 0]}><meshStandardMaterial color="black" /></Box> {/* Top */}
            <Box args={[sWidth + frameThickness * 2, frameThickness, frameDepth]} position={[0, -sHeight / 2 - frameThickness / 2, 0]}><meshStandardMaterial color="black" /></Box> {/* Bottom */}
            <Box args={[frameThickness, sHeight, frameDepth]} position={[-sWidth / 2 - frameThickness / 2, 0, 0]}><meshStandardMaterial color="black" /></Box> {/* Left */}
            <Box args={[frameThickness, sHeight, frameDepth]} position={[sWidth / 2 + frameThickness / 2, 0, 0]}><meshStandardMaterial color="black" /></Box> {/* Right */}
        </>
    );
}

function LimitedOrbitControls() {
    const { camera, gl } = useThree();
    const controlsRef = useRef();

    useEffect(() => {
        if (controlsRef.current) {
            const angle = Math.PI / 2; // 90 degrees
            controlsRef.current.minPolarAngle = angle;
            controlsRef.current.maxPolarAngle = angle;
        }
    }, [camera]);

    return <OrbitControls ref={controlsRef} args={[camera, gl.domElement]} />;
}

function Scene({ sWidth, sHeight , doorHandleVisible}) {
    const lightRef = useRef();

    return (
        <Canvas>
            <ambientLight intensity={0.9} />
            <directionalLight ref={lightRef} position={[0, 0, 5]} intensity={2} color="white" />
            <directionalLight position={[-5, 0, -5]} intensity={1.5} color="white" />

            <GlassRectangle sWidth={sWidth} sHeight={sHeight} />
            <DoorHandle sWidth={sWidth} sHeight={sHeight} visible={doorHandleVisible} />
            <LimitedOrbitControls />
        </Canvas>
    );
}

function Door1Scene(props) {
    return <Scene sWidth={props.sWidth} sHeight={props.sHeight} doorHandleVisible={props.doorHandleVisible} />;
}

export default Door1Scene;
