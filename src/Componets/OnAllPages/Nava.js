import React, { Component} from 'react';
import { Outlet, Link } from "react-router-dom";
import SearchBar from './SearchBar';
import { GiAgave } from 'react-icons/gi';
class  Nava extends Component {
   render(){ return(
    <div>
  <div className="navbar bg-neutral ">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label> 
      <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
      <li><Link to="/" >Home</Link></li>
        <li><Link to="/timecard">Time Card</Link></li>
        <li><Link to="/Projectinput" >New Project</Link></li>
        <li><Link to="/details/employee">Employee</Link></li>
        <li><Link to="/GeneralExpense">Expense</Link></li>
      </ul>
    </div>
    <GiAgave className="text-primary" size={24}/> 
    <Link Link to="/" className="btn btn-ghost normal-case text-xl text-secondary">Agave Green</Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/Projectinput" >New Project</Link></li>
        <li><Link to="/timecard" >Time Card</Link></li>
        <li><Link to="/details/employee">Employee</Link></li>
        <li><Link to="/GeneralExpense">Expense</Link></li>
    </ul>
  </div>
  <div className="navbar-end">
    
  </div>
</div>
<SearchBar/>
<Outlet/>

</div>
    )
}
}

export default Nava