import React, {useState, useEffect}from 'react'
import { AiFillPlusCircle, AiFillCamera} from 'react-icons/ai'
import ExpensePopup from '../PopUps/Expenses_Popup'
import api from '../../api';
import Datepicker from 'react-tailwindcss-datepicker';
import GeneralExpensePopup from '../PopUps/General_Expenses_Popup';
const GeneralExpenseTable = (Params) => {
    const [Expense_data, setExpense_data] = useState([])
    const [isOpen, setisOpen] = useState(false)
    const [numbertodelete, setnumbertodelete] = useState("")
    const Today= new Date()
    const Lastmonth= new Date().setDate(Today.getDate()-30)
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const [DateRange, setDateRange] = useState({
      startDate: new Date(Lastmonth).toLocaleDateString('en-CA', options),
      endDate: new Date().toLocaleDateString('en-CA', options)
  });
    const togglePopup = () => {
      setisOpen(!isOpen);
    }
    const changeState = (newState) => {
      setDateRange(newState);
    };
    const datef = new  Intl.DateTimeFormat("us-en",{
      dateStyle:"short"
    })
    const dollars = new Intl.NumberFormat(`en-US`, {
      currency: `USD`,
      style: 'currency',
  });
    function Delete_Expense (){
      let headersList = {         
          "Content-Type": "application/json" 
         }
         let reqOptions = {
           url: "GeneralExpenses/"+numbertodelete,
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
    useEffect (() => {
        let headersList = {      
            "Content-Type": "application/json" 
           }
           let reqOptions = {
            url: "GeneralExpensesByDate",
            method: "POST",
            headers: headersList,
            data:JSON.stringify({
             "Start": DateRange.startDate,
             "End":DateRange.endDate
           })
          } 
           const fetch_somethe= async () =>{
            const reponse = await api.request(reqOptions);
            const timecard_data = reponse.data;
           setExpense_data(timecard_data)
            }

        fetch_somethe();
    }, [Params.props, DateRange])
   
    const Tablerows = Expense_data.map((Expense_entree, e)=>{
        return  <tr key={Expense_entree.Expense_ID}>
        <th>{Expense_entree.Seller_Name}</th>
        <td>{ dollars.format(Expense_entree.Cost)}</td>
        <td>{ Expense_entree.Description}</td>
        <td>{Expense_entree.Expense_Type}</td>
        <td>{datef.format( new Date(Expense_entree.Date))}</td>
        <td>
        <a className="btn  btn-primary btn-outline"
        href={Expense_entree.Image_Location}>
        <AiFillCamera size={25}/></a>
        </td>
        <td>
          <label  onClick={e=>setnumbertodelete(Expense_entree.Expense_ID)} htmlFor="my-modal-6"
          className="btn  btn-error btn-outline">Delete</label>
          </td>
      </tr>
    })
    return (
      
    <div className="w-full">
    
      <AiFillPlusCircle className=" text-secondary m-2 place-self-end" size={40} onClick={togglePopup}/> 

      <Datepicker
                inputClassName="font-normal bg-base-100 text-lg dark:bg-base-100 dark:placeholder:text-secondary" 
                primaryColor={"lime"}
                useRange={false}  
                showShortcuts={true} 
                value={DateRange}
                className="bg-green z-30"
                onChange={changeState}
            />
        <h2 className="H2">General Expenses</h2>
        <div className=" overflow-auto ">
                <table className="table table-zebra  w-full z-0 ">
            <thead>
              <tr className="text-secondary">
                <th>Seller Name</th>
                <th>Cost</th>
                <th>Description</th>
                <th>Catergory</th>
                <th>Date</th>
                <th>Photo</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {Expense_data&&Tablerows}
            </tbody>
          </table>
  </div>
  <GeneralExpensePopup
                content={Params.props}
                handleClose={togglePopup}
                Opened = {isOpen}
            />
          <input type="checkbox" htmlFor="my-modal-6" id="my-modal-6" className="modal-toggle"  />
            <div htmlFor="my-modal-6" className="modal modal-bottom sm:modal-middle">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Delete?</h3>
                <p className="py-4">Are you Sure you Want Delete this entree</p>
                <div className="modal-action">
                  <label className="btn btn-error" onClick={Delete_Expense }>Delete</label>
                  <label className="btn btn-sm btn-circle absolute right-2 top-2" htmlFor="my-modal-6">x</label>
                </div>
              </div>
            </div>
      </div>
    )
}

export default GeneralExpenseTable
