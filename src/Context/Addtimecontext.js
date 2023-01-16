import { createContext, useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from 'react-router-dom'
const TimeaddContext = createContext({});

export const TimeaddProvider = ({ children }) => {
 
    function Add_Time (e){
        
           }

    let contexData = {
        Add_Time:Add_Time
    }
  return (
    <TimeaddContext.Provider
      value={contexData}
      >
      {children}
    </TimeaddContext.Provider>
  );
};

export default TimeaddContext;
