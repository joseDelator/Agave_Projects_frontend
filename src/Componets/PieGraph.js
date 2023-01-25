import React, {useState, useEffect}from 'react'
const PieGraph = ({TotalYearly}) => {
  const [Precent, setPrecent] = useState(Math.round((TotalYearly/250000)*100))
  const dollars = new Intl.NumberFormat(`en-US`, {
    currency: `USD`,
    style: 'currency',
});
  function StatusStyling() {
    if(Precent<40){
      return "radial-progress text-error"
    }
    if(Precent<70 && Precent>=40){
      return "radial-progress text-warning"
    }
    if(Precent>=70){
      return "radial-progress text-primary"
    }
}

    return (
        <div className="">
          <div className="stat  place-items-center ">
          <div className="stat-title  mb-6">Road to 250K</div>
          <div className={StatusStyling()} 
          style={{ "--value": Precent, "--size": "10rem", "--thickness": "1.5rem" }}>{Precent}%</div>
           <div className="stat-desc mt-6"> {dollars.format(TotalYearly)} for the year </div>
         </div>
        </div>
    )
}

export default PieGraph
