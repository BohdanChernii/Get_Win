import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {resetAuth} from "@store/actions/auth-actions";
import {deleteUser} from "@store/actions/user-actions";
import {resetCompany} from "@store/actions/company-actions";
import {resetDropDownList} from "@store/actions/dropDownList-actions";
import {clearInfoResetPass} from "@store/actions/reset-pass-actions";

const useAppReset = () => {
   const history = useHistory();
   const dispatch = useDispatch();
   
   return () => {
      localStorage.clear();
      dispatch(clearInfoResetPass());
      dispatch(resetAuth());
      dispatch(deleteUser());
      dispatch(resetCompany());
      dispatch(resetDropDownList());
      history.push('/');
   }
}

export default useAppReset;