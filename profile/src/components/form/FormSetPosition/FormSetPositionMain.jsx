import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {func, number} from 'prop-types';
import {Button, Col, Form, Input, message, Row} from "antd";
import AppText from "@/components/ui/AppText.jsx";
import {getAddress, getCurrentValues, resetAddresses} from "@assets/helpers/helpers";
import AppSelect from "@/components/ui/AppSelect.jsx";
import FormAddButton from "@/components/components/FormAddButton/FormAddButton.jsx";
import PositionFunctionalityModal from "@/components/modals/PositionFunctionalityModal/PositionFunctionalityModal.jsx";
import PositionDetailsList from "@/components/components/PositionDetailsList/PositionDetailsList.jsx";
import {initPositionFunctionality} from "@store/actions/functionality-actions";
import usePositionFunctionality from "@/hooks/usePositionFunctionality";
import {addNewPosition, addNewPositionItem, removePositionItem} from "@assets/helpers/asyncHelpers";
import {createPositionsList, setNewPositionsInfo, setSelectPositionId} from "@store/actions/positions-actions";
import {addItemsTypes, removeItemsTypes} from "@assets/helpers/constants";
import {positionErrorsMsg, rules} from "@assets/helpers/messages";
import moment from "moment";
import AppTimePicker from "@/components/ui/AppTimePicker.jsx";


FormSetPositionMain.propTypes = {
   changeStep: func,
   step: number,
};

