import {useDispatch, useSelector} from "react-redux";
import {getUser} from "@store/actions/user-actions";
import {getDropDownList} from "@store/actions/dropDownList-actions";
import {getCompanyInfoAction} from "@store/actions/company-actions";
import useAppReset from "@/hooks/useAppReset";
import {useEffect} from "react";
import {message} from "antd";

function useAppStart() {
   const resetApp = useAppReset();
   const dispatch = useDispatch();
   const {
      userError,
      companyError,
      auth: {error: authError}
   } = useSelector(state => ({
      userError: state.user.error,
      companyError: state.company.error,
      dropDownListError: state.dropDownList.error,
      auth: state.auth
   }))
   
   
   useEffect(() => {
      if (authError || userError || companyError) {
         
         resetApp()
      }
   }, [authError, userError, companyError,]);
   
   return async () => {
      try {
         await dispatch(getUser());
         await dispatch(getDropDownList());
         await dispatch(getCompanyInfoAction());
      } catch (e) {
         message.error(e.message)
      }
   };
}

export default useAppStart;