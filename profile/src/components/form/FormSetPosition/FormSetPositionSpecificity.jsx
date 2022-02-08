import React, {useEffect, useState} from 'react';
import {func, number} from 'prop-types';
import {Button, Form, Input, message, Switch} from "antd";
import {checkFormValues, getCurrentValues} from "@assets/helpers/helpers";
import AppText from "@/components/ui/AppText.jsx";
import AppSelect from "@/components/ui/AppSelect.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useAddItemToDropDownList} from "@/hooks/useAddItemToDropDownList";
import {setNewPositionsInfo} from "@store/actions/positions-actions";

FormSetPositionSpecificity.propTypes = {
   changeStep: func,
   step: number,
};

function FormSetPositionSpecificity({changeStep, step}) {
   const [form] = Form.useForm();
   const dispatch = useDispatch();
   const {lists, positions: {info}} = useSelector(state => ({
      positions: state.positions,
      lists: state.dropDownList.lists,
   }))
   const addItemToDropDownList = useAddItemToDropDownList()
   
   const [isSwitch, setIsSwitch] = useState(true);
   const handleOnChangeSwitch = () => setIsSwitch(!isSwitch);
   
   const onFinish = async () => {
      const values = checkFormValues(form.getFieldsValue());
      values.compensation_package = getCurrentValues(values.compensation_package, lists.s_compensation_package);
      values.dress_code = getCurrentValues(values.dress_code, lists.s_dress);
      values.work_process = getCurrentValues(values.work_process, lists.s_work_specifics);
      values.work_place = getCurrentValues(values.work_place, lists.s_specificity_workplace);
      values.customer_communications = getCurrentValues(values.customer_communications, lists.s_specificity_communication);
      values.supervisor_communications = getCurrentValues(values.supervisor_communications, lists.s_manager_specificity_communication);
      try {
         dispatch(setNewPositionsInfo(values))
         changeStep(step + 1);
      } catch (err) {
         message.error(err.message);
         throw err
      }
   }
   useEffect(() => {
      if (info) {
         const {
            compensation_package, customer_communications, dress_code, opportunities, supervisor_communications, work_place, work_process, missions
         } = info
         form.setFields([
            {name: 'compensation_package', value: compensation_package?.length ? compensation_package.map(({name}) => name) : []},
            {name: 'opportunities', value: opportunities ? opportunities : null},
            {name: 'customer_communications', value: customer_communications?.name ? customer_communications.name : null},
            {name: 'dress_code', value: dress_code?.name ? dress_code.name : null},
            {name: 'supervisor_communications', value: supervisor_communications?.name ? supervisor_communications.name : null},
            {name: 'work_place', value: work_place?.name ? work_place.name : null},
            {name: 'work_process', value: work_process?.name ? work_process.name : null},
            {name: 'missions', value: missions ? missions : null},
         ])
      }
   }, [info]);
   return (
      <Form
         name="set-position-specificity"
         layout='vertical'
         size='large'
         onFinish={onFinish}
         form={form}
         className='form'>
         <AppText text='Специфика должности'
                  style={{color: '#20272E', fontSize: 18, fontWeight: 700, marginBottom: 24, lineHeight: 1.5715, display: 'block'}}/>
         
         <Form.Item className='form__container' label='Компенсационный пакет' name='compensation_package'>
            <AppSelect options={lists?.s_compensation_package} placeholder='Напишите или выберите из списка' mode="multiple"
                       isHaveFooter
                       onSubmit={async name => await addItemToDropDownList('s_compensation_package', name)}/>
         </Form.Item>
         
         <Form.Item label="Командировки">
            <div className="form__row">
               <Switch defaultChecked style={{width: 80}} onChange={handleOnChangeSwitch} checkedChildren='Да' unCheckedChildren='Нет'/>
               <Form.Item name="missions" noStyle>
                  <Input disabled={!isSwitch} className='form__input' placeholder="Заметки"/>
               </Form.Item>
            </div>
         </Form.Item>
         
         <Form.Item className='form__container' label='Дресс-код' name='dress_code'>
            <AppSelect options={lists?.s_dress} placeholder='Напишите или выберите из списка'/>
         </Form.Item>
         
         <Form.Item className='form__container' label='Специфика рабочего процесса' name='work_process'>
            <AppSelect options={lists?.s_work_specifics} placeholder='Напишите или выберите из списка' isHaveFooter
                       onSubmit={async name => await addItemToDropDownList('s_work_specifics', name)}/>
         </Form.Item>
         
         <Form.Item className='form__container' label='Специфика рабочего места' name='work_place'>
            <AppSelect options={lists?.s_specificity_workplace} placeholder='Напишите или выберите из списка' isHaveFooter
                       onSubmit={async name => await addItemToDropDownList('s_specificity_workplace', name)}/>
         </Form.Item>
         
         <Form.Item className='form__container' label='Специфика коммуникации с клиентами' name='customer_communications'>
            <AppSelect options={lists?.s_specificity_communication} placeholder='Напишите или выберите из списка' isHaveFooter
                       onSubmit={async name => await addItemToDropDownList('s_specificity_communication', name)}/>
         </Form.Item>
         
         <Form.Item className='form__container' label='Специфика коммуникации с руководителем' name='supervisor_communications'>
            <AppSelect options={lists?.s_manager_specificity_communication} placeholder='Напишите или выберите из списка' isHaveFooter
                       onSubmit={async name => await addItemToDropDownList('s_manager_specificity_communication', name)}/>
         </Form.Item>
         
         <Form.Item className='form__container'>
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
   );
}

export default FormSetPositionSpecificity;