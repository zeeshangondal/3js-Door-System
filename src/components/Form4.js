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
        handleGlassTexture('')
        setGlassColor(code)
    }
    function handleGlassTexture(glassTexture) {
        setGlassColor('')
        setDoorSpecs(pre=>{
            return{
                ...pre,
                textureImage:glassTexture,
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

            <div className='mt-2'>
                <b><h5>Glass Types</h5></b>
                <div className='d-flex flex-row' >
                    <CircularImage size="10vh" glassType="10" label="Transparent" textureValue="gray" clickedTextureValue={doorSpecs.glassColor} onClick={()=>{handleGlassColorCodeChange("gray")}}/>
                    <CircularImage size="10vh" glassType="2" label="Flutes"  textureValue="fluted.jpg" clickedTextureValue={doorSpecs.textureImage} onClick={()=>{handleGlassTexture("fluted.jpg")}} />
                    <CircularImage size="10vh" glassType="3" label="Listral D" textureValue="listral.jpg" clickedTextureValue={doorSpecs.textureImage}  onClick={()=>{handleGlassTexture("listral.jpg")}}/>
                    <CircularImage size="10vh" glassType="4" label="Kathderaal Max" textureValue="cathedral.jpg" clickedTextureValue={doorSpecs.textureImage} onClick={()=>{handleGlassTexture("cathedral.jpg")}} />
                </div>
                <div className='d-flex flex-row' >

                    <CircularImage size="10vh" glassType="5" label="Visiosun" textureValue="clear.png" clickedTextureValue={doorSpecs.textureImage} onClick={()=>{handleGlassTexture("clear.png")}}/>
                    <CircularImage size="10vh" glassType="6" label="Fume Grijis" textureValue="#4e5660" clickedTextureValue={doorSpecs.glassColor} onClick={()=>{handleGlassColorCodeChange("#4e5660")}} />
                    <CircularImage size="10vh" glassType="7" label="Fume Bruin" textureValue="#908377" clickedTextureValue={doorSpecs.glassColor} onClick={()=>{handleGlassColorCodeChange("#908377")}} />
                    <CircularImage size="10vh" glassType="8" label="Dark Gray" textureValue="#383c44" clickedTextureValue={doorSpecs.glassColor} onClick={()=>{handleGlassColorCodeChange("#383c44")}} />
                </div>
                <div className='d-flex flex-row' >

                    <CircularImage size="10vh" glassType="9" label="Melk" textureValue="#979da2" clickedTextureValue={doorSpecs.glassColor} onClick={()=>{handleGlassColorCodeChange("#979da2")}} />
                    <CircularImage size="10vh" glassType="1" label="Staaldraad" textureValue="#868e97" clickedTextureValue={doorSpecs.glassColor} onClick={()=>{handleGlassColorCodeChange("#868e97")}} />
                    <CircularImage size="10vh" glassType="11" label="Black" textureValue="#070708" clickedTextureValue={doorSpecs.glassColor}  onClick={()=>{handleGlassColorCodeChange("#070708")}}/>
                    <CircularImage size="10vh" glassType="12" label="White" textureValue="#959ca8" clickedTextureValue={doorSpecs.glassColor} onClick={()=>{handleGlassColorCodeChange("#959ca8")}} />

                </div>
            </div>


            <div>
                <BackNextComp middleLabel="4/4" nextButtonLabel="Order" onGoBack={handleGoBack} onGoNext={() => alert("Place Order Cancel?")} />
            </div>
        </div>
    );
}

export default Form4;
