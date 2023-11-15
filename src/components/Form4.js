import React, { useEffect, useState } from 'react';
import BackNextComp from './BackNextComp';
import ToggleSwitch from './ToggleSwitch';
import LabelWithInput from './LabelWithInput';
import ColorfulCircle from './ColorfulCircle';



function Form4(props) {
    let { doorSpecs, setDoorSpecs, handleGoBack, handleGoNext } = props
    function setFrameColor(color) {
        setDoorSpecs(pre => {
            return {
                ...pre,
                frameColor: color
            }
        })
    }
    function handleColorCodeChange(code) {
        let colorCode = code
        if (code[0] != '#') {
            colorCode = '#' + code
        }
        setFrameColor(colorCode)
    }


    return (
        <div className='col-11' >
            <div>
                <h1 style={{ fontWeight: 'bold' }}>Frame</h1>
            </div>
            <div>
                <b><h5>Popular Colors</h5></b>
                <div className='d-flex row' >
                    <ColorfulCircle color="#293133" size="45px" setColor={setFrameColor} chosenColor={doorSpecs.frameColor} />
                    <ColorfulCircle color="lightgreen" size="45px" setColor={setFrameColor} chosenColor={doorSpecs.frameColor} />
                    <ColorfulCircle color="#763c28" size="45px" setColor={setFrameColor} chosenColor={doorSpecs.frameColor} />
                    <ColorfulCircle color="#aea04b" size="45px" setColor={setFrameColor} chosenColor={doorSpecs.frameColor} />
                    <ColorfulCircle color="#C0C2C9" size="45px" setColor={setFrameColor} chosenColor={doorSpecs.frameColor} />
                    <ColorfulCircle color="#C04000" size="45px" setColor={setFrameColor} chosenColor={doorSpecs.frameColor} />
                    <ColorfulCircle color="#D2B48C" size="45px" setColor={setFrameColor} chosenColor={doorSpecs.frameColor} />
                    <ColorfulCircle color="#FF00FF" size="45px" setColor={setFrameColor} chosenColor={doorSpecs.frameColor} />
                    
                </div>
                <div>
                    <div className='d-flex flex-column mt-1' >
                        <h6>Color Code</h6>
                        <input type="text" value={doorSpecs.frameColor} onChange={(e) => handleColorCodeChange(e.target.value)} className='form-control mt-1' style={{ borderRadius: '7px', width: "95%", marginTop: "-1vh" }} />
                    </div>
                </div>
            </div>


            <div>
                <BackNextComp middleLabel="4/4" onGoBack={handleGoBack} onGoNext={handleGoNext} />
            </div>
        </div>
    );
}

export default Form4;
