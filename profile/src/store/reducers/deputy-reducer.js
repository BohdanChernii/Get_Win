import {INIT_DEPUTY, SET_DEPUTY_FAILED, SET_DEPUTY_SUCCESS} from "@store/types";


const initialValue = {
   loading: false,
   error: null,
   deputies: null
}
const handlers = {
   [INIT_DEPUTY]: (state) => ({...state, loading: true, error: null}),
   [SET_DEPUTY_SUCCESS]: (state, {payload}) => ({...state, loading: false, deputies: payload}),
   [SET_DEPUTY_FAILED]: (state, {payload}) => ({...state, loading: false, deputies: null, error: payload}),
   DEFAULT: state => state,
}

export const deputyReducer = (state = initialValue, action) => {
   const handler = handlers[action.type] || handlers.DEFAULT;
   return handler(state, action)
}