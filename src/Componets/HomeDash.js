import React from 'react'
import PieGraph from './PieGraph'

const HomeDash = () => {
    return (
        <div className="grid-container">
        <main className="main" >
          <div className="main-header">
          </div>
          <div className="main-overview">
            <div className="overviewcard">
              <div className="overviewcard__icon"></div>
            </div>
            <div className="overviewcard">
              <div className="overviewcard__icon">Expense</div>
            </div>
            <div className="overviewcard">
              <div className="overviewcard__icon">Labor Cost</div>
            </div>
            <div className="overviewcard">
              <div className="overviewcard__icon"> Remaining</div>
              <div className="overviewcard__info">
              </div>
            </div>
          </div>
          <div className="main-cards">
      
            <div className="card"><PieGraph/></div>
            <div className="card"></div>
          </div>
        </main>
      </div>

    )
}

export default HomeDash
