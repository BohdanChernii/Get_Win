import {CLEAR_ZUN, GET_ZUN_FAILED, GET_ZUN_SUCCESS, INIT_ZUN} from "@store/types";
import {zunApi} from "@assets/helpers/api";
import {Http} from "@assets/helpers/http";
import {createPositions, getData} from "@assets/helpers/helpers";
import {store} from "@store";

export const initPositionZun = () => async (dispatch) => {
   
   const {name, list} = store.getState().departments;
   const token = localStorage.getItem('token');
   const {idItem, type} = list.find(el => el.name === name)
   
   const url = `${zunApi.getZun}?token=${token}&idItem=${idItem}&type=${type}`;
   dispatch({type: INIT_ZUN})
   try {
      const json = await Http.get(url);
      const global = getData(json.data.global);
      const local = json.data.local ? getData(json.data.local) : [];
      
      const positions = createPositions([...global, ...local]);
      const category = [{
         id: idItem,
         type,
         name,
         positions
      }]
      dispatch({type: GET_ZUN_SUCCESS, payload: category})
   } catch (err) {
      console.error(err)
      dispatch({type: GET_ZUN_FAILED, payload: err.message})
      throw new Error(err.message)
   }
};
export const resetPositionZun = () => ({type: CLEAR_ZUN});
