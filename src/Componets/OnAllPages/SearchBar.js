import React, { useState } from 'react'
import { Link} from 'react-router-dom'
import api from '../../api'
const SearchBar = () => {
    const [Search_Data, setSearch_Data] = useState([])
    const [Empty, setEmpty] = useState(false)
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
            
            if(response.data.length === 0){
                setEmpty(false)
            }
            else{
                setEmpty(true)
            }
            
          })}catch(error){
              setSearch_Data([])
              setEmpty(false)
          }
     }
     function clear(){
        setSearch_Data([])
        setEmpty(false)

     }
     const Search_Rows = Search_Data.map((Search_entree)=>{
        
        return <li className="hover-bordered w-full space-x-4 justify-evenly  " key={Search_entree.Project_Number_ID}>
            <Link  
            to={"/details/projects/"+Search_entree.Project_Number_ID} 
            onClick={clear}>
                <div>{Search_entree.Project_Number_ID}</div>
                <div>{Search_entree.Street_Adress}</div>
                <div>{Search_entree.Client_Last_Name}</div>
            </Link>
      </li>
      
     })
    return (
        <div className="w-full">
    
    
   <div className="dropdown dropdown-open w-full">
       <input type="Search" placeholder="Search…" className="input  w-full bg-base-300  input-primary m-t-2 " onChange={e => Search(e)} />
       {Empty&&
        <ul tabIndex={0}  className="dropdown-content menu p-2   w-full shadow bg-base-300 ">
        <li className="menu-title">
            <span>Projects</span>
        </li>
        {Search_Data&&Search_Rows}
        </ul>
        }
        </div>
        </div>
    )
}

export default SearchBar
