import {Fragment, React, useState} from 'react'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import { useForm } from 'react-hook-form'
import Spiner from '../Componets/Spiner'
import api from '../api'
const GeneralExpenseEnter = () => {
  const [Expensetype, setExpensetype] = useState("Gas")
  const [Photo, setPhoto] = useState('')
  const [Cost, setCost] = useState("")
  const [Name, setName] = useState("")
  const [Date, setDate] = useState('')
  const [Desription, setDesription] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [Failed, setFailed] = useState(false)
  const { handleSubmit, formState } = useForm();
  const { isSubmitting } = formState;

function Add_Expense(){
  let headersList = {
    "Accept": "*/*",
   }
   let formdata = new FormData();
   formdata.append("Image_Location", Photo);
   formdata.append("Expense_Type", Expensetype);
   formdata.append("Seller_Name", Name);
   formdata.append("Description", Desription);
   formdata.append("Date", Date);
   formdata.append("Cost", Cost);
            let reqOptions = {
              url:  "GeneralExpenses",
              method: "POST",
              headers: headersList,
              data:formdata, 
            }
           return api.request(reqOptions).then(function (response) {
              if (response.data === 'Added Successfully') {
                  setFailed(false)
                  setIsOpen(true)
              }
              else{
                setFailed(true)
              }
          })
     }
    return (
        <Fragment> 
          <div className="hero min-h-screen">
  <div className="hero-overlay"></div>
  <div className="hero-content text-center text-neutral-content w-full">
    <div className="max-w-md w-full">
    <div className="card w-full max-w-sm shadow-xl "> 
    <form className="card-body " onSubmit={ handleSubmit(Add_Expense)}>
              <div className=" flex w-full items-center justify-center">      
              <RiMoneyDollarCircleLine size={40} className="text-primary justify-self-center "/>
              </div>
              <div className="form-control">
              <label className="label">
                    <span className="label-text">Category</span>
                  </label>
                <select className="select select-primary w-full" value={Expensetype} 
                      onChange={(e)=> setExpensetype( e.target.value)}>
                        <option value={"Gas"}>
                        Gas</option>
                      <option value={"Insurance"}>
                      Insurance</option>
                      <option value={"Food"}>
                      Food</option>
                      <option value={"Tools"}>
                      Tools</option>
                      <option value={"Office Supplies"}>
                      Office Supplies</option>
                </select>
               </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Seller</span>
                  </label>
                  <input type="text" placeholder="Seller" 
                    onChange={(e) => setName(e.target.value)}required className="input input-bordered input-primary" />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">date</span>
                  </label>
                  <input type="date" value={Date} 
                  onChange={(e) => setDate(e.target.value)} required className="input input-bordered input-primary " />
                  <label className="label">
                  </label>
                </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Description</span>
                </label>
                  <input type="text" placeholder="description" 
                  onChange={(e) =>setDesription(e.target.value)} required className="input input-bordered input-primary" />
                  <label className="input-group">
                </label>
                </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Cost</span>
                </label>
                  <input type="number" step=".01" min=".01" placeholder="Cost" 
                  onChange={(e) =>setCost(e.target.value)} required className="input input-bordered input-primary" />
                  <label className="input-group">
                </label>
                </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text">files</span>
                </label>
                <input type="file" accept="image/*, .pdf"
                    className="file-input file-input-bordered file-input-secondary w-full " 
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
  </div>
</div>
<input type="checkbox" id="my-modal" className="modal-toggle"  checked={isSubmitting} />
<div className="modal">
   <Spiner/>
</div>

<input type="checkbox" className="modal-toggle" checked={Failed} readOnly />
<div className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg text-error">Error!!!</h3>
    <p className="py-4">Please Try Again</p>
    <div className="modal-action">
      <label  className="btn btn-primary" onClick={(e) =>setFailed(false)}>ok</label>
    </div>
  </div>
</div>
<input type="checkbox" className="modal-toggle" checked={isOpen}  readOnly  />
<div className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg text-primary">success!!!</h3>
    <p className="py-4">yor time has be added</p>
    <div className="modal-action">
      <label  className="btn btn-primary" onClick={(e) =>setIsOpen(false)}>ok</label>
    </div>
  </div>
</div>
      </Fragment>
    )
}

export default GeneralExpenseEnter
