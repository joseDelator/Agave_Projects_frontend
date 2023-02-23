import React, {useContext, useEffect, useState} from 'react'
import '../Styles/homedash.scss'
import Spiner from '../Componets/Spiner'
import { AiFillPlusCircle, AiFillEdit} from 'react-icons/ai'
import NewEmployee from '../Componets/PopUps/NewEmployeePopup'
import Dropdrownemployee from '../Componets/dropdrownemployee'
import { TimeTableEmployee } from '../Componets/Tables/TimeTableEmployee'
import EditEmployee from '../Componets/PopUps/EditEmployeePopup'
import { dollars } from '../Functions/DateandDollarFormate'
import EmployeeContext from '../Context/EmployeeContext'
const EmployeeDash =()=>{
    const [isOpen, setisOpen] = useState(false)
    const [isEditOpen, setisEditOpen] = useState(false)
    const{ SelectEmployee,updateEmployeeinfo,EmployeeData} = useContext(EmployeeContext)
    const togglePopup = () => {
      setisOpen(!isOpen);
    }
    const toggleEditPopup = () => {
      setisEditOpen(!isEditOpen);
    }
    useEffect (() => {
      updateEmployeeinfo()
    }, [SelectEmployee])
    if(EmployeeData.length === 0){  
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
        <div className="stat-value">{EmployeeData.Employee_First_Name}</div>
        <div className="stat-desc text-secondary">Last Name: {EmployeeData.Employee_Last_Name}</div>
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
            Employee={EmployeeData}
            />

            } 
    </div>
    
    <div className="main-overview">
    <div className="overviewcard">
        <div className="stats shadow w-full">
          <div className="stat bg-neutral place-items-center">
            <div className="stat-titleb text-primary ">Salary</div>
            <div className="stat-value text-secondary">{dollars.format(EmployeeData.Salary)}</div>
            <div className="stat-desc">{"thats "+dollars.format(EmployeeData.Salary/60)+" a minute"}</div>
          </div>
        </div>
      </div>
      <div className="overviewcard">
        <div className="stats shadow w-full">
          <div className="stat bg-neutral place-items-center flex-wrap max-w-full">
            <div className="stat-titleb text-primary ">Total Owed</div>
            <div className="stat-value text-error">{dollars.format(EmployeeData.Total_Unpaid_Amount)}</div>
            <div className="stat-desc">{"thats "+EmployeeData.Total_Unpaid_Amount/EmployeeData.Salary+" hours"}</div>
          </div>
        </div>
      </div>
      <div className="overviewcard">
        <div className="stats shadow w-full">
          <div className="stat bg-neutral place-items-center">
            <div className="stat-titleb text-primary ">Total hours work</div>
            <div className="stat-value text-secondary">{EmployeeData.Total_hours_Worked}</div>
            <div className="stat-desc flex-wrap max-w-full overflow-auto"> this is a total for the full year</div>
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
