import {CLEAR_TARGETS, GET_TARGETS_FAILED, GET_TARGETS_SUCCESS, INIT_TARGETS,} from "@store/types";
import {targetsApi} from "@assets/helpers/api";
import {Http} from "@assets/helpers/http";
import {createPositions, getData} from "@assets/helpers/helpers";
import {store} from "@store";

export const initPositionTarget = () => async (dispatch) => {
   const {name, list} = store.getState().departments;
   const token = localStorage.getItem('token');
   const {idItem, type} = list.find(el => el.name === name)
   
   const url = `${targetsApi.getTargets}?token=${token}&idItem=${idItem}&type=${type}`;
   dispatch({type: INIT_TARGETS})
   try {
      const json = await Http.get(url);
      const global = getData(json.data.global);
      const local = json.data.local ? getData(json.data.local) : [];
      
      const positions = createPositions([...global, ...local]);
      const category = [{id: idItem, type, name, positions}]
      dispatch({type: GET_TARGETS_SUCCESS, payload: category})
   } catch (err) {
      console.error(err)
      dispatch({type: GET_TARGETS_FAILED, payload: err.message})
      throw new Error(err.message)
   }
};
export const resetPositionTarget = () => ({type: CLEAR_TARGETS});