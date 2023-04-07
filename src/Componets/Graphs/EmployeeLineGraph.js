import React, {useContext}from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import EmployeeContext from '../../Context/EmployeeContext';
const EmployeeLineGraph = () => {
    const {Employee_timecard_Data}  = useContext(EmployeeContext)
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
          return (
            <div className=" bg-base-100 rounded-md border-none cursor-auto ">
              <p className="label">{`${label} : ${payload[0].value} hours`}</p>
            </div>
          );
        }
        return null;
      };
    return (
        <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={Employee_timecard_Data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} cursor={{fill:"#2A303C" }}/>
          <Legend />
          <Line type="monotone" dataKey="Total_Time" stroke="#84cc16" activeDot={{ r:10 }} />
        </LineChart>
      </ResponsiveContainer>
    )
}

export default EmployeeLineGraph
