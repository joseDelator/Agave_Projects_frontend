import React, {useState,}from 'react'
import Dropdrownemployee from '../dropdrownemployee'
import {ImTree} from 'react-icons/im'
import api from '../../api'
const PhaseEditPopup = (props) => {
    const [Cost, setCost] = useState(props.TC.Allocated_Amount)
    const [Driscription, setDriscription] = useState(props.TC.Phase_description)
    const [Status, setStatus] = useState(props.TC.Project_Status)
    const [isOpen, setIsOpen] = useState(false);
    const [Failed, setFailed] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  } 
    function Add_Time (e){
        e.preventDefault();
        let headersList = {         
            "Content-Type": "application/json" 
           }
           let reqOptions = {
             url: "ProjectPhase",
             method: "PUT",
             headers: headersList,
             data:JSON.stringify({
              "Phase_ID": props.TC.Phase_ID,
              "Phase_Master_ID": props.TC.Phase_Master_ID,
              "Project_Number_ID_Phase":props.TC.Project_Number_ID_Phase,
              "Allocated_Amount": e.target.Cost.value,
              "Phase_description": e.target.description.value,
              "Project_Status":e.target.Status.value
            }),
           }
           api.request(reqOptions).then(function (response) {
               if (response.data === "Updated Successfully") {
                   setFailed(false)
                    window.location.reload(false);
               }
               else{
                 setFailed(true)
                 togglePopup()
               }
           })
           }
           function Delete_Phase(e){
            e.preventDefault();
            let headersList = {         
                "Content-Type": "application/json" 
               }
               let reqOptions = {
                 url: "ProjectPhase/"+props.TC.Phase_Master_ID,
                 method: "DELETE",
                 headers: headersList,
               }
               api.request(reqOptions).then(function (response) {
                   if (response.data === "Deleted Successfully") {
                       setFailed(false)
                        window.location.reload(false);
                   }
                   else{
                     setFailed(true)
                    
                   }
               })
               } 
    return (
    <div >
      <input type="checkbox" className="modal-toggle" checked={props.Opened} readOnly/>
   <div className="modal ">
     <div className="modal-box relative">
       <label onClick={props.handleClose} className="btn btn-sm btn-circle absolute right-2 top-2" >✕</label>
      <form className="card-body" onSubmit={Add_Time}>
      <div className=" flex w-full items-center justify-center">      
          <ImTree size={40} className="text-primary justify-self-center "/>
          </div>
            <div className="form-control">
            <label className="label">
                <span className="label-text"> Cost</span>
            </label>
              <input type="number"  value={Cost} onChange={e=> setCost(e.target.value)} placeholder="Cost" name="Cost" 
                   pattern="[0-9]" min=".01"  step=".01"
                   required className="input input-bordered input-primary" />
              <label className="input-group">
            </label>
          </div>
          <div className="form-control">
                <label className="label">
                    <span className="label-text">Description</span>
                </label>
                  <input type="text" value={Driscription} onChange={e=> setDriscription(e.target.value)} 
                    placeholder="description"  name="description"
                    required className="input input-bordered input-primary" />
                  <label className="input-group">
                </label>
                </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Status</span>
                </label>
                <select className="select select-primary w-full "  value={Status} onChange={e => setStatus(e.target.value)} name="Status"
                     required>
                    <option value={"Active"} className="text-primary">
                    Active</option>
                    <option value={"Tracking"}>
                    Tracking</option>
                    <option value={"Completed"}>
                    Completed</option>
               </select>
               <label className="input-group">
                </label>
                </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Submit</button>
        </div>
        <div className="form-control mt-3">
          <button className="btn btn-error" onClick={Delete_Phase}>Delete</button>
        </div>
 </form>
</div>
  </div>
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

export default PhaseEditPopup
