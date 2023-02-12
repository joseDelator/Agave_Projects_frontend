import React, {useState,useEffect}from 'react'
import { dollars } from '../../Functions/DateandDollarFormate'
import api from '../../api'
const PieGraph = ({TotalYearly}) => {
  const [Projects, setProjects] = useState(0)
  const [Precent] = useState(Math.round((120000/250000)*100))

  useEffect (() => {
    let headersList = {        
        "Content-Type": "application/json" 
       }
       let reqOptions = {
         url: "Agave_green",
         method: "GET",
         headers: headersList,
         }
       const fetch_somethe= async () =>{
        const reponse = await api.request(reqOptions);
        const dataf = reponse.data;
        }

    fetch_somethe();
}, [])
  function StatusStyling() {
    if(Precent<40){
      return " text-error"
    }
    if(Precent<70 && Precent>=40){
      return " text-warning"
    }
    if(Precent>=70){
      return " text-primary"
    }
}
    return (
        <div className="">
          <div className="stat  place-items-center ">
          <div className="stat-title  mb-6">Road to 250K</div>
          <div className={"radial-progress"+StatusStyling()} 
          style={{ "--value": Precent, "--size": "10rem", "--thickness": "1.5rem" }}>{Precent}%</div>
           <div className="stat-desc mt-6"> {dollars.format(TotalYearly)} for the year </div>
         </div>
        </div>
    )
}

export default PieGraph
