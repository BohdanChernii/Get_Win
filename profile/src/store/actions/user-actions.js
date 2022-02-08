import {userApi} from "@assets/helpers/api";
import {Http} from "@assets/helpers/http";
import {DEL_USER, SET_USER_FAILED, SET_USER_INIT, SET_USER_SUCCESS,} from "@store/types";

export const getUser = () => async dispatch => {
   dispatch({type: SET_USER_INIT});
   const token = localStorage.getItem('token');
   const url = `${userApi.get_user_info}/?token=${token}`;
   
   if (token) {
      try {
         const json = await Http.get(url);
         if (json) {
            const {data: user} = json
            const isDisabled = user?.rang?.name === 'Пользователь' && user.step === '3';
            if (user) {
               dispatch({
                  type: SET_USER_SUCCESS,
                  payload: {
                     user, isDisabled
                  },
               });
            }
         } else {
            throw new Error('Неверный токен пользователя')
         }
      } catch (err) {
         console.error(err)
         return dispatch({
            type: SET_USER_FAILED,
            payload: err.message,
         });
      }
   }
   
}
export const deleteUser = () => ({type: DEL_USER})