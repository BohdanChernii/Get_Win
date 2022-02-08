import {useMemo} from "react";
import __ from "lodash";

export const useListFunctionality = (arr, tabIndex) => {
   return useMemo(() => {
      if (tabIndex === '2') {
         return __.sortBy(arr.filter(item => !item.isUserAdd), 'name')
      } else if (tabIndex === '3') {
         return __.sortBy(arr.filter(item => item.isUserAdd), 'name')
      }
      return __.sortBy(arr, 'name');
   }, [arr, tabIndex])
}