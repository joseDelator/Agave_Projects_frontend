import {Fragment, React,useContext} from 'react'
import '../Styles/Time_Card.css'
import {BiLogIn} from 'react-icons/bi'
import DataContext from '../Context/datacontext'
const Login = () => {
    let {loginUser} = useContext(DataContext)
    return (
        <Fragment> 
        <div className="login-box">
        <h2 className="H2">Login</h2>
        <BiLogIn size={40} className="Time_Icon"/>
        <form onSubmit={loginUser}>
          <div className="user-box">
            <input type="text" name="username"   required />
            <label>username</label>
          </div>
          <div className="user-box">
            <input type="Password" name="password"   required />
            <label>Password</label>
          </div>
          <button className='button'>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </button>
        </form>
      </div>
    
      </Fragment>
    )
}
export default Login
