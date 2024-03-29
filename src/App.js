import './App.css';
import {React} from 'react';
import PrivateRoute from './Functions/PrivateRoute'
import TimecardEnter from './Pages/Timecard_Enter';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ProjectDash from './Pages/ProjectDash';
import ProjectEdit from './Pages/Project_Edit';
import EmployeeDash from './Pages/Employeedash';
import { DataProvider} from './Context/datacontext';
import  { ProjectProvider } from './Context/projectdatacontext';
import Login from './Pages/Login';
import Projectinputform from './Pages/Projectinputform';
import HomeDash from './Pages/HomeDash';
import Nava from './Componets/OnAllPages/Nava'
import Footer from './Componets/OnAllPages/Footer';
import GeneralExpenseEnter from './Pages/Genarl_Expense_Enter';
import { EmployeeProvider } from './Context/EmployeeContext';
import Toaster from './Componets/Toast';
function App() {
  return (
    <div>   
      <Router>
      <EmployeeProvider>
      <ProjectProvider>
      <DataProvider>
       <Routes>
              <Route element={<Nava/> }>
              <Route exact path="/" element={<PrivateRoute> <HomeDash/> </PrivateRoute>} />
              <Route exact path="/Projectinput" element={<PrivateRoute> <Projectinputform/> </PrivateRoute>} />
              <Route exact path="/GeneralExpense" element={<PrivateRoute> <GeneralExpenseEnter/> </PrivateRoute>} />
              <Route exact path="/login" element={<Login/>}/>
              <Route  exact path="/details/projects/:id" element={<PrivateRoute><ProjectDash/></PrivateRoute>}/>
              <Route  exact path="/project/edit/:id" element={<PrivateRoute><ProjectEdit/></PrivateRoute>}></Route>
              <Route path="TimeCard" element={<TimecardEnter/>} />
              <Route path="/details/employee" element={<PrivateRoute><EmployeeDash/></PrivateRoute>} />
              </Route>
        </Routes>
        <Toaster/>
        <Footer/>
        </DataProvider>
        </ProjectProvider>
        </EmployeeProvider>
      </Router>
    
    </div>
  );
}

export default App;
