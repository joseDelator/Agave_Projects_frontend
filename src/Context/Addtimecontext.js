import { createContext, useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from 'react-router-dom'
const TimeaddContext = createContext({});

export const TimeaddProvider = ({ children }) => {
 
    const [Totalowed, setTotalowed] = useState(initialState)

    let contexData = {
        Totalowed:Totalowed
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
