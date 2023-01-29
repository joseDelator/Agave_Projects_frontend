import { React, useState} from 'react'
import {GiTimeBomb} from 'react-icons/gi'
import Dropdrownemployee from '../Componets/dropdrownemployee'
import { AddingTime } from '../Functions/Addttime'
const TimecardEnter = () => {
    const [Agave_green_Project_Number, setAgave_green_Project_Number] = useState('')
    const [Total_Time, setTotal_Time] = useState("")
    const [Date, setDate] = useState('')
    const [isOpen, setIsOpen] = useState(false);
    const [Failed, setFailed] = useState(false);
    const [Employee_Id, setEmployee_Id] = useState("")

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }  
const changeParentState = (newState) => {
  setEmployee_Id(newState);
};
function Add_Time(e){
        e.preventDefault()
        //input new time card entree and responce with popup
            AddingTime(Date, Agave_green_Project_Number,Employee_Id,Total_Time).then( function(responce){
              if ( responce.data === "Added Successfully") {
                setAgave_green_Project_Number("")
                setDate("")
                setTotal_Time("")
                togglePopup()
                setEmployee_Id(0);
            }
            else{
              setFailed(true)
            }
            })  
           }
    return (
        <> 
          <div className="hero min-h-screen">
            <div className="hero-overlay "></div>
            <div className="hero-content text-center text-neutral-content w-full">
              <div className="max-w-md w-full">
              <div className="card w-full max-w-sm shadow-xl "> 
                <form className="card-body "htmlFor="my-modal-6" onSubmit={Add_Time}>
                <div className=" flex w-full items-center justify-center">      
                <GiTimeBomb size={40} className="text-primary justify-self-center "/>
                </div>
                  <Dropdrownemployee  parentState={Employee_Id} 
                    changeParentState={changeParentState}  />
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Project Number</span>
                    </label>
                    <input type="number" placeholder="#" name="JobNumber" pattern="[0-9]"  value={Agave_green_Project_Number} 
                      onChange={(e) => setAgave_green_Project_Number(e.target.value)}required className="input input-bordered input-primary" />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">date</span>
                    </label>
                    <input type="date" value={Date} onChange={(e) => setDate(e.target.value)} required className="input input-bordered input-primary" />
                    <label className="label">
                    </label>
                  </div>
                  <div className="form-control">
                  <label className="label">
                      <span className="label-text"> Hours</span>
                  </label>
                    <input type="number" placeholder="Time" name="Total Time" value={Total_Time} pattern="[0-9]" min=".01" max="24"  step=".01"onChange={(e) => setTotal_Time(e.target.value)} required className="input input-bordered input-primary" />
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
      </>
    )
}

export default TimecardEnter
