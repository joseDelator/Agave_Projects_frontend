import React, {useEffect, useContext} from 'react'
import '../Styles/homedash.scss'
import { TimeTable } from '../Componets/Tables/TimeTable'
import { AiFillEdit} from 'react-icons/ai'
import { Link, useParams } from 'react-router-dom'
import Spiner from '../Componets/Spiner'
import ExpenseTable from '../Componets/Tables/ExpenseTable'
import ProjectContext from '../Context/projectdatacontext'
import StatusMarker from '../Componets/StatusMarker'
import { dollars } from '../Functions/DateandDollarFormate'
import { PhaseTable } from '../Componets/Tables/PhaseTable'
function ProjectDash() {
    const {ProjectData,updateprojectinfo} = useContext(ProjectContext)
    const Params = useParams()
    useEffect (() => {
       updateprojectinfo(Params.id)
    }, [Params.id])
    if(ProjectData.length === 0){
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
        <div className="stat-value text-xl">{ProjectData.Street_Adress}</div>
        <div className="stat-desc text-secondary">City: {ProjectData.City}</div>
      </div>
    </div>
    <div className="stats shadow">
      <div className="stat place-items-center ">
        <div className="stat-title">Client</div>
        <div className="stat-value">{ProjectData.Client_Last_Name}</div>
        <div className="stat-desc text-secondary">Frist Name: {ProjectData.Client_First_Name}</div>
      </div>
    </div>
      <div className="stats shadow">
      <div className="stat place-items-center ">
        <div className="stat-title">Client Phone</div>
        <div className="stat-value text-xl">{ProjectData.Client_Phone}</div>
        <div className="stat-desc text-secondary">Email: {ProjectData.Client_Email}</div>
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
        <div className="stat-value"><StatusMarker  Status={ProjectData.Project_Status}/></div>
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
            <div className="stat-value text-secondary">{dollars.format(ProjectData.Total_Buget)}</div>
            <div className="stat-desc">{Math.round(ProjectData.Total_Buget/70)} total work hours</div>
          </div>
        </div>
      </div>
      <div className="overviewcard">
        <div className="stats shadow w-full  ">
          <div className="stat bg-neutral place-items-center">
            <div className="stat-titleb text-primary ">Expense</div>
            <div className="stat-value text-error">{dollars.format(ProjectData.Total_Expensive_Cost) }</div>
            <div className="stat-desc">
              {Math.round((ProjectData.Total_Expensive_Cost/ProjectData.Total_Buget)*100)}% of total bugget</div>
          </div>
        </div>
      </div>
      <div className="overviewcard">
        <div className="stats shadow w-full">
          <div className="stat bg-neutral place-items-center">
            <div className="stat-titleb text-primary ">Labor Cost</div>
            <div className="stat-value text-error">{dollars.format(ProjectData.Total_Labor_Cost)}</div>
            <div className="stat-desc"> {Math.round((ProjectData.Total_Labor_Cost/ProjectData.Total_Buget)*100)}% of total bugget</div>
          </div>
        </div>
      </div>
      <div className="overviewcard ">
        <div className="stats shadow w-full">
          <div className="stat bg-neutral place-items-center">
            <div className="stat-titleb text-primary">Remaining</div>
            <div className="stat-value">{dollars.format(ProjectData.Budget_Remianing)}</div>
            <div className="stat-desc">{Math.round(ProjectData.Budget_Remianing/70)} work hours left</div>
          </div>
        </div>
      </div>
    </div>
    <div className="card">
      <PhaseTable props={Params.id}></PhaseTable>
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
