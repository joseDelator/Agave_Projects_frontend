import React, {useState, Fragment}from 'react'
import {AiFillCloseSquare} from 'react-icons/ai'
import '../Styles/Time_Card.css'
import {RiMoneyDollarCircleLine} from 'react-icons/ri'
import {BiError,BiPlanet} from 'react-icons/bi'
import api from '../api'
import ResponcePopup from './ResponcePopup'

const ExpensePopup = (props) => {
    const [Photo, setPhoto] = useState('')
    const [Cost, setCost] = useState("")
    const [Name, setName] = useState("")
    const [Date, setDate] = useState('')
    const [Desription, setDesription] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [Failed, setFailed] = useState(true)
  const togglePopup = (props) => {
    setIsOpen(!isOpen);
  }  
   
    function Add_Expense (e){
        e.preventDefault();
        let headersList = {
          "Accept": "*/*",
          
         }
        
         let formdata = new FormData();
         formdata.append("Image_Location", Photo);
         formdata.append("Project_Number_ID_Expense", props.content);
         formdata.append("Seller_Name", Name);
         formdata.append("Description", Desription);
         formdata.append("Date", Date);
         formdata.append("Cost", Cost);
  
                  let reqOptions = {
                    url:  "Expenses",
                    method: "POST",
                    headers: headersList,
                    data:formdata, 
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
           })
          
           }
    return (
        <div className="popup-box">
          <Fragment>
        <div className="login-box">
        <h2>Enter Expense</h2>
        <RiMoneyDollarCircleLine size={40} className="Time_Icon"/>
        <form onSubmit={Add_Expense}>
          <div className="user-box">
            <input type="text"   onChange={(e) => setName(e.target.value)} required />
            <label>Seller</label>
          </div>
          <div className="user-box">
            <input type="text"   onChange={(e) => setDesription(e.target.value)} required />
            <label>Descrbtion</label>
          </div>
          <div className="user-box">
            <input type="" name="" value={Cost} onChange={(e) => setCost(e.target.value)} required />
            <label>Total Cost</label>
          </div>
          <div className="user-box">
            <input type="date"  className="DateInput"name=""  value={Date} onChange={(e) => setDate(e.target.value)} />
            <label>Date</label>
          </div>
          <div className="user-box">
          <input type="file" accept="image/*, .pdf" onChange={(e) => setPhoto(e.target.files[0])} required></input>
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
        <h1> Sucessfully Been added</h1>
      </>}
      handleClose={togglePopup}
    />}
      </Fragment>
          {props.content}
      </div>
    )
}

export default ExpensePopup
