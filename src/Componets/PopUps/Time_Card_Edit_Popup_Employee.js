import React, {useState,useContext}from 'react'
import {GiTimeBomb} from 'react-icons/gi'
import api from '../../api'
import EmployeeContext from '../../Context/EmployeeContext'
import DataContext from '../../Context/datacontext'
const TimeEditPopupEmployee= (props) => {
    const [Total_Time, setTotal_Time] = useState(props.TC.Total_Time)
    const [Date, setDate] = useState(props.TC.Date)
    const [Failed, setFailed] = useState(false);
    const [Project_ID, setProject_ID] = useState(props.TC.Project_Number_ID_Time)
    const{ SelectEmployee, updateemployeetimcarddata,updateEmployeeinfo } = useContext(EmployeeContext)
    const {notify} = useContext(DataContext)
    function Add_Time (e){
        e.preventDefault();
        let headersList = {         
            "Content-Type": "application/json" 
           }
           let reqOptions = {
             url: "TimeCard",
             method: "PUT",
             headers: headersList,
             data:JSON.stringify({
                "TimeCard_ID": props.TC.TimeCard_ID, 
                "Project_Number_ID_Time" :Project_ID,
                "Employee_ID" : SelectEmployee,
                "Date" : Date,
                "Total_Time" : Total_Time,
                "Been_Payed": props.TC.Been_Payed
            }),
           }
           api.request(reqOptions).then(function (response) {
               if (response.data === "Updated Successfully") {
                  updateemployeetimcarddata(SelectEmployee)
                  updateEmployeeinfo()
                  props.handleClose()
                  notify()
              
               }
               else{
                 setFailed(true)
               }
           })
           }
           function Delete_Time (e){
            e.preventDefault();
            let headersList = {         
                "Content-Type": "application/json" 
               }
               let reqOptions = {
                 url: "TimeCard/"+props.TC.TimeCard_ID,
                 method: "DELETE",
                 headers: headersList,
               }
               api.request(reqOptions).then(function (response) {
                   if (response.data === "Deleted Successfully") {
                    updateemployeetimcarddata( SelectEmployee)
                    updateEmployeeinfo()
                    props.handleClose()
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
        <GiTimeBomb size={40} className="text-primary justify-self-center "/>
        </div>
        <div className="form-control">
        <label className="label">
            <span className="label-text">Project</span>
        </label>
          <input type="number" placeholder="Time" name="Total Time" value={Project_ID} 
          pattern="[0-9]" min="1"  step="1"
          onChange={(e) => setProject_ID(e.target.value)} required 
          className="input input-bordered input-primary" />
          <label className="input-group">
        </label>
      </div>
      
        <div className="form-control">
          <label className="label">
            <span className="label-text">Date</span>
          </label>
          <input type="date" value={Date} onChange={(e) => setDate(e.target.value)} 
          required className="input input-bordered input-primary appearance-none" />
          <label className="label">
          </label>
        </div>
        <div className="form-control">
        <label className="label">
            <span className="label-text">Hours</span>
        </label>
          <input type="number" placeholder="Time" name="Total Time" value={Total_Time} pattern="[0-9]" min=".01" max="24"  step=".01"
          onChange={(e) => setTotal_Time(e.target.value)} required 
          className="input input-bordered input-primary" />
          <label className="input-group">
        </label>
      </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Submit</button>
        </div>
        <div className="form-control mt-3">
          <button className="btn btn-error" onClick={Delete_Time}>Delete</button>
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

export default TimeEditPopupEmployee
