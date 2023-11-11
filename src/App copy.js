import './App.css';
import React, { useState, useEffect, createContext, useContext } from 'react'

function App() {

    const [active, setActive] = useState(1);
    const [isToggled, setIsToggled] = useState(false);

    const toggleStyle = {
        container: {
            display: 'inline-block',
            width: '50px',
            height: '25px',
            backgroundColor: '#1f2937',
            borderRadius: '15px',
            position: 'relative',
            transition: 'background-color 0.2s',
            cursor: 'pointer',
        },
        circle: {
            width: '20px',
            height: '20px',
            backgroundColor: 'white',
            borderRadius: '50%',
            position: 'absolute',
            top: '2.5px',
            left: isToggled ? '28.5px' : '2.5px', // moves the circle based on toggle state
            transition: 'left 0.2s',
        },
    };

    const handleToggle = () => {
        setIsToggled(!isToggled);
    };

    const handleClick = (number) => {
        setActive(number);
    };

    const activeStyle = {
        backgroundColor: '#1f2937', // This is the color you want on click, Bootstrap's primary color
        color: 'white',
        padding: '0.5rem 1rem',
    };

    const defaultStyle = {
        padding: '0.5rem 1rem',
        color: 'black', // Default text color
    };

    return (
        <div className='d-flex mt-3'>
            <div className='col-9 container p-2 m-1' style={{backgroundColor:'gray' , borderRadius:"2%"}}>

            </div>
            <div className='col-3 shadow container' style={{ backgroundColor: 'white', fontWeight: 'bold', paddingLeft: '17px' }}>
                <div>
                    <h2 style={{ fontWeight: 'bold' }}>Deur</h2>
                </div>
                <div className='mt-4'>
                    <p>Deurtype</p>
                </div>
                <div className="row ">
                    <div className="col-6 d-flex align-items-center justify-content-center " style={{ background: '#f8f9fa', border: '1px solid #dee2e6', height: '100px' }}>
                        Grid 1
                    </div>
                    <div className="col-6 d-flex align-items-center justify-content-center" style={{ background: '#f8f9fa', border: '1px solid #dee2e6', height: '100px' }}>
                        Grid 2
                    </div>
                    <div className="col-6 d-flex align-items-center justify-content-center" style={{ background: '#f8f9fa', border: '1px solid #dee2e6', height: '100px' }}>
                        Grid 3
                    </div>
                    <div className="col-6 d-flex align-items-center justify-content-center" style={{ background: '#f8f9fa', border: '1px solid #dee2e6', height: '100px' }}>
                        Grid 4
                    </div>
                </div>
                <div>
                    <div className='mt-1'>
                        <p>Afmetingen</p>
                        <div className='d-flex'>
                            <div className='d-flex flex-column' style={{ fontWeight: "normal" }}>
                                <small className='' >Lengte</small>
                                <input type="number" className='form-control mt-1' style={{ borderRadius: '7px', width: "95%" }} />
                            </div>
                            <div className='d-flex flex-column' style={{ fontWeight: "normal" }}>
                                <small >Breedte</small>
                                <input type="number" className='form-control mt-1' style={{ borderRadius: '7px', width: "95%" }} />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='mt-1'>
                        <p>Aantal</p>
                        <div>
                            <div className="d-flex" style={{ marginTop: '-9px' }}>
                                <div
                                    style={active === 1 ? activeStyle : { ...defaultStyle, cursor: 'pointer' }}
                                    onClick={() => handleClick(1)}
                                    className="rounded-left"
                                >
                                    1
                                </div>
                                <div className="d-flex border" style={{ borderColor: '#343a40', cursor: 'pointer' }}>
                                    {['2', '3'].map((number) => (
                                        <div
                                            key={number}
                                            className="px-3 py-2 border-left"
                                            style={active === number ? activeStyle : defaultStyle}
                                            onClick={() => handleClick(number)}
                                        >
                                            {number}
                                        </div>
                                    ))}
                                    <div
                                        style={active === 4 ? activeStyle : { ...defaultStyle, cursor: 'pointer' }}
                                        onClick={() => handleClick(4)}
                                        className="rounded-right"
                                    >
                                        4
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='mt-2'>
                        <p>Draairichting</p>
                        <div className='d-flex align-items-center' style={{fontWeight:'normal' , marginTop:'-10px'}}>
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
                            <button className='btn-primary' disabled style={{fontWeight:"bold", width:"40%", padding:"10px" , backgroundColor: 'lightgray',border:'none', borderRadius:"7%"}}>Vorige Stap</button>
                            <button className='btn-primary' style={{fontWeight:"bold" ,width:"40%", padding:"10px" , backgroundColor: '#1f2937',border:'none' ,borderRadius:"7%"}}>Volgende Stap</button>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default App;
