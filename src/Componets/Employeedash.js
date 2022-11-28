import React, {useEffect, useState} from 'react'
import '../Styles/homedash.scss'
import { TimeTable } from './TimeTable'
import { AiFillEdit} from 'react-icons/ai'
import { Link, useParams } from 'react-router-dom'
import Spiner from './Spiner'
import ExpenseTable from './ExpenseTable'
import api from '../api'
import Dropdrownemployee from './dropdrownemployee'
function EmployeeDash() {
    const [Project_data, setProject_data] = useState([])
    const [Employee_ID, setEmployee_ID] = useState("1")
    const Params = useParams()
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
      console.log(newState)
      setEmployee_ID(oldState => newState);
  };
    if(Project_data.length === 0){
            
        return <Spiner/>
        ; 
    }else{
    return (
       <div className="grid-container" key={Employee_ID}>
  <main className="main" >
    <Dropdrownemployee  parentState={Employee_ID} 
    changeParentState={changeState} />
    <div className="main-header">
    <Link id="edit_button" to={"/project/edit/"+Params.id}><AiFillEdit size={32}/></Link>
      <div className="main-header__heading">Address:{Project_data.Employee_First_Name}</div>
      <div className="main-header__updates">Name:{Project_data.Employee_First_Name},{Project_data.Employee_Last_Name}</div>
      <div>Employee ID:{Employee_ID}</div>
    </div>

    <div className="main-overview">
      <div className="overviewcard">
        <div className="overviewcard__icon">Salary</div>
        <div className="overviewcard__info">${Project_data.Salary}</div>
      </div>
      <div className="overviewcard">
        <div className="overviewcard__icon">Total Owe</div>
        <div className="overviewcard__info"key={Params.id}>${Project_data.Total_Unpaid_Amount}</div>
      </div>
      <div className="overviewcard">
        <div className="overviewcard__icon">Labor Cost</div>
        <div className="overviewcard__info">${Project_data.Total_Labor_Cost}</div>
      </div>
      <div className="overviewcard">
        <div className="overviewcard__icon"> Remaining</div>
        <div className="overviewcard__info">${Project_data.Budget_Remianing}
        /{Math.round(Project_data.Budget_Remianing/70)}Hrs</div>
      </div>
    </div>
    <div className="main-cards">
      <div className="card"><TimeTable props ={Project_data.Employee_ID} prefix={"Employeetimecard/"}/></div>
      <div className="card"></div>
    </div>
  </main>
</div>
    )}
}

export default EmployeeDash
