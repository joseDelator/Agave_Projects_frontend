import { createContext, useState,} from "react";
import api from "../api";
const ProjectContext = createContext({});

export const ProjectProvider = ({ children }) => {
const [ProjectData, setProjectData] = useState([])
const [TimeCardtabledata, setTimeCardtabledata] = useState([])
const [pagesdata, setpagesdata] = useState([])
const [expensepage, setexpensepage] = useState([])
const [ExpenseProjectData, setExpenseProjectData] = useState([])
// getting porject timecard data
let updatetimecardproject= (page, Projectid)=>{
    let headersList = {       
        "Content-Type": "application/json" 
       }
       let reqOptions = {
         url: "TimeCardbyID/"+Projectid+"?page="+page,
         method: "GET",
         headers: headersList,             
       }
       const fetch_somethe= async()=>{
        const reponse = await api.request(reqOptions);
        const timecard_data = reponse
        setpagesdata(timecard_data.data)
        setTimeCardtabledata(timecard_data.data.results)
       }
    fetch_somethe();
}
// update project expenses
let updateprojectexpense=(page, Projectid)=>{
    let headersList = {      
        "Content-Type": "application/json" 
       }
       let reqOptions = {
         url: "ExpensebyID/"+Projectid+"?page="+page,
         method: "GET",
         headers: headersList,
         }
       const fetch_somethe= async () =>{
        const response = await api.request(reqOptions);
        setexpensepage(response.data)
        setExpenseProjectData(response.data.results)
        }
    fetch_somethe();
}
//getting porject info
let updateprojectinfo=(Projectid)=>{
    let headersList = {           
        "Content-Type": "application/json" 
       }
       let reqOptions = {
         url: "Agave_green/"+Projectid,
         method: "GET",
         headers: headersList,  
       }
       const fetch_somethe= async () =>{
        const response = await api.request(reqOptions);
       setProjectData(response.data)
       }
    fetch_somethe();
}
let contexData = {
    ProjectData:ProjectData,
    setProjectData:setProjectData,
    TimeCardtabledata:TimeCardtabledata,
    setTimeCardtabledata:setTimeCardtabledata,
    updatetimecardproject:updatetimecardproject,
    updateprojectinfo:updateprojectinfo,
    pagesdata:pagesdata,
    setpagesdata:setpagesdata,
    ExpenseProjectData:ExpenseProjectData,
    setExpenseProjectData:setExpenseProjectData,
    updateprojectexpense:updateprojectexpense,
    expensepage:expensepage
    
}
    return (
        <ProjectContext.Provider
          value={contexData}
          >
          {children}
        </ProjectContext.Provider>
      );
};

export default ProjectContext