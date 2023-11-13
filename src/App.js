import './App.css';
import React, { useState, useEffect, createContext, useContext } from 'react'
import DoorScene from './components/DoorScene';

import Form1 from './components/Form1';

function App() {
    const BaseWidth = 1000
    const BaseLength = 3000

    const [length, setLength] = useState(BaseLength)
    const [width, setWidth] = useState(BaseWidth)
    const [doorType, setDoorType] = useState(1)
    const [numberOfDoors, setNumberOfDoors] = useState(1)
    const [doorHandleDirection, setDoorHandleDirection] = useState(false)    //false means left and true means right 


    function convertMmToDoorHeight(lengthInMm) {
        const originalLength = BaseLength;
        const convertedLength = 6.5;
        const conversionFactor = convertedLength / originalLength;
        return lengthInMm * conversionFactor;
    }
    function convertMmToDoorWidth(widthInMm) {
        const originalWidth = BaseWidth;
        const convertedWidth = 2.9;
        const conversionFactor = convertedWidth / originalWidth;
        return widthInMm * conversionFactor;
    }

    const handleLengthChange = (Length) => {
        if (Length > BaseLength)
            Length = BaseLength
        setLength(Length)
    }
    const handleWidthChange = (Width) => {
        if (Width > BaseWidth)
            Width = BaseWidth
        setWidth(Width)
    }
    const handleNumberOfDoorsChange = (number) => {
        setNumberOfDoors(number)

    }

    return (
        <div className='d-flex flex-column flex-md-row mt-3'>
            <div className='col-12 col-md-9 p-2 m-1' style={{ height: 'calc(100vh - 4rem)', backgroundColor: 'gray', borderRadius: "2%" }}>
                <DoorScene
                    sWidth={convertMmToDoorWidth(width)}
                    sHeight={convertMmToDoorHeight(length)}
                    doorHandleVisible={true}
                    doorType={doorType}
                    numberOfDoors={numberOfDoors}
                    doorHandleDirection={doorHandleDirection}
                />
            </div>
            <div className='col-12 col-md-3 p-1 m-2 shadow' style={{ backgroundColor: 'white', fontWeight: 'bold', padding: '1rem' }}>
                <Form1
                    length={length}
                    width={width}
                    handleLengthChange={handleLengthChange}
                    handleWidthChange={handleWidthChange}
                    doorType={doorType}
                    setDoorType={setDoorType}
                    numberOfDoors={numberOfDoors}
                    handleNumberOfDoorsChange={handleNumberOfDoorsChange}
                    doorHandleDirection={doorHandleDirection}
                    setDoorHandleDirection={setDoorHandleDirection}
                />
            </div>
        </div>

    )
}

export default App;
