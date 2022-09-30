import React from 'react'
import ReactDOM from 'react-dom'

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '50px',
    zIndex: 1000
}

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.7',
    zIndex: 1000
}

//open: var to determine if we display or not, passed in within <Modal> tag
//children: what's inbetween the <Modal> tags where it's called
//onClose -- function being passed in within <Modal> tag
export default function Modal({ open, children, onClose }) {
    if (!open) return null

    return ReactDOM.createPortal(
        <>
        <div style={OVERLAY_STYLES} />
            <div style={MODAL_STYLES}>
                <button onClick={onClose}>Close Modal</button>
                {children}
            </div>
        </>,
        document.getElementById('portal')
    )
}
