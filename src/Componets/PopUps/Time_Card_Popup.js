import React, {useState}from 'react'
import {GiTimeBomb} from 'react-icons/gi'
import api from '../../api'
import Dropdrownemployee from '../dropdrownemployee'
const TimePopup = (props) => {
    const [Total_Time, setTotal_Time] = useState("")
    const [Date, setDate] = useState('')
    const [isOpen, setIsOpen] = useState(false);
    const [Failed, setFailed] = useState(false);
    const [Employee_Id, setEmployee_Id] = useState("")
   
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }  
  const changeParentState = (newState) => {
    setEmployee_Id(newState);
  };
    function Add_Time (e){
        e.preventDefault();
        let headersList = {         
            "Content-Type": "application/json" 
           }
           let reqOptions = {
             url: "TimeCard",
             method: "POST",
             headers: headersList,
             data:JSON.stringify({
                "Project_Number_ID_Time" : props.content,
                "Employee_ID": Employee_Id,
                "Date" : Date,
                "Total_Time" : Total_Time,
            }),
           }
           api.request(reqOptions).then(function (response) {
               if (response.data === 'Added Successfully') {
                   setFailed(false)
                    window.location.reload(false);
               }
               else{
                 setFailed(true)
                 togglePopup()
               }
             console.log(response.data);
           })
           }
        
    return (
        <div>
           <input type="checkbox" className="modal-toggle" checked={props.Opened} readOnly/>
        <div className="modal">
          <div className="modal-box relative">
            <label onClick={props.handleClose} className="btn btn-sm btn-circle absolute right-2 top-2" >✕</label>
            <form className="card-body " onSubmit={Add_Time}>
      <div className=" flex w-full items-center justify-center">      
      <GiTimeBomb size={40} className="text-primary justify-self-center "/>
      </div>
        <Dropdrownemployee  parentState={Employee_Id} 
          changeParentState={changeParentState} />
        <div className="form-control">
          <label className="label">
            <span className="label-text">date</span>
          </label>
          <input type="date" value={Date} onChange={(e) => setDate(e.target.value)} required className="input input-bordered input-primary " />
          <label className="label">
          </label>
        </div>
        <div className="form-control">
        <label className="label">
            <span className="label-text"> Hours</span>
        </label>
          <input type="number" placeholder="Time" name="Total Time" value={Total_Time} pattern="[0-9]" min=".01" max="24"  step=".01"onChange={(e) => setTotal_Time(e.target.value)} required className="input input-bordered input-primary" />
          <label className="input-group">
        </label>
      </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Submit</button>
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

export default TimePopup
