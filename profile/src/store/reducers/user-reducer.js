import {DEL_USER, SET_USER_FAILED, SET_USER_INIT, SET_USER_SUCCESS} from "@store/types";

const initialValue = {
   user: null,
   isDisabled: false,
   error: null,
   loading: false,
}

const handlers = {
   [SET_USER_INIT]: state => ({...state, loading: true,}),
   [SET_USER_SUCCESS]: (state, {payload}) => ({...state, user: payload.user, isDisabled: payload.isDisabled, loading: false}),
   [SET_USER_FAILED]: (state, {payload}) => ({...state, user: null, error: payload, loading: false}),
   [DEL_USER]: state => ({...state, user: null, isDisabled: false, loading: false, error: null,}),
   
   DEFAULT: state => state,
}

export const userReducer = (state = initialValue, action) => {
   const handler = handlers[action.type] || handlers.DEFAULT;
   return handler(state, action)
}