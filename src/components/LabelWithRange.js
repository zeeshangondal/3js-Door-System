import React from 'react'

export default function LabelWithRange({label, number,setNumber}) {
    let range=[1,2,3,4]
        // Styles
        const activeStyle = {
            cursor: 'pointer',
            backgroundColor: '#1f2937',
            color: 'white',
            padding: '5px',
            border: 'none',
        };
    
        const defaultStyle = {
            cursor: 'pointer',
            backgroundColor: 'white',
            color: 'black',
            padding: '5px',
            border: 'none',
        };
    
    return (
        <div>
            <div className='mt-2'>
                <p>{label}</p>
                <div>
                    <div className="d-flex" style={{ marginTop: '-9px' }}>
                        {/* Number selectors */}
                        {range.map((n) => (
                            <div
                                key={n}
                                style={number === n ? activeStyle : defaultStyle}
                                onClick={() => setNumber(n)}
                                className={`px-3 py-2 ${n === 1 ? 'rounded-left' : ''} ${n === 4 ? 'rounded-right' : ''}`}
                            >
                                {n}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
