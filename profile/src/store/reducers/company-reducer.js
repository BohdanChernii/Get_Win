import {
   RESET_COMPANY,
   RESET_VERIFICATION,
   SET_COMPANY_FAILED,
   SET_COMPANY_START,
   SET_COMPANY_SUCCESS,
   SET_VERIFICATION_DONE,
   SET_VERIFICATION_FAILED,
   SET_VERIFICATION_IN_PROGRESS,
   SET_VERIFICATION_SUCCESS,
} from "@store/types";
import {companyStatus} from "@assets/helpers/constants";

const initialValue = {
   loading: false,
   error: null,
   company: null,
}

const handlers = {
   [SET_COMPANY_START]: state => ({...state, loading: true, error: null}),
   [SET_COMPANY_SUCCESS]: (state, {payload}) => ({...state, loading: false, company: payload}),
   [SET_COMPANY_FAILED]: (state, {payload}) => ({...state, loading: false, error: payload}),
   [SET_VERIFICATION_IN_PROGRESS]: state => ({...state, company: {...state.company, status: companyStatus.PROGRESS}}),
   [SET_VERIFICATION_SUCCESS]: state => ({...state, company: {...state.company, status: companyStatus.SUCCESS}}),
   [SET_VERIFICATION_FAILED]: state => ({...state, company: {...state.company, status: companyStatus.FAILED}}),
   [SET_VERIFICATION_DONE]: state => ({...state, company: {...state.company, status: companyStatus.DONE}}),
   [RESET_VERIFICATION]: state => ({...state, company: {...state.company, status: companyStatus.RESET}}),
   [RESET_COMPANY]: state => ({...state, loading: false, error: null, company: null}),
   DEFAULT: state => state,
}

export const companyReducer = (state = initialValue, action) => {
   const handler = handlers[action.type] || handlers.DEFAULT;
   return handler(state, action)
}