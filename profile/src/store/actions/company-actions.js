import {
   RESET_COMPANY,
   RESET_VERIFICATION,
   SET_COMPANY_FAILED,
   SET_COMPANY_START,
   SET_COMPANY_SUCCESS,
   SET_VERIFICATION_DONE,
   SET_VERIFICATION_FAILED,
   SET_VERIFICATION_IN_PROGRESS,
   SET_VERIFICATION_SUCCESS
} from "@store/types";
import {companyApi} from "@assets/helpers/api";
import {Http} from "@assets/helpers/http";

export const getCompanyInfoAction = () => async dispatch => {
   const token = localStorage.getItem('token');
   const url = `${companyApi.get_company_info}?token=${token}`
   try {
      dispatch({type: SET_COMPANY_START});
      const json = await Http.get(url);
      if (json?.error) {
         throw new Error('Неверный токен пользователя')
      }
      dispatch({type: SET_COMPANY_SUCCESS, payload: json.data});
   } catch (err) {
      console.error(err);
      dispatch({type: SET_COMPANY_FAILED, payload: err.message});
   }
};
export const resetCompany = () => ({type: RESET_COMPANY});

export const setVerificationInProgress = () => ({
   type: SET_VERIFICATION_IN_PROGRESS
})
export const setVerificationSuccess = () => ({
   type: SET_VERIFICATION_SUCCESS
})
export const setVerificationFailed = () => ({
   type: SET_VERIFICATION_FAILED
});
export const setVerificationDone = () => ({
   type: SET_VERIFICATION_DONE
});
export const resetVerification = () => ({
   type: RESET_VERIFICATION
})