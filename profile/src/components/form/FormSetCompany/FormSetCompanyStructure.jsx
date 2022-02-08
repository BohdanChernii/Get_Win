import React, {useEffect, useState} from 'react';
import {func, number} from 'prop-types';
import {useDispatch, useSelector} from "react-redux";
import {Button, Form, Input, message} from "antd";
import AppText from "@/components/ui/AppText.jsx";
import AppSelect from "@/components/ui/AppSelect.jsx";
import {setCompanyInfo} from "@assets/helpers/asyncHelpers";
import FormAddNewDepartment from "@/components/form/FormAddNewDepartment/FormAddNewDepartment.jsx";
import table_1 from "@img/table-1.svg";
import StaticFormModal from "@/components/modals/StaticFormModal.jsx";
import {getDropDownList} from "@store/actions/dropDownList-actions";
import {addNewDepartment} from "@store/actions/departments-actions";
import {getCompanyInfoAction} from "@store/actions/company-actions";
import {rules} from "@assets/helpers/messages";

FormSetCompanyStructure.propTypes = {
   changeStep: func,
   step: number,
};

function FormSetCompanyStructure({changeStep, step}) {
   
   const dispatch = useDispatch();
   
   const {lists, company} = useSelector(state => ({
      lists: state.dropDownList.lists,
      company: state.company.company
   }))
   const [form] = Form.useForm();
   const [visible, setVisible] = useState(false);
   
   const onFinish = async () => {
      const key = 'set-company-structure'
      const formValues = form.getFieldsValue();
      message.loading({content: 'Загрузка', key});
      try {
         const json = await setCompanyInfo(formValues);
         if (json.ok) {
            message.success({content: 'Структура компании обновлена', key});
            await dispatch(getCompanyInfoAction());
            changeStep(step + 1)
         } else {
            message.error({content: 'Ошибка', key})
         }
      } catch (e) {
         message.error({content: e.message, key})
      }
   }
   const handleOnAddDepartments = async values => {
      try {
         await addNewDepartment(values);
         await dispatch(getDropDownList());
         const formValues = form.getFieldsValue();
         const departments = Array.isArray(formValues?.tl_lists) ? [...formValues.tl_lists, values.name] : [values.name];
         form.setFields([{name: 'tl_lists', value: departments}]);
      } catch (err) {
         console.error(err)
         message.error(err)
      }
   }
   
   useEffect(() => {
      if (company) {
         form.setFields([
            {name: 's_workers', value: company?.s_workers?.name},
            {name: 's_organizational_structure', value: company?.s_organizational_structure?.name},
            {name: 'manager_surname', value: company?.manager_surname},
            {name: 'manager_first_name', value: company?.manager_first_name},
            {name: 'manager_middle_name', value: company?.manager_middle_name},
            {name: 'tl_lists', value: company?.tl_lists?.map(item => item.name)},
         ])
      }
   }, [company]);
   
   return (
      <>
         <StaticFormModal visible={visible}
                          changeVisible={setVisible}
                          title='Новый отдел'
                          text='Заполните информацию об отделе'
                          component={<FormAddNewDepartment changeVisible={() => setVisible(!visible)} onSubmit={handleOnAddDepartments}/>}
                          img={table_1}
                          onSubmit={() => setVisible(false)}
         />
         <Form
            name="set-company-structure"
            layout='vertical'
            size='large'
            onFinish={onFinish}
            form={form}
            className='form'
         >
            <AppText text='Структура' style={{
               color: '#20272E',
               fontSize: 18,
               fontWeight: 700,
               marginBottom: 24,
               lineHeight: 1.5715,
               display: 'block'
            }}/>
            
            <Form.Item noStyle>
               <div className="form__row">
                  <Form.Item
                     label='Фамилия Директора'
                     name='manager_surname'
                     rules={[{required: true, message: 'Введите Фамилию!'}]}>
                     <Input className='form__input' placeholder="Фамилия"/>
                  </Form.Item>
                  
                  <Form.Item
                     label='Имя Директора'
                     name='manager_first_name'
                     rules={[{required: true, message: 'Введите Имя!'}]}>
                     <Input className='form__input' placeholder="Имя"/>
                  </Form.Item>
                  
                  <Form.Item label='Отчество Директора' name='manager_middle_name'>
                     <Input className='form__input' placeholder="Отчество"/>
                  </Form.Item>
               </div>
            
            </Form.Item>
            
            <Form.Item rules={[{required: true, message: rules.required}]} name="s_workers" label="Количество сотрудников в компании">
               <AppSelect options={lists?.s_workers} placeholder="Количество сотрудников"/>
            </Form.Item>
            
            <Form.Item rules={[{required: true, message: rules.required}]} name="tl_lists"
                       label="Названия отделов / Подразделений / Направлений"
            >
               <AppSelect
                  mode='multiple'
                  placeholder="Финансовый / Front-End / Маркетинг и реклама"
                  options={lists?.tl_lists}
                  isHaveFooter
                  isHaveModal
                  modalBtnTxt='Добавить отдел'
                  changeVisible={() => setVisible(prev => !prev)}
               />
            </Form.Item>
            
            <Form.Item rules={[{required: true, message: rules.required}]} name="s_organizational_structure"
                       label="Организационная структура">
               <AppSelect options={lists?.s_organizational_structure} placeholder="Холакратия"/>
            </Form.Item>
            
            <Form.Item>
               <div className='form__row _between'>
                  <Button type="default" htmlType="button" shape="round" onClick={() => changeStep(step - 1)}>
                     Назад
                  </Button>
                  <Button type="primary" shape="round" htmlType="submit">
                     Сохранить и продолжить
                  </Button>
               </div>
            </Form.Item>
         
         </Form>
      </>
   
   );
}

export default FormSetCompanyStructure;