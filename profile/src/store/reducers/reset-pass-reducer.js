import {CLEAR_INFO_RESET_PASS, EMAIL_VERIFY_FAILED, EMAIL_VERIFY_SUCCESS, RESET_PASS_FAILED, RESET_PASS_SUCCESS} from "@store/types";

const initialState = {
   error: null,
   isResetPass: false,
   isEmailVerify: false,
}

const handlers = {
   [EMAIL_VERIFY_FAILED]: (state, {payload}) => ({...state, isResetPass: false, error: payload,}),
   [EMAIL_VERIFY_SUCCESS]: (state) => ({...state, isEmailVerify: true, error: null,}),
   
   [RESET_PASS_SUCCESS]: (state) => ({...state, isResetPass: true, error: null,}),
   [RESET_PASS_FAILED]: (state, {payload}) => ({...state, isResetPass: false, error: payload}),
   
   [CLEAR_INFO_RESET_PASS]: (state) => ({...state, isResetPass: false, isEmailVerify: false, error: null}),
   DEFAULT: state => state
}

export const resetPassReducer = (state = initialState, action) => {
   const handler = handlers[action.type] || handlers.DEFAULT
   return handler(state, action)
}