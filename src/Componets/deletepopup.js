import React from 'react'
import api from '../api';
import {AiFillCloseSquare} from 'react-icons/ai'
const Deletepopup = (props) => {
    function Delete_Expense (e){
        e.preventDefault();
        let headersList = {         
            "Content-Type": "application/json" 
           }
           let reqOptions = {
             url: "Expenses/"+props.TC.Expense_ID,
             method: "DELETE",
             headers: headersList,
           }
           api.request(reqOptions).then(function (response) {
               if (response.data === "Deleted Successfully") {
                    window.location.reload(false);
               }
               else{
                
               }
           })
           } 
    return (
        <div className="popup-box ">
            <div className="box-in-popup">
                <AiFillCloseSquare className="close-icon" onClick={props.handleClose}/>
                <h4 class="font-medium leading-tight text-2xl mt-0 mb-4 ">Do you want to delete this entree</h4>
                <button type="button" className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs 
                leading-tight uppercase m-2
                rounded shadow-md hover:bg-red-700 hover:shadow-lg 
                focus:bg-red-700 focus:shadow-lg focus:outline-none 
                focus:ring-0 active:bg-red-800 active:shadow-lg 
                transition duration-150 ease-in-out"
                onClick={Delete_Expense}
                >Delete</button>

            </div>
    </div>
    )
}

export default Deletepopup