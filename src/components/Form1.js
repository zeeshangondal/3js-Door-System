import React, { useState } from 'react';

function Form1(props) {
    let { length, width, handleLengthChange, handleWidthChange, doorType, setDoorType } = props
    const [active, setActive] = useState(1); // State to manage active grid
    const [toggle, setToggle] = useState(false); // State to manage toggle for direction

    const handleClick = (number) => {
        setActive(number);
    };

    const handleToggle = () => {
        setToggle(!toggle);
    };

    // Styles
    const activeStyle = {
        backgroundColor: '#1f2937',
        color: 'white',
        padding: '5px',
        border: 'none',
    };

    const defaultStyle = {
        backgroundColor: 'white',
        color: 'black',
        padding: '5px',
        border: 'none',
    };

    const toggleStyle = {
        container: {
            display: 'flex',
            justifyContent: toggle ? 'flex-end' : 'flex-start',
            backgroundColor: toggle ? 'green' : 'red',
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
        <div>
            <div>
                <h2 style={{ fontWeight: 'bold' }}>Deur</h2>
            </div>
            <div className='mt-4'>
                <p>Deurtype</p>
            </div>
            <div className="row">
                {/* Grids */}
                {['Grid 1', 'Grid 2', 'Grid 3', 'Grid 4'].map((grid, index) => (
                    <div
                        key={index}
                        className="grid-hover grid-hover-hover col-6 d-flex align-items-center justify-content-center"
                        style={{ background: '#f8f9fa', border: '1px solid #dee2e6', height: '100px' }}
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
                            <input type="number" value={length} placeholder='2500' onChange={(e) => handleLengthChange(e.target.value)} className='form-control mt-1' style={{ borderRadius: '7px', width: "95%" }} />
                        </div>
                        <div className='d-flex flex-column' style={{ fontWeight: "normal" }}>
                            <small>Breedte</small>
                            <input type="number" value={width} placeholder='1000' onChange={(e) => handleWidthChange(e.target.value)} className='form-control mt-1' style={{ borderRadius: '7px', width: "95%" }} />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className='mt-1'>
                    <p>Aantal</p>
                    <div>
                        <div className="d-flex" style={{ marginTop: '-9px' }}>
                            {/* Number selectors */}
                            {[1, 2, 3, 4].map((number) => (
                                <div
                                    key={number}
                                    style={active === number ? activeStyle : defaultStyle}
                                    onClick={() => handleClick(number)}
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
                        <small>Links</small>
                        <div className='m-2' style={toggleStyle.container} onClick={handleToggle}>
                            <div style={toggleStyle.circle}></div>
                        </div>
                        <small>Rechts</small>
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
