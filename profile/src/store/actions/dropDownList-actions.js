import { dropDownListApi } from '@assets/helpers/api';
import { Http } from '@assets/helpers/http';
import {
  INIT_DROP_DOWN_LISTS,
  INIT_DROP_DOWN_LISTS_FAILED,
  RESET_DROP_DOWN_LIST,
} from '@store/types';
import __ from 'lodash';

export const listTypes = {
  GLOBAL: 'global',
  LOCAL: 'local',
};

export const getDropDownList = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  const url = `${dropDownListApi.get_lists_create_company}?token=${token}`;
  try {
    const json = await Http.get(url);
    // get keys from all list
    const globalKeys = Object.keys(json.global);
    let localKeys = null;
    if (typeof json.local === 'object' && json.local !== null) {
      localKeys = Object.keys(json.local);
    }

    // create list
    const lists = {};

    globalKeys.forEach((name) => {
      lists[name] = Object.values(json.global[name]).map((item) => {
        item.idItem = item.id;
        delete item.id;
        return { ...item, type: listTypes.GLOBAL };
      });
    });

    if (localKeys) {
      localKeys.forEach((name) => {
        const values = Object.values(json.local[name]).map((item) => {
          item.idItem = item.id;
          delete item.id;
          return { ...item, type: listTypes.LOCAL };
        });
        if (lists[name]) {
          lists[name] = lists[name].concat(values);
        }
      });
    }

    for (const name in lists) {
      const list = lists[name].map((item) => ({
        id: __.uniqueId(),
        ...item,
      }));
      if (
        name !== 's_workers' &&
        name !== 's_priority' &&
        name !== 's_work_experience'
      ) {
        lists[name] = __.sortBy(list, 'name');
      }
    }

    dispatch({ type: INIT_DROP_DOWN_LISTS, payload: lists });
  } catch (e) {
    console.error(e);
    return dispatch({
      type: INIT_DROP_DOWN_LISTS_FAILED,
      payload: `Штото пошло не так: ${e.message}`,
    });
  }
};
export const addDropDownList = async (listName, itemName) => {
  const token = localStorage.getItem('token');
  const url = `${dropDownListApi.add_field_table}?token=${token}&name=${itemName}&list=${listName}`;
  try {
    return await Http.post(url);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const resetDropDownList = () => ({
  type: RESET_DROP_DOWN_LIST,
});
