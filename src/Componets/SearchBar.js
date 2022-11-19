import React, { useState } from 'react'

import '../Styles/Searchbar.scss'
import { Link, redirect } from 'react-router-dom'
import api from '../api'
const SearchBar = () => {
    const [Search_Data, setSearch_Data] = useState([])
    function Search(e){
       let headersList = {
                       
         "Content-Type": "application/json" 
        }
        let reqOptions = {
          url: "Search/"+e.target.value,
          method: "GET",
          headers: headersList,
          data:JSON.stringify({
           
         }),
                }
        try{
             
            api.request(reqOptions).then(function (response) {
            setSearch_Data(response.data)
          })}catch(error){
              setSearch_Data([])
          }
     }
     const Search_Rows = Search_Data.map((Search_entree)=>{
        
        return <Link className="Sreachlist" key={Search_entree.Project_Number_ID} to={"/details/projects/"+Search_entree.Project_Number_ID} onClick={()=>setSearch_Data([])}>
        <div className="col" >{Search_entree.Project_Number_ID}</div>
        <div className="col">{Search_entree.Street_Adress}</div>
        <div className="col">{Search_entree.Client_Last_Name}</div>
      </Link>
     })
    return (
        <div>
            <div  className="search" action="">
                <input type="search"   placeholder="Search here..." onChange={e => Search(e)}/> 
                <div className="list-container">
                {Search_Data&&Search_Rows}
                </div>
                
            </div>   
            
        </div>
    )
}

export default SearchBar