function FormSetPositionMain({changeStep, step}) {
   const [form] = Form.useForm();
   
   const dispatch = useDispatch()
   const {
      dropDownList,
      functionality: {categories: functionalityList},
      positions: {loading: positionsLoading, list: positionsList, id: positionsId, info},
   } = useSelector(state => ({
      dropDownList: state.dropDownList.lists,
      functionality: state.functionality,
      positions: state.positions,
   }));
   
   const [addressesList, setAddressesList] = useState([]);
   
   const selectOption = [{id: 0, name: 'Нет'}, {id: 1, name: 'Да'}];
   // subordinatesNumber
   const [isSubordinates, setIsSubordinates] = useState(false);
   const changeSubordinates = name => {
      if (name === 'Да') {
         setIsSubordinates(true)
      } else {
         form.resetFields(['subordinates_number'])
         setIsSubordinates(false)
      }
   }
   
   // select
   const [isSelectVacancy, setIsSelectVacancy] = useState(false);
   
   // modals
   const [visible, setVisible] = useState(false);
   
   // functionality
   const [userFunctionalityList, setUserFunctionalityList] = useState([]);
   const handleOnClearFunctionalityList = id => {
      setUserFunctionalityList(prev => prev.filter(item => item.id !== id))
   }
   
   // position
   const [positionName, setPositionName] = useState('');
   const createPositions = async open => {
      if (open && !positionsList) {
         try {
            await dispatch(createPositionsList())
         } catch (err) {
            console.error(err)
            message.error(err.message)
         }
      }
   }
   const handleOnAddPosition = async (name) => {
      try {
         await addNewPosition(name);
         await dispatch(createPositionsList())
      } catch (err) {
         console.error(err)
         message.error(err.message)
      }
   }
   
   // category
   const positionFunctionality = usePositionFunctionality(positionsId, functionalityList);
   const handleOnAddItem = async (name) => {
      try {
         await addNewPositionItem(name, addItemsTypes.FUNCTIONALITY);
         await dispatch(initPositionFunctionality())
      } catch (err) {
         console.error(err)
         message.error({content: err.message})
      }
   };
   const handleOnRemoveItem = async id => {
      try {
         await removePositionItem(id, addItemsTypes.FUNCTIONALITY, removeItemsTypes.FUNCTIONALITY);
         await dispatch(initPositionFunctionality())
      } catch (err) {
         console.error(err)
         message.error({content: err.message})
      }
   };
   // Finish
   const onFinish = async () => {
      if (userFunctionalityList.length === 0) {
         return message.warn(positionErrorsMsg.FUNCTIONALITY);
      }
      const values = form.getFieldsValue();
      values.level = getCurrentValues(values.level, dropDownList.s_job_levels);
      values.employment_type = getCurrentValues(values.employment_type, dropDownList.s_employment_type);
      values.functionality = userFunctionalityList;
      values.address_vacancy = resetAddresses(values.address_vacancy, info.address)
      if (values.work_time_from || values.work_time_to) {
         values.work_time = {
            from: values.work_time_from ? moment(values.work_time_from).format('HH:mm') : null,
            to: values.work_time_to ? moment(values.work_time_to).format('HH:mm') : null,
         }
      }
      
      if (values.salary_from || values.salary_to) {
         values.salary = {from: values.salary_from, to: values.salary_to,}
      }
      delete values.work_time_from
      delete values.work_time_to
      delete values.salary_from
      delete values.salary_to
      
      try {
         dispatch(setNewPositionsInfo(values))
         changeStep(step + 1)
      } catch (err) {
         message.error(err.message)
         throw err
      }
   };
   
   useEffect(() => {
      !functionalityList && isSelectVacancy && dispatch(initPositionFunctionality());
   }, [isSelectVacancy]);
   
   useEffect(() => {
      const start = async () => {
         if (positionName) {
            setIsSelectVacancy(true);
            if (!positionsList) {
               try {
                  await dispatch(createPositionsList());
               } catch (err) {
                  console.error(err);
                  message.error(err.message);
               }
            } else {
               const id = positionsList.find(el => el.name === positionName).id;
               dispatch(setSelectPositionId(id.toString()));
            }
         }
      }
      start()
   }, [positionName, positionsList]);
   useEffect(() => {
      if (info) {
         (info)
         const {
            name, functionality, address_vacancy, employment_type, level, salary, subordinates_number, work_time, subordinates_type, address
         }
            = info
         if (Array.isArray(address)) {
            const departmentAddresses = address.map(address => getAddress(address));
            setAddressesList(departmentAddresses)
         }
         let addressVacancy = [];
         if (Array.isArray(address_vacancy)) {
            addressVacancy = address_vacancy.map(address => getAddress(address)).map(address => address.name);
         }
         if (info.name) {
            setIsSelectVacancy(true)
            setPositionName(name)
         }
         if (functionality) {
            setUserFunctionalityList(functionality)
         }
         if (subordinates_number) {
            setIsSubordinates(true)
         }
         const time = {
            from: {
               hour: work_time?.from ? work_time.from.split(':')[0] : '',
               minutes: work_time?.from ? work_time.from.split(':')[1] : '',
            },
            to: {
               hour: work_time?.to ? work_time.to.split(':')[0] : '',
               minutes: work_time?.to ? work_time.to.split(':')[1] : '',
            }
         }
         
         form.setFields([
            {name: 'name', value: name ? name : null},
            {name: 'address_vacancy', value: addressVacancy},
            {name: 'employment_type', value: employment_type?.name ? employment_type?.name : null},
            {name: 'level', value: level?.name ? level?.name : null},
            {name: 'salary_from', value: salary?.from ? salary.from : null},
            {name: 'salary_to', value: salary?.to ? salary.to : null},
            {name: 'subordinates_number', value: subordinates_number ? subordinates_number : null},
            {name: 'subordinates_type', value: subordinates_type ? subordinates_type : null},
            {name: 'work_time_from', value: work_time?.from ? moment().hour(+time.from.hour).minutes(+time.from.minutes) : null},
            {name: 'work_time_to', value: work_time?.to ? moment().hour(+time.to.hour).minutes(+time.to.minutes) : null},
         ])
      }
   }, [info]);
   useEffect(() => {
      if (!visible && positionName) {
         const id = positionsList.find(el => el.name === positionName).id;
         dispatch(setSelectPositionId(id.toString()));
      }
   }, [visible])
   return (
      <>
         <PositionFunctionalityModal
            title='Функционал'
            visible={visible}
            changeVisible={setVisible}
            userSelectedList={userFunctionalityList}
            changeUserSelectedList={setUserFunctionalityList}
            positionsId={positionsId}
            setPositionId={id => dispatch(setSelectPositionId(id.toString()))}
            positionData={positionFunctionality}
            
            addItem={handleOnAddItem}
            removeItem={handleOnRemoveItem}
         />
         <Form name="set-position-main" layout='vertical' size='large' onFinish={onFinish} form={form} className='form'
               initialValues={{
                  subordinates_type: 'Нет'
               }}>
            <AppText text='Основное'
                     style={{
                        color: '#20272E',
                        fontSize: 18,
                        fontWeight: 700,
                        marginBottom: 24,
                        lineHeight: 1.5715,
                        display: 'block'
                     }}/>
            
            <Form.Item noStyle>
               <Row wrap={false} gutter={[24, 0]}>
                  <Col span={14}>
                     <Form.Item rules={[{required: true, message: rules.required}]}
                                label='Название должности'
                                name='name'
                                style={{flex: '1 1 auto'}}>
                        <AppSelect
                           allowClear={false}
                           placeholder='Напишите или выберите из списка'
                           options={positionsList ? positionsList : []}
                           isHaveFooter
                           isLoading={positionsLoading}
                           onChange={setPositionName}
                           onSubmit={handleOnAddPosition}
                           changeVisible={() => setVisible(prev => !prev)}
                           onDropdownVisibleChange={createPositions}
                        />
                     </Form.Item>
                  </Col>
                  
                  <Col span={10}>
                     <Form.Item rules={[{required: isSelectVacancy, message: rules.required}]}
                                label='Уровень должности' name='level'>
                        <AppSelect disabled={!isSelectVacancy}
                                   dropdownMatchSelectWidth={false}
                                   options={dropDownList?.s_job_levels}
                                   placeholder='Напишите или выберите из списка'/>
                     </Form.Item>
                  </Col>
               </Row>
            </Form.Item>
            
            {/*Функционал*/}
            <Form.Item label='Функционал' required={isSelectVacancy}>
               <Form.Item noStyle name="functionality">
                  <FormAddButton extraClasses={`_card ${!isSelectVacancy ? 'disabled' : ''}`}
                                 onClick={() => isSelectVacancy && setVisible(!visible)}
                                 text='Добавить функционал'/>
               </Form.Item>
               <Form.Item noStyle>
                  <PositionDetailsList details={userFunctionalityList} clearDetails={handleOnClearFunctionalityList} modalTitle='Функционал'/>
               </Form.Item>
            </Form.Item>
            
            <Form.Item noStyle>
               <Row wrap={false} gutter={[24, 0]}>
                  <Col span={14}>
                     <Form.Item label='Подчиненные' name='subordinates_type'
                                rules={[{required: isSelectVacancy, message: rules.required}]}>
                        <AppSelect disabled={!isSelectVacancy} options={selectOption}
                                   onChange={name => changeSubordinates(name)}
                                   placeholder='Напишите или выберите из списка'
                        />
                     </Form.Item>
                  </Col>
                  <Col span={10}>
                     <Form.Item label='Количество' name='subordinates_number'>
                        <Input disabled={!isSelectVacancy || !isSubordinates} type='number' className='form__input' placeholder="Укажите количество"/>
                     </Form.Item>
                  </Col>
               </Row>
            </Form.Item>
            
            {/*Адрес месторасположения должности*/}
            <Form.Item label='Адрес месторасположения должности' name='address_vacancy'
                       rules={[{required: isSelectVacancy, message: rules.required}]}>
               <AppSelect disabled={!isSelectVacancy} options={addressesList} placeholder='Напишите или выберите из списка' mode='multiple'/>
            </Form.Item>
            
            {/*Вид занятости*/}
            <Form.Item rules={[{required: isSelectVacancy, message: rules.required}]}
                       label='Вид занятости' name='employment_type'>
               <AppSelect disabled={!isSelectVacancy} options={dropDownList?.s_employment_type} placeholder='Напишите или выберите из списка'/>
            </Form.Item>
            
            {/*График работы*/}
            <Form.Item label="График работы" required={isSelectVacancy} style={{marginBottom: 0}}>
               <Row wrap={false} gutter={[24, 0]}>
                  <Col span={12}>
                     <Form.Item name='work_time_from' rules={[{required: isSelectVacancy, message: rules.required}]}>
                        <AppTimePicker disabled={!isSelectVacancy} placeholder='09:00'
                                       onSelect={(value) => form.setFields([{name: 'work_time_from', value, errors: []}])}
                                       isHideOkButton/>
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <Form.Item name='work_time_to' rules={[{required: isSelectVacancy, message: rules.required}]}>
                        <AppTimePicker disabled={!isSelectVacancy} placeholder='18:00'
                                       onSelect={(value) => form.setFields([{name: 'work_time_to', value, errors: []}])}
                                       isHideOkButton/>
                     </Form.Item>
                  </Col>
               </Row>
            </Form.Item>
            
            {/*Заработная плата*/}
            <Form.Item label="Заработная плата" required={isSelectVacancy}>
               <Row wrap={false} gutter={[24, 0]}>
                  <Col span={12}>
                     <Form.Item name='salary_from' rules={[{required: isSelectVacancy, message: rules.required}]}>
                        <Input type='number'
                               placeholder="От"
                               className='form__input'
                               disabled={!isSelectVacancy}
                        />
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <Form.Item name='salary_to' rules={[{required: isSelectVacancy, message: rules.required}]}>
                        <Input type='number'
                               placeholder="До"
                               className='form__input'
                               disabled={!isSelectVacancy}
                        />
                     </Form.Item>
                  </Col>
               </Row>
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

export default FormSetPositionMain;