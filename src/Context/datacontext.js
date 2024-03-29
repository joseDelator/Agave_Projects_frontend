import { createContext, useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)
    const [ToastON, setToastON] = useState(false)
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
        let headersList = {         
            "Content-Type": "application/json" 
           }
           let reqOptions = {
             url: "api/token/refresh/",
             method: "POST",
             headers: headersList,
             data:JSON.stringify({
                'refresh':authTokens?.refresh
            }),
           }
           api.request(reqOptions).then(function (response) {  
             if (response.status === 200){
                setAuthTokens(response.data)
                setUser(jwt_decode(response.data.access))
                localStorage.setItem('authTokens', JSON.stringify(response.data))
                }else{
                 logoutUser()
                }
                if(loading){
                    setLoading(false)
                }
           })
    }
    const toggloToast =()=>{
        setToastON(!ToastON)  
        if(!
            ToastON){
            setTimeout(() => {
                setToastON(!ToastON)
              }, 3000);
          
           console.log("ff") 
        }
    }
    const notify = () => toast.success("Sucess!",{
        position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
    });
    let contexData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser,
        ToastON:ToastON,
        toggloToast:toggloToast,
        notify:notify
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
