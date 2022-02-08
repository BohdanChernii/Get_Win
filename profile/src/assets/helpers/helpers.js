import {store} from "@store";
import __ from "lodash";
import {addItemsTypes} from "@assets/helpers/constants";
import {caseApi, functionalityApi, kpiApi, resultApi, targetsApi, zunApi} from "@assets/helpers/api";

export const checkFieldsValues = (allFields) => {
   let isDisabled = true;
   const fields = Array.isArray(allFields) ? [...allFields] : []
   let errors = [];
   let values = [];
   allFields && fields.forEach(field => {
      errors = errors.concat(field.errors);
      values = field.value ? values.concat(field.value) : values = [];
      isDisabled = !(errors.length === 0 && values.length === fields.length);
   })
   return isDisabled
}

export const checkPasswordsFields = allFields => {
   const fields = [...allFields]
   fields.forEach((item, _, arr) => {
      if (item.name.includes('password')) {
         
         const password = item.value;
         let confirm = '';
         
         arr.forEach(i => {
            if (i.name.includes('confirm')) {
               confirm = i.value;
               i.value === password ? i.errors = [] : i.errors = ['Пароли не одинаковые'];
            }
         })
         password === confirm ? item.errors = [] : item.errors = ['Пароли не одинаковые'];
      }
   })
   return fields
}

export const password_generator = len => {
   let length = (len) ? (len) : (16);
   let string = "abcdefghijklmnopqrstuvwxyz"; //to upper
   let numeric = '0123456789';
   let punctuation = '!@#$%^*()_+~`|}{[]:;?,./-=';
   let password = "";
   let character = "";
   while (password.length < length) {
      let entity1 = Math.ceil(string.length * Math.random() * Math.random());
      let entity2 = Math.ceil(numeric.length * Math.random() * Math.random());
      let entity3 = Math.ceil(punctuation.length * Math.random() * Math.random());
      let hold = string.charAt(entity1);
      hold = (password.length % 2 == 0) ? (hold.toUpperCase()) : (hold);
      character += hold;
      character += numeric.charAt(entity2);
      character += punctuation.charAt(entity3);
      password = character;
   }
   password = password.split('').sort(function () {
      return 0.5 - Math.random()
   }).join('');
   return password.substr(0, len);
}

export const getSearchParams = () => {
   const params = new URLSearchParams(window.location.search);
   return Array.from(params.keys()).reduce((acc, key) => ({...acc, [key]: params.get(key)}), {})
}

export const normFile = (e) => {
   if (Array.isArray(e)) {
      return e;
   }
   return e && e.fileList;
};

export const getFileName = file => file.name.split('.')[0];

export const getFileFormat = file => file.name.split('.')[1];

export const getFileSize = file => {
   return file.size / 1024 < 1024
      ? (file.size / 1024).toFixed(2) + 'KB'
      : (file.size / 1024 / 1024).toFixed(2) + 'MB';
}
export const getTel = tel => {
   let number = tel.replaceAll(' ', '')
   if (number.includes('+')) {
      number = number.slice(3)
   }
   return number
}

export const checkFormValues = values => {
   const {lists} = store.getState().dropDownList;
   const formValues = {...values};
   const formKeys = Object.keys(formValues);
   formValues?.tel
      ? formValues.tel = getTel(formValues.tel)
      : null;
   formKeys.forEach(key => {
      if (lists[key] && formValues[key]) {
         if (Array.isArray(formValues[key])) {
            formValues[key] = formValues[key].map(formName => {
               const {name, idItem, type} = lists[key].find(listItem => listItem.name === formName);
               return {
                  name, idItem, type
               }
            })
         } else {
            const {name, idItem, type} = lists[key].find(listItem => listItem.name === formValues[key]);
            formValues[key] = {name, idItem, type}
         }
      } else if (!formValues[key]) {
         formValues[key] = null
      }
   })
   return formValues
}

export const getCurrentValues = (oldValues, checkArr) => {
   if (typeof oldValues === 'string') {
      const {name, idItem, type} = checkArr.find(item => item.name === oldValues)
      return {name, idItem, type}
   } else if (Array.isArray(oldValues)) {
      return oldValues.reduce((acc, name) => {
         const item = checkArr.find(item => item.name === name);
         if (item) {
            const {name, idItem, type} = item;
            acc.push({name, idItem, type})
         }
         return acc
      }, [])
   }
   return null
}

