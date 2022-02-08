import {INIT_ADDRESSES, SET_ADDRESSES_FAILED, SET_ADDRESSES_SUCCESS} from "@store/types";

const initialValue = {
   loading: false,
   error: null,
   list: null,
   cities: null,
   streets: null,
}
const handlers = {
   [INIT_ADDRESSES]: (state) => ({...state, loading: true, error: null}),
   [SET_ADDRESSES_SUCCESS]: (state, {payload}) => ({...state, loading: false, list: payload}),
   [SET_ADDRESSES_FAILED]: (state, {payload}) => ({...state, loading: false, list: null, error: payload}),
   DEFAULT: state => state,
}

export const addressesReducer = (state = initialValue, action) => {
   const handler = handlers[action.type] || handlers.DEFAULT;
   return handler(state, action)
}