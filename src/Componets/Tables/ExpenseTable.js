import React, {useState, useEffect}from 'react'
import { AiFillPlusCircle, AiFillCamera} from 'react-icons/ai'
import ExpensePopup from '../PopUps/Expenses_Popup'
import api from '../../api';
const ExpenseTable = (Params) => {
    const [Expense_data, setExpense_data] = useState([])
    const [isOpen, setisOpen] = useState(false)
    const [numbertodelete, setnumbertodelete] = useState("")
    const togglePopup = () => {
      setisOpen(!isOpen);
    }
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
           url: "Expenses/"+numbertodelete,
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
   
    const Tablerows = Expense_data.map((Expense_entree, e)=>{
        return  <tr key={Expense_entree.Expense_ID}>
        <th>{Expense_entree.Seller_Name}</th>
        <td>{ dollars.format(Expense_entree.Cost)}</td>
        <td>{ Expense_entree.Description}</td>
        <td>{datef.format( new Date(Expense_entree.Date))}</td>
        <td>
        <a className="btn  btn-primary btn-outline"
        href={Expense_entree.Image_Location}>
        <AiFillCamera size={25}/></a>
        </td>
        <td  >
          <label  onClick={e=>setnumbertodelete(Expense_entree.Expense_ID)} htmlFor="my-modal-6"
          className="btn  btn-error btn-outline">Delete</label>
          </td>
      </tr>
    })
    return (
    <div className="container">
        <h2 className="H2">Project Expenses</h2>
        <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
    <thead>
      <tr className="text-secondary">
        <th>Seller Name</th>
        <th>Cost</th>
        <th>Description</th>
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
        <AiFillPlusCircle className="absolute top-1 right-1 text-secondary" size={40} onClick={togglePopup}/> 
          <input type="checkbox" htmlFor="my-modal-6" id="my-modal-6" className="modal-toggle"  />
            <div htmlFor="my-modal-6" className="modal modal-bottom sm:modal-middle">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Delete?</h3>
                <p className="py-4">Are you Sure you Want Delete this entree</p>
                <div className="modal-action">
                  <label className="btn btn-error" onClick={Delete_Expense}>Delete</label>
                  <label className="btn btn-sm btn-circle absolute right-2 top-2" htmlFor="my-modal-6">x</label>
                </div>
              </div>
            </div>
             <ExpensePopup
                content={Params.props}
                handleClose={togglePopup}
                Opened = {isOpen}
            />
      </div>
    )
}

export default ExpenseTable
