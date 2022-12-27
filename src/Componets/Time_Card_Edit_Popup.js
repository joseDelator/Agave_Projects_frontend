import React, {useState, Fragment}from 'react'
import {AiFillCloseSquare} from 'react-icons/ai'
import Dropdrownemployee from './dropdrownemployee'
import '../Styles/Time_Card.css'
import {GiTimeBomb} from 'react-icons/gi'
import {BiError,BiPlanet} from 'react-icons/bi'
import api from '../api'
import ResponcePopup from './ResponcePopup'
const TimeEditPopup = (props) => {
    const [Total_Time, setTotal_Time] = useState(props.TC.Total_Time)
    const [Date, setDate] = useState(props.TC.Date)
    const [isOpen, setIsOpen] = useState(false);
    const [Failed, setFailed] = useState(true);
    const [Employee_Id, setEmployee_Id] = useState(props.TC.Employee_ID)
  const changeState = (newState) => {
      setEmployee_Id(newState);
    };
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
                "Employee_ID" : Employee_Id,
                "Date" : Date,
                "Total_Time" : Total_Time,
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
        <Dropdrownemployee  parentState={Employee_Id} 
            changeParentState={changeState}  />
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
        <button className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs 
                leading-tight uppercase m-2
                rounded shadow-md hover:bg-red-700 hover:shadow-lg 
                focus:bg-red-700 focus:shadow-lg focus:outline-none 
                focus:ring-0 active:bg-red-800 active:shadow-lg 
                transition duration-150 ease-in-out"
                onClick={Delete_Time}>
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
