import './App.css';
import {React} from 'react';
import PrivateRoute from './Functions/PrivateRoute'
import TimecardEnter from './Componets/Timecard_Enter';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomeDash from './Componets/HomeDash';
import ProjectEdit from './Componets/Project_Edit';
import EmployeeDash from './Componets/Employeedash';
import { DataProvider} from './Context/datacontext';
import Login from './Componets/Login';
import Projectinputform from './Componets/Projectinputform';
import Nava from './Componets/Nava'

function App() {
  return (
    <div>   
      <Router>
      <DataProvider>
       <Routes>
              <Route element={<Nava/>}>
              <Route expact path="/" element={<PrivateRoute> <Projectinputform/> </PrivateRoute>} />
              <Route exact path="login" element={<Login/>}/>
              <Route  exact path="/details/projects/:id" element={<PrivateRoute><HomeDash/></PrivateRoute>}/>
              <Route  exact path="/project/edit/:id" 
              element={<PrivateRoute><ProjectEdit/>
              </PrivateRoute>}></Route>
              <Route path="TimeCard" element={<TimecardEnter/>} />
              <Route path="/details/employee" element={<PrivateRoute><EmployeeDash/></PrivateRoute>} />
              </Route>
        </Routes>
        </DataProvider>
      </Router>
    
    </div>
  );
}

export default App;
