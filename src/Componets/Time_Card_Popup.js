import React, {useState, Fragment}from 'react'
import {AiFillCloseSquare} from 'react-icons/ai'
import '../Styles/Time_Card.css'
import {GiTimeBomb} from 'react-icons/gi'
import {BiError,BiPlanet} from 'react-icons/bi'
import ResponcePopup from './ResponcePopup'
import api from '../api'
const TimePopup = (props) => {
  const [Name, setName] = useState("");
    const [Total_Time, setTotal_Time] = useState("")
    const [Date, setDate] = useState('')
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
             method: "POST",
             headers: headersList,
             data:JSON.stringify({
                "Project_Number_ID_Time" : props.content,
                "Employee_Name" : Name,
                "Date" : Date,
                "Total_Time" : Total_Time,
                "Labor_salary" : 20
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
        <div className="popup-box">
          <Fragment>
        <div className="login-box">
        <h2>Time Card</h2>
        <GiTimeBomb size={40} className="Time_Icon"/>
        <form onSubmit={Add_Time}>
          <div className="user-box">
            <input type="text"   onChange={(e) => setName(e.target.value)} required />
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
      </div>
      {isOpen && <ResponcePopup
       content={ Failed ?<> 
       <BiError className="Error_Icon" size= {45}/>
        <h1>Error Please Try Again</h1>
      </>:<> 
       <BiPlanet className="Sucess_Icon" size= {45}/>
        <h1>Your Time has Sucessfully Been added</h1>
      </>}
      handleClose={togglePopup}
    />}
      </Fragment>
          {props.content}
      </div>
    )
}

export default TimePopup
