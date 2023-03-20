import {useState, useContext}from 'react'
import {GiTimeBomb} from 'react-icons/gi'
import Dropdrownemployee from '../dropdrownemployee'
import { AddingTime } from '../../Functions/Addttime'
import ProjectContext from '../../Context/projectdatacontext'
import EmployeeContext from '../../Context/EmployeeContext'
import DataContext from '../../Context/datacontext'
const TimePopup = (props) => {
    const [Total_Time, setTotal_Time] = useState("")
    const [Date, setDate] = useState('')
    const [Failed, setFailed] = useState(false);
    const{ SelectEmployee} = useContext(EmployeeContext)
    const {updatetimecardproject,updateprojectinfo}=useContext(ProjectContext)
    const { notify} = useContext(DataContext)
    function Add_Time (e){
        e.preventDefault();
           //input new time card entree and responce with popup
           AddingTime(Date, props.content,SelectEmployee,Total_Time).then( function(responce){
            if ( responce.data === "Added Successfully") {
              updatetimecardproject(props.pagenum,props.content)
              updateprojectinfo(props.content)
              setDate('')
              setTotal_Time('')
              notify()
              props.handleClose()
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
            <form className="card-body " onSubmit={Add_Time}>
      <div className=" flex w-full items-center justify-center">      
      <GiTimeBomb size={40} className="text-primary justify-self-center "/>
      </div>
        <Dropdrownemployee 
         />
        <div className="form-control">
          <label className="label">
            <span className="label-text">Date</span>
          </label>
          <input type="date" value={Date} onChange={(e) => setDate(e.target.value)} required 
          className="input input-bordered input-primary appearance-none"/>
          <label className="label">
          </label>
        </div>
        <div className="form-control">
        <label className="label">
            <span className="label-text"> Hours</span>
        </label>
          <input type="number" placeholder="Time" name="Total Time" 
          value={Total_Time} pattern="[0-9]" min=".01" max="24"  step=".01" 
          onChange={(e) => setTotal_Time(e.target.value)} required className="input input-bordered input-primary" />
          <label className="input-group">
        </label>
      </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
          </div>
       
    
</div>

{/* error popup*/}    
      
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
