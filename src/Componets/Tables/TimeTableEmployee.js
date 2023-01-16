import React, {useState, useEffect}from 'react'
import TimePopup from '../PopUps/Time_Card_Popup'
import TimeEditPopup from '../PopUps/Time_Card_Edit_Popup'
import api from '../../api'
import { AiFillEdit } from 'react-icons/ai'
import Datepicker from "react-tailwindcss-datepicker";
export const TimeTableEmployee = (Params) => {
    // all time card data for tiem range
    const [Time_data, setTime_data] = useState([])
    // selected time entree for edite popup
    const [timeEntree, settimeEntree] = useState([])
    //popup toggles
    const [isOpen, setisOpen] = useState(false)
    const [isEditOpen, setisEditOpen] = useState(false)
    //setting starting date
    const Today= new Date()
    const Lastmonth= new Date().setDate(Today.getDate()-30)
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const [DateRange, setDateRange] = useState({
      startDate: new Date(Lastmonth).toLocaleDateString('en-CA', options),
      endDate: new Date().toLocaleDateString('en-CA', options)
  });

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
        let headersList = {       
            "Content-Type": "application/json" 
           }
           let reqOptions = {
             url: Params.prefix+Params.props,
             method: "POST",
             headers: headersList,
             data:JSON.stringify({
              "Start": DateRange.startDate,
              "End":DateRange.endDate
            }),             
           }
           const fetch_somethe= async()=>{
            const reponse = await api.request(reqOptions);
            const timecard_data = reponse.data;
           setTime_data(timecard_data)
           }
        fetch_somethe();
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
           }
           else{
           }
       }) 
    };
   const openedit =(timecard_entree)=>{
      settimeEntree(timecard_entree);
      setisEditOpen(true)
    }
    const Tablerows = Time_data.map((timecard_entree)=>{
      return  <tr key={timecard_entree.TimeCard_ID}>
      <th >{timecard_entree.Project_Number_ID_Time}</th>
      <td >{timecard_entree.Total_Time}</td>
      <td>{timecard_entree.Date}</td>
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
                inputClassName="font-normal bg-base-100 dark:bg-base-100 dark:placeholder:text-secondary" 
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
                {Time_data&&Tablerows}
  
            </tbody> 
            </table>
            </div>
            {isOpen && <TimePopup
              content={Params.props}
              handleClose={togglePopup}
            />}  
              {
            isEditOpen &&
            <TimeEditPopup
              TC = {timeEntree}  
              handleClose={toggeledit}
              Opened = {isEditOpen}
              />
            }


      </div>
    )
}
