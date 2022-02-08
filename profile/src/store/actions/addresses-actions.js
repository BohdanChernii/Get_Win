import {companyApi} from "@assets/helpers/api";
import {Http} from "@assets/helpers/http";
import {INIT_ADDRESSES, SET_ADDRESSES_FAILED, SET_ADDRESSES_SUCCESS} from "@store/types";
import {getAddress} from "@assets/helpers/helpers";

export const getAddressesList = () => async dispatch => {
   const token = localStorage.getItem('token')
   const url = `${companyApi.get_list_company_address}?token=${token}`
   dispatch({type: INIT_ADDRESSES})
   try {
      const json = await Http.get(url);
      console.log()
      if (json.ok) {
         const addresses = json.data.s_offices?.filter(el => el).map(address => getAddress(address));
         return dispatch({type: SET_ADDRESSES_SUCCESS, payload: addresses});
      }
      
      return dispatch({type: SET_ADDRESSES_FAILED, payload: json.msg});
   } catch (e) {
      dispatch({type: SET_ADDRESSES_FAILED, payload: e.message})
      throw new Error(e.message)
   }
}