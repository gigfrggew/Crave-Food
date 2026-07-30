import React from 'react'
import ReactDom from 'react-dom'

export default function Modal({ children, onClose }) {

    return ReactDom.createPortal(
        <>
            <div className="cart-overlay">
            <div className="cart-modal">
                <div className="cart-modal-head">
                  <h2>Your cart</h2>
                  <button className="modal-close" aria-label="Close cart" onClick={onClose}>×</button>
                </div>
                {children}
            </div>
            </div>
        </>,
        document.getElementById('cart-root')
    )
}
