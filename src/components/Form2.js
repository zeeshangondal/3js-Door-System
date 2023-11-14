import React, { useEffect, useState } from 'react';
import BackNextComp from './BackNextComp';
import ToggleSwitch from './ToggleSwitch';
import LabelWithInput from './LabelWithInput';



function Form2({ handleGoBack, handleGoNext }) {

    return (
        <div className='col-11' >
            <div>
                <h1 style={{ fontWeight: 'bold' }}>Panels</h1>
            </div>
            <div className='mt-3'>
                <p>Zig Panels</p>
            </div>
            <div className='mt-2'>
                <h6>Position</h6>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-6 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', height: '6vh', borderTopLeftRadius: "10%" }}>
                        Geen
                    </div>
                    <div className="col-6 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', height: '6vh', borderTopRightRadius: "10%" }}>
                        Links
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', height: '6vh', borderBottomLeftRadius: "10%" }}>
                        Rechts
                    </div>
                    <div className="col-6 d-flex justify-content-center align-items-center" style={{ border: '1px solid black', height: '6vh', borderBottomRightRadius: "10%" }}>
                        Beide
                    </div>
                </div>
            </div>
            <div className='mt-2'>
                <LabelWithInput label="Left side panel width"/>
            </div>

            <div className='mt-4'>
                <p>Top Panel</p>
                <ToggleSwitch />
            </div>
            <div className='mt-3'>
                <p>Bottom Steel Panel</p>
                <ToggleSwitch />
            </div>
            
            <div>
                <BackNextComp onGoBack={handleGoBack} onGoNext={handleGoNext} nextDisabled={true} />

            </div>
        </div>
    );
}

export default Form2;
