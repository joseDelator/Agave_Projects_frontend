import React, {useState, useEffect}from 'react'
import { AiFillPlusCircle, AiFillCamera} from 'react-icons/ai'
import api from '../../api';
import Datepicker from 'react-tailwindcss-datepicker';
import GeneralExpensePopup from '../PopUps/General_Expenses_Popup';
import { dollars, datef, Lastmonth,options } from '../../Functions/DateandDollarFormate';
import PhotosPopup from '../PopUps/PhotosPopup';

const GeneralExpenseTable = (Params) => {
    const [Expense_data, setExpense_data] = useState([])
    const [isOpen, setisOpen] = useState(false)
    const [numbertodelete, setnumbertodelete] = useState("")
    const [Photpopupopen, setPhotpopupopen] = useState(false)
    const [photourl, setphotourl] = useState("")
    const [gendata, setgendata] = useState([])
    const [page, setpage] = useState(1)
    //date range starting state
    const [DateRange, setDateRange] = useState({
      startDate: new Date(Lastmonth).toLocaleDateString('en-CA', options),
      endDate: new Date().toLocaleDateString('en-CA', options)
  });
    const togglePopup = () => {
      setisOpen(!isOpen);
    }
    const togglephotopopup= ()=>{
      setPhotpopupopen(false)

    }
    const OpenPhoto =(Expense_entree)=>{
      setphotourl(Expense_entree.Image_Location)
      setPhotpopupopen(true)
     
    }
    const changeState = (newState) => {
      setDateRange(newState);
    };
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
            url: "GeneralExpensesByDateRange?page="+page,
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
            setgendata(timecard_data)
           setExpense_data(timecard_data.results)
            }

        fetch_somethe();
    }, [Params.props, DateRange, page])
   
    const Tablerows = Expense_data.map((Expense_entree, e)=>{
        return  <tr key={Expense_entree.Expense_ID}>
        <th>{Expense_entree.Seller_Name}</th>
        <td>{ dollars.format(Expense_entree.Cost)}</td>
        <td>{ Expense_entree.Description}</td>
        <td>{Expense_entree.Expense_Type}</td>
        <td>{datef.format( new Date(Expense_entree.Date.replace(/-/g, '/')))}</td>
        <td>
          <button className="btn  btn-primary btn-outline"
          onClick={e=> OpenPhoto(Expense_entree,e)}>
          <AiFillCamera size={25} />
          </button>
        </td>
        <td>
          <label  onClick={e=>setnumbertodelete(Expense_entree.Expense_ID)} htmlFor="my-modal-6"
          className="btn  btn-error btn-outline">Delete</label>
          </td>
      </tr>
    })
    return (
    <div className="w-full">
      <AiFillPlusCircle className=" text-secondary m-2 self" size={40} onClick={togglePopup}/> 
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

  <div className="btn-group grid grid-cols-2 m-5">
          <button className={gendata.previous === null ?"btn btn-outline btn-disabled":"btn btn-outline btn-primary "} onClick={e=> setpage(page-1)} >Previous page</button>
          <button className={gendata.next === null ?"btn btn-outline btn-disabled":"btn btn-outline btn-primary "} onClick={e=> setpage(page+1)}>Next</button>
        </div>
        <PhotosPopup 
          handleClose={togglephotopopup}
          imgurl={photourl}
          Opened={Photpopupopen}
          />
  <GeneralExpensePopup
                content={Params.props}
                handleClose={togglePopup}
                Opened = {isOpen}
            />
          <input type="checkbox" htmlFor="my-modal-6" id="my-modal-6" className="modal-toggle" readOnly  />
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
      </div>
    )
}

export default GeneralExpenseTable
