import React, {useEffect} from 'react';
import {func, number} from 'prop-types';
import {Button, Form} from "antd";
import {checkFormValues, getCurrentValues} from "@assets/helpers/helpers";
import AppText from "@/components/ui/AppText.jsx";
import AppSelect from "@/components/ui/AppSelect.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useAddItemToDropDownList} from "@/hooks/useAddItemToDropDownList";
import {setNewPositionsInfo} from "@store/actions/positions-actions";

FormSetPositionPersonalInformation.propTypes = {
   changeStep: func,
   step: number,
};

function FormSetPositionPersonalInformation({changeStep, step}) {
   const [form] = Form.useForm();
   
   const dispatch = useDispatch();
   const {lists, positions: {info}} = useSelector(state => ({
      lists: state.dropDownList.lists,
      positions: state.positions,
   }));
   
   const addItemToDropDownList = useAddItemToDropDownList();
   
   const selectOption = [{id: 0, name: 'Нет'}, {id: 1, name: 'Да'}]
   
   const onFinish = async () => {
      const values = checkFormValues(form.getFieldsValue());
      values.hobbies = getCurrentValues(values.hobbies, lists.s_hobbies);
      values.personal_qualities = getCurrentValues(values.personal_qualities, lists.s_personal_qualities);
      try {
         dispatch(setNewPositionsInfo(values))
         changeStep(step + 1)
      } catch (err) {
         console.error(err);
         throw err;
      }
   }
   useEffect(() => {
      if (info) {
         const {hobbies, military_service, personal_qualities} = info;
         form.setFields([
            {name: 'military_service', value: military_service ? military_service : null},
            {name: 'hobbies', value: hobbies?.length ? hobbies.map(({name}) => name) : []},
            {name: 'personal_qualities', value: personal_qualities?.length ? personal_qualities.map(({name}) => name) : []},
         ])
      }
   }, [info]);
   
   return (
      <Form
         name="set-position-personal_info"
         layout='vertical'
         size='large'
         onFinish={onFinish}
         form={form}
         className='form'>
         <AppText text='Личная информация'
                  style={{color: '#20272E', fontSize: 18, fontWeight: 700, marginBottom: 24, lineHeight: 1.5715, display: 'block'}}/>
         
         <Form.Item label='Военная служба' name='military_service'>
            <AppSelect options={selectOption} placeholder="Выберите из списка"/>
         </Form.Item>
         
         <Form.Item label='Увлечения, хобби' name='hobbies'>
            <AppSelect options={lists?.s_hobbies} placeholder="Напишите или выберите из списка" isHaveFooter mode='multiple'
                       onSubmit={async name => await addItemToDropDownList('s_hobbies', name)}/>
         </Form.Item>
         
         <Form.Item label='Личные качества' name='personal_qualities'>
            <AppSelect options={lists?.s_personal_qualities} placeholder="Напишите или выберите из списка" mode='multiple' isHaveFooter
                       onSubmit={async name => await addItemToDropDownList('s_personal_qualities', name)}/>
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
   );
}

export default FormSetPositionPersonalInformation;