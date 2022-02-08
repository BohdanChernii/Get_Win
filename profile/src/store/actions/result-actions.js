import {GET_RESULT_FAILED, GET_RESULT_SUCCESS, INIT_RESULT,} from "@store/types";
import {resultApi} from "@assets/helpers/api";
import {Http} from "@assets/helpers/http";
import {createPositions, getData} from "@assets/helpers/helpers";
import {store} from "@store";

export const initPositionResult = () => async (dispatch) => {
   
   const {name, list} = store.getState().departments;
   const token = localStorage.getItem('token');
   const {idItem, type} = list.find(el => el.name === name)
   
   const url = `${resultApi.getResults}?token=${token}&idItem=${idItem}&type=${type}`;
   dispatch({type: INIT_RESULT})
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
      dispatch({type: GET_RESULT_SUCCESS, payload: category})
   } catch (err) {
      console.error(err)
      dispatch({type: GET_RESULT_FAILED, payload: err.message})
      throw new Error(err.message)
   }
};
