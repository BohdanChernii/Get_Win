import {AUTH_LOGIN_FAILED, AUTH_LOGIN_SUCCESS, AUTH_REG_FAILED, AUTH_REG_SUCCESS, AUTH_RESET, INIT_AUTH_LOGIN, RESET_PASS_INIT} from '../types'

const initialValue = {
   loading: false,
   isReg: false,
   token: null,
   error: null,
   isResetPass: false,
}

const handlers = {
   [INIT_AUTH_LOGIN]: (state) => ({...state, loading: true, error: null}),
   [AUTH_LOGIN_SUCCESS]: (state, {payload}) => ({...state, loading: false, token: payload, error: null}),
   [AUTH_LOGIN_FAILED]: (state, {payload}) => ({...state, loading: false, error: payload}),
   [AUTH_REG_SUCCESS]: (state) => ({...state, isReg: true, error: null}),
   [AUTH_REG_FAILED]: (state, {payload}) => ({...state, isReg: false, error: payload}),
   [AUTH_RESET]: state => ({...state, loading: false, isReg: false, token: null, error: null}),
   [RESET_PASS_INIT]: state => ({...state, isResetPass: true}),
   DEFAULT: state => state,
}

export const authReducer = (state = initialValue, action) => {
   const handler = handlers[action.type] || handlers.DEFAULT;
   return handler(state, action)
}