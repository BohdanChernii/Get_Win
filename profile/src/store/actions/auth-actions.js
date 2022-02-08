import {AUTH_LOGIN_FAILED, AUTH_LOGIN_SUCCESS, AUTH_REG_FAILED, AUTH_REG_SUCCESS, AUTH_RESET, INIT_AUTH_LOGIN} from '../types'
import {authApi} from "@assets/helpers/api";
import {Http} from "@assets/helpers/http";

export const login = data => async dispatch => {
   const url = `${authApi.login}/?email=${data.email}&passwd=${encodeURIComponent(data.password)}`;
   try {
      dispatch({type: INIT_AUTH_LOGIN})
      const json = await Http.post((url))
      if (json.token) {
         localStorage.setItem('token', `${json.token}`);
         return dispatch({
            type: AUTH_LOGIN_SUCCESS,
            payload: json.token,
         });
      } else {
         return dispatch({
            type: AUTH_LOGIN_FAILED,
            payload: 'Неверный логин или пароль',
         });
      }
   } catch (e) {
      return dispatch({
         type: AUTH_LOGIN_FAILED,
         payload: 'Штото пошло не так',
      });
   }
}

export const registration = data => async dispatch => {
   const url = `${authApi.reg_user}/?email=${data.email}&passwd=${data.password}`;
   try {
      const json = await Http.post(url)
      if (json.ok) {
         return dispatch({
            type: AUTH_REG_SUCCESS,
            payload: json.token,
         });
      } else {
         return dispatch({
            type: AUTH_REG_FAILED,
            payload: 'Этот пользователь уже существует',
         });
      }
   } catch (e) {
      return dispatch({
         type: AUTH_REG_FAILED,
         payload: 'Штото пошло не так',
      });
   }
}
export const resetAuth = () => ({type: AUTH_RESET})