import './App.css';
import React, { useState, useEffect, createContext, useContext } from 'react'
import DoorScene from './components/DoorScene';

import Form1 from './components/Form1';

function App() {
    const [length, setLength] = useState(2500)
    const [width, setWidth] = useState(1000)
    const [doorType, setDoorType] = useState(1)


    function convertMmToDoorHeight(lengthInMm) {
        const originalLength = 2500;
        const convertedLength = 6;
        const conversionFactor = convertedLength / originalLength;
        return lengthInMm * conversionFactor;
    }
    function convertMmToDoorWidth(widthInMm) {
        const originalWidth = 1000;
        const convertedWidth = 2.5;
        const conversionFactor = convertedWidth / originalWidth;
        return widthInMm * conversionFactor;
    }

    const handleLengthChange = (Length) => {
        if (Length > 2500)
            Length = 2500
        setLength(Length)
    }
    const handleWidthChange = (Width) => {
        if (Width > 1000)
            Width = 1000
        setWidth(Width)
    }


    return (
        <div className='d-flex mt-3'>
            <div className='col-9 container p-2 m-1' style={{ height:'100vh', backgroundColor: 'gray', borderRadius: "2%" }}>
                <DoorScene
                    sWidth={convertMmToDoorWidth(width)}
                    sHeight={convertMmToDoorHeight(length)}
                    doorHandleVisible={true}
                    doorType={doorType}
                />
            </div>
            <div className='col-3 shadow container' style={{ backgroundColor: 'white', fontWeight: 'bold', paddingLeft: '17px' }}>
                <div>
                    <Form1
                        length={length}
                        width={width}
                        handleLengthChange={handleLengthChange}
                        handleWidthChange={handleWidthChange}
                        doorType={doorType}
                        setDoorType={setDoorType}
                    />
                </div>
            </div>
        </div>
    )
}

export default App;
