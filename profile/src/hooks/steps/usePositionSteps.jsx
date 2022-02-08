import React, {useState} from 'react';
import FormSetPositionMain from "@/components/form/FormSetPosition/FormSetPositionMain.jsx";
import FormSetPositionRequirements from "@/components/form/FormSetPosition/FormSetPositionRequirements.jsx";
import FormSetPositionEducation from "@/components/form/FormSetPosition/FormSetPositionEducation.jsx";
import FormSetPositionCar from "@/components/form/FormSetPosition/FormSetPositionCar.jsx";
import FormSetPositionSpecificity from "@/components/form/FormSetPosition/FormSetPositionSpecificity.jsx";
import FormSetPositionFamilyStatus from "@/components/form/FormSetPosition/FormSetPositionFamilyStatus.jsx";
import FormSetPositionUniversities from "@/components/form/FormSetPosition/FormSetPositionUniversities.jsx";
import FormSetPositionWorkExperience from "@/components/form/FormSetPosition/FormSetPositionWorkExperience.jsx";
import FormSetPositionPersonalInformation from "@/components/form/FormSetPosition/FormSetPositionPersonalInformation.jsx";
import FormSetPositionCriteria from "@/components/form/FormSetPosition/FormSetPositionCriteria.jsx";

function usePositionSteps() {
   const [currentPositionSteps, setCurrentPositionSteps] = useState(1);
   const positionSteps = [
      {
         id: 1,
         content: <FormSetPositionMain changeStep={setCurrentPositionSteps} step={currentPositionSteps}/>
      },
      {
         id: 2,
         content: <FormSetPositionRequirements changeStep={setCurrentPositionSteps} step={currentPositionSteps}/>
      },
      {
         id: 3,
         content: <FormSetPositionEducation changeStep={setCurrentPositionSteps} step={currentPositionSteps}/>
      },
      {
         id: 4,
         content: <FormSetPositionCar changeStep={setCurrentPositionSteps} step={currentPositionSteps}/>
      },
      {
         id: 5,
         content: <FormSetPositionSpecificity changeStep={setCurrentPositionSteps} step={currentPositionSteps}/>
      },
      {
         id: 6,
         content: <FormSetPositionFamilyStatus changeStep={setCurrentPositionSteps} step={currentPositionSteps}/>
      },
      {
         id: 7,
         content: <FormSetPositionUniversities changeStep={setCurrentPositionSteps} step={currentPositionSteps}/>
      },
      {
         id: 8,
         content: <FormSetPositionWorkExperience changeStep={setCurrentPositionSteps} step={currentPositionSteps}/>
      },
      {
         id: 9,
         content: <FormSetPositionPersonalInformation changeStep={setCurrentPositionSteps} step={currentPositionSteps}/>
      },
      {
         id: 10,
         content: <FormSetPositionCriteria changeStep={setCurrentPositionSteps} step={currentPositionSteps}/>
      },
   
   
   ]
   return {currentPositionSteps, setCurrentPositionSteps, positionSteps}
}

export default usePositionSteps;