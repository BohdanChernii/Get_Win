import {CLEAR_FUNCTIONALITY, GET_FUNCTIONALITY_FAILED, GET_FUNCTIONALITY_SUCCESS, INIT_FUNCTIONALITY} from "@store/types";
import {functionalityApi} from "@assets/helpers/api";
import {Http} from "@assets/helpers/http";
import {createPositions, getData} from "@assets/helpers/helpers";
import {store} from "@store";

export const initPositionFunctionality = () => async (dispatch) => {
   
   const {name, list} = store.getState().departments;
   const token = localStorage.getItem('token');
   const {idItem, type} = list.find(el => el.name === name)
   
   const url = `${functionalityApi.getFunctionality}?token=${token}&idItem=${idItem}&type=${type}`;
   dispatch({type: INIT_FUNCTIONALITY})
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
      dispatch({type: GET_FUNCTIONALITY_SUCCESS, payload: category})
   } catch (err) {
      console.error(err)
      dispatch({type: GET_FUNCTIONALITY_FAILED, payload: err.message})
      throw new Error(err.message)
   }
};

export const resetPositionFunctionality = () => ({type: CLEAR_FUNCTIONALITY});