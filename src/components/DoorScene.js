import React, { useEffect, useRef } from 'react';
import { Canvas, useThree, extend } from '@react-three/fiber';
import { Box, OrbitControls } from '@react-three/drei';
import { MeshPhysicalMaterial, DoubleSide, DirectionalLight, MeshStandardMaterial } from 'three';

// Extend the use of MeshPhysicalMaterial
extend({ MeshPhysicalMaterial, MeshStandardMaterial });

function DoorScene(props) {
    let { sWidth, sHeight, doorHandleVisible, doorType } = props
    var positionX=0
    if(doorType===3){
        positionX=0.8
    }
    // Nested DoorHandle function
    function DoorHandle() {
        const handleWidth = 0.08;
        const handleHeight = 0.53;
        const handleDepth = 0.2;
        const handlePositionX = positionX+sWidth/2 + handleWidth / 2 -handleWidth/3;

        if (!doorHandleVisible || doorType === 4) {
            return null;
        }

        return (
            <Box args={[handleWidth, handleHeight, handleDepth]} position={[handlePositionX, 0, 0]}>
                <meshStandardMaterial color="black" />
            </Box>
        );
    }

    function GlassRectangle() {
        let position=[0, 0, 0]
        if(doorType===3){
            position=[positionX,0,0]
        }
        return (
            <Box args={[sWidth, sHeight, 0.07]} position={[...position]}>
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
        );
    }

    function Frame() {
        var thickness = { left: 0.1, right: 0.1, top: 0.1, bottom: 0.1 }
        var frameDepth = 0.09;     // Define depth once and pass it to the Frame component
        if (doorType === 1) {
            thickness = { left: 0.07, right: 0.07, top: 0.07, bottom: 0.07 }
            frameDepth = 0.09;
        }
        if (doorType === 2) {
            thickness = { left: 0.04, right: 0.05, top: 0.2, bottom: 0.2 }
            frameDepth = 0.07;
        }
        if (doorType === 3) {
            thickness = { left: 0.05, right: 0.05, top: 0.15, bottom: 0.05 }
            frameDepth = 0.07;
        }
        if (doorType === 4) {
            thickness = { left: 0.05, right: 0.05, top: 0.05, bottom: 0.05 }
            frameDepth = 0.07;
        }

        const TopFrame = () => {
            if (doorType === 1 || doorType === 4)
                return <Box args={[sWidth + thickness.top * 2, thickness.top, frameDepth]}
                    position={[positionX, sHeight / 2 + thickness.top / 2, 0]}>
                    <meshStandardMaterial color="black" />
                </Box>
            if (doorType === 2)
                return <Box args={[sWidth + thickness.top * 2 - 0.4, thickness.top, frameDepth + 0.01]}
                    position={[positionX, sHeight / 2 + thickness.top / 2 - thickness.top, 0]}>
                    <meshStandardMaterial color="black" />
                </Box>

            if (doorType === 3) {
                const topFramePosition = [0, sHeight / 2 + thickness.top / 2, 0]

                return <Box args={[sWidth * 2 + thickness.top * 2, thickness.top, frameDepth + 0.01]}
                    position={[...topFramePosition]}>
                    <meshStandardMaterial color="black" />
                </Box>
            }

        }

        const BottomFrame = () => {
            if (doorType === 1 || doorType === 4)
                return <Box args={[sWidth + thickness.bottom * 2, thickness.bottom, frameDepth]}
                    position={[positionX, -sHeight / 2 - thickness.bottom / 2, 0]}>
                    <meshStandardMaterial color="black" />
                </Box>
            if (doorType === 2)
                return <Box args={[sWidth + thickness.bottom * 2 - 0.4, thickness.bottom, frameDepth + 0.01]}
                    position={[positionX, -sHeight / 2 - thickness.bottom / 2 + thickness.bottom, 0]}>
                    <meshStandardMaterial color="black" />
                </Box>
            if (doorType === 3)
                return <Box args={[sWidth + thickness.bottom * 2, thickness.bottom, frameDepth]}
                    position={[positionX, -sHeight / 2 - thickness.bottom / 2, 0]}>
                    <meshStandardMaterial color="black" />
                </Box>

        }
        const LeftFrame =
            <Box args={[thickness.left, sHeight, frameDepth]}
                position={[positionX+ -sWidth / 2 - thickness.left / 2, 0, 0]}>
                <meshStandardMaterial color="black" />
            </Box>
        const RightFrame =
            <Box args={[thickness.right, sHeight, frameDepth]}
                position={[positionX+sWidth / 2 + thickness.right / 2, 0, 0]}>
                <meshStandardMaterial color="black" />
            </Box>
        return (
            <>
                {TopFrame()}
                {BottomFrame()}
                {LeftFrame}
                {RightFrame}
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
            <Frame />
            <GlassRectangle />
            <DoorHandle />
            <LimitedOrbitControls />
        </Canvas>
    );
}

export default DoorScene;
