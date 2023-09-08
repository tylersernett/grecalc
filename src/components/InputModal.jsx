import React from 'react';
import ReactModal from 'react-modal';

//required by ReactModal to identify the 'non-modal' elements:
ReactModal.setAppElement('#root');

const MODAL_STYLES = {
    position: 'fixed',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    borderRadius: '6px',
    padding: '20px',
    zIndex: 1000
}

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.7)',
    zIndex: 999
}

//timerInputIsOpen: var to determine if we display or not, passed in from <Modal> tag
export default function InputModal({ timerInputIsOpen, setTimerInputIsOpen, handleSubmit, hh, mm, ss }) {
    return (
        <ReactModal isOpen={timerInputIsOpen} className='modal-reset'
            style={{ overlay: OVERLAY_STYLES, content: MODAL_STYLES }}
            onRequestClose={() => setTimerInputIsOpen(false)}
        >
            <div className='timer-input-wrapper'>
                Enter time below
                <p />
                {/* preventDefault: prevent page refresh */}
                <form onSubmit={e => { e.preventDefault(); handleSubmit() }} autoComplete="off">
                    <div className='timer-input-box'>
                        <input className='timer-input' type='text' maxLength='2' placeholder='00' pattern="\d*" id='HH' ref={hh} />
                        <div>:</div>
                        <input className='timer-input' type='text' maxLength='2' placeholder='00' pattern="\d*" id='MM' ref={mm} />
                        <div>:</div>
                        <input className='timer-input' type='text' maxLength='2' placeholder='00' pattern="\d*" id='SS' ref={ss} />
                        <label htmlFor="HH">HH</label>
                        &nbsp;
                        <label htmlFor="MM">MM</label>
                        &nbsp;
                        <label htmlFor="SS">SS</label>
                    </div>
                    <button className='timer-btn fs-5' id='cancel' onClick={() => setTimerInputIsOpen(false)}>Cancel</button>
                    <input className='timer-btn fs-5' type='submit' id='set-time' value='Set Time' ></input>
                </form>

            </div>
        </ReactModal>
    )
}