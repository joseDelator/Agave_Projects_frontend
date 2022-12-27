import React, {useState, Fragment}from 'react'
import {AiFillCloseSquare} from 'react-icons/ai'
import '../Styles/Time_Card.css'
import {GiPerson} from 'react-icons/gi'
import {BiError,BiPlanet} from 'react-icons/bi'
import ResponcePopup from './ResponcePopup'
import api from '../api'
const NewEmployee = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [Failed, setFailed] = useState(true);
    const togglePopup = () => {
    setIsOpen(!isOpen);
  }  
    function Add_Employee(e){
        e.preventDefault();
        let headersList = {         
            "Content-Type": "application/json" 
           }
           let reqOptions = {
             url: "Employee",
             method: "POST",
             headers: headersList,
             data:JSON.stringify({
              "Salary": e.target.Salary.value,
              "Employee_First_Name": e.target.Firstname.value,
              "Employee_Last_Name": e.target.Lastname.value,
            }),
           }
           api.request(reqOptions).then(function (response) {
               if (response.data === 'Added Successfully') {
                   setFailed(false)
                    window.location.reload(false);
               }
               else{
                 setFailed(true)
                 togglePopup()
               }
             console.log(response.data);
           })
           }
        
    return (
        <div className="popup-box">
          <Fragment>
        <div className="login-box">
        <h2 className="H2">Add Employee</h2>
        <GiPerson size={40} className="Time_Icon"/>
        <form onSubmit={Add_Employee}>
          <div className="user-box">
            <input type="number" name="Salary" pattern="[0-9]" required />
            <label>Salary</label>
          </div>
          <div className="user-box">
            <input type="text" name="Firstname"  required />
            <label>First Name</label>
          </div>
          <div className="user-box">
            <input type="text" name="Lastname"  required/>
            <label>Last Name</label>
          </div>
          <button className='button'>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </button>
          <AiFillCloseSquare className="close-icon-timecard" onClick={props.handleClose}/>
        </form>
      </div>
      {isOpen && <ResponcePopup
       content={ Failed ?<> 
       <BiError className="Error_Icon" size= {45}/>
        <h1>Error Please Try Again</h1>
      </>:<> 
       <BiPlanet className="Sucess_Icon" size= {45}/>
        <h1>Your Employee has Sucessfully Been added</h1>
      </>}
      handleClose={togglePopup}
    />}
      </Fragment>
          {props.content}
      </div>
    )
}
export default NewEmployee