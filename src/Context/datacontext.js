// The DataContext.js component
import { createContext, useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";
const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)
    const history = useNavigate()
let loginUser = async(e)=>{
    e.preventDefault();
    let headersList = {         
        "Content-Type": "application/json" 
       }
       let reqOptions = {
         url: "api/token/",
         method: "POST",
         headers: headersList,
         data:JSON.stringify({
            "username":e.target.username.value,
            "password":e.target.password.value,
        }),
       }
       api.request(reqOptions).then(function (response) {
        setAuthTokens(response.data)
        setUser(jwt_decode(response.data.access))
        localStorage.setItem('authTokens', JSON.stringify(response.data))
        history('/')
       })
       
    }
    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        history('/login')
    }

    let updateToken = async ()=> {
        let response = await fetch('https://agaveprojectmangement-production.up.railway.app/api/token/refresh/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authTokens?.refresh})
        })

        let data = await response.json()
        
        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        }else{
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }
    let contexData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser,
    
    }
    useEffect(()=> {

        if(loading){
            updateToken()
        }

        let fourMinutes = 1000 * 60 * 4

        let interval =  setInterval(()=> {
            if(authTokens){
                updateToken()
            }
        }, fourMinutes)
        return ()=> clearInterval(interval)

    }, [authTokens, loading])
  return (
    <DataContext.Provider
      value={contexData}
      >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
