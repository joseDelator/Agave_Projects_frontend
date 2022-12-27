import {Fragment, React, useState} from 'react'
import '../Styles/Time_Card.css'
import {GiTimeBomb} from 'react-icons/gi'
import {BiError,BiPlanet} from 'react-icons/bi'
import ResponcePopup from './ResponcePopup'
import api from '../api'
import Dropdrownemployee from './dropdrownemployee'
const TimecardEnter = () => {
    const [Agave_green_Project_Number, setAgave_green_Project_Number] = useState('')
    const [Total_Time, setTotal_Time] = useState("")
    const [Date, setDate] = useState('')
    const [isOpen, setIsOpen] = useState(false);
    const [Failed, setFailed] = useState(true);
    const [Employee_Id, setEmployee_Id] = useState("")
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }  
const changeParentState = (newState) => {
  console.log(newState)
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
                "Project_Number_ID_Time" : Agave_green_Project_Number,
                "Employee_ID": Employee_Id,
                "Date" : Date,
                "Total_Time" : Total_Time,
            }),
           }
           api.request(reqOptions).then(function (response) {
               if (response.data === 'Added Successfully') {
                   setFailed(false)
                   setAgave_green_Project_Number("")
                   setDate("")
                   setTotal_Time("")
               }
               else{
                 setFailed(true)
               }
             console.log(response.data);
           })
           togglePopup()
           }
    return (
        <Fragment> 
        <div className="login-box">
        <h2 className="H2">Time Card</h2>
      
        <GiTimeBomb size={40} className="Time_Icon"/>
        <form onSubmit={Add_Time}>
        <Dropdrownemployee  parentState={Employee_Id} 
    changeParentState={changeParentState}  />
          <div className="user-box">
            <input type="Number" name="JobNumber" pattern="[0-9]"  value={Agave_green_Project_Number} 
            onChange={(e) => setAgave_green_Project_Number(e.target.value)}required  />
            <label>Job Number</label>
          </div>
          <div className="user-box">
            <input type="Number" name="Total Time" value={Total_Time} pattern="[0-9]" onChange={(e) => setTotal_Time(e.target.value)} required />
            <label>Total Time</label>
          </div>
          <div className="user-box">
            <input type="date" name="date"  value={Date} onChange={(e) => setDate(e.target.value)} />
            <label>Date</label>
          </div>
          <button className='button'>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </button>
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
    )
}

export default TimecardEnter
