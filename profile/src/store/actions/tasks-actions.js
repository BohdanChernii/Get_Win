import {RESET_TASK, RESET_TASKS_LIST, SET_TASK,} from "@store/types";
import {store} from "@store";

export const setTaskInfo = values => {
   const {info} = store.getState().tasks;
   return {
      type: SET_TASK,
      payload: {...info, ...values}
   }
};
export const resetTaskList = () => ({type: RESET_TASKS_LIST});
export const resetTask = () => ({type: RESET_TASK});