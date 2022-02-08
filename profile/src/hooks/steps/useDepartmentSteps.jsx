import React, {useState} from 'react';
import FormSetDepartment from "@/components/form/FormSetDepartment/FormSetDepartment.jsx";

function useDepartmentSteps() {
   const [currentDepartmentSteps, setCurrentDepartmentSteps] = useState(1);
   const departmentSteps = [
      {
         id: 1,
         content: <FormSetDepartment changeStep={setCurrentDepartmentSteps} step={currentDepartmentSteps} isGoBack/>
      },
   ]
   
   return {
      currentDepartmentSteps,
      setCurrentDepartmentSteps,
      departmentSteps
   }
}

export default useDepartmentSteps;