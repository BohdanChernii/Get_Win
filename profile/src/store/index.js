import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from "redux-thunk";
import {authReducer} from "@store/reducers/auth-reducer";
import {composeWithDevTools} from "redux-devtools-extension";
import {userReducer} from "@store/reducers/user-reducer";
import {resetPassReducer} from "@store/reducers/reset-pass-reducer";
import {vacanciesReducer} from "@store/reducers/vacancies-reducer";
import {dropDownListReducer} from "@store/reducers/dropDownLists-reducer";
import {companyReducer} from "@store/reducers/company-reducer";
import {globalReducer} from "@store/reducers/global-reducer";
import {functionalityReducer} from "@store/reducers/functionality-reducer";
import {departmentsReducer} from "@store/reducers/departments-reducer";
import {positionsListReducer} from "@store/reducers/positions-reducer";
import {addressesReducer} from "@store/reducers/addresses-reducer";
import {KPIReducer} from "@store/reducers/kpi-reducer";
import {resultReducer} from "@store/reducers/result-reducer";
import {zunReducer} from "@store/reducers/zun-reducer";
import {targetReducer} from "@store/reducers/target-reducer";
import {candidatesReducer} from "@store/reducers/candidates-reducer";
import {tasksReducer} from "@store/reducers/tasks-reducer";
import {deputyReducer} from "@store/reducers/deputy-reducer";

const rootReducer = combineReducers({
   global: globalReducer,
   dropDownList: dropDownListReducer,
   auth: authReducer,
   resetPass: resetPassReducer,
   user: userReducer,
   deputy: deputyReducer,
   vacancies: vacanciesReducer,
   company: companyReducer,
   addresses: addressesReducer,
   departments: departmentsReducer,
   positions: positionsListReducer,
   functionality: functionalityReducer,
   kpi: KPIReducer,
   result: resultReducer,
   zun: zunReducer,
   target: targetReducer,
   candidates: candidatesReducer,
   tasks: tasksReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));