import {
   INIT_DEPARTMENTS_LIST,
   SET_DEPARTMENT_INFO,
   SET_DEPARTMENT_NAME,
   SET_DEPARTMENTS_LIST_FAILED,
   SET_DEPARTMENTS_LIST_SUCCESS
} from "@store/types";
import {departmentsApi} from "@assets/helpers/api";
import {Http} from "@assets/helpers/http";
import {store} from "@store";
import {checkFormValues, getCurrentValues} from "@assets/helpers/helpers";
import __ from "lodash";

export const getDepartments = () => async dispatch => {
   dispatch({type: INIT_DEPARTMENTS_LIST})
   
   const token = localStorage.getItem('token');
   const url = `${departmentsApi.get_list_departments}?token=${token}`;
   
   try {
      const json = await Http.get(url);
      if (json.ok) {
         const list = json?.data?.tl_lists ? [...json.data?.tl_lists].map(item => ({...item, id: __.uniqueId()})) : []
         return dispatch({type: SET_DEPARTMENTS_LIST_SUCCESS, payload: list});
      }
      return dispatch({type: SET_DEPARTMENTS_LIST_FAILED, payload: json.msg})
   } catch (e) {
      console.error(e)
      dispatch({type: SET_DEPARTMENTS_LIST_FAILED, payload: e.message})
      throw new Error(e.message)
   }
}
export const getDepartmentInfo = (name) => async dispatch => {
   const {idItem, type} = store.getState().departments.list.find(dep => dep.name === name);
   const token = localStorage.getItem('token');
   const url = `${departmentsApi.get_info_department}?token=${token}&id_tl_lists=${idItem}&type=${type}`;
   try {
      const json = await Http.post(url);
      return dispatch({type: SET_DEPARTMENT_INFO, payload: json.data})
   } catch (e) {
      console.error(e)
      throw new Error(e.message)
   }
};

export const addNewDepartment = async (values) => {
   const dropDownList = store.getState().dropDownList;
   
   const formValues = checkFormValues(values);
   formValues.category = getCurrentValues(formValues.category, dropDownList.lists.tl_lists);
   const is_new_address = !!formValues.is_new_address
   const id_tl_list = formValues.category.idItem;
   const data = {
      name,
      list: 'tl_lists',
      id_tl_list,
      ...formValues
   }
   const token = localStorage.getItem('token')
   const url = `${departmentsApi.add_new_department}?token=${token}&is_new_address=${is_new_address}&data=${JSON.stringify(data)}`
   try {
      await Http.post(url)
   } catch (e) {
      throw new Error(e.message)
   }
}

export const checkAllDepartments = async () => {
   const token = localStorage.getItem('token')
   const url = `${departmentsApi.check_departments_adresses}?token=${token}`
   try {
      await Http.post(url)
   } catch (e) {
      throw new Error(e.message)
   }
}

export const setDepartmentsName = name => ({
   type: SET_DEPARTMENT_NAME, payload: name
})