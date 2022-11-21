import React, {useEffect, useState} from 'react'
import '../Styles/homedash.scss'
import { TimeTable } from './TimeTable'
import { AiFillEdit} from 'react-icons/ai'
import { Link, useParams } from 'react-router-dom'
import Spiner from './Spiner'
import ExpenseTable from './ExpenseTable'
import api from '../api'
function HomeDash() {
    const [Project_data, setProject_data] = useState([])
    const Params = useParams()
    useEffect (() => {
        let headersList = {           
            "Content-Type": "application/json" 
           }
           let reqOptions = {
             url: "Agave_green/"+Params.id,
             method: "GET",
             headers: headersList,  
           }
           const fetch_somethe= async () =>{
            const reponse = await api.request(reqOptions);
           setProject_data( reponse.data)
           }
        fetch_somethe();
    }, [Params.id])
    if(Project_data.length === 0){
            
        return <Spiner/>
        ;
       
    }else{
    return (
       <div className="grid-container" key={Params.id}>
  <main className="main" >
    <div className="main-header">
    <Link id="edit_button" to={"/project/edit/"+Params.id}><AiFillEdit size={32}/></Link>
      <div className="main-header__heading">Address:{Project_data.Street_Adress}, {Project_data.City}</div>
      <div className="main-header__updates">Client:{Project_data.Client_Last_Name}, {Project_data.Client_First_Name}</div>
      <div>Project Number:{Params.id}</div>
    </div>

    <div className="main-overview">
      <div className="overviewcard">
        <div className="overviewcard__icon">Total Bugget</div>
        <div className="overviewcard__info">${Project_data.Total_Buget.toString().replace(/[^0-9 \,]/, '')}</div>
      </div>
      <div className="overviewcard">
        <div className="overviewcard__icon">Expense</div>
        <div className="overviewcard__info"key={Params.id}>${Project_data.Total_Expensive_Cost}</div>
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
      <div className="card"><TimeTable props ={Params.id}/></div>
      <div className="card"><ExpenseTable props={Params.id}/></div>
    </div>
  </main>


</div>
    )}
}

export default HomeDash
