import React, {useState, useEffect, useContext}from 'react'
import TimePopup from '../PopUps/Time_Card_Popup'
import api from '../../api'
import { AiFillEdit } from 'react-icons/ai'
import Datepicker from "react-tailwindcss-datepicker";
import { datef } from '../../Functions/DateandDollarFormate';
import EmployeeContext from '../../Context/EmployeeContext';
import TimeEditPopupEmployee from '../PopUps/Time_Card_Edit_Popup_Employee'
export const TimeTableEmployee = (Params) => {
    // all time card data for time range
    const {updateemployeetimcarddata, updateEmployeeinfo, Employee_timecard_Data,DateRange,setDateRange}  = useContext(EmployeeContext)
    // selected time entree for edite popup
    const [timeEntree, settimeEntree] = useState([])
    //popup toggles
    const [isOpen, setisOpen] = useState(false)
    const [isEditOpen, setisEditOpen] = useState(false)
    //setting starting date
    const togglePopup = () => {
      setisOpen(!isOpen);
    }
    const toggeledit =() =>{
      setisEditOpen(!isEditOpen)
    }
    const changeState = (newState) => {
      setDateRange(newState);
    };
   
    useEffect (() => {
      updateemployeetimcarddata(Params.props)
    }, [ Params.prefix,Params.props, DateRange])
   
    function Payed_employee (Time_Entree,e){
      Time_Entree.Been_Payed = !Time_Entree.Been_Payed
      let headersList = {       
        "Content-Type": "application/json" 
       }
       let reqOptions = {
         url: "TimeCard",
         method: "PUT",
         headers: headersList,
         data:JSON.stringify({
          "TimeCard_ID": Time_Entree.TimeCard_ID,
            "Project_Number_ID_Time" : Time_Entree.Project_Number_ID_Time,
            "Employee_ID": Time_Entree.Employee_ID,
            "Date" : Time_Entree.Date,
            "Total_Time" : Time_Entree.Total_Time,
            "Been_Payed": Time_Entree.Been_Payed
        }),
       }
       api.request(reqOptions).then(function (response) {
           if (response.data === 'Updated Successfully') {
            e.target.checked=Time_Entree.Been_Payed
            updateEmployeeinfo()
          }
       }) 
    };
   const openedit =(timecard_entree)=>{
      settimeEntree(timecard_entree);
      setisEditOpen(true)
    }
    const Tablerows = Employee_timecard_Data.map((timecard_entree)=>{
      return  <tr key={timecard_entree.TimeCard_ID}>
      <th>{timecard_entree.Project_Number_ID_Time}</th>
      <td>{timecard_entree.Total_Time}</td>
      <td>{datef.format(new Date(timecard_entree.Date.replace(/-/g, '/')))}</td>
      <td>
        <input
          type="checkbox"
          className="toggle toggle-primary"
          checked={timecard_entree.Been_Payed}
          onChange={e => Payed_employee(timecard_entree,e)} 
        />     
     </td>
     <td >
          <div className="btn  btn-warning btn-outline" onClick={e => openedit(timecard_entree, e)}>
          <AiFillEdit size={20} 
        />
        </div>
        </td>
      </tr>
      
  })
    return (
      
    <div  className='container'>
                <Datepicker
                inputClassName="font-normal bg-base-100 text-lg dark:bg-base-100 dark:placeholder:text-secondary" 
                primaryColor={"lime"}
                useRange={false}  
                showShortcuts={true} 
                value={DateRange}
                className="bg-green z-20"
                onChange={changeState}
            />
        <h2 className="H2">Work Hours </h2>
        <div className="overflow-x-auto">
        <table className="table table-zebra w-full z-0">
              <thead>
              <tr className="text-secondary">
                <th>Project #</th>
                <th>Hours</th>
                <th>Date</th>
                <th>Payed</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
                {Employee_timecard_Data&&Tablerows}
            </tbody> 
            </table>
            </div>
            {isOpen && <TimePopup
              content={Params.props}
              handleClose={togglePopup}
            />}  
              {
            isEditOpen &&
            <TimeEditPopupEmployee
              TC = {timeEntree}  
              handleClose={toggeledit}
              Opened = {isEditOpen}
              />
            }


      </div>
    )
}
