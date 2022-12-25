import React, {useState, useEffect}from 'react'
import '../Styles/timetable.scss'
import { AiFillPlusCircle, AiFillCamera, AiFillDelete} from 'react-icons/ai'
import ExpensePopup from './Expenses_Popup'
import api from '../api';
import Deletepopup from './deletepopup';
const ExpenseTable = (Params) => {
    const [Expense_data, setExpense_data] = useState([])
    const [isOpen, setisOpen] = useState(false)
    const [isdeleteOpen, setisdeleteOpen] = useState(false)
    const [SetExpensedata, setSetExpensedata] = useState("")
    const togglePopup = () => {
      setisOpen(!isOpen);
    }
    const toggelDelete =() =>{
      setisdeleteOpen(!setisdeleteOpen)
    }
    
    useEffect (() => {
        let headersList = {
                      
            "Content-Type": "application/json" 
           }
           let reqOptions = {
             url: "Expenses/"+Params.props,
             method: "GET",
             headers: headersList,
             }
           const fetch_somethe= async () =>{
            const reponse = await api.request(reqOptions);
            const timecard_data = reponse.data;
           setExpense_data(timecard_data)
            }

        fetch_somethe();
    }, [Params.props])
    const openedit =(Expense_entree)=>{
      setSetExpensedata(Expense_entree);
      setisdeleteOpen(true)
    }
    const Tablerows = Expense_data.map((Expense_entree, e)=>{
        return  <li className="table-row" key={Expense_entree.Expense_ID}>
        <div className="col col-1" data-label="Cost:">{Expense_entree.Cost}</div>
        <div className="col col-2" data-label="Description:">{Expense_entree.Description}</div>
        <div className="col col-3" data-label="Date:">{Expense_entree.Date}</div>
        <div className="col col-4" data-label="Seller:">{Expense_entree.Seller_Name }</div>
        <a className="col col-4" data-label="Photo:" 
        href={Expense_entree.Image_Location}>
        <AiFillCamera size={25}/></a>
        <div className="col col-4" style={{color: 'red'}} 
        data-label="Delete"
         >
          <AiFillDelete size={25} onClick={e => openedit(Expense_entree, e)}/>
          </div>
       
      </li>
    })
    return (
    <div className="container">
        <h2 className="H2"> Project Expenses</h2>
            <ul className="responsive-table">
              <li className="table-header">
                <div className="col col-1">Cost</div>
                <div className="col col-2">description</div>
                <div className="col col-3">Date</div>
                <div className="col col-4">Seller Name</div>
                <div className="col col-4">Photo</div>
                <div className="col col-4">Delete</div>
              </li>
              <div  className="table-container">
                {Expense_data&&Tablerows}
              </div>
            </ul>  
            <AiFillPlusCircle id="Add_Icon" size={40} onClick={togglePopup}/> 
            {isOpen && <ExpensePopup
                content={Params.props}
                handleClose={togglePopup}
            />} 
            {isdeleteOpen &&
            <Deletepopup
            TC = {SetExpensedata}  
            handleClose={toggelDelete}
             />
            }   
      </div>
    )
}

export default ExpenseTable
