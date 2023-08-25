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


function LinkInstructions({ instructionsIsOpen, setInstructionsIsOpen, }) {
  return (
    <ReactModal isOpen={instructionsIsOpen} className='modal-reset'
      style={{ overlay: OVERLAY_STYLES, content: MODAL_STYLES }}
      onRequestClose={() => setInstructionsIsOpen(false)}
    >
      <div className='instructions'>
        <h2>Instructions</h2>
        Enter a URL to display on the main page.
        <br/>
        <br/>
        <p>
          
          If using Google Slides, replace the “/edit” at the end of the URL with “/preview” to mimic fullscreen.
        </p>
        <button className='timer-btn fs-5' id='cancel' onClick={() => setInstructionsIsOpen(false)}>Close</button>

      </div>
    </ReactModal>
  )
}

export default LinkInstructions