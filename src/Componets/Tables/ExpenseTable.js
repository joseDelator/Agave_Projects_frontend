import React, {useState, useEffect, useContext}from 'react'
import { AiFillPlusCircle, AiFillCamera} from 'react-icons/ai'
import Pagination from '../Pagination';
import ExpensePopup from '../PopUps/Expenses_Popup'
import api from '../../api';
import PhotosPopup from '../PopUps/PhotosPopup';
import { datef,dollars } from '../../Functions/DateandDollarFormate';
import ProjectContext from '../../Context/projectdatacontext';
const ExpenseTable = (Params) => {
    const [isOpen, setisOpen] = useState(false)
    const [numbertodelete, setnumbertodelete] = useState("")
    const [Photpopupopen, setPhotpopupopen] = useState(false)
    const [photourl, setphotourl] = useState("")
    const [Delete, setDelete] = useState(false)
    const [page, setpage] = useState(1)
    const {updateprojectexpense, ExpenseProjectData, expensepage,updateprojectinfo} = useContext(ProjectContext)
    const togglePopup = () => {
      setisOpen(!isOpen);
    }
    const togglephotopopup= ()=>{
      setPhotpopupopen(false)
      setphotourl("")
    }
    const OpenPhoto =(Expense_entree)=>{
      setphotourl(Expense_entree.Image_Location)
      setPhotpopupopen(true)
     
    }
    useEffect (() => {
      updateprojectexpense(page,Params.props)
    }, [Params.props, page])
    const deleteentree=(Expense_entree)=>{
      setnumbertodelete(Expense_entree.Expense_ID)
      setDelete(true)
    }
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
                  updateprojectexpense(page, Params.props)
                  updateprojectinfo(Params.props)
                  setpage(1)
                  setDelete(false)
             }
             else{
             }
         })
         } 
 
    const Tablerows = ExpenseProjectData.map((Expense_entree, e)=>{
        return  <tr key={Expense_entree.Expense_ID}>
        <th>{Expense_entree.Seller_Name}</th>
        <td>{ dollars.format(Expense_entree.Cost)}</td>
        <td>{ Expense_entree.Description}</td>
        <td>{datef.format( new Date(Expense_entree.Date.replace(/-/g, '/')))}</td>
        <td>
          <button className="btn  btn-primary btn-outline"
            onClick={e=> OpenPhoto(Expense_entree,e)}>
            <AiFillCamera size={25} />
          </button>
        </td>
        <td  >
          <label  onClick={e=>deleteentree(Expense_entree)}
          className="btn  btn-error btn-outline">Delete</label>
          </td>
      </tr>
    })
    return (
    <div className="container">
        <h2 className="H2">Project Expenses</h2>
        <div className="overflow-x-auto">
        <table className="table table-zebra w-full ">
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
      {ExpenseProjectData&&Tablerows}
    </tbody>
  </table>
        
  </div>
  {expensepage.count===undefined?
        <div>1</div>:
        <Pagination
            currentPage={page}
            totalCount={expensepage.count}
            pageSize={10}
            onPageChange={page => setpage(page)}
            />}
        <AiFillPlusCircle className="absolute top-1 right-1 text-secondary" size={40} onClick={togglePopup}/> 
          <input type="checkbox" className="modal-toggle" checked={Delete} readOnly  />
            <div htmlFor="my-modal-6" className="modal modal-bottom sm:modal-middle">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Delete?</h3>
                <p className="py-4">Are you Sure you Want Delete this entree</p>
                <div className="modal-action">
                  <label className="btn btn-error" onClick={Delete_Expense}>Delete</label>
                  <label className="btn btn-sm btn-circle absolute right-2 top-2" onClick={e=>setDelete(false)}>x</label>
                </div>
              </div>
            </div>
            <PhotosPopup 
                handleClose={togglephotopopup}
                imgurl={photourl}
                Opened={Photpopupopen}
            />
             <ExpensePopup
                content={Params.props}
                handleClose={togglePopup}
                Opened = {isOpen}
                pagenum = {page}
            />
      </div>
    )
}

export default ExpenseTable
