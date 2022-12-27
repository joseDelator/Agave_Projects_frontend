import React, { useState, useEffect } from 'react'
import { BiError, BiPlanet, BiSave, BiEraser} from 'react-icons/bi';
import ResponcePopup from './ResponcePopup';
import { useParams } from 'react-router-dom'
import Spiner from './Spiner'
import '../Styles/Projectinput.css';
import api from '../api';
const ProjectEdit = () => {
  const [isOpen, setIsOpen] = useState(false);
    const [Failed, setFailed] = useState(true)
    const [Total_Budget, setTotal_Budget] = useState("")
    const [Phone, setPhone] = useState("")
    const [ProjectData, setProjectData] = useState({
        Client_First_Name:'',
        Client_Last_Name:'', 
        Street_Address:'',
        City:'',
        Client_Email:""
    })
    const Params = useParams()
    useEffect (() => {
        let headersList = {           
            "Content-Type": "application/json" 
           }
           let reqOptions = {
             url: "Agave_green/"+Params.id,
             method: "GET",
             headers: headersList,  
           }
           const fetch_somethe= async () =>{
            const reponse = await api.request(reqOptions);
            setTotal_Budget(reponse.data.Total_Buget)
            setPhone(reponse.data.Client_Phone)
            setProjectData({...ProjectData, 
                City: reponse.data.City, 
                Client_First_Name: reponse.data.Client_First_Name,
                Client_Last_Name: reponse.data.Client_Last_Name,
                Street_Address: reponse.data.Street_Adress,
                Client_Email: reponse.data.Client_Email

              })
           }
        fetch_somethe();
    }, [Params.id])
    
    const togglePopup = () => {
        setIsOpen(!isOpen);
      }  
    function Add_New_Project (e){
        e.preventDefault();
        let headersList = {         
            "Content-Type": "application/json" 
           }
           let reqOptions = {
             url: "Agave_green",
             method: "PUT",
             headers: headersList,
             data:JSON.stringify({
               "Project_Number_ID": Params.id,
              "Street_Adress": ProjectData.Street_Address,
              "City": ProjectData.City,
              "Client_First_Name": ProjectData.Client_First_Name,
              "Client_Last_Name": ProjectData.Client_Last_Name,
              "Total_Buget": parseInt(Total_Budget),
              "Client_Phone": Phone,
              "Client_Email": ProjectData.Client_Email,
            }),
           }
           api.request(reqOptions).then(function (response) {
               if (response.data === 'Updated Successfully') {
                window.location.replace("/details/projects/"+Params.id);
                    setFailed(false)
               }
               else{
                 setFailed(true)
               }
             console.log(response.data);
           })
           togglePopup()
           }
           if(ProjectData.length === 0){
            
            return <Spiner/>
            ;
           
        }else{
    return (
        <div>
  <form className="my-form" onSubmit={Add_New_Project}>
  <div className="container-project">
    <h1>Edit Project</h1>
    <ul>
      <li>
        <input type="Number" value={Total_Budget} placeholder="Total Budget" 
        onChange={(e) => setTotal_Budget(parseInt( e.target.value))} required/>
      </li>
      <li>
        <div className="grid grid-2">
          <input type="text" placeholder="Name" value={ProjectData.Client_First_Name}
          onChange={(e) => setProjectData({...ProjectData, Client_First_Name: e.target.value})} required/>  
          <input type="text" placeholder="Surname" value={ProjectData.Client_Last_Name}
          onChange={(e) => setProjectData({...ProjectData, Client_Last_Name: e.target.value})} required/>
        </div>
      </li>
      <li>
        <div className="grid grid-2">
          <input type="text" placeholder="Street Adress" value={ProjectData.Street_Address}
          onChange={(e) => setProjectData({...ProjectData, Street_Address: e.target.value})} required/>  
          <input type="text" placeholder="City" value={ProjectData.City}
          onChange={(e) => setProjectData({...ProjectData, City: e.target.value})} required/>
        </div>
      </li>    
      <li>
      <div className="grid grid-2">
          <input type="tel" placeholder="Phone Number" value={Phone}
          onChange={(e) => setPhone(e.target.value)} /> 
          <input type="email" placeholder="Email" value={ProjectData.Client_Email}
          onChange={(e) => setProjectData({...ProjectData, Client_Email: e.target.value})} />  
        </div>
      </li>   
      <li>
        <div className="grid grid-3">
          <div className="required-msg">REQUIRED FIELDS</div>
          <button className="btn-grid" type="submit" >
            <span className="back">
              <BiSave size={32}/>
            </span>
            <span className="front">SUBMIT</span>
          </button>
          <button className="btn-grid" type="reset" >
            <span className="back">
              <BiEraser  size={32}/>
            </span>
            <span className="front">RESET</span>
          </button> 
        </div>
      </li>    
    </ul>
  </div>
</form>
{isOpen && <ResponcePopup
    
    content={ Failed ?<> 
    <BiError className="Error_Icon" size= {45}/>
     <h1>Error Please Try Again</h1>
   </>:<> 
    <BiPlanet className="Sucess_Icon" size= {45}/>
     <h1>Your Project has Sucessfully Been updated</h1>
   </>}
   handleClose={togglePopup}
 />}

</div>
    )
}}

export default ProjectEdit