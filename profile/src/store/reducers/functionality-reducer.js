import {CLEAR_FUNCTIONALITY, GET_FUNCTIONALITY_FAILED, GET_FUNCTIONALITY_SUCCESS, INIT_FUNCTIONALITY,} from "@store/types";

const initialValue = {
   loading: false,
   error: null,
   categories: null
}

const handlers = {
   [INIT_FUNCTIONALITY]: (state) => ({...state, loading: true}),
   [GET_FUNCTIONALITY_SUCCESS]: (state, {payload}) => ({...state, loading: false, categories: payload}),
   [GET_FUNCTIONALITY_FAILED]: (state, {payload}) => ({...state, loading: false, error: payload}),
   [CLEAR_FUNCTIONALITY]: (state) => ({...state, loading: false, error: null, categories: null}),
   DEFAULT: (state) => state
}

export const functionalityReducer = (state = initialValue, action) => {
   const handler = handlers[action.type] || handlers.DEFAULT;
   return handler(state, action);
}


