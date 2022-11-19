import React from 'react'
import {AiFillCloseSquare} from 'react-icons/ai'
const ResponcePopup = (props) => {
    return (
        <div className="popup-box">
            <div className="box-in-popup">
                <AiFillCloseSquare className="close-icon" onClick={props.handleClose}/>
                {props.content}
            </div>
    </div>
    )
}

export default ResponcePopup
