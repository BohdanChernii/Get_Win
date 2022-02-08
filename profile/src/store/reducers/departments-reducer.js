import {
   INIT_DEPARTMENTS_LIST,
   SET_DEPARTMENT_INFO,
   SET_DEPARTMENT_NAME,
   SET_DEPARTMENTS_LIST_FAILED,
   SET_DEPARTMENTS_LIST_SUCCESS
} from "@store/types";

const initialState = {
   loading: false,
   error: null,
   list: null,
   name: null,
   info: null,
   
   // loading: false,
   // error: null,
   // list: [
   //    {
   //       name: 'IT разработки',
   //       idItem: '12',
   //       type: 'global',
   //       id: '466'
   //    },
   //    {
   //       name: 'SMM интернет маркетинг',
   //       idItem: '10',
   //       type: 'global',
   //       id: '467'
   //    },
   //    {
   //       name: 'Администрация',
   //       idItem: '4',
   //       type: 'global',
   //       id: '468'
   //    }
   // ],
   // name: 'SMM интернет маркетинг',
   // info: {
   //    name: 'SMM интернет маркетинг',
   //    list: 'tl_lists',
   //    id_tl_list: '10',
   //    manager_position: null,
   //    manager_name: null,
   //    manager_surname: null,
   //    manager_middle_name: null,
   //    address: {
   //       city_id: '23147',
   //       city_name: 'Тернополь',
   //       street_id: '0a10563a-6858-11e6-8304-00505688561d',
   //       street_name: 'вул. Дружби',
   //       street_number: '2'
   //    },
   //    type: 'global'
   // }
}

const handlers = {
   [INIT_DEPARTMENTS_LIST]: state => ({...state, loading: true, list: null,}),
   [SET_DEPARTMENTS_LIST_SUCCESS]: (state, {payload}) => ({...state, loading: false, list: payload}),
   [SET_DEPARTMENTS_LIST_FAILED]: (state, {payload}) => ({...state, loading: false, error: payload}),
   [SET_DEPARTMENT_NAME]: (state, {payload}) => ({...state, name: payload}),
   [SET_DEPARTMENT_INFO]: (state, {payload}) => ({...state, info: payload}),
   DEFAULT: state => state
}

export const departmentsReducer = (state = initialState, action) => {
   const handler = handlers[action.type] || handlers.DEFAULT;
   return handler(state, action)
}