import React, {useEffect, useState} from 'react'
import '../Styles/homedash.scss'
import Spiner from './Spiner'
import api from '../api'
import { AiFillPlusCircle} from 'react-icons/ai'
import NewEmployee from './NewEmployeePopup'
import Dropdrownemployee from './dropdrownemployee'
import { TimeTableEmployee } from './TimeTableEmployee'

function EmployeeDash() {
    const [Project_data, setProject_data] = useState([])
    const [Employee_ID, setEmployee_ID] = useState("1")
    const [isOpen, setisOpen] = useState(false)
    const togglePopup = () => {
      setisOpen(!isOpen);
    }
    useEffect (() => {
        let headersList = {           
            "Content-Type": "application/json" 
           }
           let reqOptions = {
             url: "Employee/"+Employee_ID,
             method: "GET",
             headers: headersList,  
           }
           const fetch_somethe= async () =>{
            const reponse = await api.request(reqOptions);
            setProject_data( reponse.data)
           }
        fetch_somethe();
    }, [Employee_ID])
    const changeState = (newState) => {
      setEmployee_ID(newState);
    };
    if(Project_data.length === 0){  
        return <Spiner/>
        ; 
    }else{
    return (
       <div className="grid-container" >
  <main className="main" >
    <Dropdrownemployee  parentState={Employee_ID} 
    changeParentState={changeState} />
    <div className="main-header" >
      <div className="main-header__heading">Address:{Project_data.Employee_First_Name}</div>
      <div className="main-header__updates">Name:{Project_data.Employee_First_Name},{Project_data.Employee_Last_Name}</div>
      <div>Employee ID:{Employee_ID}</div>
      <AiFillPlusCircle id="Add_Icon" size={40} onClick={togglePopup}/> 
            {isOpen && <NewEmployee
                handleClose={togglePopup}
            />}   
    </div>
    <div className="main-overview">
      <div className="overviewcard">
        <div className="overviewcard__icon">Salary</div>
        <div className="overviewcard__info">${Project_data.Salary}</div>
      </div>
      <div className="overviewcard">
        <div className="overviewcard__icon">Total Owe</div>
        <div className="overviewcard__info"key={Employee_ID}>${Project_data.Total_Unpaid_Amount}</div>
      </div>
      <div className="overviewcard">
        <div className="overviewcard__icon">Total Hours</div>
        <div className="overviewcard__info">{Project_data.Total_hours_Worked}</div>
      </div>   
    </div>
    <div className="main-cards" key={Employee_ID}>
      <div className="card">
        <TimeTableEmployee 
        props={Employee_ID}  
        prefix={"Employeetimecard/"} 
        />
        </div>
      <div className="card"></div>
    </div>
  </main>
</div>
    )}
}
export default EmployeeDash
