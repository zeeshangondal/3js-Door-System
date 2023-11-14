import React from 'react'

export default function LabelWithInput({label,value,setValue}) {
    return (
        <div className='d-flex flex-column' >
            <p>{label}</p>
            <input type="number" value={value} onChange={(e) => setValue(e.target.value)} className='form-control' style={{ borderRadius: '7px', width: "95%", marginTop:"-1vh" }} />
        </div>)
}
