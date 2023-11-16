import React, { useEffect, useState } from 'react';
import BackNextComp from './BackNextComp';
import ToggleSwitch from './ToggleSwitch';
import LabelWithInput from './LabelWithInput';
import ColorfulCircle from './ColorfulCircle';
import CircularImage from './CircularImage';



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
    function setGlassColor(color) {
        setDoorSpecs(pre => {
            return {
                ...pre,
                glassColor: color
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

    function handleGlassColorCodeChange(code) {
        setGlassTexture('')
        setGlassColor(code)
    }
    function setGlassTexture(glassTexture) {
        setGlassColor('')
        setDoorSpecs(pre=>{
            return{
                ...pre,
                texture:glassTexture,
            }
        })
    }




    return (
        <div className='col-11' >
            <div>
                <h1 style={{ fontWeight: 'bold' }}>Frame</h1>
            </div>
            <div className='mt-1'>
                <b><h5>Popular Colors</h5></b>
                <div className='d-flex row' >
                    <ColorfulCircle color="#293133" size="45px" setColor={setFrameColor} chosenColor={doorSpecs.frameColor} />
                    <ColorfulCircle color="#90EE90" size="45px" setColor={setFrameColor} chosenColor={doorSpecs.frameColor} />
                    <ColorfulCircle color="#aea04b" size="45px" setColor={setFrameColor} chosenColor={doorSpecs.frameColor} />
                    <ColorfulCircle color="#C0C2C9" size="45px" setColor={setFrameColor} chosenColor={doorSpecs.frameColor} />
                    <ColorfulCircle color="#C04000" size="45px" setColor={setFrameColor} chosenColor={doorSpecs.frameColor} />
                    <ColorfulCircle color="#D2B48C" size="45px" setColor={setFrameColor} chosenColor={doorSpecs.frameColor} />
                </div>
                <div>
                    <div className='d-flex flex-column mt-1' >
                        <h6>Color Code</h6>
                        <input type="text" value={doorSpecs.frameColor} onChange={(e) => handleColorCodeChange(e.target.value)} className='form-control mt-1' style={{ borderRadius: '7px', width: "95%", marginTop: "-1vh" }} />
                    </div>
                </div>
            </div>

            <div>
                <b><h5>Glass Types</h5></b>
                <div className='d-flex flex-row' >
                    <CircularImage size="80px" glassType="10" label="Transparent" onClick={()=>{handleGlassColorCodeChange("gray")}}/>
                    <CircularImage size="80px" glassType="2" label="Flutes"  />
                    <CircularImage size="80px" glassType="3" label="Listral D" />
                    <CircularImage size="80px" glassType="4" label="Kathderaal Max" />
                </div>
                <div className='d-flex flex-row' >

                    <CircularImage size="80px" glassType="5" label="Visiosun" />
                    <CircularImage size="80px" glassType="6" label="Fume Grijis" onClick={()=>{handleGlassColorCodeChange("#4e5660")}} />
                    <CircularImage size="80px" glassType="7" label="Fume Bruin" onClick={()=>{handleGlassColorCodeChange("#908377")}} />
                    <CircularImage size="80px" glassType="8" label="Dark Gray" onClick={()=>{handleGlassColorCodeChange("#383c44")}} />
                </div>
                <div className='d-flex flex-row' >

                    <CircularImage size="80px" glassType="9" label="Melk" onClick={()=>{handleGlassColorCodeChange("#979da2")}} />
                    <CircularImage size="80px" glassType="1" label="Staaldraad" onClick={()=>{handleGlassColorCodeChange("#868e97")}} />
                    <CircularImage size="80px" glassType="11" label="Black"  onClick={()=>{handleGlassColorCodeChange("#070708")}}/>
                    <CircularImage size="80px" glassType="12" label="White" onClick={()=>{handleGlassColorCodeChange("#959ca8")}} />

                </div>
                {/* <div className='d-flex row' >
                    <ColorfulCircle color="#FF00FF" size="45px" setColor={setGlassColor} chosenColor={doorSpecs.glassColor} />
                    <ColorfulCircle color="#D2B48C" size="45px" setColor={setGlassColor} chosenColor={doorSpecs.glassColor} />
                    <ColorfulCircle color="#C04000" size="45px" setColor={setGlassColor} chosenColor={doorSpecs.glassColor} />
                    <ColorfulCircle color="#C0C2C9" size="45px" setColor={setGlassColor} chosenColor={doorSpecs.glassColor} />
                    <ColorfulCircle color="#aea04b" size="45px" setColor={setGlassColor} chosenColor={doorSpecs.glassColor} />
                    <ColorfulCircle color="#C0C2C9" size="45px" setColor={setGlassColor} chosenColor={doorSpecs.glassColor} />
                    <ColorfulCircle color="#293133" size="45px" setColor={setGlassColor} chosenColor={doorSpecs.glassColor} />
                    <ColorfulCircle color="#90EE90" size="45px" setColor={setGlassColor} chosenColor={doorSpecs.glassColor} />
                    <ColorfulCircle color="#763c28" size="45px" setColor={setGlassColor} chosenColor={doorSpecs.glassColor} />
                </div>
                <div>
                    <div className='d-flex flex-column mt-1' >
                        <h6>Glass Color Code</h6>
                        <input type="text" value={doorSpecs.glassColor} onChange={(e) => handleGlassColorCodeChange(e.target.value)} className='form-control mt-1' style={{ borderRadius: '7px', width: "95%", marginTop: "-1vh" }} />
                    </div>
                </div> */}
            </div>


            <div>
                <BackNextComp middleLabel="4/4" nextButtonLabel="Order" onGoBack={handleGoBack} onGoNext={() => alert("Place Order Cancel?")} />
            </div>
        </div>
    );
}

export default Form4;
