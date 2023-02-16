import React, {useContext, useEffect, useState} from 'react'
import '../Styles/homedash.scss'
import Spiner from '../Componets/Spiner'
import api from '../api'
import { AiFillPlusCircle, AiFillEdit} from 'react-icons/ai'
import NewEmployee from '../Componets/PopUps/NewEmployeePopup'
import Dropdrownemployee from '../Componets/dropdrownemployee'
import { TimeTableEmployee } from '../Componets/Tables/TimeTableEmployee'
import EditEmployee from '../Componets/PopUps/EditEmployeePopup'
import { dollars } from '../Functions/DateandDollarFormate'
import DataContext from '../Context/datacontext'
import EmployeeContext from '../Context/EmployeeContext'
function EmployeeDash() {
    const [Project_data, setProject_data] = useState([])
    const [Employee_ID, setEmployee_ID] = useState("1")
    const [isOpen, setisOpen] = useState(false)
    const [isEditOpen, setisEditOpen] = useState(false)
    const {Totalowed, setTotalowed} = useContext(DataContext) 
    const {Salary, setSalary} = useContext(DataContext)
    const{ SelectEmployee} = useContext(EmployeeContext)
    const togglePopup = () => {
      setisOpen(!isOpen);
    }
    const toggleEditPopup = () => {
      setisEditOpen(!isEditOpen);
    }
    useEffect (() => {
        let headersList = {           
            "Content-Type": "application/json" 
           }
           let reqOptions = {
             url: "Employee/"+SelectEmployee,
             method: "GET",
             headers: headersList,  
           }
           const fetch_somethe= async () =>{
            const reponse = await api.request(reqOptions);
            setProject_data( reponse.data)
            setTotalowed(reponse.data.Total_Unpaid_Amount)
            setSalary(reponse.data.Salary)
           }
        fetch_somethe();
    }, [SelectEmployee])
    const changeState = (newState) => {
      setEmployee_ID(newState);
    };
    if(Project_data.length === 0){  
        return <Spiner/>
        ; 
    }else{
    return (
       <div className="grid-container" >
  <main className="main place-items-center" >
    <Dropdrownemployee />
    <div className=" grid main-header sm:grid-cols-2 gap-4 rounded-2xl"> 
    <div className="stats shadow">
      <div className="stat place-items-center ">
        <div className="stat-title">Name</div>
        <div className="stat-value">{Project_data.Employee_First_Name}</div>
        <div className="stat-desc text-secondary">Last Name: {Project_data.Employee_Last_Name}</div>
      </div>
    </div>
    <div className="stats shadow">
      <div className="stat place-items-center ">
        <div className="stat-title">Employee ID</div>
        <div className="stat-value">{SelectEmployee}</div>
      </div>
    </div>

    <div className="stats shadow">
      <div className="stat place-items-center ">
        <div className="stat-title">Edit</div>
        <div className="stat-value"><div className=" btn btn-secondary btn-outline" onClick={toggleEditPopup}><AiFillEdit size={32}/></div>
        </div>
      </div>
    </div>
    <div className="stats shadow">
      <div className="stat place-items-center ">
        <div className="stat-title">New Employee</div>
        <div className="stat-value"><AiFillPlusCircle className="text-primary"
      size={40} onClick={togglePopup}/> </div>
      </div>
    </div>
            {isOpen && <NewEmployee
                handleClose={togglePopup}
                Opened={isOpen}
            />} 
            {isEditOpen&& <EditEmployee
            handleClose={toggleEditPopup}
            Opened={isEditOpen}
            Employee={Project_data}
            />

            } 
    </div>
    
    <div className="main-overview">
    <div className="overviewcard">
        <div className="stats shadow w-full">
          <div className="stat bg-neutral place-items-center">
            <div className="stat-titleb text-primary ">Salary</div>
            <div className="stat-value text-secondary">{dollars.format(Project_data.Salary)}</div>
            <div className="stat-desc">{"thats "+dollars.format(Project_data.Salary/60)+" a minute"}</div>
          </div>
        </div>
      </div>
      <div className="overviewcard">
        <div className="stats shadow w-full">
          <div className="stat bg-neutral place-items-center">
            <div className="stat-titleb text-primary ">Total Owed</div>
            <div className="stat-value text-error">{dollars.format(Totalowed)}</div>
            <div className="stat-desc">{"thats"+Math.round(Totalowed/2.29)+" cokes bottels"}</div>
          </div>
        </div>
      </div>
      <div className="overviewcard">
        <div className="stats shadow w-full">
          <div className="stat bg-neutral place-items-center">
            <div className="stat-titleb text-primary ">Total hours work</div>
            <div className="stat-value text-secondary">{Project_data.Total_hours_Worked}</div>
            <div className="stat-desc">{Project_data.Total_hours_Worked-2} than Emperor Mo was in power </div>
          </div>
        </div>
      </div>
    </div>
    <div className="main-cards" key={SelectEmployee}>
      <div className="card">
        <TimeTableEmployee 
        props={SelectEmployee}  
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
