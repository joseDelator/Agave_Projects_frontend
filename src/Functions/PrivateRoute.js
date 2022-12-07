import { Navigate } from 'react-router-dom'
import { useContext } from 'react';
import DataContext from '../Context/datacontext';
function PrivateRoute({ children }) {
    let {user} = useContext(DataContext)
    return user? children : <Navigate to="/login" />;
  }

export default PrivateRoute;