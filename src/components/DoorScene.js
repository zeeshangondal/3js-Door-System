import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useThree, extend } from '@react-three/fiber';
import { Box, OrbitControls } from '@react-three/drei';
import { MeshPhysicalMaterial, DoubleSide, DirectionalLight, MeshStandardMaterial } from 'three';

// Extend the use of MeshPhysicalMaterial
extend({ MeshPhysicalMaterial, MeshStandardMaterial });

function DoorScene(props) {
    let { sWidth, sHeight, doorHandleVisible, doorType, numberOfDoors ,doorHandleDirection} = props

    let [zoom,setZoom] = useState(0.5)

    
    // Nested DoorHandle function
    function DoorHandle(xPosition) {
        const handleWidth = 0.09;
        const handleHeight = 0.53+numberOfDoors*0.04;
        const handleDepth = 0.2;
        var handlePositionX = xPosition  + sWidth / 2 + handleWidth / 2 - handleWidth / 3 ;
        if(doorHandleDirection){
            handlePositionX=handlePositionX-sWidth+0.025*numberOfDoors
        }else{
            handlePositionX=handlePositionX-0.025*numberOfDoors

        }
        if (!doorHandleVisible || doorType === 4) {
            return null;
        }

        return (
            <Box args={[handleWidth, handleHeight, handleDepth]} position={[handlePositionX, 0, 0]}>
                <meshStandardMaterial color="black" />
            </Box>
        );
    }

    function GlassRectangle(xPosition) {
        let position = [xPosition, 0, 0]
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

    function Frame(xPosition) {
        var thickness = { left: 0.1, right: 0.1, top: 0.1, bottom: 0.1 }
        var frameDepth = 0.09 ;     
        if (doorType === 1) {
            thickness = { left: 0.07, right: 0.07, top: 0.07, bottom: 0.07 }
            frameDepth = 0.09;
        }
        if (doorType === 2) {
            thickness = { left: 0.04, right: 0.05, top: 0.2+numberOfDoors*0.008, bottom: 0.2+numberOfDoors*0.008 }
            frameDepth = 0.07;
        }
        if (doorType === 3) {
            thickness = { left: 0.05, right: 0.05, top: 0.05, bottom: 0.05 }
            frameDepth = 0.07;
        }
        if (doorType === 4) {
            thickness = { left: 0.05, right: 0.05, top: 0.05, bottom: 0.05 }
            frameDepth = 0.07;
        }
        frameDepth=frameDepth+numberOfDoors*0.008
        const TopFrame = () => {
            if (doorType === 1 || doorType === 3 || doorType === 4)
                return <Box args={[sWidth + thickness.top * 2, thickness.top, frameDepth]}
                    position={[xPosition, sHeight / 2 + thickness.top / 2, 0]}>
                    <meshStandardMaterial color="black" />
                </Box>
            if (doorType === 2)
                return <Box args={[sWidth + thickness.top * 2 - 0.4, thickness.top, frameDepth + 0.01]}
                    position={[xPosition, sHeight / 2 + thickness.top / 2 - thickness.top, 0]}>
                    <meshStandardMaterial color="black" />
                </Box>

        }
        const TopDoorType3Frame = () => {
            const topFrameThickness = 0.15
            const topFramePosition = [-0.6+(numberOfDoors==1?0.5:0), sHeight / 2 + thickness.top / 2, 0]
            return <Box args={[1.6*sWidth+ 0.8*sWidth *numberOfDoors , topFrameThickness, frameDepth + 0.01]}
                position={[...topFramePosition]}>
                <meshStandardMaterial color="black" />
            </Box>
        }
        const BottomFrame = () => {
            if (doorType === 1 || doorType === 4)
                return <Box args={[sWidth + thickness.bottom * 2, thickness.bottom, frameDepth]}
                    position={[xPosition, -sHeight / 2 - thickness.bottom / 2, 0]}>
                    <meshStandardMaterial color="black" />
                </Box>
            if (doorType === 2)
                return <Box args={[sWidth + thickness.bottom * 2 - 0.4, thickness.bottom, frameDepth + 0.01]}
                    position={[xPosition, -sHeight / 2 - thickness.bottom / 2 + thickness.bottom, 0]}>
                    <meshStandardMaterial color="black" />
                </Box>
            if (doorType === 3)
                return <Box args={[sWidth + thickness.bottom * 2, thickness.bottom, frameDepth]}
                    position={[xPosition, -sHeight / 2 - thickness.bottom / 2, 0]}>
                    <meshStandardMaterial color="black" />
                </Box>

        }
        const LeftFrame =
            <Box args={[thickness.left, sHeight, frameDepth]}
                position={[xPosition + -sWidth / 2 - thickness.left / 2, 0, 0]}>
                <meshStandardMaterial color="black" />
            </Box>
        const RightFrame =
            <Box args={[thickness.right, sHeight, frameDepth]}
                position={[xPosition + sWidth / 2 + thickness.right / 2, 0, 0]}>
                <meshStandardMaterial color="black" />
            </Box>
        return (
            <>
                {doorType === 3 ? TopDoorType3Frame() : ''}
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
        camera.zoom = zoom
        camera.updateProjectionMatrix(); // Apply the zoom change.

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

    useEffect(()=>{
        if(numberOfDoors<3){
            setZoom(1)    
            return
        }
        let zoomLevel=1/(1+0.2*numberOfDoors)
        setZoom(zoomLevel)
    },[numberOfDoors])

    // Main scene render function
    const lightRef = useRef();

    function CreateDoor(xPosition,handleVisible) {
        return <>
            {doorType===3 ? Frame(xPosition) : Frame(xPosition)}
            {/* {doorType === 3 ? DoorHandle(1) : DoorHandle(xPosition)} */}
            {handleVisible ? DoorHandle(xPosition):''}
            {GlassRectangle(xPosition)}
        </>
    }
    function GenerateDoors(n) {
        if(n===1 && doorType===3){
            return CreateDoor(1,true)
        }
        if(n===1){
            return CreateDoor(0,true)
        }

        var remainder=0
        if(doorHandleDirection)
            remainder=1
        
        const doors=[]
        let startX= -(n*sWidth)/(3) 
        let handleVisible=true

        for(let i=0;i<n;i++){
            if(i%2==remainder)
                handleVisible=true
            else
                handleVisible=false
            doors.push(CreateDoor(startX,handleVisible))
            startX=startX+sWidth
        }
        return <>{doors}</>
    }
    
    return (
        <Canvas>
            <ambientLight intensity={0.9} />
            <directionalLight ref={lightRef} position={[0, 0, 5]} intensity={2} color="white" />
            <directionalLight position={[-5, 0, -5]} intensity={1.5} color="white" />

            {GenerateDoors(numberOfDoors)}
            
            <LimitedOrbitControls />
        </Canvas>
    );
}

export default DoorScene;