export const getData = data => {
   if (Array.isArray(data)) {
      return data
   } else if (typeof data === 'object' && data !== null) {
      return Object.values(data)
   }
};

export const toArray = data => {
   if (Array.isArray(data)) {
      return data
   } else if (typeof data === 'object' && data !== null) {
      return [{
         ...data
      }]
   }
}

export const setDataType = (arr, type) => arr.map(el => ({...el, type}))

export const sortBy = (arr = [], ...iterators) => [...__.sortBy(arr, iterators)];

// Functionality
export const mergeGlobalAndLocal = (data, setIsUser = false) => {
   let global = data?.global ? getData(data.global) : [];
   let local = data?.local ? getData(data.local) : [];
   global = setDataType(global, 'global')
   local = setDataType(local, 'local')
   
   if (setIsUser) {
      local.forEach(el => {
         el.isUserAdd = true
      })
   }
   return [...global, ...local]
}

export const createPositions = (data) => {
   return data.map(pos => {
      for (const posKey in pos) {
         if (typeof pos[posKey] === 'object' && pos[posKey] !== null) {
            pos.functionality = mergeGlobalAndLocal(pos[posKey], true);
            delete pos[posKey]
         }
      }
      return {
         ...pos,
         functionality: pos.functionality?.map(func => {
            return {
               ...func,
               selected: func?.selected ? func.selected : false,
               isUserAdd: func?.isUserAdd ? func.isUserAdd : false,
            }
         }) || []
      }
   })
};

// export const checkIsSelectCategory = (newCategory, actualCategory) => {
//    return newCategory.map(newCategoryItem => {
//       const actualCategoryPositions = actualCategory.find(c => c.id === newCategoryItem.id)?.positions;
//
//       newCategoryItem.positions = newCategoryItem.positions.map(newPosItem => {
//          const actualCategoryFunc = actualCategoryPositions.find(item => item.id === newPosItem.id)?.functionality;
//
//          newPosItem.functionality.map(funcItem => {
//             actualCategoryFunc.forEach(actualFuncItem => {
//                if (funcItem.id === actualFuncItem.id) {
//                   funcItem.selected = actualFuncItem.selected
//                }
//             })
//             return funcItem
//          })
//          return newPosItem
//
//       })
//       return newCategoryItem
//    })
// }

export const filersCategoriesFunctionality = (tabIndex, oldCategories) => {
   if (oldCategories) {
      return oldCategories.map(category => ({
         ...category, positions: __.sortBy(category.positions.map(position => ({
            ...position,
            functionality: tabIndex === '2'
               ? position.functionality.filter(item => !item.isUserAdd)
               : tabIndex === '3'
                  ? position.functionality.filter(item => item.isUserAdd)
                  : position.functionality
         })), 'name')
      }))
   }
   return []
}

export const getPositionName = (category, positionSelect) => {
   if (!!category?.length && positionSelect) {
      return category.map(c => c.positions.find(pos => pos.id.toString() === positionSelect.toString()))[0]?.name || 'Упс';
   }
   return ''
}

export const getFunctionality = (category, positionSelect) => {
   if (!!category?.length && positionSelect) {
      return category.map(c => c.positions.find(pos => pos.id.toString() === positionSelect.toString())?.functionality).flat(2) || [];
   } else return []
   
}

export const checkedFunctionalityList = (functionality, checkedList) => {
   if (functionality?.length > 0) {
      return functionality.map(el => ({...el, selected: false})).map(f => {
         checkedList.forEach(item => {
            if (item.id === f.id) {
               f.selected = item.selected
            }
         })
         return f
      })
   } else return []
};

export const getDescriptions = (descriptions) => {
   if (typeof descriptions === 'object' && descriptions !== null) {
      const keysDescriptions = Object.keys(descriptions);
      return keysDescriptions
         .map(item => {
            if (item !== 'password' && item !== 'confirm') {
               if (item === 'tel' && !!descriptions[item]) {
                  return descriptions[item].replaceAll(' ', '')
               }
               return descriptions[item]
            }
         })
         .filter(Boolean)
         .join(' ')
   } else {
      return descriptions
   }
}

