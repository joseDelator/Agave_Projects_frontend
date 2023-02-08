import React, {useState, useEffect, use}from 'react'
import { AiFillPlusCircle, AiFillEdit} from 'react-icons/ai'
import TimeEditPopup from '../PopUps/Time_Card_Edit_Popup'
import api from '../../api'
import { dollars } from '../../Functions/DateandDollarFormate'
import StatusMarker from '../StatusMarker'
import PhasePopup from '../PopUps/Phase_Popup'
import PhaseEditPopup from '../PopUps/Phase_Edit_Popup '


export const PhaseTable = (Params) => {
    const [Time_data, setTime_data] = useState([])
    const [timeEntree, settimeEntree] = useState([])
    const [isOpen, setisOpen] = useState(false)
    const [isEditOpen, setisEditOpen] = useState(false)
  
    
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
             url: "ProjectPhase/"+Params.props,
             method: "GET",
             headers: headersList,             
           }
           const fetch_somethe= async()=>{
            const reponse = await api.request(reqOptions);
            const timecard_data = reponse
            setTime_data(timecard_data.data)
           }
        fetch_somethe();
    }, [Params.props])
   

   const openedit =(timecard_entree)=>{
      settimeEntree(timecard_entree);
      setisEditOpen(true)
    }
    const Tablerows = Time_data.map((timecard_entree)=>{
        return  <tr key={timecard_entree.Phase_ID}>
        <th >{timecard_entree.Phase_ID}</th>
        <td >{dollars.format(timecard_entree.Allocated_Amount)}</td>
        <td >{timecard_entree.Phase_description}</td>
        <td>{<StatusMarker Status={timecard_entree.Project_Status}/> }</td>
        <td >
        {
          // opeing edit time popup
        }
          <div className="btn  btn-warning btn-outline" onClick={e => openedit(timecard_entree, e)}>
          <AiFillEdit size={20} 
        />
        </div>
        </td>
        
        </tr>
    })
    return (
    <div  className='w-full'>
        <AiFillPlusCircle className=" absolute right-2 top-2 text-secondary" size={40} onClick={togglePopup}/>
        <h2 className="H2 self-center">Project Phases </h2>
        <div className="overflow-x-auto">
        
        <table className="table table-compact table-zebra w-full">
            <thead>
              <tr className="text-secondary">
                <th>Phase Number</th>
                <th>Amount Allocated</th>
                <th>Description</th>
                <th>Status</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
                {Time_data&&Tablerows}
            </tbody> 
        </table>
        {isEditOpen&&
          <PhaseEditPopup
          TC = {timeEntree}  
          handleClose={toggeledit}
          Opened = {isEditOpen}
         />
        }
        
 </div>
             <PhasePopup
              content={Params.props}
              handleClose={togglePopup}
              Opened = {isOpen}
              />
      </div>
    )
}
