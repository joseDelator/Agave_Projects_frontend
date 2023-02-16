import { createContext, useState,} from "react";
import api from "../api";
const EmployeeContext = createContext({});

export const EmployeeProvider = ({ children }) => {
    const [EmployeeList, setEmployeeList] = useState([])
    const [SelectEmployee, setSelectEmployee] = useState(1)
    let contexData = {
        EmployeeList:EmployeeList,
        setEmployeeList:setEmployeeList,
        SelectEmployee:SelectEmployee,
        setSelectEmployee:setSelectEmployee
    }
    return (
        <EmployeeContext.Provider
          value={contexData}
          >
          {children}
        </EmployeeContext.Provider>
      );
}

export default EmployeeContext