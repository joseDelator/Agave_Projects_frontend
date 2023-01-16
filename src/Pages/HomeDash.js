import React from 'react'
import PieGraph from '../Componets/PieGraph'
import ProjectTable from '../Componets/Tables/Projectlist'
import '../Styles/HomeDash.css'
import BarGraphic from '../Componets/BarGraphic'
const HomeDash = () => {
    return (
      <div className="grid lg:grid-cols-3 gap-1 m-2 ">
          <div className="lg:col-span-2 card h-96" >
            <BarGraphic/>
          </div>
          <div className="card">
          <PieGraph TotalYearly={120000}/>
          </div>
          <div className="lg:col-span-1 card">
          <ProjectTable/>
          </div>
          <div className="lg:col-span-2 card">
          </div>
          <div className=" card">
          </div>
          <div className=" card">
          </div>
          
      </div>
    )
}

export default HomeDash
