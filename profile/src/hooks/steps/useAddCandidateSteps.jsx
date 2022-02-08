import React, {useEffect, useState} from "react";
import FormCreateCandidate from "@/components/form/FormCreateCandidate/FormCreateCandidate.jsx";
import FormSelectCandidateCompany from "@/components/form/FormCreateCandidate/FormSelectCandidateCompany.jsx";
import FormSelectCandidateView from "@/components/form/FormCreateCandidate/FormSelectCandidateView.jsx";
import {showTestingModal} from "@store/actions/global-actions";
import {useDispatch} from "react-redux";
import {resetCandidateInfo} from "@store/actions/candidates-actions";

export const useAddCandidateSteps = () => {
   const dispatch = useDispatch();
   const [currentCandidatesStep, setCurrentCandidatesStep] = useState(1);
   const [sendToTest, setSendToTest] = useState(false);
   const [isCandidateSuccess, setIsCandidateSuccess] = useState(false);
   const [isVisibleAddCandidate, setIsVisibleAddCandidate] = useState(false);
   
   const candidatesSteps = [
      {
         id: 1,
         content: <FormCreateCandidate step={currentCandidatesStep} changeStep={setCurrentCandidatesStep}/>,
         description: 'Кандидат',
      },
      {
         id: 2,
         content: <FormSelectCandidateCompany step={currentCandidatesStep} changeStep={setCurrentCandidatesStep}/>,
         description: 'Компания',
      },
      {
         id: 3,
         content: <FormSelectCandidateView step={currentCandidatesStep} changeStep={setCurrentCandidatesStep} sendToTest={sendToTest}
                                           changeSendToTest={setSendToTest}/>,
         description: 'Просмотр',
      },
   
   ];
   const resetCandidatesStep = () => {
      setIsCandidateSuccess(false);
      setCurrentCandidatesStep(1);
      dispatch(resetCandidateInfo());
      sendToTest && dispatch(showTestingModal(true));
   };
   
   const onClearCandidate = () => {
      setIsVisibleAddCandidate(false);
      resetCandidatesStep();
   };
   
   useEffect(() => {
      if (currentCandidatesStep === 0) {
         onClearCandidate();
      } else if (currentCandidatesStep > candidatesSteps.length) {
         if (sendToTest) {
            dispatch(showTestingModal(true));
         } else {
            setIsCandidateSuccess(!isCandidateSuccess);
         }
         dispatch(resetCandidateInfo());
         setSendToTest(false);
         setCurrentCandidatesStep(1);
      }
   }, [currentCandidatesStep]);
   
   return {
      candidatesSteps,
      
      currentCandidatesStep,
      changeCandidatesStep: setCurrentCandidatesStep,
      
      isVisibleAddCandidate: isVisibleAddCandidate,
      changeVisibleAddCandidate: setIsVisibleAddCandidate,
      resetCandidatesStep,
      
      onClearCandidate,
      
      isCandidateSuccess
   }
};