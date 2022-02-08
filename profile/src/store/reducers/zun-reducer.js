import {CLEAR_ZUN, GET_ZUN_FAILED, GET_ZUN_SUCCESS, INIT_ZUN,} from "@store/types";

const initialValue = {
   loading: false,
   error: null,
   categories: null
}

const handlers = {
   [INIT_ZUN]: (state) => ({...state, loading: true}),
   [GET_ZUN_SUCCESS]: (state, {payload}) => ({...state, loading: false, categories: payload}),
   [GET_ZUN_FAILED]: (state, {payload}) => ({...state, loading: false, error: payload}),
   [CLEAR_ZUN]: (state) => ({...state, loading: false, categories: null, error: null,}),
   DEFAULT: (state) => state
}

export const zunReducer = (state = initialValue, action) => {
   const handler = handlers[action.type] || handlers.DEFAULT;
   return handler(state, action);
}


