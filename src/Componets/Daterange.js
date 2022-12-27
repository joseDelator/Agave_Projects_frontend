import React, {useState} from "react";
import Datepicker from "react-tailwindcss-datepicker";
import "../Styles/taill.css"
 const BasicDateRangePicker = ({changeParentState ,parentState}) => {
    const [value, setValue] = useState({
        startDate: new Date(),
        endDate: new Date().setDate(Date().getDate()-30)
    });

    const handleValueChange = (newValue) => {
        console.log("newValue:", newValue);
        setValue(newValue);
      
    }
    return (
            <Datepicker
                inputClassName="text-base" 
                primaryColor={"cyan"}
                useRange={false} 
                separator={":"} 
                showShortcuts={true} 
                value={value}
                onChange={handleValueChange}
            />

    );
};
export default BasicDateRangePicker