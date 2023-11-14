import React, { useEffect, useState } from 'react';
import BackNextComp from './BackNextComp';
import ToggleSwitch from './ToggleSwitch';
import LabelWithInput from './LabelWithInput';



function Form2(props) {
    let { doorType, handleGoBack, handleGoNext, panelTypePosition, setPanelTypePosition,
        topPanel, setTopPanel, bottomSteelPanel, setBottomSteelPanel, topPanelLength,
        setTopPanelLength, bottomSteelPanelLength, setBottomSteelPanelLength,
        leftPanelWidth, setLeftPanelWidth, rightPanelWidth, setRightPanelWidth
    } = props


    function handlePanelLengthAutoFixing() {
        if (panelTypePosition === 1) {
            setLeftPanelWidth(0)
            setRightPanelWidth(0)
        }
        if (panelTypePosition === 2) {
            setRightPanelWidth(0)
        }
        if (panelTypePosition === 3) {
            setLeftPanelWidth(0)
        }
        if(doorType===3){
            setLeftPanelWidth(0)
            setRightPanelWidth(0)
            setTopPanelLength(0)            
        }
    }

    handlePanelLengthAutoFixing()



    return (
        <div className='col-11' >
            <div>
                <h1 style={{ fontWeight: 'bold' }}>Panels</h1>
            </div>
            {doorType === 3 ?
                <i><small style={{ fontWeight: 'normal' }}>A sliding door cannot be mounted on a side or top panel. However, extra fixed panels can be installed. Please contact our sales department to discuss further possibilities</small></i>
                :
                <div>
                    <div className='mt-3'>
                        <p>Zig Panels</p>
                    </div>
                    <div className='mt-2'>
                        <h6>Position</h6>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className={`col-6 d-flex justify-content-center align-items-center ${panelTypePosition === 1 ? 'black-background-white-text' : 'grid-hover grid-hover-hover'}`} onClick={() => setPanelTypePosition(1)} style={{ border: '1px solid black', height: '6vh', borderTopLeftRadius: "10%", cursor: "pointer" }}>
                                Geen
                            </div>
                            <div className={`col-6 d-flex justify-content-center align-items-center ${panelTypePosition === 2 ? 'black-background-white-text' : 'grid-hover grid-hover-hover'}`} onClick={() => setPanelTypePosition(2)} style={{ border: '1px solid black', height: '6vh', borderTopRightRadius: "10%", cursor: "pointer" }}>
                                Links
                            </div>
                        </div>
                        <div className="row">
                            <div className={`col-6 d-flex justify-content-center align-items-center ${panelTypePosition === 3 ? 'black-background-white-text' : 'grid-hover grid-hover-hover'}`} onClick={() => setPanelTypePosition(3)} style={{ border: '1px solid black', height: '6vh', borderBottomLeftRadius: "10%", cursor: "pointer" }}>
                                Rechts
                            </div>
                            <div className={`col-6 d-flex justify-content-center align-items-center ${panelTypePosition === 4 ? 'black-background-white-text' : 'grid-hover grid-hover-hover'}`} onClick={() => setPanelTypePosition(4)} style={{ border: '1px solid black', height: '6vh', borderBottomRightRadius: "10%", cursor: "pointer" }}>
                                Beide
                            </div>
                        </div>
                    </div>
                    {panelTypePosition === 2 || panelTypePosition === 4 ?
                        <div className='mt-2'>
                            <LabelWithInput label="Left side panel width" value={leftPanelWidth} setValue={setLeftPanelWidth} />
                        </div>
                        :
                        ''}
                    {panelTypePosition === 3 || panelTypePosition === 4 ?
                        <div className='mt-2'>
                            <LabelWithInput label="Right side panel width" value={rightPanelWidth} setValue={setRightPanelWidth} />
                        </div>
                        :
                        ''}
                    <div className='mt-4'>
                        <p>Top Panel</p>
                        <ToggleSwitch isOn={topPanel} onToggle={() => { setTopPanel(pre => { if (pre) { setTopPanelLength(0) }; return !pre }) }} />
                        {topPanel ?
                            <LabelWithInput label="Length" value={topPanelLength} setValue={setTopPanelLength} />
                            : ''}

                    </div>
                </div>
            }
            <div className='mt-3'>
                <p>Bottom Steel Panel</p>
                <ToggleSwitch isOn={bottomSteelPanel} onToggle={() => { setBottomSteelPanel(pre => { if (pre) { setBottomSteelPanelLength(0) }; return !pre }) }} />
                {bottomSteelPanel ?
                    <LabelWithInput label="Length" value={bottomSteelPanelLength} setValue={setBottomSteelPanelLength} />
                    : ''}

            </div>

            <div>
                <BackNextComp onGoBack={handleGoBack} onGoNext={handleGoNext} nextDisabled={true} />
            </div>
        </div>
    );
}

export default Form2;
