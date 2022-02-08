import React, {useEffect, useState} from 'react';
import {func, number} from 'prop-types';
import {useDispatch, useSelector} from "react-redux";
import {Button, Form, Input, message} from "antd";
import AppText from "@/components/ui/AppText.jsx";
import AppSelect from "@/components/ui/AppSelect.jsx";
import StaticFormModal from "@/components/modals/StaticFormModal.jsx";
import FormAddNewDepartment from "@/components/form/FormAddNewDepartment/FormAddNewDepartment.jsx";
import table_1 from "@img/table-1.svg";
import {getAddressesList} from "@store/actions/addresses-actions";
import {addNewDepartment, getDepartmentInfo, getDepartments, setDepartmentsName} from "@store/actions/departments-actions";
import {getDropDownList} from "@store/actions/dropDownList-actions";
import {setCompanyInfo} from "@assets/helpers/asyncHelpers";
import {resetPositions, setNewPositionsInfo} from "@store/actions/positions-actions";
import {getAddress, resetAddresses} from "@assets/helpers/helpers";
import {resetPositionFunctionality} from "@store/actions/functionality-actions";
import {resetPositionKPI} from "@store/actions/kpi-actions";
import {resetPositionTarget} from "@store/actions/target-actions";
import {resetPositionZun} from "@store/actions/zun-actions";
import {rules} from "@assets/helpers/messages";

FormSetDepartment.propTypes = {
   changeStep: func,
   step: number,
};

function FormSetDepartment({changeStep, step, isGoBack}) {
   const dispatch = useDispatch();
   
   const {
      departments: {loading, list, info, name: departmentName},
      positions: {info: positionsInfo},
      company
   } = useSelector(state => ({
      departments: state.departments,
      positions: state.positions,
      company: state.company.company,
   }));
   const [form] = Form.useForm();
   
   const [visible, setVisible] = useState(false);
   const [isLocked, setIsLocked] = useState(true);
   const [addressesList, setAddressesList] = useState([]);
   
   const handleOnAddDepartments = async values => {
      try {
         await addNewDepartment(values);
         await dispatch(getDropDownList());
         const departments = Array.isArray(company?.tl_lists) ? [...company.tl_lists.map(el => el.name), values.name] : [values.name];
         await setCompanyInfo({tl_lists: departments});
         await dispatch(getDepartments());
         await dispatch(getAddressesList());
      } catch (err) {
         console.error(err)
         message.error(err.message)
      }
   };
   const handleOnSelectPosition = name => {
      if (name !== departmentName) {
         setIsLocked(false);
         dispatch(resetPositions());
         dispatch(resetPositionFunctionality());
         dispatch(resetPositionTarget());
         dispatch(resetPositionKPI());
         dispatch(resetPositionZun());
         dispatch(setDepartmentsName(name));
      }
   };
   const onFinish = () => {
      const values = form.getFieldsValue();
      values.address = resetAddresses(values.address, info.address);
      dispatch(setNewPositionsInfo({...values, s_activity: company.s_activity}));
      changeStep(step + 1);
   };
   
   useEffect(() => {
      if (info) {
         let addresses = [];
         if (Array.isArray(info.address)) {
            addresses = info.address.map(address => getAddress(address));
         } else {
            addresses = info?.address ? [getAddress(info?.address)] : [];
         }
         setAddressesList(addresses);
         form.setFields([
            {name: 'manager_position', value: info?.manager_position && info.manager_position},
            {name: 'manager_surname', value: info?.manager_surname && info.manager_surname},
            {name: 'manager_name', value: info?.manager_name && info.manager_name},
            {name: 'manager_middle_name', value: info?.manager_middle_name && info.manager_middle_name},
            {name: 'address', value: addresses.length ? addresses.map(address => address.name) : []},
         ]);
      }
   }, [info, positionsInfo]);
   
   useEffect(() => {
      if (departmentName) {
         setIsLocked(false);
         dispatch(getDepartmentInfo(departmentName));
         form.setFields([{name: 'department_name', value: departmentName}]);
      }
   }, [departmentName]);
   
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
            name="set-department"
            layout='vertical'
            size='large'
            onFinish={onFinish}
            form={form}
            className='form'
         >
            <AppText text='Общее' style={{
               color: '#20272E',
               fontSize: 18,
               fontWeight: 700,
               marginBottom: 24,
               lineHeight: 1.5715,
               display: 'block'
            }}/>
            {/*Названия отделов / Подразделений / Направлений*/}
            <Form.Item name="department_name" label="Названия отделов / Подразделений / Направлений"
                       rules={[{required: true, message: rules.required}]}>
               <AppSelect
                  placeholder="Финансовый / Front-End / Маркетинг и реклама"
                  options={list || []}
                  isHaveFooter
                  isHaveModal
                  isLoading={loading}
                  modalBtnTxt='Добавить отдел'
                  onSelect={handleOnSelectPosition}
                  changeVisible={() => setVisible(prev => !prev)}
                  onDropdownVisibleChange={async open => open && await dispatch(getDepartments())}
               />
            </Form.Item>
            
            {/*Название должности непосредственного руководителя*/}
            <Form.Item name='manager_position' label='Название должности непосредственного руководителя'>
               <Input disabled={isLocked} className='form__input' placeholder="Директор"/>
            </Form.Item>
            
            {/*Руководитель*/}
            <Form.Item noStyle>
               <div className="form__row">
                  <Form.Item
                     label='Фамилия Руководителя'
                     name='manager_surname'>
                     <Input disabled={isLocked} className='form__input' placeholder="Фамилия"/>
                  </Form.Item>
                  
                  <Form.Item
                     label='Имя Руководителя'
                     name='manager_name'>
                     <Input disabled={isLocked} className='form__input' placeholder="Имя"/>
                  </Form.Item>
                  
                  <Form.Item
                     label='Отчество Руководителя'
                     name='manager_middle_name'>
                     <Input disabled={isLocked} className='form__input' placeholder="Отчество"/>
                  </Form.Item>
               </div>
            </Form.Item>
            
            {/*Адрес Отдела / Подразделения / Направления*/}
            <Form.Item name='address' label='Адрес Отдела / Подразделения / Направления' rules={[{required: !isLocked, message: rules.required}]}>
               <AppSelect disabled={isLocked} options={addressesList} placeholder="Укажите адрес" mode='multiple'/>
            </Form.Item>
            
            <Form.Item>
               <div className={`form__row ${isGoBack ? '_between' : '_right'} `}>
                  {isGoBack && (
                     <Button type="default" htmlType="button" shape="round" onClick={() => changeStep(step - 1)}>
                        Назад
                     </Button>
                  )}
                  <Button type="primary" shape="round" htmlType="submit">
                     Сохранить и продолжить
                  </Button>
               </div>
            </Form.Item>
         </Form>
      </>
   
   );
}

export default FormSetDepartment;