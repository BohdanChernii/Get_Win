import {RESET_CANDIDATE_INFO, GET_CANDIDATE} from "@store/types";

const initialState = {
   info: null,
   list: []
}

const handlers = {
   [GET_CANDIDATE]: (state, payload) => ({...state, info: {...payload}}),
   [RESET_CANDIDATE_INFO]: state => ({...state, info: null}),
   DEFAULT: state => state,
}

export const candidatesReducer = (state = initialState, action) => {
   const handler = handlers[action.type] || handlers.DEFAULT;
   return handler(state, action.payload);
}