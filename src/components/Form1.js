import React, { useEffect, useState } from 'react';
import doorType1SVG from '../SVGs/type1.svg'
import doorType2SVG from '../SVGs/type2.svg'
import doorType3SVG from '../SVGs/type3.svg'
import doorType4SVG from '../SVGs/type4.svg'
import ToggleSwitch from './ToggleSwitch';
import BackNextComp from './BackNextComp';
import LabelWithRange from './LabelWithRange';



function Form1(props) {
    let {doorSpecs,setDoorSpecs, handleLengthChange, handleWidthChange, handleNumberOfDoorsChange, handleGoBack, handleGoNext } = props
    const doorTypeImages = [doorType1SVG, doorType2SVG, doorType3SVG, doorType4SVG]
    const [showingNumberOfDoors, setShowingNumberOfDoors] = useState([1, 2, 3, 4])

    useEffect(() => {
        if (doorSpecs.doorType === 3) {
            setShowingNumberOfDoors([1, 2])
            if (doorSpecs.numberOfDoors > 2) {
                handleNumberOfDoorsChange(2)
            }
        } else {
            setShowingNumberOfDoors([1, 2, 3, 4])
        }

    }, [doorSpecs.doorType])



    return (
        <div className='col-11'>
            <div>
                <h1 style={{ fontWeight: 'bold' }}>Deur</h1>
            </div>
            <div className='mt-4'>
                <p>Door Type</p>
            </div>
            <div className="row">
                {/* Grids */}
                {doorTypeImages.map((img, index) => (
                    <div
                        key={index}
                        className="grid-hover grid-hover-hover col-6 shadow d-flex align-items-center justify-content-center"
                        style={{ background: 'white', border: '2px none #dee2e6', height: '110px', borderRadius: "5%" }}
                        onClick={() => setDoorSpecs(pre=> {return {...pre,doorType:index + 1}}) } // Passes the corresponding grid number to setDoorType
                    >
                        <img src={img} alt="My SVG Image" />
                    </div>
                ))}
            </div>

            <div>
                <div className='mt-1'>
                    <p>Afmetingen</p>
                    <div className='d-flex'>
                        <div className='d-flex flex-column' style={{ fontWeight: "normal" }}>
                            <small>Lengte</small>
                            <input type="number" value={doorSpecs.length} onChange={(e) => handleLengthChange(e.target.value)} className='form-control mt-1' style={{ borderRadius: '7px', width: "95%" }} />
                        </div>
                        <div className='d-flex flex-column' style={{ fontWeight: "normal" }}>
                            <small>Breedte</small>
                            <input type="number" value={doorSpecs.width} onChange={(e) => handleWidthChange(e.target.value)} className='form-control mt-1' style={{ borderRadius: '7px', width: "95%" }} />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <LabelWithRange range={showingNumberOfDoors} label="Aantal" number={doorSpecs.numberOfDoors} setNumber={handleNumberOfDoorsChange} />
            </div>

            <div>
                <div className='mt-2'>
                    <p>Draairichting</p>
                    <div className='d-flex align-items-center' style={{ fontWeight: 'normal', marginTop: '-10px' }}>
                        <small>Left</small>
                        <div className='m-2'>
                            <ToggleSwitch isOn={ doorSpecs.doorHandleDirection} onToggle={() => setDoorSpecs(pre=>{return {...pre,doorHandleDirection:!pre.doorHandleDirection}})} />
                        </div>
                        <small>Right</small>
                    </div>
                </div>
            </div>
            <div>
                <BackNextComp middleLabel="1/4" onGoBack={handleGoBack} onGoNext={handleGoNext} backDisabled={true} />
            </div>
        </div>
    );
}

export default Form1;
