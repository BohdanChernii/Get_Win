import {resetPassApi} from "@assets/helpers/api";
import {Http} from "@assets/helpers/http";
import {CLEAR_INFO_RESET_PASS, EMAIL_VERIFY_FAILED, EMAIL_VERIFY_SUCCESS, RESET_PASS_FAILED, RESET_PASS_SUCCESS} from "@store/types";

export const emailVerify = email => async dispatch => {
   const url = `${resetPassApi.email_verify}/?email=${email}`;
   try {
      const json = await Http.post(url);
      if (json.ok) {
         return dispatch({
            type: EMAIL_VERIFY_SUCCESS,
            payload: true,
         });
      } else {
         return dispatch({
            type: EMAIL_VERIFY_FAILED,
            payload: 'Такой почты не существует',
         });
      }
   } catch (e) {
      return dispatch({
         type: RESET_PASS_FAILED,
         payload: 'Штото пошло не так',
      });
   }
}


export const resetPassword = (token, password) => async dispatch => {
   const url = `${resetPassApi.pawssd_reset}/?token=${token}&passwd=${encodeURIComponent(password)}`;
   try {
      const json = await Http.post(url);
      if (json.ok) {
         return dispatch({
            type: RESET_PASS_SUCCESS,
            payload: true,
         });
      } else {
         return dispatch({
            type: RESET_PASS_FAILED,
            payload: 'Такой почты не существует',
         });
      }
   } catch (e) {
      return dispatch({
         type: RESET_PASS_FAILED,
         payload: 'Штото пошло не так',
      });
   }
}
export const clearInfoResetPass = () => ({
   type: CLEAR_INFO_RESET_PASS,
})

