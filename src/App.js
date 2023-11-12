import './App.css';
import React, { useState, useEffect, createContext, useContext } from 'react'
import DoorScene from './components/DoorScene';

import Form1 from './components/Form1';

function App() {
    const BaseWidth=1000
    const BaseLength=3000
    
    const [length, setLength] = useState(BaseLength)
    const [width, setWidth] = useState(BaseWidth)
    const [doorType, setDoorType] = useState(1)
    const [numberOfDoors,setNumberOfDoors]=useState(1)


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
                        numberOfDoors={numberOfDoors}
                        handleNumberOfDoorsChange={handleNumberOfDoorsChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default App;
