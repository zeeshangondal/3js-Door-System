import React, { useEffect, useState } from 'react';
import doorType1SVG from '../SVGs/type1.svg'
import doorType2SVG from '../SVGs/type2.svg'
import doorType3SVG from '../SVGs/type3.svg'
import doorType4SVG from '../SVGs/type4.svg'



function Form1(props) {
    let { length, width, handleLengthChange, handleWidthChange, doorType, setDoorType,numberOfDoors, handleNumberOfDoorsChange ,doorHandleDirection, setDoorHandleDirection} = props
    const [showingNumberOfDoors,setShowingNumberOfDoors]=useState([1,2,3,4])
    useEffect(()=>{
        if(doorType===3){
            setShowingNumberOfDoors([1,2])
            if(numberOfDoors>2){
                handleNumberOfDoorsChange(2)
            }
        }else{
            setShowingNumberOfDoors([1,2,3,4])
        }
        
    },[doorType])
 
    // Styles
    const activeStyle = {
        cursor:'pointer',
        backgroundColor: '#1f2937',
        color: 'white',
        padding: '5px',
        border: 'none',
    };

    const defaultStyle = {
        cursor:'pointer',
        backgroundColor: 'white',
        color: 'black',
        padding: '5px',
        border: 'none',
    };

    const toggleStyle = {
        container: {
            display: 'flex',
            justifyContent: doorHandleDirection ? 'flex-end' : 'flex-start',
            backgroundColor:  'black',
            borderRadius: '20px',
            width: '50px',
            padding: '2px',
            cursor: 'pointer',
        },
        circle: {
            height: '20px',
            width: '20px',
            backgroundColor: 'white',
            borderRadius: '50%',
        },
    };

    return (
        <div className='col-11'>
            <div>
                <h2 style={{ fontWeight: 'bold' }}>Deur</h2>
            </div>
            <div className='mt-4'>
                <p>Deurtype</p>
            </div>
            <div className="row">
                {/* Grids */}
                {['Type 1', 'Type 2', 'Type 3', 'Type 4'].map((grid, index) => (
                    <div
                        key={index}
                        className="grid-hover grid-hover-hover col-6 shadow d-flex align-items-center justify-content-center"
                        style={{ background: '#f8f9fa', border: '1px none #dee2e6', height: '100px' }}
                        onClick={() => setDoorType(index + 1)} // Passes the corresponding grid number to setDoorType
                    >
                        {grid}
                    </div>
                ))}
            </div>

            <div>
                <div className='mt-1'>
                    <p>Afmetingen</p>
                    <div className='d-flex'>
                        <div className='d-flex flex-column' style={{ fontWeight: "normal" }}>
                            <small>Lengte</small>
                            <input type="number" value={length}  onChange={(e) => handleLengthChange(e.target.value)} className='form-control mt-1' style={{ borderRadius: '7px', width: "95%" }} />
                        </div>
                        <div className='d-flex flex-column' style={{ fontWeight: "normal" }}>
                            <small>Breedte</small>
                            <input type="number" value={width}  onChange={(e) => handleWidthChange(e.target.value)} className='form-control mt-1' style={{ borderRadius: '7px', width: "95%" }} />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className='mt-2'>
                    <p>Aantal</p>
                    <div>
                        <div className="d-flex" style={{ marginTop: '-9px' }}>
                            {/* Number selectors */}
                            {showingNumberOfDoors.map((number) => (
                                <div
                                    key={number}
                                    style={numberOfDoors === number ? activeStyle : defaultStyle}
                                    onClick={() => handleNumberOfDoorsChange(number)}
                                    className={`px-3 py-2 ${number === 1 ? 'rounded-left' : ''} ${number === 4 ? 'rounded-right' : ''}`}
                                >
                                    {number}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className='mt-2'>
                    <p>Draairichting</p>
                    <div className='d-flex align-items-center' style={{ fontWeight: 'normal', marginTop: '-10px' }}>
                        <small>Left</small>
                        <div className='m-2' style={toggleStyle.container} onClick={()=>setDoorHandleDirection(prev=>!prev)}>
                            <div style={toggleStyle.circle}></div>
                        </div>
                        <small>Right</small>
                    </div>
                </div>
            </div>
            <div>
                <div className='mt-2 container'>
                    <div className='d-flex justify-content-between'>
                        <button className='btn-primary' disabled style={{ fontWeight: "bold", width: "40%", padding: "5px", backgroundColor: 'lightgray', border: 'none', borderRadius: "7%" }}>Vorige Stap</button>
                        <button className='btn-primary' style={{ fontWeight: "bold", width: "40%", padding: "5px", backgroundColor: '#1f2937', border: 'none', borderRadius: "7%" }}>Volgende Stap</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Form1;
