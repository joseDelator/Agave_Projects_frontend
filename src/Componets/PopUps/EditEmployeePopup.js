import React, {useState}from 'react'
import {GiPerson} from 'react-icons/gi'
import api from '../../api'
const EditEmployee = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [Failed, setFailed] = useState(false);
    const [FristName, setFristName] = useState(props.Employee.Employee_First_Name)
    const [LastName, setLastName] = useState(props.Employee.Employee_Last_Name)
    const [Salary, setSalary] = useState(props.Employee.Salary)
    const togglePopup = () => {
    setIsOpen(!isOpen);
  }  
    function Add_Employee(e){
        e.preventDefault();
        let headersList = {         
            "Content-Type": "application/json" 
           }
           let reqOptions = {
             url: "Employee",
             method: "Put",
             headers: headersList,
             data:JSON.stringify({
              "Employee_ID": props.Employee.Employee_ID,
              "Salary": e.target.Salary.value,
              "Employee_First_Name": e.target.Firstname.value,
              "Employee_Last_Name": e.target.Lastname.value,
            }),
           }
           api.request(reqOptions).then(function (response) {
               if (response.data === 'Updated Successfully') {
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
      <input type="checkbox" className="modal-toggle"  checked={props.Opened} readOnly/>
   <div className="modal">
     <div className="modal-box relative">
       <label onClick={props.handleClose} className="btn btn-sm btn-circle absolute right-2 top-2" >✕</label>
       <form className="card-body " onSubmit={Add_Employee}>
          <div className=" flex w-full items-center justify-center">      
          <GiPerson size={40} className="text-primary justify-self-center "/>
          </div>
            <div className="form-control">
            <label className="label">
                <span className="label-text">First Name</span>
            </label>
              <input type="text" placeholder="First Name" 
               value={FristName} onChange={e=>setFristName(e.target.value)}name="Firstname" 
              required className="input input-bordered input-primary" />
              <label className="input-group">
            </label>
          </div>
          <div className="form-control">
            <label className="label">
                <span className="label-text">Last Name</span>
            </label>
              <input type="text" placeholder="Last Name" 
              name="Lastname" value={LastName} onChange={e=> setLastName(e.target.value)}
              required className="input input-bordered input-primary" />
              <label className="input-group">
            </label>
          </div>
          <div className="form-control">
            <label className="label">
                <span className="label-text">Salary</span>
            </label>
            <div className="tooltip tooltip-open tooltip-top" data-tip={Salary}>
            <input type="range" min="10" max="100" name="Salary" value={Salary} onChange={e=>setSalary(e.target.value)} className="range range-secondary" />
            </div>
              <label className="input-group">
            </label>
          </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Submit</button>
            </div>
        </form>
     </div>
  
 </div>
 <input type="checkbox" className="modal-toggle" checked={Failed} readOnly />
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
export default EditEmployee