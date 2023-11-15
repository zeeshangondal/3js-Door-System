import React, { useEffect, useState } from 'react';
import BackNextComp from './BackNextComp';
import ToggleSwitch from './ToggleSwitch';
import LabelWithInput from './LabelWithInput';



function Form2(props) {
    let { doorSpecs, setDoorSpecs, handleGoBack, handleGoNext,
        // topPanel, setTopPanel, bottomSteelPanel, setBottomSteelPanel, topPanelLength,
        // setTopPanelLength, bottomSteelPanelLength, setBottomSteelPanelLength,
    } = props


    function setLeftPanelWidth(Width) {
        setDoorSpecs(pre => {
            return {
                ...pre,
                leftPanel: {
                    ...pre.leftPanel,
                    width: Width
                }
            }
        })
    }
    function setRightPanelWidth(Width) {
        setDoorSpecs(pre => {
            return {
                ...pre,
                rightPanel: {
                    ...pre.rightPanel,
                    width: Width
                }
            }
        })
    }
    function setTopPanelLength(Length) {
        setDoorSpecs(pre => {
            return {
                ...pre,
                topPanel: {
                    ...pre.topPanel,
                    length: Length
                }
            }
        })
    }
    function setBottomSteelPanelLength(Length) {
        setDoorSpecs(pre => {
            return {
                ...pre,
                bottomSteelPanel: {
                    ...pre.bottomSteelPanel,
                    length: Length
                }
            }
        })
    }
    function filpTopPanelInclude() {
        if (doorSpecs.topPanel.include) {
            setTopPanelLength(0)
        }
        setDoorSpecs(pre => {
            return {
                ...pre,
                topPanel: {
                    ...pre.topPanel,
                    include: !pre.topPanel.include
                }
            }
        })
    }
    function filpBottomSteelPanelInclude() {
        if (doorSpecs.bottomSteelPanel.include) {
            setBottomSteelPanelLength(0)
        }
        setDoorSpecs(pre => {
            return {
                ...pre,
                bottomSteelPanel: {
                    ...pre.bottomSteelPanel,
                    include: !pre.bottomSteelPanel.include
                }
            }
        })
    }

    function handlePanelLengthAutoFixing() {
        if (doorSpecs.panelTypePosition === 1) {
            setLeftPanelWidth(0)
            setRightPanelWidth(0)
        }
        if (doorSpecs.panelTypePosition === 2) {
            setRightPanelWidth(0)
        }
        if (doorSpecs.panelTypePosition === 3) {
            setLeftPanelWidth(0)
        }
        if (doorSpecs.doorType === 3) {
            setLeftPanelWidth(0)
            setRightPanelWidth(0)
            setTopPanelLength(0)
        }
    }

    useEffect(() => {
        handlePanelLengthAutoFixing()
    }, [doorSpecs.panelTypePosition, doorSpecs.doorType])

    function setPanelTypePosition(newPosition) {
        setDoorSpecs(pre => {
            return { ...pre, panelTypePosition: newPosition }
        })
    }


    return (
        <div className='col-11' >
            <div>
                <h1 style={{ fontWeight: 'bold' }}>Panels</h1>
            </div>
            {doorSpecs.doorType === 3 ?
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
                            <div className={`col-6 d-flex justify-content-center align-items-center ${doorSpecs.panelTypePosition === 1 ? 'black-background-white-text' : 'grid-hover grid-hover-hover'}`} onClick={() => setPanelTypePosition(1)} style={{ border: '1px solid black', height: '6vh', borderTopLeftRadius: "10%", cursor: "pointer" }}>
                                Geen
                            </div>
                            <div className={`col-6 d-flex justify-content-center align-items-center ${doorSpecs.panelTypePosition === 2 ? 'black-background-white-text' : 'grid-hover grid-hover-hover'}`} onClick={() => setPanelTypePosition(2)} style={{ border: '1px solid black', height: '6vh', borderTopRightRadius: "10%", cursor: "pointer" }}>
                                Links
                            </div>
                        </div>
                        <div className="row">
                            <div className={`col-6 d-flex justify-content-center align-items-center ${doorSpecs.panelTypePosition === 3 ? 'black-background-white-text' : 'grid-hover grid-hover-hover'}`} onClick={() => setPanelTypePosition(3)} style={{ border: '1px solid black', height: '6vh', borderBottomLeftRadius: "10%", cursor: "pointer" }}>
                                Rechts
                            </div>
                            <div className={`col-6 d-flex justify-content-center align-items-center ${doorSpecs.panelTypePosition === 4 ? 'black-background-white-text' : 'grid-hover grid-hover-hover'}`} onClick={() => setPanelTypePosition(4)} style={{ border: '1px solid black', height: '6vh', borderBottomRightRadius: "10%", cursor: "pointer" }}>
                                Beide
                            </div>
                        </div>
                    </div>
                    {doorSpecs.panelTypePosition === 2 || doorSpecs.panelTypePosition === 4 ?
                        <div className='mt-2'>
                            <LabelWithInput label="Left side panel width" value={doorSpecs.leftPanel.width} setValue={setLeftPanelWidth} />
                        </div>
                        :
                        ''}
                    {doorSpecs.panelTypePosition === 3 || doorSpecs.panelTypePosition === 4 ?
                        <div className='mt-2'>
                            <LabelWithInput label="Right side panel width" value={doorSpecs.rightPanel.width} setValue={setRightPanelWidth} />
                        </div>
                        :
                        ''}
                    <div className='mt-4'>
                        <p>Top Panel</p>
                        <ToggleSwitch isOn={doorSpecs.topPanel.include} onToggle={ ()=>filpTopPanelInclude()} />
                        {doorSpecs.topPanel.include?
                            <LabelWithInput label="Length" value={doorSpecs.topPanel.length} setValue={setTopPanelLength} />
                            : ''}
                    </div>
                </div>
            }
            <div className='mt-3'>
                <p>Bottom Steel Panel</p>
                <ToggleSwitch isOn={doorSpecs.bottomSteelPanel.include} onToggle={() =>  filpBottomSteelPanelInclude()} />
                {doorSpecs.bottomSteelPanel.include ?
                    <LabelWithInput label="Length" value={doorSpecs.bottomSteelPanel.length} setValue={setBottomSteelPanelLength} />
                    : ''}

            </div>

            <div>
                <BackNextComp onGoBack={handleGoBack} onGoNext={handleGoNext} nextDisabled={true} />
            </div>
        </div>
    );
}

export default Form2;