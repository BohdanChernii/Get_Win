import {addDropDownList, getDropDownList} from "@store/actions/dropDownList-actions";
import {message} from "antd";
import {useDispatch} from "react-redux";

export const useAddItemToDropDownList = () => {
   const dispatch = useDispatch();
   
   return async (listName, name) => {
      if (listName && name) {
         try {
            await addDropDownList(listName, name)
            await dispatch(getDropDownList())
         } catch (e) {
            console.error(e)
            message.error(e.message)
         }
      } else {
         message.warn('Ошибка!')
      }
   }
}
