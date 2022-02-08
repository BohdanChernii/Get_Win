import {useState} from "react";
import {showTestingModal} from "@store/actions/global-actions";
import {useDispatch} from "react-redux";

export const useTestingCandidate = () => {
   const dispatch = useDispatch();
   const [isSuccessTesting, setIsSuccessTesting] = useState(false);
   
   const onFinishTest = () => {
      setIsSuccessTesting(true);
   };
   
   const onClearTesting = () => {
      setIsSuccessTesting(false);
      dispatch(showTestingModal(false));
   };
   
   return {
      isSuccessTesting,
      changeIsSuccessTesting: setIsSuccessTesting,
      onClearTesting,
      onFinishTest,
   }
};