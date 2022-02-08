import {companyApi, dropDownListApi, fileApi, positionsApi, stepApi, testingApi} from "@assets/helpers/api";
import {checkFormValues, getUrlAddItemPositionAdd, getUrlAddItemPositionRemove, mergeGlobalAndLocal, sortBy} from "@assets/helpers/helpers";
import {Http} from "@assets/helpers/http";
import axios from "axios";
import {store} from "@store";
import {addItemsTypes} from "@assets/helpers/constants";

export const createCompany = async (values) => {
   const formValues = checkFormValues(values);
   const token = localStorage.getItem('token');
   const data = JSON.stringify(formValues)
   
   let url = `${companyApi.create_company}?token=${token}&data=${data}`;
   
   try {
      const json = await Http.post(url);
      if (json.error) {
         return new Error('Такая компания или код уже зарегистрированы в системе');
      }
      return json
   } catch (err) {
      console.error(err)
      throw new Error('Что-то пошло не так, проверьте подключение к Интернету или правильность ввода данных')
   }
};

export const setCompanyInfo = async (values) => {
   const formValues = checkFormValues(values);
   const token = localStorage.getItem('token');
   const data = JSON.stringify(formValues);
   let url = `${companyApi.set_company_info}?token=${token}&data=${data}`;
   try {
      const json = await Http.post(url);
      if (json.error) {
         return new Error(json.msg);
      }
      return json;
   } catch (e) {
      throw new Error('Что-то пошло не так, проверьте подключение к Интернету или правильность ввода данных')
   }
};

export const setCompanyAdmin = async (values) => {
   const formValues = checkFormValues(values);
   const token = localStorage.getItem('token');
   let url = `${companyApi.add_company_admin}?token=${token}`;
   
   Object.keys(formValues).forEach(key => {
      formValues[key] ? url += `&${key}=${formValues[key]}` : null;
   })
   
   try {
      const json = await Http.post(url);
      if (json.error) {
         return new Error('Такой пользователь уже существует');
      }
      return json
   } catch (e) {
      throw 'Что-то пошло не так, проверьте подключение к Интернету или правильность ввода данных'
   }
}

export const deleteFile = async (dir, file_name) => {
   const token = localStorage.getItem('token');
   let url = `${fileApi.del_file}?token=${token}&dir=${dir}&file_name=${file_name}`;
   
   try {
      const res = await axios.post(url, null, {
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
         }
      });
      if (res.status === 200) {
         return res.status
      } else {
         console.error('Ошибка при удалении')
         return new Error('Ошибка при удалении');
      }
   } catch (e) {
      console.error(e)
      throw 'Что-то пошло не так, проверьте подключение к Интернету или правильность ввода данных'
   }
}

export const setUserStep = async (step) => {
   const token = localStorage.getItem('token');
   const url = `${stepApi.set_step}?token=${token}&step=${step}`;
   try {
      return await axios.post(url, null, {
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
         }
      });
   } catch (e) {
      console.error(e)
      throw new Error('Что-то пошло не так, проверьте подключение к Интернету или правильность ввода данных');
   }
}

export const addNewPosition = async namePos => {
   const {departments: {name: selectedNameDepart, list: adddepartments}} = store.getState();
   
   const department = adddepartments.find(el => el.name === selectedNameDepart);
   const data = {name: namePos, list: addItemsTypes.POSITION, id_tl_list: department.idItem, type: department.type}
   
   const token = localStorage.getItem('token');
   const url = `${positionsApi.add_new_position}?token=${token}&data=${JSON.stringify(data)}`;
   try {
      const json = await Http.post(url)
      return json.ok
   } catch (err) {
      console.error(err)
      throw new Error(err.message)
   }
}

