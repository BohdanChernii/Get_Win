import React, {useEffect, useState} from 'react';
import useProfileSteps from "@/hooks/steps/useProfileSteps.jsx";
import useDepartmentSteps from "@/hooks/steps/useDepartmentSteps.jsx";
import usePositionSteps from "@/hooks/steps/usePositionSteps.jsx";

function useAddVacancySteps() {
   const profileStepsSettings = {
      blockCompanyName: true,
      blockCompanyKod: true,
      hideOtherAddresses: true
   }
   const {profileSteps, currentProfileStep, setCurrentProfileStep} = useProfileSteps(profileStepsSettings);
   const {departmentSteps, currentDepartmentSteps, setCurrentDepartmentSteps} = useDepartmentSteps();
   const {positionSteps, currentPositionSteps, setCurrentPositionSteps} = usePositionSteps();
   
   const [progressStep, setProgressStep] = useState(1);
   const [currentVacancyStep, setCurrentVacancyStep] = useState(1);
   const vacancySteps = [
      {
         id: 1,
         type: 'profile',
         text: 'Дополните профиль Компании (по желанию). Поля заполнять не обязательно.',
         name: 'Профиль Компании',
         steps: [...profileSteps],
      },
      {
         id: 2,
         type: 'department',
         text: 'Дополните профиль Компании (по желанию). Поля заполнять не обязательно.',
         name: 'Профиль Отдела',
         steps: [...departmentSteps],
      },
      {
         id: 3,
         type: 'position',
         text: 'Заполните все обязательные поля профиля должности, чтобы продолжить.',
         name: 'Профиль должности',
         steps: [...positionSteps],
      }
   ];
   
   useEffect(() => {
      if (currentVacancyStep === 1) {
         if (currentProfileStep > profileSteps.length) {
            setCurrentVacancyStep(currentVacancyStep + 1);
            setProgressStep(currentDepartmentSteps);
         } else {
            setProgressStep(currentProfileStep);
         }
      }
      if (currentVacancyStep === 2) {
         if (currentDepartmentSteps > departmentSteps.length) {
            setCurrentVacancyStep(currentVacancyStep + 1);
            setCurrentDepartmentSteps(departmentSteps.length);
            setProgressStep(currentPositionSteps);
         } else if (currentDepartmentSteps === 0) {
            setCurrentVacancyStep(currentVacancyStep - 1);
            setProgressStep(profileSteps.length);
            setCurrentProfileStep(profileSteps.length);
            setCurrentDepartmentSteps(1);
         } else {
            setProgressStep(currentDepartmentSteps);
         }
      }
      if (currentVacancyStep === 3) {
         if (currentPositionSteps > positionSteps.length) {
            setCurrentVacancyStep(currentVacancyStep + 1);
         } else if (currentPositionSteps === 0) {
            setCurrentVacancyStep(currentVacancyStep - 1);
            setProgressStep(departmentSteps.length);
            setCurrentDepartmentSteps(departmentSteps.length);
            setCurrentPositionSteps(1)
         } else {
            setProgressStep(currentPositionSteps);
         }
      }
   }, [currentProfileStep, currentDepartmentSteps, currentPositionSteps]);
   
   return {
      currentVacancyStep, progressStep, vacancySteps
   }
}

export default useAddVacancySteps;