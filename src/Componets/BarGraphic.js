import React, { PureComponent, useState, useEffect } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../api';
  
 const BarGraphic= ()=>{
    const [Employeelist, setEmployeelist] = useState([])
    useEffect (() => {
      let headersList = {       
          "Content-Type": "application/json" 
         }
         let reqOptions = {
           url: "Employee",
           method: "GET",
           headers: headersList,             
         }
         const fetch_somethe= async()=>{
          const reponse = await api.request(reqOptions)
          const Employeedata = reponse.data;
         setEmployeelist(Employeedata)
         }
          fetch_somethe();
      }, [])
      const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
          return (
            <div className=" bg-base-100 rounded-md border-none cursor-auto ">
              <p className="label">{`${label} : ${payload[0].value}`}</p>
            </div>
          );
        }
      
        return null;
      };
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={10}
           height={40}
          data={Employeelist}
        >
          <XAxis dataKey="Employee_First_Name" stroke="#6b7280" />
          <YAxis  stroke="#6b7280"/>
         <Tooltip content={<CustomTooltip />} cursor={{fill:"#2A303C" }}/>
          <Bar dataKey="Total_hours_Worked" fill="#84cc16" />
        </BarChart>
      </ResponsiveContainer>
    );
  
}
export default BarGraphic