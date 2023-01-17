import React, {useState, useEffect}from 'react'
import { AiFillPlusCircle, AiFillEdit} from 'react-icons/ai'
import TimePopup from '../PopUps/Time_Card_Popup'
import TimeEditPopup from '../PopUps/Time_Card_Edit_Popup'
import api from '../../api'
import { intlFormat } from 'date-fns'
export const TimeTable = (Params) => {
    const [Time_data, setTime_data] = useState([])
    const [timeEntree, settimeEntree] = useState([])
    const [isOpen, setisOpen] = useState(false)
    const [isEditOpen, setisEditOpen] = useState(false)
    const datef = new  Intl.DateTimeFormat("us-en",{
      dateStyle:"short"
    })
    const togglePopup = () => {
      setisOpen(!isOpen);
    }
    const toggeledit =() =>{
      setisEditOpen(!isEditOpen)
    }
    useEffect (() => {
        let headersList = {       
            "Content-Type": "application/json" 
           }
           let reqOptions = {
             url: Params.prefix+Params.props,
             method: "GET",
             headers: headersList,             
           }
           const fetch_somethe= async()=>{
            const reponse = await api.request(reqOptions);
            const timecard_data = reponse.data;
           setTime_data(timecard_data)
           }
        fetch_somethe();
    }, [ Params.prefix,Params.props])
   
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
        <th >{timecard_entree.Employee_info}</th>
        <td >{timecard_entree.Total_Time}</td>
        <td>{ datef.format(new Date(timecard_entree.Date))}</td>
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
    <AiFillPlusCircle className="absolute top-1 right-1 text-secondary" size={40} onClick={togglePopup}/>
        <h2 className="H2 self-center">Work Hours </h2>
        <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
            <thead>
              <tr className="text-secondary">
                <th>Name</th>
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
        {isEditOpen&&
          <TimeEditPopup
          TC = {timeEntree}  
          handleClose={toggeledit}
          Opened = {isEditOpen}
         />
        }
            </div>
             <TimePopup
              content={Params.props}
              handleClose={togglePopup}
              Opened = {isOpen}
              />
      </div>
    )
}
