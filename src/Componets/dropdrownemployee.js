import { useEffect, useContext} from 'react'
import api from '../api'
import EmployeeContext from '../Context/EmployeeContext'
const Dropdrownemployee = () => {
  const{EmployeeList, setEmployeeList, setSelectEmployee, SelectEmployee} = useContext(EmployeeContext)
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
       setEmployeeList(Employeedata)
       }
        fetch_somethe();
    }, [])
    const dropdownrows = EmployeeList.map((Employee)=>{
        return <option key={Employee.Employee_ID}value={Employee.Employee_ID}>
          {Employee.Employee_First_Name}</option>
    })
    return (
        <div>
        <select className="select select-primary w-full  
        text-secondary mt-5 max-w-md" value= {SelectEmployee} select 
        onChange={(e) => setSelectEmployee(e.target.value)}>
        <option  value="0" onChange>select Employee</option>
        {EmployeeList&&dropdownrows}
        </select>
        </div>
    )
}
export default Dropdrownemployee
