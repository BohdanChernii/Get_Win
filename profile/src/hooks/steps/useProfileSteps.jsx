import React, {useState} from 'react';
import FormSetCompanyOther from "@/components/form/FormSetCompany/FormSetCompanyOther.jsx";
import FormSetCompanyStructure from "@/components/form/FormSetCompany/FormSetCompanyStructure.jsx";
import FormSetCompanyContacts from "@/components/form/FormSetCompany/FormSetCompanyContacts.jsx";
import FormSetCompanyPersonManagement from "@/components/form/FormSetCompany/FormSetCompanyPersonManagement.jsx";
import FormSetCompanyMission from "@/components/form/FormSetCompany/FormSetCompanyMission.jsx";

function useProfileSteps(settings) {
   const [currentProfileStep, setCurrentProfileStep] = useState(1);
   const profileSteps = [
      {
         id: 1,
         content: <FormSetCompanyOther changeStep={setCurrentProfileStep} step={currentProfileStep} settings={settings}/>,
      },
      {
         id: 2,
         content: <FormSetCompanyStructure changeStep={setCurrentProfileStep} step={currentProfileStep} settings={settings}/>,
      },
      {
         id: 3,
         content: <FormSetCompanyContacts changeStep={setCurrentProfileStep} step={currentProfileStep} settings={settings}/>,
      },
      {
         id: 4,
         content: <FormSetCompanyPersonManagement changeStep={setCurrentProfileStep} step={currentProfileStep} settings={settings}/>,
      },
      {
         id: 5,
         content: <FormSetCompanyMission changeStep={setCurrentProfileStep} step={currentProfileStep}/>,
      },
   ]
   
   return {
      currentProfileStep,
      setCurrentProfileStep,
      profileSteps
   }
}

export default useProfileSteps;