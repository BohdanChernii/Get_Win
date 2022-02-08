import {HIDE_BANNER, SHOW_BANNER, SHOW_TESTING_MODAL} from "@store/types";

const initialValue = {
   showBanner: true,
   isTestModalOpen: false,
}

const handlers = {
   [SHOW_BANNER]: state => ({...state, showBanner: true}),
   [HIDE_BANNER]: state => ({...state, showBanner: false}),
   [SHOW_TESTING_MODAL]: (state, {payload}) => ({...state, isTestModalOpen: payload}),
   DEFAULT: state => state,
}

export const globalReducer = (state = initialValue, action) => {
   const handler = handlers[action.type] || handlers.DEFAULT;
   return handler(state, action)
}