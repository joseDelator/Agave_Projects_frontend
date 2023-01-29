import api from "../api"
export const AddingTime = async (Date, Agave_green_Project_Number,Employee_Id,Total_Time)=>{
    let headersList = {         
        "Content-Type": "application/json" 
       }
       let reqOptions = {
         url: "TimeCard",
         method: "POST",
         headers: headersList,
         data:JSON.stringify({
            "Project_Number_ID_Time" : Agave_green_Project_Number,
            "Employee_ID": Employee_Id,
            "Date" : Date,
            "Total_Time" : Total_Time,
        }),
       } 
       let jake = ""
        await api.request(reqOptions).then(function (response) {
           console.log(response)
            jake = response
       })
       return jake
       
       }