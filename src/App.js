import './App.css';
import React, { useState, useEffect, createContext, useContext } from 'react'
import DoorScene from './components/DoorScene';

import Form1 from './components/Form1';
import Form2 from './components/Form2';
import Form3 from './components/Form3';
import Form4 from './components/Form4';
import logo from './components/logo.png'
import { Button, Modal } from 'react-bootstrap';

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
        if (stepNumber == 4) {
            //open model
            handleShow()
            return
        }
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
        margin: '-2vh 1vh 1vh 1vh'
    }
    //mobile
    let mobileStyle = {
        height: '45vh',
        background: backgroundGradient,
        borderRadius: "7%",
        padding: '3rem',
        margin: '-2vh 1vh 1vh 1vh',
        marginLeft: '2vh',
    }
    let styleCss = (window.innerWidth <= 600 ? mobileStyle : desktopStyle)

    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    return (
        <div>
            <div style={{ width: '20vh', height: '4vh', margin: (window.innerWidth <= 600 ? '3px 0px 1px 2vh' : '3px 0px 1px 1vh') }}>
                <img
                    src={logo}
                    alt="Your Image"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>
            <div className='d-flex flex-column flex-md-row mt-3'>
                <div className=' col-11 col-md-9' style={{ position: 'relative', ...styleCss }}>
                    <DoorScene
                        sWidth={convertMmToDoorWidth(doorSpecs.width)}
                        sHeight={convertMmToDoorHeight(doorSpecs.length)}
                        doorHandleVisible={true}
                        doorSpecs={doorSpecs}
                        convertMmToDoorHeight={convertMmToDoorHeight}
                        convertMmToDoorWidth={convertMmToDoorWidth}
                        backgroundGradient={backgroundGradient}
                    />
                    <button
                        type="button"
                        className={`btn btn-light ${window.innerWidth<=600 ? 'btn-sm':'btn-lg'}`}
                        style={{
                            position: 'absolute',
                            bottom: '0',
                            right: '0',
                            marginBottom: '1%',
                            marginRight: '1%',
                            padding: (window.innerWidth<=600 ? '1vh':'2vh'),
                            fontSize:(window.innerWidth<=600 ? '1vh':'2vh'),
                            borderRadius:'3vh'
                        }}
                        // style={{ position: 'absolute', bottom: '0', right: '0', marginBottom: '20px', marginRight: '20px', size:'3vh', borderRadius:'3vh', padding:'20px' }}
                        onClick={() => handleShow()}
                    >
                        Offerte aanvragen
                    </button>
                </div>


                <div className='col-12 col-md-3  shadow' style={{ backgroundColor: 'white', fontWeight: 'bold', padding: '1rem', marginTop: '-2vh' }}>
                    <div className='container'>
                        {getForm()}

                    </div>
                </div>
            </div>
            <Modal show={showModal} onHide={handleClose} centered size="lg" className="custom-modal">
                <Modal.Body>
                    <>
                        <div>
                            <h3>Offerte aanvragen</h3><br />
                            <h5>Wilt u de offerte aanvragen of een extra configuratie toevoegen?</h5><br />
                        </div>
                        <div>
                            <p style={{ fontStyle: 'italic' }}>Indien u nog geen configuraties heeft opgeslagen, zal de openstaande configuratie verzonden worden. Anders worden enkel de configuraties die opgeslagen zijn verzonden!</p>
                        </div>
                    </>

                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex justify-content-between w-100">
                        <Button variant="dark" style={{ borderRadius: '10px', padding: '10px' }}>
                            <b>Offerte aanvragen</b>
                        </Button>

                        <Button variant="dark" onClick={handleClose} style={{ borderRadius: '10px', padding: '10px' }}>
                            <b>Annuleren</b>
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default App;
