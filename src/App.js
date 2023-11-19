import './App.css';
import React, { useState, useEffect, createContext, useContext } from 'react'
import DoorScene from './components/DoorScene';

import Form1 from './components/Form1';
import Form2 from './components/Form2';
import Form3 from './components/Form3';
import Form4 from './components/Form4';

const BaseWidth = 1000
const BaseLength = 3000
const backgroundGradient = 'linear-gradient(to bottom left, #d9dbe0, #707b86)'


let doorObj = {
    length: BaseLength,
    width: BaseWidth,
    doorType: 1,
    numberOfDoors: 1,
    doorHandleDirection: false,
    panelTypePosition: 1,  // 1 to 4 respectively
    numberOfHBars: 0,
    numberOfVBars: 0,
    leftRightPanelHBars: 0,
    leftRightPanelVBars: 0,
    frameColor: "black",
    glassColor: "#959ca8",
    textureImage: '',
    leftPanel: {
        width: 0
    },
    rightPanel: {
        width: 0
    },
    topPanel: {
        include: false,
        length: 0,
        numberOfHBars: 0,
        numberOfVBars: 0,
    },
    bottomSteelPanel: {
        include: false,
        length: 0
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
        if (Width > 2000)
            Width = 2000
        setDoorSpecs({ ...doorSpecs, width: Width })
    }
    const handleNumberOfDoorsChange = (number) => {
        setDoorSpecs({ ...doorSpecs, numberOfDoors: number })
    }

    const handleGoBack = () => {
        setStepNumber(prevStepNumber => {
            if (prevStepNumber > 1) {
                return prevStepNumber - 1;
            }
            return prevStepNumber;
        });
    }

    const handleGoNext = () => {
        setStepNumber(prevStepNumber => {
            if (prevStepNumber < 5) {
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
        if (stepNumber === 3) {
            return (<Form3
                doorSpecs={doorSpecs}
                setDoorSpecs={setDoorSpecs}
                handleGoBack={handleGoBack}
                handleGoNext={handleGoNext}
            />)
        }
        if (stepNumber === 4) {
            return (<Form4
                doorSpecs={doorSpecs}
                setDoorSpecs={setDoorSpecs}
                handleGoBack={handleGoBack}
                handleGoNext={handleGoNext}
                backgroundGradient={backgroundGradient}
            />)
        }

    }
    let desktopStyle = {
        height: '105vh',
        background: backgroundGradient,
        borderRadius: "2%",
        padding: '1rem',
        margin:'1vh',

    }
    //mobile
    let mobileStyle = {
        height: '45vh',
        background: backgroundGradient,
        borderRadius: "7%",
        padding: '3rem',
        marginLeft:'2vh',
        
    }
    let styleCss = (window.innerWidth <= 600 ? mobileStyle : desktopStyle)
    return (
        <div className='d-flex flex-column flex-md-row mt-3'>
            <div className=' col-11 col-md-9' style={styleCss}>
                <DoorScene
                    sWidth={convertMmToDoorWidth(doorSpecs.width)}
                    sHeight={convertMmToDoorHeight(doorSpecs.length)}
                    doorHandleVisible={true}
                    doorSpecs={doorSpecs}
                    convertMmToDoorHeight={convertMmToDoorHeight}
                    convertMmToDoorWidth={convertMmToDoorWidth}
                    backgroundGradient={backgroundGradient}
                />
            </div>

            <div className='col-12 col-md-3 p-1 m-2 shadow' style={{ backgroundColor: 'white', fontWeight: 'bold', padding: '1rem' }}>
                <div className='container'>
                    {getForm()}

                </div>
            </div>
        </div>

    )
}

export default App;
