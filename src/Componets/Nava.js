import React, { Component} from 'react';
import '../Styles/stylenavbar.css'
import { Outlet, Link } from "react-router-dom";
import SearchBar from './SearchBar';
class  Nava extends Component {
     
    state= {
        active: true,
    }
   
   render(){ return(
    <div>

    <nav>
    <div className="logo">
        <h2>AGL Projects</h2>
    </div>
    <ul className= {this.state.active ? "links" : "links nav-active" }>
        <li><Link to="/" onClick = {() => this.setState({active:true})} >New Project</Link></li>
        <li><Link to="/timecard" onClick = {() => this.setState({active:true})}>Time Card</Link></li>
    </ul>
    <div className="burger" onClick = {() => this.setState({active: !this.state.active})}>
        <div className={this.state.active ? "line1" : " toggle1 line1 " }></div>
        <div className ={this.state.active ? "line2" : " toggle2 line2 " }></div>
        <div className={this.state.active ? "line3" : " toggle3 line3 " }></div>   
    </div>
</nav>
<SearchBar/>
<Outlet/>

</div>
    )
}
}

export default Nava