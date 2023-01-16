import React, {useEffect, useState} from 'react'
import '../Styles/homedash.scss'
import { TimeTable } from '../Componets/Tables/TimeTable'
import { AiFillEdit} from 'react-icons/ai'
import { Link, useParams } from 'react-router-dom'
import Spiner from '../Componets/Spiner'
import ExpenseTable from '../Componets/Tables/ExpenseTable'
import api from '../api'
import StatusMarker from '../Componets/StatusMarker'
function ProjectDash() {
    const [Project_data, setProject_data] = useState([])
    const Params = useParams()
    const dollars = new Intl.NumberFormat(`en-US`, {
      currency: `USD`,
      style: 'currency',
  });
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
       <div className="grid-container min-h-screen" key={Params.id}>
  <main className="main" >
    <div className=" grid main-header md:grid-cols-3 gap-4 rounded-2xl">
      <div className="stats shadow">
      <div className="stat place-items-center ">
        <div className="stat-title">Address</div>
        <div className="stat-value text-xl">{Project_data.Street_Adress}</div>
        <div className="stat-desc text-secondary">City: {Project_data.City}</div>
      </div>
    </div>
    <div className="stats shadow">
      <div className="stat place-items-center ">
        <div className="stat-title">Client</div>
        <div className="stat-value">{Project_data.Client_Last_Name}</div>
        <div className="stat-desc text-secondary">Frist Name: {Project_data.Client_First_Name}</div>
      </div>
    </div>
      <div className="stats shadow">
      <div className="stat place-items-center ">
        <div className="stat-title">Client Phone</div>
        <div className="stat-value text-xl">{Project_data.Client_Phone}</div>
        <div className="stat-desc text-secondary">Email: {Project_data.Client_Email}</div>
      </div>
    </div>
    <div className="stats shadow">
      <div className="stat place-items-center ">
        <div className="stat-title">Project Number</div>
        <div className="stat-value">{Params.id}</div>
      </div>
    </div>
     <div className="stats shadow">
      <div className="stat place-items-center ">
        <div className="stat-title">Status</div>
        <div className="stat-value"><StatusMarker  Status={Project_data.Project_Status}/></div>
      </div>
    </div>
     <div className="stats shadow">
      <div className="stat place-items-center ">
        <div className="stat-title">Edit</div>
        <div className="stat-value"><Link className=" btn btn-secondary btn-outline" to={"/project/edit/"+Params.id}><AiFillEdit size={32}/></Link></div>
      </div>
    </div>
    
    </div>
    <div className="main-overview">
      <div className="overviewcard">
        <div className="stats shadow w-full ">
          <div className="stat bg-neutral place-items-center">
            <div className="stat-titleb text-primary">Total Bugget</div>
            <div className="stat-value text-secondary">{dollars.format(Project_data.Total_Buget)}</div>
            <div className="stat-desc">{Math.round(Project_data.Total_Buget/70)} total work hours</div>
          </div>
        </div>
      </div>
      <div className="overviewcard">
        <div className="stats shadow w-full  ">
          <div className="stat bg-neutral place-items-center">
            <div className="stat-titleb text-primary ">Expense</div>
            <div className="stat-value text-error">{dollars.format(Project_data.Total_Expensive_Cost) }</div>
            <div className="stat-desc">
              {Math.round((Project_data.Total_Expensive_Cost/Project_data.Total_Buget)*100)}% of total bugget</div>
          </div>
        </div>
      </div>
      <div className="overviewcard">
        <div className="stats shadow w-full">
          <div className="stat bg-neutral place-items-center">
            <div className="stat-titleb text-primary ">Labor Cost</div>
            <div className="stat-value text-error">{dollars.format(Project_data.Total_Labor_Cost)}</div>
            <div className="stat-desc"> {Math.round((Project_data.Total_Labor_Cost/Project_data.Total_Buget)*100)}% of total bugget</div>
          </div>
        </div>
      </div>
      <div className="overviewcard ">
        <div className="stats shadow w-full">
          <div className="stat bg-neutral place-items-center">
            <div className="stat-titleb text-primary">Remaining</div>
            <div className="stat-value">{dollars.format(Project_data.Budget_Remianing)}</div>
            <div className="stat-desc">{Math.round(Project_data.Budget_Remianing/70)} work hours left</div>
          </div>
        </div>
      </div>
    </div>
    <div className="main-cards">
      <div className="card"><TimeTable props ={Params.id} prefix={"TimeCard/"}/></div>
      <div className="card"><ExpenseTable props={Params.id}/></div>
    </div>
  </main>
</div>
    )}
}

export default ProjectDash
