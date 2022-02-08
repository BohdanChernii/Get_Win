import {companyApi} from "@assets/helpers/api";
import {Http} from "@assets/helpers/http";
import {INIT_DEPUTY, SET_DEPUTY_FAILED, SET_DEPUTY_SUCCESS} from "@store/types";


export const getCompanyDeputy = () => async dispatch => {
   const token = localStorage.getItem('token');
   const url = `${companyApi.get_company_deputy}?token=${token}}`;
   
   try {
      const json = await Http.get(url);
      dispatch({type: INIT_DEPUTY});
      
      if (json?.error) {
         dispatch({type: SET_DEPUTY_FAILED, payload: `Ошибка! ${json?.error}`});
         throw new Error(`Ошибка! ${json?.error}`)
      }
      dispatch({type: SET_DEPUTY_SUCCESS, payload: json.data});
      return json
      
   } catch (err) {
      console.error(err)
      dispatch({type: SET_DEPUTY_FAILED, payload: err.message});
   }
}

export const addCompanyDeputy = async deputy => {
   const token = localStorage.getItem('token');
   const data = JSON.stringify(deputy);
   const url = `${companyApi.add_company_deputy}?token=${token}&data=${encodeURIComponent(data)}`;
   
   try {
      const json = await Http.post(url);
      return json
   } catch (err) {
      console.error(err)
      throw new Error(err)
   }
}