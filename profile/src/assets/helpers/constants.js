export const companyStatus = {
   PROGRESS: 'PROGRESS',
   SUCCESS: 'SUCCESS',
   FAILED: 'FAILED',
   DONE: 'DONE',
   RESET: 'RESET',
}

export const companyStatusText = {
   PROGRESS: 'Спасибо за подтверждение компании. Проверка информации займет до 2 часов. ',
   SUCCESS: 'Ваша компания успешно верифицирована! Заполните информацию о своей компании либо назначьте своего заместителя, чтобы продолжить.',
   FAILED: 'Ваша компания не верифицирована. Проверьте, пожалуйста, корректно ли была заполнена информация о Компании.',
   RESET: 'Ваша компанию будет отправлена на повторную верификацию. Вы уверены, что хотите внести эти изменения?'
}

export const companyAddDeputyText = {
   titleReplace: 'Редактирование Заместителя',
   titleAdd: 'Регистрация Заместителя',
   subTitle: 'Назначьте заместителя, чтобы дать ему доступ к функционалу платформы:'
}
export const addItemsTypes = {
   POSITION: 'tl_dolgnost',
   FUNCTIONALITY: 'tl_task',
   TARGET: 'tl_target',
   KPI: 'tl_kpi',
   RESULT: 'tl_result',
   ZUN: 'tl_zun',
   CASE: 'tl_case',
};
export const removeItemsTypes = {
   FUNCTIONALITY: 'id_task',
   TARGET: 'id_target',
   KPI: 'id_kpi',
   RESULT: 'id_result',
   ZUN: 'id_zun',
   CASE: 'id_case',
}

export const statuses = {
   WARNING: 'warning',
   SUCCESS: 'success',
   ERROR: 'error'
}
