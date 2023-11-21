import './App.css';
import React, { useState, useEffect, createContext, useContext, useRef } from 'react'
import DoorScene from './components/DoorScene';
import * as THREE from 'three';

import Form1 from './components/Form1';
import Form2 from './components/Form2';
import Form3 from './components/Form3';
import Form4 from './components/Form4';
import logo from './components/logo.jpeg'
import { Button, Modal } from 'react-bootstrap';
import { Form, Row, Col } from 'react-bootstrap';
import html2canvas from 'html2canvas';


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
    frameColor: "#0A0A0A",
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
            captureCanvasAsImage()
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
        margin: '0vh 1vh 1vh 1vh'
    }
    //mobile
    let mobileStyle = {
        height: '45vh',
        background: backgroundGradient,
        borderRadius: "7%",
        padding: '3rem',
        margin: '1vh 1vh 1vh 3vh',
        marginLeft: '2vh',
    }
    let styleCss = (window.innerWidth <= 600 ? mobileStyle : desktopStyle)

    const [showModal, setShowModal] = useState(false);
    const [formShowModal, setFormShowModal] = useState(false);

    const [savedImage,setSavedImage]=useState(null)
    const handleShow = () => {captureCanvasAsImage();setShowModal(true)};
    const handleClose = () => setShowModal(false);

    const handleFormShow = () => setFormShowModal(true);
    const handleFormClose = () => setFormShowModal(false);


    const initialFormState = {
        firstName: '',
        lastName: '',
        email: '',
        telephone: '',
        address: '',
        municipality: '',
        postcode: '',
        country: '',
        vatSystem: '', // Default option
        companyName: '',
        vatNumber: '',
        comments: '',
    };


    const [form, setForm] = useState(initialFormState);

    const handleChange = (field, value) => {
        setForm((prevForm) => ({ ...prevForm, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        alert('Form submitted:');
    };

    const rendererRef = useRef();

    // Your other components and code here

    const captureCanvasAsImage = () => {
        var canvas = rendererRef.current.domElement;
        var image = new Image();
        let url = canvas.toDataURL("image/png");
        console.log(url)
        image.src = canvas.toDataURL("image/png");
        setSavedImage(image)
        // You can append the image to the DOM or handle it as needed
        document.body.appendChild(image);

    }

    return (
        <div>
            <div style={{ width: (window.innerWidth <= 600 ? '15vh' : '20vh'), height: (window.innerWidth <= 600 ? '3vh' : '8vh'), margin: (window.innerWidth <= 600 ? '1vh 0px 3px 3vh' : '1vh 0px 1px 3vh') }}>
                <img
                    src={logo}
                    alt="Your Image"
                    style={{ width: (window.innerWidth <= 600 ? '15vh' : '20vh'), height: (window.innerWidth <= 600 ? '3vh' : '8vh'), objectFit: 'contain' }}
                />
                {/* <button onClick={captureCanvasAsImage}>Capture Canvas</button> */}

            </div>

            <div style={{ marginTop: '1vh' }}>
                <div className='d-flex flex-column flex-md-row'>
                    <div className=' col-10 col-md-9' style={{ position: 'relative', ...styleCss }}>
                        <DoorScene
                            rendererRef={rendererRef}
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
                            className={`btn btn-light grid-hover ${window.innerWidth <= 600 ? 'btn-sm' : 'btn-lg'}`}
                            style={{
                                position: 'absolute',
                                bottom: '0',
                                right: '0',
                                marginBottom: (window.innerWidth <= 600 ? '2%' : '2%'),
                                marginRight: (window.innerWidth <= 600 ? '3%' : '2%'),
                                padding: (window.innerWidth <= 600 ? '1vh' : '2vh'),
                                fontSize: (window.innerWidth <= 600 ? '1vh' : '2vh'),
                                borderRadius: '3vh',
                                border: 'none'
                            }}
                            // style={{ position: 'absolute', bottom: '0', right: '0', marginBottom: '20px', marginRight: '20px', size:'3vh', borderRadius:'3vh', padding:'20px' }}
                            onClick={() => handleShow()}
                        >
                            Offerte aanvragen
                        </button>
                    </div>


                    <div className='col-12 col-md-3  shadow' style={{ backgroundColor: 'white', fontWeight: 'bold', padding: '1rem' }}>
                        <div className='container'>
                            {getForm()}

                        </div>
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
                        <Button variant="dark" style={{ borderRadius: '10px', padding: '10px' }} onClick={() => { handleClose(); handleFormShow() }}>
                            <b>Offerte aanvragen</b>
                        </Button>

                        <Button variant="dark" onClick={handleClose} style={{ borderRadius: '10px', padding: '10px' }}>
                            <b>Annuleren</b>
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>

            <Modal show={formShowModal} onHide={handleFormClose} centered size="lg" className="custom-modal">
                <Modal.Body>
                    <>
                        <div className='container'>
                            <h3>Contactgegevens</h3>
                            <h5>Vul jou contactgegevens in zodat we jou persoonlijk design kunnen versturen!</h5>
                            <br />
                            <div>
                                <Form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Control
                                                    type="text"
                                                    className="custom-input"
                                                    placeholder="First Name"
                                                    value={form.firstName}
                                                    onChange={(e) => handleChange('firstName', e.target.value)}
                                                    required
                                                />
                                            </Form.Group>

                                            <Form.Group>
                                                <Form.Control
                                                    className="custom-input"

                                                    type="text"
                                                    placeholder="Email"
                                                    value={form.email}
                                                    onChange={(e) => handleChange('email', e.target.value)}
                                                    required
                                                />
                                            </Form.Group>

                                            <Form.Group>
                                                <Form.Control
                                                    className="custom-input"

                                                    type="text"
                                                    placeholder="Address"
                                                    value={form.address}
                                                    onChange={(e) => handleChange('address', e.target.value)}
                                                    required
                                                />
                                            </Form.Group>

                                            <Form.Group>
                                                <Form.Control
                                                    className="custom-input"

                                                    type="text"
                                                    placeholder="Municipality"
                                                    value={form.municipality}
                                                    onChange={(e) => handleChange('municipality', e.target.value)}
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Select
                                                    value={form.vatSystem}
                                                    className="custom-input"

                                                    onChange={(e) => handleChange('vatSystem', e.target.value)}
                                                    required
                                                >
                                                    <option value="">Selecteer btw stelsel</option>
                                                    <option value="6% - Renovatie - woning > 10 jaar">{'6% - Renovatie - woning > 10 jaar'}</option>
                                                    <option value="21% - nieuwbouw - woning < 10 jaar">'{'21% - nieuwbouw - woning < 10 jaar'}</option>
                                                    <option value="0% - btw verlegd (btw-nummer verplicht!)">{'0% - btw verlegd (btw-nummer verplicht!)'}</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>

                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Control
                                                    type="text"
                                                    className="custom-input"

                                                    placeholder="Last Name"
                                                    value={form.lastName}
                                                    onChange={(e) => handleChange('lastName', e.target.value)}
                                                    required
                                                />
                                            </Form.Group>

                                            <Form.Group>
                                                <Form.Control
                                                    type="text"
                                                    className="custom-input"

                                                    placeholder="Telephone"
                                                    value={form.telephone}
                                                    onChange={(e) => handleChange('telephone', e.target.value)}
                                                    required
                                                />
                                            </Form.Group>

                                            <Form.Group>
                                                <Form.Control
                                                    type="text"
                                                    className="custom-input"

                                                    placeholder="Postcode"
                                                    value={form.postcode}
                                                    onChange={(e) => handleChange('postcode', e.target.value)}
                                                    required
                                                />
                                            </Form.Group>

                                            <Form.Group>
                                                <Form.Control
                                                    type="text"
                                                    className="custom-input"

                                                    placeholder="Country"
                                                    value={form.country}
                                                    onChange={(e) => handleChange('country', e.target.value)}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <br />
                                    <div className='d-flex flex-row' style={{ alignItems: 'flex-end' }}>
                                        <h3>Bedrijfsgegevens</h3>
                                        <h5>(indien van toepassing)</h5>
                                    </div>

                                    <Row>
                                        <Col>
                                            <Form.Group>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Company Name"
                                                    className="custom-input"

                                                    value={form.companyName}
                                                    onChange={(e) => handleChange('companyName', e.target.value)}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group>
                                                <Form.Control
                                                    type="text"
                                                    className="custom-input"

                                                    placeholder="VAT Number"
                                                    value={form.vatNumber}
                                                    onChange={(e) => handleChange('vatNumber', e.target.value)}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <br />

                                    <div >
                                        <h3>Opmerkingen</h3>
                                    </div>
                                    <Form.Group>
                                        <Form.Control
                                            as="textarea"
                                            className="custom-input"
                                            style={{ height: "100px" }}
                                            placeholder="Type your comments here"
                                            value={form.comments}
                                            onChange={(e) => handleChange('comments', e.target.value)}
                                        />
                                    </Form.Group>

                                    <div>
                                        <input type="checkbox" checked={true} />
                                        <label>Ik geef toestemming om de ingestuurde data te verwerken en om een offerte op naam te ontvangen.</label>
                                    </div>
                                    <br />
                                    <div className="d-flex flex-column w-100">
                                        <Button type="submit" variant="dark" style={{ borderRadius: '10px', padding: '10px' }}>
                                            <b>Offerte aanvragen</b>
                                        </Button>
                                        <br />
                                        <Button variant="dark" onClick={handleFormClose} style={{ borderRadius: '10px', padding: '10px' }}>
                                            <b>Annuleren</b>
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </>

                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>



            <div style={{ textAlign: 'center', marginTop: '5px' }}>
                <h5 style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
                    Powerd by Gravitas
                </h5>
            </div>
        </div>
    )
}

export default App;
