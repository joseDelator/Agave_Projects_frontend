import React, {useState, useEffect}from 'react'
import {Link} from 'react-router-dom'
import api from '../../api';
const ProjectTable = (Params) => {
    const [Project_data, setExpense_data] = useState([])
    const [ProjectStatus, setProjectStatus] = useState("Active")
    useEffect (() => {
        let headersList = {        
            "Content-Type": "application/json" 
           }
           let reqOptions = {
             url: "Projectbystatus/"+ProjectStatus,
             method: "GET",
             headers: headersList,
             }
           const fetch_somethe= async () =>{
            const reponse = await api.request(reqOptions);
            const timecard_data = reponse.data;
           setExpense_data(timecard_data)
            }

        fetch_somethe();
    }, [ProjectStatus])
    const Tablerows = Project_data.map((Project_entree, e)=>{
        return  <tr key={Project_entree.Project_Number_ID}>
        <td>
        <Link to={"/details/projects/"+Project_entree.Project_Number_ID} 
        className="col col-1" data-label="ID:">{Project_entree.Project_Number_ID}</Link>
        </td>
        <td>
        <Link to={"/details/projects/"+Project_entree.Project_Number_ID} 
        className="col col-2" data-label="Surname:">{Project_entree.Client_Last_Name}</Link>
        </td>
        <td>
        <Link to={"/details/projects/"+Project_entree.Project_Number_ID} 
        className="col col-3" data-label="Address:">{Project_entree.Street_Adress}</Link>
        </td>
      </tr>
    })
    return (
    <div className="container">
        <select className="select select-primary w-full" 
                    onChange={(e)=>setProjectStatus( e.target.value)}>
                      <option value={"Active"}>
                    Active</option>
                    <option value={"Tracking"}>
                    Tracking</option>
                    <option value={"Completed"}>
                    Completed</option>
               </select>
        <h2 className="H2"> Projects</h2>
          <div className=" overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
              <tr className="text-secondary sticky top-0">
                <th>ID</th>
                <th>Surname</th>
                <th>Address</th>
              </tr>
              </thead>
              <tbody>
                {Project_data&&Tablerows}
              </tbody>
            </table>  
            </div>
      </div>
    )
}

export default ProjectTable