export const addNewPositionItem = async (name, typeUrl) => {
   const {
      positions: {list: listPositions, id: id_position},
   } = store.getState();
   const {type} = listPositions.find(el => el.id === id_position);
   const data = {name, list: typeUrl, id_position, type}
   
   const token = localStorage.getItem('token');
   const url = `${getUrlAddItemPositionAdd(typeUrl)}?token=${token}&data=${JSON.stringify(data).trim()}`;
   try {
      await Http.post(url)
   } catch (err) {
      console.error(err)
      throw new Error(err.message)
   }
};
export const removePositionItem = async (id, typeUrl, removeTypeId) => {
   const token = localStorage.getItem('token');
   const url = `${getUrlAddItemPositionRemove(typeUrl)}?token=${token}&${removeTypeId}=${id}`;
   try {
      const json = await Http.post(url)
      return json.ok
   } catch (err) {
      console.error(err)
      throw new Error(err.message)
   }
}
export const addAddresses = async newName => {
   const offices = store.getState().company.company.otherOffices
   const data = {
      nameOffice: newName,
      registeredOffice: newName,
      actualOffice: newName,
      tel: null,
      email: null,
      website: null,
   }
   const otherOffices = [...offices, data];
   const token = localStorage.getItem('token');
   const newOtherOffices = encodeURIComponent(JSON.stringify({otherOffices}))
   let url = `${companyApi.set_company_info}?token=${token}&data=${newOtherOffices}`;
   try {
      const json = await Http.post(url);
      if (json.error) {
         return new Error(json.msg);
      }
      return json;
   } catch (e) {
      console.error(e)
      throw new Error(e.message)
   }
}

export const createNewVacancy = async () => {
   const info = store.getState().positions.info
   const token = localStorage.getItem('token');
   const url = `${positionsApi.add_application_info}?token=${token}&list=application&data=${JSON.stringify(info)}`;
   try {
      const json = await Http.post(url);
      return json.ok
   } catch (e) {
      throw new Error(e.message)
   }
};

export const getUniversities = async () => {
   const token = localStorage.getItem('token');
   const url = `${dropDownListApi.get_university}?token=${token}`;
   try {
      const json = await Http.get(url);
      if (json.ok && Array.isArray(json.data)) {
         return json.data.map(({id_university, name_university}) => ({
            id: id_university,
            name: name_university,
         }))
      }
   } catch (e) {
      throw new Error(e.message)
   }
};
export const createFile = async (html) => {
   const token = localStorage.getItem('token');
   const url = `${fileApi.create_file}?token=${token}&html=${html}`;
   try {
      const res = await fetch(url)
      return await res.arrayBuffer()
   } catch (e) {
      throw new Error(e.message)
   }
};

export const getCiti = async name => {
   const token = localStorage.getItem('token');
   const url = `${dropDownListApi.get_list_cities}?token=${token}&citi=${name}`;
   try {
      const json = await Http.get(url);
      if (json.ok && Array.isArray(json.data)) {
         return json.data.map(({id, name, ...rest}) => {
            const description = Object.values(rest).join(' ');
            return ({id, name, description});
         })
      }
      return []
   } catch (e) {
      throw new Error(e.message)
   }
};
export const getStreets = async (citiId, name) => {
   const token = localStorage.getItem('token');
   const url = `${dropDownListApi.get_list_street}?token=${token}&id_city=${citiId}&street=${name}`;
   
   try {
      const json = await Http.get(url);
      if (json.ok && Array.isArray(json.data)) {
         return json.data.map(({street_ref, name_ua}) => {
            return (
               {id: street_ref, name: name_ua,});
         })
      }
      return null
   } catch (e) {
      throw new Error(e.message)
   }
};
export const getInteractions = async () => {
   const token = localStorage.getItem('token');
   const url = `${positionsApi.get_list_all_position}?token=${token}`;
   
   try {
      const json = await Http.get(url);
      if (json.ok && json.data) {
         return sortBy(mergeGlobalAndLocal(json.data), 'name')
         
      }
      return null
   } catch (e) {
      throw new Error(e.message)
   }
};

export const getTestingListItems = async () => {
   const token = localStorage.getItem('token');
   const url = `${testingApi.get_list_items}?token=${token}`;
   
   try {
      const json = await Http.get(url);
      if (json.ok && json.data) {
         return json.data;
      }
      return null
   } catch (e) {
      throw new Error(e.message)
   }
};