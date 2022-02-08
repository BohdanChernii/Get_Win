import {INIT_VACANCIES, SET_VACANCIES_SUCCESS, SET_VACANCIES_FAILED} from "@store/types";

const defaultState = {
   loading: false,
   error: null,
   vacancies: [],
   remainders: [],
}

const handlers = {
   [INIT_VACANCIES]: (state) => ({...state, loading: true,}),
   [SET_VACANCIES_SUCCESS]: (state, {payload}) => ({
      ...state,
      vacancies: [...payload.vacancies],
      remainders: [...payload.remainders],
      loading: false,
      error: null,
   }),
   [SET_VACANCIES_FAILED]: (state, {payload}) => ({...state, error: payload}),
   DEFAULT: state => state,
}
export const vacanciesReducer = (state = defaultState, action) => {
   const handler = handlers[action.type] || handlers.DEFAULT
   return handler(state, action)
}
