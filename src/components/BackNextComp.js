import React from 'react'

export default function BackNextComp({onGoBack,onGoNext,backDisabled=false,nextDisabled=false , middleLabel , nextButtonLabel="Next Step"}) {
    
    return (
        <div className='mt-2 container'>
            <div className='d-flex justify-content-between align-items-center'>
                <button className='btn-primary' onClick={onGoBack} disabled={backDisabled} style={{ fontWeight: "bold", width: "40%", padding: "5px", backgroundColor: backDisabled? 'lightgray' : '#1f2937', border: 'none', borderRadius: "7%" }}>Back Step</button>
                <div>
                    <h5 className='mt-2' style={{fontWeight:'normal'}}>{middleLabel}</h5>
                </div>
                <button className='btn-primary' onClick={onGoNext} disabled={nextDisabled}  style={{ fontWeight: "bold", width: "40%", padding: "5px", backgroundColor: nextDisabled? 'lightgray' : '#1f2937', border: 'none', borderRadius: "7%" }}>{nextButtonLabel}</button>
            </div>
        </div>
    )
}
