import {CLEAR_KPI, GET_KPI_FAILED, GET_KPI_SUCCESS, INIT_KPI,} from "@store/types";

const initialValue = {
   loading: false,
   error: null,
   categories: null
}

const handlers = {
   [INIT_KPI]: (state) => ({...state, loading: true}),
   [GET_KPI_SUCCESS]: (state, {payload}) => ({...state, loading: false, categories: payload}),
   [GET_KPI_FAILED]: (state, {payload}) => ({...state, loading: false, error: payload}),
   [CLEAR_KPI]: (state) => ({...state, loading: false, categories: null, error: null,}),
   DEFAULT: (state) => state
}

export const KPIReducer = (state = initialValue, action) => {
   const handler = handlers[action.type] || handlers.DEFAULT;
   return handler(state, action);
}


