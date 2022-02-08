const domain = 'https://prof.world/api';
export const stepApi = {
   set_step: `${domain}/set_step/`,
};

export const fileApi = {
   // додання файла - збереження на сервері
   add_file: `${domain}/add_file/`,
   
   // видалення файла на сервері
   del_file: `${domain}/del_file/`,
   
   // створеняня PDF файла
   create_file: `${domain}/create_pdf/`,
};
export const authApi = {
   // логування
   login: `${domain}/login`,
   
   // реістрація
   reg_user: `${domain}/reg_user`,
};

export const resetPassApi = {
   // перевірка наявності email-a
   email_verify: `${domain}/recovery_pawssd_email_verify`,
   
   // відновлення пароля
   pawssd_reset: `${domain}/recovery_pawssd_reset`,
};

export const userApi = {
   // отримання інформації про користувача
   get_user_info: `${domain}/get_user_info`,
}

export const companyApi = {
   // створення нової компанії
   create_company: `${domain}/create_company/`,
   
   // додання адміна до нової компанії
   add_company_admin: `${domain}/add_company_admin/`,
   
   // додання інформаціх про компанію
   set_company_info: `${domain}/set_company_info/`,
   
   // отримання інформації про компанію
   get_company_info: `${domain}/get_company_info/`,
   
   // додання замісників
   add_company_deputy: `${domain}/add_company_deputy/`,
   
   // отримання замісників
   get_company_deputy: `${domain}/get_company_deputy/`,
   
   // отримання адресів компанії
   get_list_company_address: `${domain}/get_list_company_address/`,
   
   // add_company_info: `${domain}/add_company_info/`,
   // set_company_structure: `${domain}/set_company_structure/`,
   // set_company_contacts: `${domain}/set_company_contacts/`,
   // set_company_management: `${domain}/set_company_management/`,
   // set_company_mission: `${domain}/set_company_mission/`,
};

export const dropDownListApi = {
   // отримання списків
   get_lists_create_company: `${domain}/get_lists_create_company/`,
   
   // додання свого заначення до списків
   add_field_table: `${domain}/add_field_table/`,
   
   // отримання списка ваканцій
   get_list_vacancy: `${domain}/get_list_vacancy/`,
   
   // отримання списка унівриситетів
   get_university: `${domain}/get_uniwersytet/`,
   
   // отримання списка міст
   get_list_cities: `${domain}/get_list_cities/`,
   
   // отримання списка вулиць
   get_list_street: `${domain}/get_list_street/`,
};

export const departmentsApi = {
   // отримання списка відділів
   get_list_departments: `${domain}/get_list_departments/`,
   
   // отримання інформації про відділ
   get_info_department: `${domain}/get_info_department/`,
   
   // створення нового відділа
   add_new_department: `${domain}/add_new_department/`,
   
   // перевірка відділів (навність адресів)
   check_departments_adresses: `${domain}/check_departments_adresses/`,
};

export const positionsApi = {
   // отримання інформації про позицію (ваканцію)
   add_new_position: `${domain}/add_new_position/`,
   
   // сворення нової позиції (ваканції - заявки)
   add_application_info: `${domain}/add_application_info/`,
   
   // отримання списка всіх позицій
   get_list_all_position: `${domain}/get_list_all_position/`,
};

export const functionalityApi = {
   // отримання списка
   getFunctionality: `${domain}/get_list_func/`,
   
   // додання свого значуння до списка
   addFunctionality: `${domain}/add_new_func/`,
   
   // видалення свого значуння зі списка
   removeFunctionality: `${domain}/remove_func/`,
};

export const targetsApi = {
   // отримання списка
   getTargets: `${domain}/get_list_targets/`,
   
   // додання свого значуння до списка
   addTarget: `${domain}/add_new_target/`,
   
   // видалення свого значуння зі списка
   removeTarget: `${domain}/remove_target/`,
};

export const resultApi = {
   // отримання списка
   getResults: `${domain}/get_list_result/`,
   
   // додання свого значуння до списка
   addResult: `${domain}/add_new_result/`,
   
   // видалення свого значуння зі списка
   removeResult: `${domain}/remove_result/`,
};

export const kpiApi = {
   // отримання списка
   getKpis: `${domain}/get_list_kpi/`,
   
   // додання свого значуння до списка
   addKpi: `${domain}/add_new_kpi/`,
   
   // видалення свого значуння зі списка
   removeKpi: `${domain}/remove_kpi/`,
};

export const zunApi = {
   // отримання списка
   getZun: `${domain}/get_list_zun/`,
   
   // додання свого значуння до списка
   addZun: `${domain}/add_new_zun/`,
   
   // видалення свого значуння зі списка
   removeZun: `${domain}/remove_zun/`,
};

export const caseApi = {
   // отримання списка
   getCase: `${domain}/get_list_cases/`,
   
   // додання свого значуння до списка
   addCase: `${domain}/add_new_case/`,
   
   // видалення свого значуння зі списка
   removeCase: `${domain}/remove_case/`,
};

export const testingApi = {
   // отримання списка
   get_list_items: `${domain}/get_list_items/`,
};

