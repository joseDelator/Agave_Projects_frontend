import React, { useState } from 'react'
import '../Styles/Projectinput.css'
import api from '../api';

const Projectinputform = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [Failed, setFailed] = useState(false)
    const [Total_Budget, setTotal_Budget] = useState("")
    const [Phone, setPhone] = useState("")
    const [ProjectData, setProjectData] = useState({
        Client_First_Name:'',
        Client_Last_Name:'', 
        Street_Address:'',
        City:'',
        Client_Email:""
    })
    const togglePopup = () => {
        setIsOpen(!isOpen);
      }  
    function Add_New_Project (e){
        e.preventDefault();
        let headersList = {         
            "Content-Type": "application/json" 
           }

           let reqOptions = {
             url: "Agave_green",
             method: "POST",
             headers: headersList,
             data:JSON.stringify({
                "Street_Adress": ProjectData.Street_Address,
                "City": ProjectData.City,
                "Client_First_Name": ProjectData.Client_First_Name,
                "Client_Last_Name": ProjectData.Client_Last_Name,
                "Total_Buget": parseInt(Total_Budget),
                "Client_Phone": Phone,
                "Client_Email": ProjectData.Client_Email,
          }),
           }
           api.request(reqOptions).then(function (response) {
               if (response.data === 'Added Successfully') {
                   setFailed(false)
               }
               else{
                 setFailed(true)
               }
             console.log(response.data);
           })
           togglePopup()
           }
    return (
        <div className=" min-h-screen items-center">
  <form className="my-form m-5 " onSubmit={Add_New_Project}>
  <div className="container-project bg-neutral p-2 rounded-lg">
    <h1>Create Project</h1>
    <ul>
      <li>
        <input type="Number" value={Total_Budget} placeholder="Total Budget" 
        className="input input-bordered input-primary" onChange={(e) => setTotal_Budget(parseInt( e.target.value))} required/>
      </li>
      <li>
        <div className="grid grid-2">
          <input type="text" placeholder="Name" value={ProjectData.Client_First_Name}
          className="input input-bordered input-primary" onChange={(e) => setProjectData({...ProjectData, Client_First_Name: e.target.value})} required/>  
          <input type="text" placeholder="Surname" value={ProjectData.Client_Last_Name}
         className="input input-bordered input-primary" onChange={(e) => setProjectData({...ProjectData, Client_Last_Name: e.target.value})} required/>
        </div>
      </li>
      <li>
        <div className="grid grid-2">
          <input type="text" placeholder="Street Adress" value={ProjectData.Street_Address}
         className="input input-bordered input-primary" onChange={(e) => setProjectData({...ProjectData, Street_Address: e.target.value})} required/>  
          <input type="text" placeholder="City" value={ProjectData.City}
         className="input input-bordered input-primary" onChange={(e) => setProjectData({...ProjectData, City: e.target.value})} required/>
        </div>
      </li>    
      <li>
      <div className="grid grid-2">
          <input type="tel" placeholder="Phone Number" value={Phone}
          className="input input-bordered input-primary" onChange={(e) => setPhone(e.target.value)} /> 
          <input type="email" placeholder="Email" value={ProjectData.Client_Email}
          className="input input-bordered input-primary" onChange={(e) => setProjectData({...ProjectData, Client_Email: e.target.value})}/>  
        </div>
      </li>   
      <li>
        <div className="grid grid-3">
          
          <button className="btn btn-primary" type="submit" >
            SUBMIT
          </button>
          <button className="btn btn-warning" type="reset" >
            RESET
          </button> 
        </div>
      </li>    
    </ul>
  </div>
</form>
<input type="checkbox" className="modal-toggle" checked={Failed} />
<div className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg text-error">Error!!!</h3>
    <p className="py-4">Please Try Again</p>
    <div className="modal-action">
      <label  className="btn btn-primary" onClick={(e) =>setFailed(false)}>ok</label>
    </div>
  </div>
</div>
<input type="checkbox" className="modal-toggle" checked={isOpen}   />
<div className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg text-primary">success!!!</h3>
    <p className="py-4">yor time has be added</p>
    <div className="modal-action">
      <label  className="btn btn-primary" onClick={(e) =>setIsOpen(false)}>ok</label>
    </div>
  </div>
</div>

</div>
    )
}

export default Projectinputform
