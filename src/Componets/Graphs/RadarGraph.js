import React, {useState, useEffect}from 'react'
import {Cell, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Tooltip} from 'recharts';
import api from '../../api';
import { dollars } from '../../Functions/DateandDollarFormate';
const RadarGraph = () => {
  const COLORS = ['#84cc16', '#1FB2A6', '#FFBB23', '#F87272','#d9f99d' ];
    const [data, setdata] = useState([])
    useEffect (() => {
        let headersList = {       
            "Content-Type": "application/json" 
           }
           let reqOptions = {
             url: "GeneralExpensesByDate",
             method: "GET",
             headers: headersList,             
           }
           const fetch_somethe= async()=>{
            const reponse = await api.request(reqOptions)
            const gedata = reponse.data;
           setdata(gedata)
           }
            fetch_somethe();
        }, [])
        const CustomTooltip = ({ active, payload, }) => {
            if (active && payload && payload.length) {
              return (
                <div className=" bg-base-100 rounded-md border-none cursor-auto ">
                  <p className="label">{dollars.format(payload[0].value)}</p>
                </div>
              );
            }
          
            return null;
          };
          
    return (
       
        <ResponsiveContainer width="100%" height="100%">
        <PieChart width={500} height={500}>
        
          <Pie
            dataKey="sum_cantidad"
            isAnimationActive={false}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={60} 
            label={(entry) => entry.Expense_Type}
            fill="#8884d8"
            paddingAngle={5}
            stroke="none"
          >
              {data&&data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} cursor={{fill:"#2A303C" }}  />
        </PieChart>
      </ResponsiveContainer>
   
    )
}

export default RadarGraph
