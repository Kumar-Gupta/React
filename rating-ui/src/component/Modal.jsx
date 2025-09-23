import React from 'react'
import Button from './Button';


const Modal = ({rating, handleModal}) => {
  return (
    <div className="modal-overlay">
        <div className="modal">
        <h2>Thank You</h2>
        <p>you rated us {rating} star{rating>1 ? 's' : null}</p>
        {/* <button className="close-btn" onClick={handelModal}>Close</button> */}
        <Button className="close-btn" onClick={handleModal}>Close</Button>
        </div> 
    </div>
  )
}

export default Modal;  