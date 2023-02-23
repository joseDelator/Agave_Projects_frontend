import { createContext, useState,} from "react";
import api from "../api";
import { Lastmonth, thistoday,} from "../Functions/DateandDollarFormate";
const EmployeeContext = createContext({});

export const EmployeeProvider = ({ children }) => {
    const [EmployeeList, setEmployeeList] = useState([])
    const [SelectEmployee, setSelectEmployee] = useState(1)
    const [Employee_timecard_Data, setEmployee_timecard_Data] = useState([])
    const [EmployeeData, setEmployeeData] = useState([])
    const [DateRange, setDateRange] = useState({
        startDate: Lastmonth,
        endDate: thistoday,
    });
    //to update employee data
    const updateemployeetimcarddata=(Params)=>{
        let headersList = {       
            "Content-Type": "application/json" 
           }
           let reqOptions = {
             url: "Employeetimecard/"+Params,
             method: "POST",
             headers: headersList,
             data:JSON.stringify({
              "Start": DateRange.startDate,
              "End":DateRange.endDate
            }),             
           }
           const fetch_somethe= async()=>{
            const reponse = await api.request(reqOptions);
            const timecard_data = reponse.data;
            setEmployee_timecard_Data(timecard_data)
           }
        fetch_somethe();   
        }
    const updateEmployeeinfo =()=>{
        let headersList = {           
            "Content-Type": "application/json" 
           }
           let reqOptions = {
             url: "Employee/"+SelectEmployee,
             method: "GET",
             headers: headersList,  
           }
           const fetch_somethe= async () =>{
            const reponse = await api.request(reqOptions);
            setEmployeeData(reponse.data)
            
           }
        fetch_somethe();

    }

    let contexData = {
        EmployeeList:EmployeeList,
        setEmployeeList:setEmployeeList,
        SelectEmployee:SelectEmployee,
        setSelectEmployee:setSelectEmployee,
        Employee_timecard_Data:Employee_timecard_Data,
        setEmployee_timecard_Data:setEmployee_timecard_Data,
        updateemployeetimcarddata:updateemployeetimcarddata,
        DateRange:DateRange,
        setDateRange:setDateRange,
        updateEmployeeinfo:updateEmployeeinfo,
        EmployeeData:EmployeeData,
        setEmployeeData:setEmployeeData,

    }
    return (
        <EmployeeContext.Provider
          value={contexData}
          >
          {children}
        </EmployeeContext.Provider>
      );
}

export default EmployeeContext