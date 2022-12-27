import React, {useState, useEffect}from 'react'
import { AiFillPlusCircle, AiFillEdit} from 'react-icons/ai'
import TimePopup from './Time_Card_Popup'
import '../Styles/timetable.scss'
import TimeEditPopup from './Time_Card_Edit_Popup'
import api from '../api'
import Datepicker from "react-tailwindcss-datepicker";
import "../Styles/taill.css"
export const TimeTableEmployee = (Params) => {
    const [Time_data, setTime_data] = useState([])
    const [timeEntree, settimeEntree] = useState([])
    const [isOpen, setisOpen] = useState(false)
    const Today= new Date()
    const Lastmonth= new Date().setDate(Today.getDate()-30)
    const [isEditOpen, setisEditOpen] = useState(false)
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
           console.log(DateRange.endDate, DateRange.startDate)
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
        return  <li className="table-row" key={timecard_entree.TimeCard_ID}>
        <div className="col col-1" data-label="Time:">{timecard_entree.Total_Time}</div>
        <div className="col col-2" data-label=" Project#:">{timecard_entree.Project_Number_ID_Time}</div>
        <div className="col col-3" data-label="Date:">{timecard_entree.Date}</div>
        <div className="col col-4" data-label="Payed:">
        <div className="flex ">
                <label className="inline-flex relative items-center mr-5 cursor-pointer self-center">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={timecard_entree.Been_Payed}
                        onChange={e => Payed_employee(timecard_entree,e)} 
                    />
                    <div 
                        className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                    ></div>
                    
                </label>
            </div>
       </div>
        <div className="col col-5" data-label="Edit"><AiFillEdit size={25} 
        onClick={e => openedit(timecard_entree, e)}/></div>
      
        </li>
    })
    return (
      
    <div  className='container'>
                <Datepicker
                inputClassName="text-base" 
                primaryColor={"cyan"}
                useRange={false} 
                separator={":"} 
                showShortcuts={true} 
                value={DateRange}
                onChange={changeState}
            />
        <h2 className="H2">Work Hours </h2>
            <ul className="responsive-table">
              <li className="table-header">
                <div className="col col-1">Hours</div>
                <div className="col col-2"> Project #</div>
                <div className="col col-3">Date</div>
                <div className="col col-4">Payed</div>
                <div className="col col-5">Edit</div> 
              </li>
              <div  className="table-container">
                {Time_data&&Tablerows}
              </div>
            </ul> 
            {isOpen && <TimePopup
              content={Params.props}
              handleClose={togglePopup}
            />}  
              {
            isEditOpen &&
            <TimeEditPopup
            TC = {timeEntree}  
            handleClose={toggeledit}
             />
            }


      </div>
    )
}
