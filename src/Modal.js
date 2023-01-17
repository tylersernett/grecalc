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
//children: what's inbetween the <Modal> tags where it's called
export default function Modal({ timerInputIsOpen, setTimerInputIsOpen, children }) {
    return (
        <ReactModal isOpen={timerInputIsOpen} className='modal-reset'
            style={{ overlay: OVERLAY_STYLES, content: MODAL_STYLES }}
            onRequestClose={() => setTimerInputIsOpen(false)}
        >
            {children}
        </ReactModal>
    )
}