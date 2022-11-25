import {React,useState, useEffect} from 'react'
import '../Styles/dropDown.scss'
import api from '../api';
const Dropdrownemployee = () => {
    const [Employeelist, setEmployeelist] = useState([]);
    const [Employee_Id, setEmployee_Id] = useState("")

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
        const reponse = await api.request(reqOptions);
        const Employeedata = reponse.data;
       setEmployeelist(Employeedata)
       }
        fetch_somethe();
    }, [])
    const dropdownrows = Employeelist.map((Employee)=>{
        return  <option value={Employee.Employee_ID}>{Employee.Employee_First_Name}</option>
    })
    return (
        <div>
        <select>
        <option  value="0" onChange>select Empoyee</option>
        {Employeelist&&dropdownrows}
        </select>
        </div>
    )
}

export default Dropdrownemployee
