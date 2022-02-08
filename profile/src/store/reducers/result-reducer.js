import {CLEAR_RESULT, GET_RESULT_FAILED, GET_RESULT_SUCCESS, INIT_RESULT,} from "@store/types";

const initialValue = {
   loading: false,
   error: null,
   categories: null
}

const handlers = {
   [INIT_RESULT]: (state) => ({...state, loading: true}),
   [GET_RESULT_SUCCESS]: (state, {payload}) => ({...state, loading: false, categories: payload}),
   [GET_RESULT_FAILED]: (state, {payload}) => ({...state, loading: false, error: payload}),
   [CLEAR_RESULT]: (state) => ({...state, loading: false, categories: null}),
   DEFAULT: (state) => state
}

export const resultReducer = (state = initialValue, action) => {
   const handler = handlers[action.type] || handlers.DEFAULT;
   return handler(state, action);
}


