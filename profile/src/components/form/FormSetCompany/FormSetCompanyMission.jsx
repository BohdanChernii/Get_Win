import React, {useEffect} from 'react';
import {func, number} from 'prop-types';
import {useSelector} from "react-redux";
import {Button, Form, Input, message} from "antd";
import AppText from "@/components/ui/AppText.jsx";
import AppSelect from "@/components/ui/AppSelect.jsx";
import {setCompanyInfo} from "@assets/helpers/asyncHelpers";
import {useAddItemToDropDownList} from "@/hooks/useAddItemToDropDownList";
import {checkAllDepartments} from "@store/actions/departments-actions";

FormSetCompanyMission.propTypes = {
   changeStep: func,
   step: number,
};

function FormSetCompanyMission({changeStep, step}) {
   const {lists, company} = useSelector(state => ({
      lists: state.dropDownList.lists,
      company: state.company.company
   }));
   const [form] = Form.useForm();
   const addItemToDropDownList = useAddItemToDropDownList();
   const onFinish = async () => {
      const formValue = form.getFieldsValue();
      try {
         const json = await setCompanyInfo(formValue);
         if (json.ok) {
            await checkAllDepartments()
            changeStep(step + 1);
         } else {
            message.error({content: 'Ошибка'});
         }
      } catch (e) {
         message.error({content: e.message})
      }
   }
   
   useEffect(() => {
      if (company) {
         form.setFields([
            {name: 'mission', value: company?.mission},
            {name: 's_values', value: company?.s_values?.map(item => item.name)},
            {name: 's_competence', value: company?.s_competence?.map(item => item.name)},
         ])
      }
   }, [company]);
   return (
      <Form
         name="set-company-mission"
         initialValues={{
            mission: null, // місія
            s_values: [], // цінності
            s_competence: [], // компетерція
         }}
         layout='vertical'
         size='large'
         onFinish={onFinish}
         form={form}
         className='form'
      >
         
         <AppText text='Миссия и ценности'
                  style={{
                     color: '#20272E',
                     fontSize: 18,
                     fontWeight: 700,
                     marginBottom: 24,
                     lineHeight: 1.5715,
                     display: 'block'
                  }}/>
         
         <Form.Item className='form__container' name='mission' label='Визия / Миссия'>
            <Input className='form__input' placeholder="Визия / Миссия"/>
         </Form.Item>
         
         <Form.Item name="s_values" label="Ценности" className='form__container'>
            <AppSelect options={lists?.s_values} placeholder="Ценности" mode="multiple" isHaveFooter
                       onSubmit={async name => await addItemToDropDownList('s_values', name)}/>
         </Form.Item>
         
         <Form.Item name="s_competence" label="Компетенция" className='form__container'>
            <AppSelect options={lists?.s_competence} placeholder="Компетенция" mode="multiple" isHaveFooter
                       onSubmit={async name => await addItemToDropDownList('s_competence', name)}/>
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

export default FormSetCompanyMission;