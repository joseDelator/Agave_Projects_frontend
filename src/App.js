
import './App.css';

import React from 'react';
import TimecardEnter from './Componets/Timecard_Enter';
import Nava from './Componets/Nava';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeDash from './Componets/HomeDash';
import Projectinputform from './Componets/Projectinputform';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Routes>
            <Route path="/" element={<Nava/>}>
              <Route index  element={<Projectinputform/>}/>
              <Route  exact path="/details/projects/:id" element={<HomeDash/>}/>
              <Route path="TimeCard" element={<TimecardEnter/>} />
            </Route>
          </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
