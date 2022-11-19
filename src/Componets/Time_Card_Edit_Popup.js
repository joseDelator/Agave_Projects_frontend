import React, {useState, Fragment}from 'react'
import {AiFillCloseSquare} from 'react-icons/ai'
import '../Styles/Time_Card.css'
import {GiTimeBomb} from 'react-icons/gi'
import {BiError,BiPlanet} from 'react-icons/bi'
import api from '../api'
import ResponcePopup from './ResponcePopup'
const TimeEditPopup = (props) => {
  const [Name, setName] = useState(props.TC.Employee_Name);
    const [Total_Time, setTotal_Time] = useState(props.TC.Total_Time)
    const [Date, setDate] = useState(props.TC.Date)
    const [isOpen, setIsOpen] = useState(false);
    const [Failed, setFailed] = useState(true)
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }  
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
                "Project_Number_ID_Time" : props.TC.Project_Number_ID_Time,
                "Employee_Name" : Name,
                "Date" : Date,
                "Total_Time" : Total_Time,
                "Labor_salary" : 20,
                "Been_Payed": props.TC.Been_Payed
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
                       setFailed(false)
                        window.location.reload(false);
                   }
                   else{
                     setFailed(true)
                     togglePopup()
                   }
               })
               }
    return (
        <div className="popup-box">
          <Fragment>
        <div className="login-box">
        <h2> Edit Time</h2>
        <GiTimeBomb size={40} className="Time_Icon"/>
        <form onSubmit={Add_Time}>
          <div className="user-box">
            <input type="text"  value={Name} onChange={(e) => setName(e.target.value)} required />
            <label>Name</label>
          </div>
          <div className="user-box">
            <input type="number" pattern="[0-9]" value={Total_Time} onChange={(e) => setTotal_Time(e.target.value)} required />
            <label>Total Time</label>
          </div>
          <div className="user-box">
            <input type="date" name=""  value={Date} onChange={(e) => setDate(e.target.value)} />
            <label>Date</label>
          </div>
          <button className='button'>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </button>
          
          <AiFillCloseSquare className="close-icon-timecard" onClick={props.handleClose}/>
        </form>
        <button id="Delete_Button" onClick={Delete_Time}>
            Delete
          </button>
      </div>
      {isOpen && <ResponcePopup
       content={ Failed ?<> 
       <BiError className="Error_Icon" size= {45}/>
        <h1>Error Please Try Again</h1>
      </>:<> 
       <BiPlanet className="Sucess_Icon" size= {45}/>
        <h1>Your Time has Sucessfully Been Edit</h1>
      </>}
      handleClose={togglePopup}
    />}
      </Fragment>
          {props.content}
      </div>
    )
}

export default TimeEditPopup
