import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useThree, extend } from '@react-three/fiber';
import { Box, OrbitControls } from '@react-three/drei';
import { MeshPhysicalMaterial, DoubleSide, DirectionalLight, MeshStandardMaterial } from 'three';
import { TextureLoader } from 'three';
import listeralTexture from '../GlassTextures/listral.jpg'
import cathedralTexture from '../GlassTextures/cathedral.jpg'
import clearTexture from '../GlassTextures/clear.png'
import flutedTexture from '../GlassTextures/fluted.png'
import steelWireColorTexture from '../GlassTextures/steel-wire-color.png'

import * as THREE from 'three';


// Extend the use of MeshPhysicalMaterial
extend({ MeshPhysicalMaterial, MeshStandardMaterial });

function DoorScene(props) {
    let { sWidth, sHeight, doorHandleVisible, doorSpecs, convertMmToDoorWidth, convertMmToDoorHeight } = props
    let { doorType, numberOfDoors, doorHandleDirection, frameColor, glassColor } = doorSpecs
    let [zoom, setZoom] = useState(0.5)
    const [texture, setTexture] = useState('')
    // const [allTextures,setAllTextures]= {"listral.jpg":'',"cathedral.jpg":'',"clear.png":'',"fluted.jpg":'',"steel-wire-color.png":''}


    function getTextureImage() {
        if (doorSpecs.textureImage == "listral.jpg") {
            return listeralTexture
        }
        if (doorSpecs.textureImage == "cathedral.jpg") {
            return cathedralTexture
        }
        if (doorSpecs.textureImage == "clear.png") {
            return clearTexture
        }
        if (doorSpecs.textureImage == "fluted.png") {
            return flutedTexture
        }
        if (doorSpecs.textureImage == "steel-wire-color.png") {
            return steelWireColorTexture
        }

    }

    useEffect(() => {
        if (doorSpecs.textureImage.length == 0)
            return;
        const textureLoader = new TextureLoader();
        textureLoader.load(
            getTextureImage(),
            function (texture) {
                const renderer = new THREE.WebGLRenderer();
                texture.encoding = THREE.sRGBEncoding;
                texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                // texture.repeat.set(90 * doorSpecs.numberOfDoors * doorSpecs.numberOfDoors, 90 * doorSpecs.numberOfDoors * doorSpecs.numberOfDoors); // This will repeat the texture 4 times on each axis
                texture.minFilter = THREE.NearestFilter;
                texture.magFilter = THREE.NearestFilter;
                setTexture(texture)
            },
            undefined, // onProgress callback, not needed here
            function (error) {
            }
        );
    }, [doorSpecs.textureImage, doorSpecs.numberOfDoors])

    // Nested DoorHandle function
    function DoorHandle(xPosition) {
        const handleWidth = 0.09;
        const handleHeight = 0.53 + numberOfDoors * 0.04;
        const handleDepth = 0.2;
        var handlePositionX = xPosition + sWidth / 2 + handleWidth / 2 - handleWidth / 3;
        if (doorHandleDirection) {
            handlePositionX = handlePositionX - sWidth + 0.025 * numberOfDoors
        } else {
            handlePositionX = handlePositionX - 0.025 * numberOfDoors

        }
        if (!doorHandleVisible || doorType === 4) {
            return null;
        }

        return (
            <Box args={[handleWidth, handleHeight, handleDepth]} position={[handlePositionX, 0, 0]}>
                <meshStandardMaterial color={frameColor} />
            </Box>
        );
    }

    function GetDoorGlassRectangle(xPosition) {
        let height = sHeight
        let y = 0

        let position = [xPosition, y, 0]
        return (
            <Box args={[sWidth, height, 0.07]} position={[...position]}>
                <meshPhysicalMaterial
                    attach="material"
                    map={doorSpecs.textureImage.length > 0 ? texture : null}
                    color={glassColor.length > 0 ? glassColor : 'gray'}
                    transmission={4.9}
                    roughness={1.0}
                    metalness={0.0}
                    reflectivity={0.7}
                    clearcoat={0.1}
                    side={DoubleSide}
                />
            </Box>
        );
    }

    function Frame(xPosition) {
        var thickness = { left: 0.1, right: 0.1, top: 0.1, bottom: 0.1 }
        var frameDepth = 0.09;
        if (doorType === 1) {
            thickness = { left: 0.07, right: 0.07, top: 0.07, bottom: 0.07 }
            frameDepth = 0.09;
        }
        if (doorType === 2) {
            thickness = { left: 0.04, right: 0.05, top: 0.2 + numberOfDoors * 0.008, bottom: 0.2 + numberOfDoors * 0.008 }
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
        frameDepth = frameDepth + numberOfDoors * 0.008
        const TopFrame = () => {
            if (doorType === 1 || doorType === 3 || doorType === 4)
                return <Box args={[sWidth + thickness.top * 2, thickness.top, frameDepth]}
                    position={[xPosition, sHeight / 2 + thickness.top / 2, 0]}>
                    <meshStandardMaterial color={frameColor} />
                </Box>
            if (doorType === 2)
                return <Box args={[sWidth + thickness.top * 2 - 0.4, thickness.top, frameDepth + 0.01]}
                    position={[xPosition, sHeight / 2 + thickness.top / 2 - thickness.top, 0]}>
                    <meshStandardMaterial color={frameColor} />
                </Box>

        }
        const TopDoorType3Frame = () => {
            const topFrameThickness = 0.15
            const topFramePosition = [(numberOfDoors == 2 ? -0.1 : 0), sHeight / 2 + thickness.top / 2, 0]
            return <Box args={[1.6 * sWidth + 0.8 * sWidth * numberOfDoors, topFrameThickness, frameDepth + 0.01]}
                position={[...topFramePosition]}>
                <meshStandardMaterial color={frameColor} />
            </Box>
        }
        const BottomFrame = () => {
            if (doorType === 1 || doorType === 4)
                return <Box args={[sWidth + thickness.bottom * 2, thickness.bottom, frameDepth]}
                    position={[xPosition, -sHeight / 2 - thickness.bottom / 2, 0]}>
                    <meshStandardMaterial color={frameColor} />
                </Box>
            if (doorType === 2)
                return <Box args={[sWidth + thickness.bottom * 2 - 0.4, thickness.bottom, frameDepth + 0.01]}
                    position={[xPosition, -sHeight / 2 - thickness.bottom / 2 + thickness.bottom, 0]}>
                    <meshStandardMaterial color={frameColor} />
                </Box>
            if (doorType === 3)
                return <Box args={[sWidth + thickness.bottom * 2, thickness.bottom, frameDepth]}
                    position={[xPosition, -sHeight / 2 - thickness.bottom / 2, 0]}>
                    <meshStandardMaterial color={frameColor} />
                </Box>

        }
        const LeftFrame =
            <Box args={[thickness.left, sHeight, frameDepth]}
                position={[xPosition + -sWidth / 2 - thickness.left / 2, 0, 0]}>
                <meshStandardMaterial color={frameColor} />
            </Box>
        const RightFrame =
            <Box args={[thickness.right, sHeight, frameDepth]}
                position={[xPosition + sWidth / 2 + thickness.right / 2, 0, 0]}>
                <meshStandardMaterial color={frameColor} />
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


    // Usage

    function GetAGlassRectangle(xPosition, yPosition, panelWidth, panelHeight) {
        let position = [xPosition, yPosition, 0]
        let color = (glassColor.length > 0 ? glassColor : 'gray')
        return (

            <Box args={[panelWidth, panelHeight, 0.07]} position={[...position]}>
                <meshPhysicalMaterial
                    attach="material"
                    color={color}
                    map={doorSpecs.textureImage.length > 0 ? texture : null}
                    transmission={4.9}
                    roughness={1.0}
                    metalness={0.0}
                    reflectivity={0.7}
                    clearcoat={0.1}
                    side={DoubleSide}

                />
            </Box>
        );
    }

    function LimitedOrbitControls() {
        const { camera, gl } = useThree();
        camera.zoom = zoom;
        camera.updateProjectionMatrix(); // Apply the zoom change.

        const controlsRef = useRef();

        useEffect(() => {
            if (controlsRef.current) {
                // Lock the controls to prevent rotation around the y-axis (x-axis movement)
                const currentAzimuthAngle = controlsRef.current.getAzimuthalAngle();
                controlsRef.current.minAzimuthAngle = currentAzimuthAngle;
                controlsRef.current.maxAzimuthAngle = currentAzimuthAngle;

                // Lock polar angle to prevent rotation up/down
                const currentPolarAngle = controlsRef.current.getPolarAngle();
                controlsRef.current.minPolarAngle = currentPolarAngle;
                controlsRef.current.maxPolarAngle = currentPolarAngle;
            }
        }, [controlsRef]);

        return <OrbitControls ref={controlsRef} args={[camera, gl.domElement]} />;
    }


    useEffect(() => {
        if (numberOfDoors < 3) {
            setZoom(1)
            return
        }
        let zoomLevel = 1 / (1 + 0.2 * numberOfDoors)
        setZoom(zoomLevel)
    }, [numberOfDoors])

    // Main scene render function
    const lightRef = useRef();


    function CreateDoor(xPosition, handleVisible) {
        return <>
            {doorType === 3 ? Frame(xPosition) : Frame(xPosition)}
            {handleVisible ? DoorHandle(xPosition) : ''}
            {GetDoorGlassRectangle(xPosition)}
        </>
    }

    function createPanelFrame(xPosition, yPosition, width, height) {
        var thickness = { left: 0.05, right: 0.05, top: 0.05, bottom: 0.05 }
        var frameDepth = 0.09;
        let frameColor = doorSpecs.frameColor
        const LeftFrame =
            <Box args={[thickness.left, height, frameDepth]}
                position={[xPosition + -width / 2 - thickness.left / 2, yPosition, 0]}>
                <meshStandardMaterial color={frameColor} />
            </Box>
        const RightFrame =
            <Box args={[thickness.right, height, frameDepth]}
                position={[xPosition + width / 2 + thickness.right / 2, yPosition, 0]}>
                <meshStandardMaterial color={frameColor} />
            </Box>
        const TopFrame =
            <Box args={[width + thickness.top * 2, thickness.top, frameDepth]}
                position={[xPosition, yPosition + height / 2 + thickness.top / 2, 0]}>
                <meshStandardMaterial color={frameColor} />
            </Box>
        const BottomFrame =
            <Box args={[width + thickness.bottom * 2, thickness.bottom, frameDepth]}
                position={[xPosition, yPosition - height / 2 - thickness.bottom / 2, 0]}>
                <meshStandardMaterial color={frameColor} />
            </Box>
        return (
            <>
                {TopFrame}
                {LeftFrame}
                {RightFrame}
                {BottomFrame}
            </>
        );
    }
    function createLeftPanel(xPosition) {
        const width = convertMmToDoorWidth(doorSpecs.leftPanel.width)
        const x = xPosition - sWidth / 2 - width / 2 - 0.05

        return <>
            {createPanelFrame(x, 0, width, sHeight + 0.05)}
            {GetAGlassRectangle(x, 0, width, sHeight + 0.05)}
        </>
    }

    function createTopPanel() {
        const height = convertMmToDoorHeight(doorSpecs.topPanel.length)
        let y = 0 + sHeight / 2 + height / 2 + 0.09

        let width = doorSpecs.numberOfDoors * sWidth + convertMmToDoorWidth(doorSpecs.leftPanel.width) + convertMmToDoorWidth(doorSpecs.rightPanel.width) + 0.03
        let x = 0

        if (doorSpecs.leftPanel.width > 0) {
            width += 0.04
        }
        if (doorSpecs.rightPanel.width > 0) {
            width += 0.04
        }
        if (doorSpecs.leftPanel.width > 0 && doorSpecs.rightPanel.width > 0) {
            x = x + convertMmToDoorWidth(doorSpecs.rightPanel.width) / 2 - convertMmToDoorWidth(doorSpecs.leftPanel.width) / 2
        }
        else {
            if (doorSpecs.leftPanel.width > 0) {
                x = x - convertMmToDoorWidth(doorSpecs.leftPanel.width) / 2 - 0.01
            } else {
                x = x + convertMmToDoorWidth(doorSpecs.rightPanel.width) / 2 + 0.01
            }
        }
        if (doorSpecs.leftPanel.width == 0 && doorSpecs.rightPanel.width == 0) {
            x = x - 0.01
        }
        return <>
            {createPanelFrame(x, y, width, height)}
            {GetAGlassRectangle(x, y, width, height)}
        </>
    }

    function createBottomSteelPanel() {
        const height = convertMmToDoorHeight(doorSpecs.bottomSteelPanel.length)
        let y = 0 - sHeight / 2 + height / 2
        let width = doorSpecs.numberOfDoors * sWidth
        let x = 0
        let position = [x, y, 0]
        var thickness = { left: 0.05, right: 0.05, top: 0.05, bottom: 0.05 }
        var frameDepth = 0.09;

        return <>

            <Box args={[width + thickness.bottom * 2, height, frameDepth]}
                position={[...position]}>
                <meshStandardMaterial
                    color={frameColor}
                />
            </Box>
        </>
    }

    function createRightPanel(xPosition) {
        const width = convertMmToDoorWidth(doorSpecs.rightPanel.width)
        const x = xPosition + sWidth / 2 + width / 2 + 0.05

        return <>
            {createPanelFrame(x, 0, width, sHeight + 0.05)}
            {GetAGlassRectangle(x, 0, width, sHeight + 0.05)}
        </>
    }


    function getFirstDoorMidX() {
        let halfTotalWidth = (doorSpecs.numberOfDoors * sWidth) / 2
        let t1 = halfTotalWidth - sWidth
        let firstMidX = t1 + sWidth / 2
        return -firstMidX
    }
    function GenerateDoors(n) {
        const doors = []
        let startX = getFirstDoorMidX()

        if (n === 1 && doorType === 3) {
            doors.push(CreateDoor(1, true))
            return <>{doors}</>
        }
        if (n === 1) {
            if (doorSpecs.topPanel.include && doorSpecs.topPanel.length > 0) {
                doors.push(createTopPanel())
            }

            if (doorSpecs.leftPanel.width > 0) {
                doors.push(createLeftPanel(0))
            }
            if (doorSpecs.rightPanel.width > 0) {
                doors.push(createRightPanel(0))
            }
            if (doorSpecs.bottomSteelPanel.include && doorSpecs.bottomSteelPanel.length > 0) {
                doors.push(createBottomSteelPanel())
            }

            doors.push(CreateDoor(0, true))
            return <>{doors}</>
        }

        var remainder = 0
        if (doorHandleDirection)
            remainder = 1

        let handleVisible = true
        if (doorSpecs.doorType != 3 && doorSpecs.leftPanel.width > 0) {
            doors.push(createLeftPanel(startX))
        }
        if (doorSpecs.doorType != 3 && doorSpecs.topPanel.include && doorSpecs.topPanel.length > 0) {
            doors.push(createTopPanel())
        }

        for (let i = 0; i < n; i++) {
            if (i % 2 == remainder)
                handleVisible = true
            else
                handleVisible = false
            doors.push(CreateDoor(startX, handleVisible))
            startX = startX + sWidth
        }
        startX = startX - sWidth
        if (doorSpecs.doorType != 3 && doorSpecs.rightPanel.width > 0) {
            doors.push(createRightPanel(startX))
        }

        if (doorSpecs.bottomSteelPanel.include && doorSpecs.bottomSteelPanel.length > 0) {
            doors.push(createBottomSteelPanel())
        }


        return <>{doors}</>
    }

    return (
        <Canvas>
            <ambientLight intensity={0.9} />
            {/* <directionalLight ref={lightRef} position={[0, 0, 5]} intensity={2} color="white" />
            <directionalLight position={[-5, 0, -5]} intensity={1.5} color="white" /> */}

            {GenerateDoors(numberOfDoors)}
            {/* {createLeftPanel()} */}
            <LimitedOrbitControls />
        </Canvas>
    );
}

export default DoorScene;
