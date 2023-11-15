import './App.css';
import React, { useState, useEffect, createContext, useContext } from 'react'
import DoorScene from './components/DoorScene';

import Form1 from './components/Form1';
import Form2 from './components/Form2';

const BaseWidth = 1000
const BaseLength = 3000


let doorObj = {
    length: BaseLength,
    width: BaseWidth,
    doorType: 1,
    numberOfDoors: 1,
    doorHandleDirection: false,
    panelTypePosition:1,  // 1 to 4 respectively
    leftPanel:{
        width:0
    },
    rightPanel:{
        width:0
    },
    topPanel:{
        include:false,
        length:0
    },
    bottomSteelPanel:{
        include:false,
        length:0
    },
    
    
}

function App() {

    const [doorSpecs, setDoorSpecs] = useState(doorObj)
    //For which Form to render
    let [stepNumber, setStepNumber] = useState(1)


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
            setDoorSpecs({ ...doorSpecs, length: Length })
    }
    const handleWidthChange = (Width) => {
        if (Width > BaseWidth)
            Width = BaseWidth
        setDoorSpecs({ ...doorSpecs, width: Width })
    }
    const handleNumberOfDoorsChange = (number) => {
        setDoorSpecs({ ...doorSpecs, numberOfDoors: number })
    }

    const handleGoBack = () => {
        setStepNumber(prevStepNumber => {
            if (prevStepNumber > 1) {
                console.log("Back", prevStepNumber - 1);
                return prevStepNumber - 1;
            }
            return prevStepNumber;
        });
    }
    const handleGoNext = () => {
        setStepNumber(prevStepNumber => {
            if (prevStepNumber < 5) {
                console.log("Next", prevStepNumber + 1);
                return prevStepNumber + 1;
            }
            return prevStepNumber;
        });
    }







    const getForm = () => {
        if (stepNumber === 1) {
            return (<Form1
                doorSpecs={doorSpecs}
                setDoorSpecs={setDoorSpecs}
                handleLengthChange={handleLengthChange}
                handleWidthChange={handleWidthChange}                
                handleNumberOfDoorsChange={handleNumberOfDoorsChange}
                handleGoBack={handleGoBack}
                handleGoNext={handleGoNext}

            />)
        }
        if (stepNumber === 2) {
            return (<Form2
                doorSpecs={doorSpecs}
                setDoorSpecs={setDoorSpecs}

                handleGoBack={handleGoBack}
                handleGoNext={handleGoNext}

            />)
        }
    }
    //height: 'calc(100vh - 4rem)',
    return (
        <div className='d-flex flex-column flex-md-row mt-3'>
            <div className='col-12 col-md-9 p-2 m-1' style={{ backgroundColor: 'gray', borderRadius: "2%" }}>
                <DoorScene
                    sWidth={convertMmToDoorWidth(doorSpecs.width)}
                    sHeight={convertMmToDoorHeight(doorSpecs.length)}
                    doorHandleVisible={true}
                    doorType={doorSpecs.doorType}
                    numberOfDoors={doorSpecs.numberOfDoors}
                    doorHandleDirection={doorSpecs.doorHandleDirection}
                />
            </div>
            <div className='col-12 col-md-3 p-1 m-2 shadow' style={{ backgroundColor: 'white', fontWeight: 'bold', padding: '1rem' }}>
                {getForm()}
            </div>
        </div>

    )
}

export default App;