export const checkIsHaveElements = (arr1, arr2) => {
   const state = [];
   arr1.forEach(el => {
      const findEl = arr2.find(item => item.id === el.id)
      findEl && state.push(findEl)
   })
   return state.length > 0
}
export const getUrlAddItemPositionAdd = type => {
   switch (type) {
      case addItemsTypes.FUNCTIONALITY:
         return functionalityApi.addFunctionality
      
      case addItemsTypes.TARGET:
         return targetsApi.addTarget
      
      case addItemsTypes.RESULT:
         return resultApi.addResult
      
      case addItemsTypes.KPI:
         return kpiApi.addKpi
      
      case addItemsTypes.ZUN:
         return zunApi.addZun
      
      case addItemsTypes.CASE:
         return caseApi.addCase
   }
};
export const getUrlAddItemPositionRemove = type => {
   switch (type) {
      case addItemsTypes.FUNCTIONALITY:
         return functionalityApi.removeFunctionality
      
      case addItemsTypes.TARGET:
         return targetsApi.removeTarget
      
      case addItemsTypes.RESULT:
         return resultApi.removeResult
      
      case addItemsTypes.KPI:
         return kpiApi.removeKpi
      
      case addItemsTypes.ZUN:
         return zunApi.removeZun
      
      case addItemsTypes.CASE:
         return caseApi.removeCase
   }
}
// export const checkIsDisabledByName = (name, data) => {
//    return !!data[name]
// }
export const getTypeName = name => {
   switch (name) {
      case 'Владение программами':
         return 'programs'
      case 'Владение языками':
         return 'languages'
      case 'Возраст':
         return 'age'
      case 'Город':
         return 'address_vacancy'
      case 'Желаемая зарплата в гривне':
         return 'salary'
      case 'Название должности':
         return 'name'
      case 'Наличие авто':
         return 'car_available'
      case 'Образование':
         return 'education'
      case 'Опыт работы':
         return 'experience'
      case 'Пол':
         return 'gender'
      case 'Семейное положении':
         return 'family_status'
      case 'Служба в армии':
         return 'military_service'
      case 'Сфера деятельности':
         return 's_activity'
      case 'Тип занятости':
         return 'employment_type'
   }
}

export const getDescriptionPreviewVacancy = options => {
   if (Array.isArray(options)) {
      return options.map(option => {
         if (option.name) {
            return option.name;
         } else if (option.city_name) {
            return option.city_name;
         } else return option;
      }).join(', ')
   }
   if (typeof options === 'object' && !Array.isArray(options)) {
      if (options.from && options.to) {
         return `От ${options.from} до ${options.to}`
      } else if (options.from) {
         return `От ${options.from}`
      } else if (options.to) {
         return `До ${options.to}`
      } else if (options.name) return `${options.name}`
   }
   if (typeof options === 'string') {
      return options
   }
   return null
}

export const setCriteriaOptions = (criteria, data) => {
   if (criteria) {
      return criteria.map(el => {
         const option = data[getTypeName(el.name)];
         const description = getDescriptionPreviewVacancy(option);
         const disabled = !data[getTypeName(el.name)];
         return {
            ...el,
            disabled,
            description
         }
      })
   }
   return []
}

export const clearData = oldData => {
   const data = {...oldData};
   for (const dataKey in data) {
      if (!data[dataKey] || (Array.isArray(data[dataKey]) && data[dataKey].length === 0) || (typeof data[dataKey] === 'string' && data[dataKey].toLowerCase() === 'нет')) {
         delete data[dataKey]
      }
   }
   return data;
};

export const getAddress = address => {
   if (address) {
      const {city_name, street_name, street_number} = address;
      return {
         id: __.uniqueId(),
         name: `${city_name} ${street_name} ${street_number}`,
         ...address,
      }
   }
   return null
};

export const resetAddresses = (formAddressName = [], allAddresses = []) => {
   if (typeof allAddresses === 'object' && allAddresses !== null) {
      if (Array.isArray(allAddresses)) {
         return allAddresses.reduce((acc, {city_name, street_name, street_number, ...rest}) => {
            const currentName = `${city_name} ${street_name} ${street_number}`;
            if (formAddressName.includes(currentName)) {
               acc.push({city_name, street_name, street_number, ...rest})
            }
            return acc
         }, [])
      } else {
         const {city_name, street_name, street_number, ...rest} = allAddresses;
         const currentName = `${city_name} ${street_name} ${street_number}`;
         if (formAddressName.includes(currentName)) {
            return [{city_name, street_name, street_number, ...rest}]
         }
      }
   }
};

export const getPriorityName = (list = [], id) => {
   return list.find(el => el.idItem.toString() === id.toString())?.name;
};

export const setElementParams = (element, params) => {
   const styles = {};
   if (element) {
      for (const index in params) {
         const {name, property} = params[index];
         styles[name] = element[property]
      }
   }
   return styles
}