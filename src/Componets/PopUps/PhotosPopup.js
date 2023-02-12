import React from 'react'

const PhotosPopup = ({Opened, handleClose, imgurl}) => {
    return (
        <div>
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my-modal-10" className="modal-toggle" checked={Opened} readOnly />
            <div className="modal">
            <div className=" relative">
                <label htmlFor="my-modal-10" className="btn btn-sm btn-circle absolute right-2 top-2" onClick={handleClose}>✕</label>
                <img className="artboard phone-2 rounded-lg" src={imgurl}></img>
            </div>
            </div>
        </div>
    )
}

export default PhotosPopup
