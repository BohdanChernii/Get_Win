import {INIT_DROP_DOWN_LISTS, INIT_DROP_DOWN_LISTS_FAILED, RESET_DROP_DOWN_LIST} from "@store/types";

const initialValue = {
   error: null,
   lists: null
}

const handlers = {
   [INIT_DROP_DOWN_LISTS]: (state, {payload}) => ({...state, lists: payload}),
   [INIT_DROP_DOWN_LISTS_FAILED]: (state, {payload}) => ({...state, error: payload}),
   [RESET_DROP_DOWN_LIST]: (state) => ({...state, error: null, lists: null}),
   DEFAULT: state => state,
}

export const dropDownListReducer = (state = initialValue, action) => {
   const handler = handlers[action.type] || handlers.DEFAULT;
   return handler(state, action)
}