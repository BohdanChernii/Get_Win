import {
   INIT_TARGETS,
   GET_TARGETS_SUCCESS,
   GET_TARGETS_FAILED,
   CLEAR_TARGETS,
} from "@store/types";

const initialValue = {
   loading: false,
   error: null,
   categories: null
}

const handlers = {
   [INIT_TARGETS]: (state) => ({...state, loading: true}),
   [GET_TARGETS_SUCCESS]: (state, {payload}) => ({...state, loading: false, categories: payload}),
   [GET_TARGETS_FAILED]: (state, {payload}) => ({...state, loading: false, error: payload}),
   [CLEAR_TARGETS]: (state) => ({...state, loading: false, categories: null, error: null,}),
   DEFAULT: (state) => state
}

export const targetReducer = (state = initialValue, action) => {
   const handler = handlers[action.type] || handlers.DEFAULT;
   return handler(state, action);
}


