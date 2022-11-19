import React, { useState } from 'react'
import { BiError, BiPlanet } from 'react-icons/bi';
import ResponcePopup from './ResponcePopup';
import '../Styles/Projectinput.css'
import api from '../api';
const Projectinputform = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [Failed, setFailed] = useState(true)
    const [Total_Budget, setTotal_Budget] = useState("")
    const [ZIP, setZIP] = useState("")
    const [ProjectData, setProjectData] = useState({
        Client_First_Name:'',
        Client_Last_Name:'', 
        Street_Address:'',
        City:'',
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
                "Zip": parseInt(ZIP),
                "Client_First_Name": ProjectData.Client_First_Name,
                "Client_Last_Name": ProjectData.Client_Last_Name,
                "Total_Buget": parseInt(Total_Budget),
                "Total_Expenses" : 0.00
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
        <div>
  <form className="my-form" onSubmit={Add_New_Project}>
  <div className="container-project">
    <h1>Create Project</h1>
    <ul>
      <li>
        <input type="Number" value={Total_Budget}  placeholder="Total Budget" 
        onChange={(e) => setTotal_Budget(parseInt( e.target.value))} required/>
      </li>
      <li>
        <div className="grid grid-2">
          <input type="text" placeholder="Name" 
          onChange={(e) => setProjectData({...ProjectData, Client_First_Name: e.target.value})} required/>  
          <input type="text" placeholder="Surname" 
          onChange={(e) => setProjectData({...ProjectData, Client_Last_Name: e.target.value})} required/>
        </div>
      </li>
      <li>
        <div className="grid grid-2">
          <input type="text" placeholder="Street Adress" 
          onChange={(e) => setProjectData({...ProjectData, Street_Address: e.target.value})} required/>  
          <input type="text" placeholder="City" 
          onChange={(e) => setProjectData({...ProjectData, City: e.target.value})} required/>
        </div>
      </li>    
      <li>
      <div className="grid grid-2">
          <input type="Number" placeholder="ZIP" 
          onChange={(e) => setZIP(parseInt(e.target.value))} required/>  
        </div>
      </li>   
      <li>
        <div className="grid grid-3">
          <div className="required-msg">REQUIRED FIELDS</div>
          <button className="btn-grid" type="submit" >
            <span className="back">
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/email-icon.svg" alt=""/>
            </span>
            <span className="front">SUBMIT</span>
          </button>
          <button className="btn-grid" type="reset" >
            <span className="back">
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/eraser-icon.svg" alt=""/>
            </span>
            <span className="front">RESET</span>
          </button> 
        </div>
      </li>    
    </ul>
  </div>
</form>
{isOpen && <ResponcePopup
    
    content={ Failed ?<> 
    <BiError className="Error_Icon" size= {45}/>
     <h1>Error Please Try Again</h1>
   </>:<> 
    <BiPlanet className="Sucess_Icon" size= {45}/>
     <h1>Your Project has Sucessfully Been added</h1>
   </>}
   handleClose={togglePopup}
 />}

</div>
    )
}

export default Projectinputform
