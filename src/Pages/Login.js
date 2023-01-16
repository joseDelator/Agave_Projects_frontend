import {Fragment, React,useContext} from 'react'
import {BiLogIn} from 'react-icons/bi'
import DataContext from '../Context/datacontext'
const Login = () => {
    let {loginUser} = useContext(DataContext)
    return (
        <Fragment> 
          <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6"> New UI Agave Project </p>
    </div>
    <form onSubmit={loginUser} 
    className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body place-items-center ">
      <BiLogIn size={40} className="text-primary"/>
        <div className="form-control">
          <label className="label">
            <span className="label-text">User Name</span>
          </label>
          <input type="text" name="username"required  placeholder="Useranme" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" name="password" className="input input-bordered" />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary ">Login</button>
        </div>
      </div>
    </form>
  </div>
</div>
      </Fragment>
    )
}
export default Login
