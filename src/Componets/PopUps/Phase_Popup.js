import React, {useState}from 'react'
import {ImTree} from 'react-icons/im'
import api from '../../api';
const PhasePopup = (props) => {
    const [Failed, setFailed] = useState(false);
    function Add_Phase (e){
        e.preventDefault();
        let headersList = {         
          "Content-Type": "application/json" 
         }
         let reqOptions = {
           url: "ProjectPhase",
           method: "POST",
           headers: headersList,
           data:JSON.stringify({
            "Allocated_Amount": e.target.Cost.value,
            "Project_Number_ID_Phase": props.content,
            "Phase_description": e.target.description.value,
          }),
         }
         api.request(reqOptions).then(function (response) {
             if (response.data === 'Added Successfully') {
                 setFailed(false)
                  window.location.reload(false);
             }
             else{
               setFailed(true)
             }
         })
           
           }
        
    return (
        <div>
           <input type="checkbox" className="modal-toggle" checked={props.Opened} readOnly/>
        <div className="modal">
          <div className="modal-box relative">
            <label onClick={props.handleClose} className="btn btn-sm btn-circle absolute right-2 top-2" >✕</label>
      <form className="card-body " onSubmit={Add_Phase}>
          <div className=" flex w-full items-center justify-center">      
          <ImTree size={40} className="text-primary justify-self-center "/>
          </div>
            <div className="form-control">
            <label className="label">
                <span className="label-text"> Cost</span>
            </label>
              <input type="number" placeholder="Cost" name="Cost" 
                   pattern="[0-9]" min=".01"  step=".01"
                   required className="input input-bordered input-primary" />
              <label className="input-group">
            </label>
          </div>
          <div className="form-control">
                <label className="label">
                    <span className="label-text">Description</span>
                </label>
                  <input type="text" placeholder="description"  name="description"
                      required className="input input-bordered input-primary" />
                  <label className="input-group">
                </label>
                </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Submit</button>
            </div>
      </form>
          </div>
       
      </div>

{/* error popup */}    
      
<input type="checkbox" className="modal-toggle" checked={Failed} readOnly/>
<div className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg text-error">Error!!!</h3>
    <p className="py-4">Please Try Again</p>
    <div className="modal-action">
      <label  className="btn btn-primary" onClick={(e) =>setFailed(false)}>ok</label>
    </div>
  </div>
</div>
         
      </div>
    )
}

export default PhasePopup
