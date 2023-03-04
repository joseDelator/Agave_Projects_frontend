import React, {useState, useContext}from 'react'
import {RiMoneyDollarCircleLine} from 'react-icons/ri'
import api from '../../api'
import { useForm } from "react-hook-form";
import Spiner from '../Spiner'
import ProjectContext from '../../Context/projectdatacontext';

const ExpensePopup = (props) => {
    const [Photo, setPhoto] = useState('')
    const [Cost, setCost] = useState("")
    const [Name, setName] = useState("")
    const [Date, setDate] = useState('')
    const [Desription, setDesription] = useState("")
    const [Failed, setFailed] = useState(false)
    const { handleSubmit, formState } = useForm();
    const {updateprojectexpense, updateprojectinfo} = useContext(ProjectContext)
    const { isSubmitting } = formState;
 const Add_Expense = async()=>{

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
                 return api.request(reqOptions,).then(function (response) {
                    if (response.data === 'Added Successfully') {
                        updateprojectexpense(1,props.content) 
                        updateprojectinfo(props.content)
                        setDate("")
                        setDesription("")
                        setName("")
                        setCost("")
                       
                        props.handleClose()
                    }
                    else{
                      setFailed(true)
                    }
                })
                
           }
    return (
      <div>
        <input type="checkbox" className="modal-toggle" checked={props.Opened} readOnly/>
        <div className="modal">
          <div className="modal-box relative">
            <label onClick={props.handleClose} className="btn btn-sm btn-circle absolute right-2 top-2" >✕</label>
            <form className="card-body " onSubmit={ handleSubmit(Add_Expense)}>
              <div className=" flex w-full items-center justify-center">      
              <RiMoneyDollarCircleLine size={40} className="text-primary justify-self-center "/>
              </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Seller</span>
                  </label>
                  <input type="text" placeholder="Seller" 
                    onChange={(e) => setName(e.target.value)} value={Name}
                    required className="input input-bordered input-primary" />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Date</span>
                  </label>
                  <input type="date" value={Date} 
                  onChange={(e) => setDate(e.target.value)} required className="input input-bordered input-primary appearance-none" />
                  <label className="label">
                  </label>
                </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Description</span>
                </label>
                  <input type="text" placeholder="description" value={Desription}
                  onChange={(e) =>setDesription(e.target.value)} required className="input input-bordered input-primary" />
                  <label className="input-group">
                </label>
                </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Cost</span>
                </label>
                  <input type="number" step=".01" min=".01" placeholder="Cost" 
                  onChange={(e) =>setCost(e.target.value)} value={Cost} required className="input input-bordered input-primary" />
                  <label className="input-group">
                </label>
                </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text">files</span>
                </label>
                <input type="file" accept="image/*"
                    className="file-input file-input-bordered file-input-secondary w-full" name="Photo"
                    onChange={(e) => setPhoto(e.target.files[0])} required />
                    <label className="input-group">
                </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Submit</button>
                </div>
              </form>
          </div>
        </div>
        <input type="checkbox" id="my-modal" className="modal-toggle"  checked={isSubmitting}  readOnly />
<div className="modal">
   <Spiner/>
</div>
<input type="checkbox" className="modal-toggle" checked={Failed}  readOnly/>
<div className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg text-error">Error!!!</h3>
    <p className="py-4">Please Try Again</p>
    <div className="modal-action">
      <label  className="btn btn-primary" onClick={(e) =>setFailed(false)}>ok</label>
    </div>
  </div>
</div>
      </div>
    )
}

export default ExpensePopup
