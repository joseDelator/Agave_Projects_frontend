import React from 'react'
import PieGraph from '../Componets/Graphs/PieGraph'
import ProjectTable from '../Componets/Tables/Projectlist'
import BarGraphic from '../Componets/Graphs/BarGraphic'
import GeneralExpenseTable from '../Componets/Tables/GeneralExpenseTable'
import RadarGraph from '../Componets/Graphs/RadarGraph'

const HomeDash = () => {
    return (
      <div className=" max-w-full gap-1 m-2 lg:grid-cols-3 lg:grid ">
          <div className="lg:col-span-2 card h-96" >
            <BarGraphic/>
          </div>
          <div className="card">
          <PieGraph TotalYearly={120000}/>
          </div>
          <div className="card">
          <ProjectTable/>
          </div>
          <div className=" card lg:col-span-2   ">
          <GeneralExpenseTable/>
          </div>
          <div className=" card h-96">
            <RadarGraph/>
          </div>
          <div className=" card">
          </div>
          
      </div>
    )
}

export default HomeDash
