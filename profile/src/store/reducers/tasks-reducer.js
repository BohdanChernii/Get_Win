import {GET_TASKS_LIST, RESET_TASK, RESET_TASKS_LIST, SET_TASK} from "@store/types";

const initialValue = {
   list: [],
   info: null
};

const handlers = {
   [GET_TASKS_LIST]: (state, {payload}) => ({...state, list: payload}),
   [RESET_TASKS_LIST]: state => ({...state, list: null}),
   [SET_TASK]: (state, {payload}) => ({...state, info: payload}),
   [RESET_TASK]: state => ({...state, info: null}),
   DEFAULT: state => state,
};

export const tasksReducer = (state = initialValue, action) => {
   const handler = handlers[action.type] || handlers.DEFAULT;
   return handler(state, action)
};