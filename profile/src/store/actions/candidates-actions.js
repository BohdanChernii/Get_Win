import {GET_CANDIDATE, RESET_CANDIDATE_INFO} from "@store/types";
import {store} from "@store";

export const setCandidateInfo = data => {
   let candidateInfo = store.getState().candidates.info;
   if (candidateInfo) {
      for (const key in data) {
         candidateInfo[key] = data[key];
      }
   } else {
      candidateInfo = data
   }
   return {
      type: GET_CANDIDATE,
      payload: candidateInfo
   }
};

export const resetCandidateInfo = () => ({type: RESET_CANDIDATE_INFO})