import {
   INIT_POSITIONS_LIST,
   RESET_POSITIONS_LIST,
   SET_NEW_POSITION_INFO,
   SET_POSITION_ID,
   SET_POSITION_NAME,
   SET_POSITIONS_LIST_FAILED,
   SET_POSITIONS_LIST_SUCCESS
} from "@store/types";
import {store} from "@store";
import {dropDownListApi} from "@assets/helpers/api";
import {Http} from "@assets/helpers/http";
import {mergeGlobalAndLocal} from "@assets/helpers/helpers";

export const createPositionsList = () => async dispatch => {
   dispatch({type: INIT_POSITIONS_LIST})
   try {
      const {list, name} = store.getState().departments;
      const {idItem, type} = list.find(el => el.name === name);
      const token = localStorage.getItem('token');
      const url = `${dropDownListApi.get_list_vacancy}?token=${token}&idItem=${idItem}&type=${type}`;
      const json = await Http.get(url);
      if (json.ok) {
         const data = mergeGlobalAndLocal(json.tl_lists);
         return dispatch({type: SET_POSITIONS_LIST_SUCCESS, payload: data});
      }
      return dispatch({type: SET_POSITIONS_LIST_FAILED, payload: json.msg});
   } catch (err) {
      console.error(err);
      dispatch({type: SET_POSITIONS_LIST_FAILED, payload: err.message});
      throw new Error(`Ошибка: ${err.message}`);
   }
}
export const setNewPositionsInfo = (data) => {
   let positionInfo = store.getState().positions.info;
   if (positionInfo) {
      for (const key in data) {
         positionInfo[key] = data[key];
      }
   } else {
      positionInfo = data
   }
   return {type: SET_NEW_POSITION_INFO, payload: positionInfo}
};
export const setSelectPositionName = (name) => ({type: SET_POSITION_NAME, payload: name})
export const setSelectPositionId = id => ({type: SET_POSITION_ID, payload: id})
export const resetPositions = () => ({type: RESET_POSITIONS_LIST})
