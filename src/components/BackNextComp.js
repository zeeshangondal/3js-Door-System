import React from 'react'

export default function BackNextComp({onGoBack,onGoNext,backDisabled=false,nextDisabled=false}) {
    
    return (
        <div className='mt-2 container'>
            <div className='d-flex justify-content-between'>
                <button className='btn-primary' onClick={onGoBack} disabled={backDisabled} style={{ fontWeight: "bold", width: "40%", padding: "5px", backgroundColor: backDisabled? 'lightgray' : '#1f2937', border: 'none', borderRadius: "7%" }}>Back Step</button>
                <button className='btn-primary' onClick={onGoNext} disabled={nextDisabled}  style={{ fontWeight: "bold", width: "40%", padding: "5px", backgroundColor: nextDisabled? 'lightgray' : '#1f2937', border: 'none', borderRadius: "7%" }}>Next Step</button>
            </div>
        </div>
    )
}
