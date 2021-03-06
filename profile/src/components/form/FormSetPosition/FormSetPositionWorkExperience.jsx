import React, {useEffect, useState} from 'react';
import {func, number} from 'prop-types';
import {Button, Form, Input} from "antd";
import {checkFormValues} from "@assets/helpers/helpers";
import AppText from "@/components/ui/AppText.jsx";
import FormAddButton from "@/components/components/FormAddButton/FormAddButton.jsx";
import PositionDetailsList from "@/components/components/PositionDetailsList/PositionDetailsList.jsx";
import {setNewPositionsInfo} from "@store/actions/positions-actions";
import {useDispatch, useSelector} from "react-redux";
import AppSelect from "@/components/ui/AppSelect.jsx";

FormSetPositionWorkExperience.propTypes = {
   changeStep: func,
   step: number,
};

function FormSetPositionWorkExperience({changeStep, step}) {
   const [form] = Form.useForm();
   
   const dispatch = useDispatch();
   const {lists, positions: {info}} = useSelector(state => ({
      lists: state.dropDownList.lists,
      positions: state.positions,
   }));
   
   const [casesSelected, setCasesSelected] = useState([]);
   const [visibleCasesModal, setVisibleCasesModal] = useState(false);
   const handleOnClearCases = id => {
      setCasesSelected(prev => prev.filter(el => el.id !== id))
   }
   
   const onFinish = async () => {
      const values = checkFormValues(form.getFieldsValue());
      values.cases = casesSelected;
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
         const {cases, experience, experience_company_names, experience_job_titles,} = info;
         setCasesSelected(cases || [])
         form.setFields([
            {name: 'experience_job_titles', value: experience_job_titles?.length ? experience_job_titles : null},
            {name: 'cases', value: cases ? cases : null},
            {name: 'experience', value: experience ? experience : null},
            {name: 'experience_company_names', value: experience_company_names ? experience_company_names : null},
         ])
      }
   }, [info]);
   return (
      <Form
         name="set-position-work-experience"
         layout='vertical'
         size='large'
         onFinish={onFinish}
         form={form}
         className='form'>
         <AppText text='???????? ????????????'
                  style={{color: '#20272E', fontSize: 18, fontWeight: 700, marginBottom: 24, lineHeight: 1.5715, display: 'block'}}/>
         
         <Form.Item label='???????? ????????????' name='experience'>
            <AppSelect options={lists?.s_work_experience} placeholder='???????? ????????????'/>
         </Form.Item>
         
         <Form.Item style={{flex: 1}} name="experience_company_names" label="???????????????? ???????????????? (-??)">
            <Input className='form__input' placeholder='???????????????? ???????????????? (-??)'/>
         </Form.Item>
         
         <Form.Item style={{flex: 1}} name="experience_job_titles" label="?????????????????? (-??)">
            <Input className='form__input' placeholder='?????????????????? (-??)'/>
         </Form.Item>
         
         {/*  ??????????  */}
         <Form.Item label='??????????'>
            <Form.Item noStyle name="cases">
               <FormAddButton
                  extraClasses={`_card`}
                  onClick={() => setVisibleCasesModal(!visibleCasesModal)}
                  text='???????????????? ????????'/>
            </Form.Item>
            <Form.Item noStyle>
               <PositionDetailsList details={casesSelected} clearDetails={handleOnClearCases} modalTitle='??????????'/>
            </Form.Item>
         </Form.Item>
         
         <Form.Item>
            <div className='form__row _between'>
               <Button type="default" htmlType="button" shape="round" onClick={() => changeStep(step - 1)}>
                  ??????????
               </Button>
               <Button type="primary" shape="round" htmlType="submit">
                  ?????????????????? ?? ????????????????????
               </Button>
            </div>
         </Form.Item>
      </Form>
   );
}

export default FormSetPositionWorkExperience;