import React, {useEffect, useState} from 'react';
import {func, number} from 'prop-types';
import {Button, Col, Form, message, Row} from "antd";
import {checkFormValues, getCurrentValues} from "@assets/helpers/helpers";
import AppText from "@/components/ui/AppText.jsx";
import FormAddButton from "@/components/components/FormAddButton/FormAddButton.jsx";
import AppSelect from "@/components/ui/AppSelect.jsx";
import {useDispatch, useSelector} from "react-redux";
import PositionDetailsList from "@/components/components/PositionDetailsList/PositionDetailsList.jsx";
import {addNewPositionItem, removePositionItem} from "@assets/helpers/asyncHelpers";
import {addItemsTypes, removeItemsTypes} from "@assets/helpers/constants";
import {initPositionZun} from "@store/actions/zun-actions";
import PositionFunctionalityModal from "@/components/modals/PositionFunctionalityModal/PositionFunctionalityModal.jsx";
import {setNewPositionsInfo, setSelectPositionId} from "@store/actions/positions-actions";
import usePositionData from "@/hooks/usePositionFunctionality";
import {useAddItemToDropDownList} from "@/hooks/useAddItemToDropDownList";
import StaticFormModal from "@/components/modals/StaticFormModal.jsx";
import FormAddProgram from "@/components/form/FormAddProgram/FormAddProgram.jsx";
import FormAddLanguages from "@/components/form/FormAddLanguages/FormAddLanguages.jsx";
import __ from "lodash";
import AppDescriptions from "@/components/ui/AppDescriptions.jsx";
import {rules} from "@assets/helpers/messages";

FormSetPositionEducation.propTypes = {
   changeStep: func,
   step: number,
};

function FormSetPositionEducation({changeStep, step}) {
   const [form] = Form.useForm();
   const dispatch = useDispatch();
   const addItemToDropDownList = useAddItemToDropDownList()
   const {
      dropDownList: {lists},
      positions: {id: positionsId, info, list: positionsList},
      zun: {categories: zunList}
   } = useSelector(state => ({
      dropDownList: state.dropDownList,
      zun: state.zun,
      positions: state.positions,
   }))
   
   const [visibleZunModal, setVisibleZunModal] = useState(false);
   const [visibleProgramsModal, setVisibleProgramsModal] = useState(false);
   const [visibleLanguagesModal, setVisibleLanguagesModal] = useState(false);
   
   const positionZun = usePositionData(positionsId, zunList)
   const [znuSelected, setZnuSelected] = useState([]);
   const handleOnClearZun = id => {
      setZnuSelected(prev => prev.filter(el => el.id !== id))
   }
   const handleOnAddZun = async name => {
      try {
         await addNewPositionItem(name, addItemsTypes.ZUN);
         await dispatch(initPositionZun())
      } catch (err) {
         console.error(err)
         message.error({content: err.message})
         throw err
      }
   }
   const handleOnRemoveZun = async id => {
      try {
         await removePositionItem(id, addItemsTypes.ZUN, removeItemsTypes.ZUN);
         await dispatch(initPositionZun())
      } catch (err) {
         console.error(err)
         message.error({content: err.message})
         throw err
      }
   }
   
   //programs
   const [programs, setPrograms] = useState([]);
   const handleOnClearPrograms = id => {
      setPrograms(prev => prev.filter(program => program.id !== id))
   };
   const handleOnAddProgram = values => {
      values.id = __.uniqueId()
      setPrograms([values, ...programs])
   }
   
   //languages
   const [languages, setLanguages] = useState([]);
   const handleOnAddLanguages = values => {
      values.id = __.uniqueId()
      setLanguages([values, ...languages])
   }
   const handleOnClearLanguages = id => {
      setLanguages(prev => prev.filter(language => language.id !== id))
   }
   const onFinish = async () => {
      const values = checkFormValues(form.getFieldsValue());
      values.zun = znuSelected;
      values.programs = programs;
      values.languages = languages;
      values.education = getCurrentValues(values.education, lists.s_education);
      values.competencies = getCurrentValues(values.competencies, lists.s_competence);
      try {
         dispatch(setNewPositionsInfo(values))
         changeStep(step + 1)
      } catch (err) {
         message.error(err.message)
         throw err
      }
   }
   
   useEffect(() => {
      dispatch(initPositionZun())
   }, []);
   
   useEffect(() => {
      if (info) {
         const {competencies, education, languages, programs, zun,} = info
         setZnuSelected(zun || [])
         setPrograms(programs || [])
         setLanguages(languages || [])
         form.setFields([
            {name: 'competencies', value: competencies?.length ? competencies.map(({name}) => name) : []},
            {name: 'education', value: education?.name ? education.name : null},
         ])
      }
   }, [info]);
   
   useEffect(() => {
      if (!visibleZunModal) {
         const id = positionsList.find(el => el.name === info.name).id;
         dispatch(setSelectPositionId(id.toString()));
      }
   }, [visibleZunModal])
   return (
      <>
         <PositionFunctionalityModal
            title='зун'
            visible={visibleZunModal}
            changeVisible={setVisibleZunModal}
            userSelectedList={znuSelected}
            changeUserSelectedList={setZnuSelected}
            
            positionsId={positionsId}
            setPositionId={id => dispatch(setSelectPositionId(id.toString()))}
            positionData={positionZun}
            
            addItem={handleOnAddZun}
            removeItem={handleOnRemoveZun}
         />
         <StaticFormModal visible={visibleProgramsModal}
                          changeVisible={setVisibleProgramsModal}
                          component={<FormAddProgram
                             changeVisible={() => setVisibleProgramsModal(!visibleProgramsModal)}
                             onSubmitForm={handleOnAddProgram}/>}
                          isHideAside
         />
         <StaticFormModal visible={visibleLanguagesModal}
                          changeVisible={setVisibleLanguagesModal}
                          component={<FormAddLanguages
                             changeVisible={() => setVisibleLanguagesModal(!visibleLanguagesModal)}
                             onSubmitForm={handleOnAddLanguages}/>}
                          isHideAside
         />
         <Form
            name="set-position-education"
            layout='vertical'
            size='large'
            onFinish={onFinish}
            form={form}
            className='form'>
            <AppText text='Образование и умения'
                     style={{color: '#20272E', fontSize: 18, fontWeight: 700, marginBottom: 24, lineHeight: 1.5715, display: 'block'}}/>
            
            <Form.Item className='form__container' label='Образование' name='education' rules={[{required: true, message: rules.required}]}>
               <AppSelect options={lists?.s_education} placeholder='Напишите или выберите из списка'/>
            </Form.Item>
            
            {/*  ЗУН  */}
            <Form.Item label='ЗУН (чем нужно обладать)'>
               <Form.Item noStyle name="zun">
                  <FormAddButton
                     extraClasses={`_card`}
                     onClick={() => setVisibleZunModal(!visibleZunModal)}
                     text='Добавить ЗУН'/>
               </Form.Item>
               <Form.Item noStyle>
                  <PositionDetailsList details={znuSelected} clearDetails={handleOnClearZun} modalTitle='ЗУН'/>
               </Form.Item>
            </Form.Item>
            
            <Form.Item className='form__container' label='Компетенции' name='competencies'>
               <AppSelect options={lists?.s_competence} placeholder='Напишите или выберите из списка' mode='multiple' isHaveFooter
                          onSubmit={name => addItemToDropDownList('s_competence', name)}/>
            </Form.Item>
            
            {/*  Владение программами  */}
            <Form.Item label='Владение программами'>
               <Form.Item noStyle name="programs">
                  <FormAddButton
                     extraClasses={`_card`}
                     onClick={() => setVisibleProgramsModal(!visibleProgramsModal)}
                     text='Добавить программы'/>
               </Form.Item>
               <Form.Item noStyle>
                  <Row gutter={[16, 16]} style={{marginTop: '8px'}}>
                     {programs.map(program => (
                        <Col key={program.id} span={24}>
                           <AppDescriptions
                              title={program.name}
                              descriptions={program.levels}
                              onRemove={() => handleOnClearPrograms(program.id)}/>
                        </Col>
                     ))}
                  </Row>
                  {/*<PositionDetailsList details={programs} clearDetails={handleOnClearPrograms} modalTitle='Программы'/>*/}
               </Form.Item>
            </Form.Item>
            
            {/*  Владение Языки  */}
            <Form.Item label='Владение языками'>
               <Form.Item noStyle name="languages">
                  <FormAddButton
                     extraClasses={`_card`}
                     onClick={() => setVisibleLanguagesModal(!visibleLanguagesModal)}
                     text='Добавить язык'/>
               </Form.Item>
               <Form.Item noStyle>
                  <Row gutter={[16, 16]} style={{marginTop: '8px'}}>
                     {languages.map(language => (
                        <Col key={language.id} span={24}>
                           <AppDescriptions
                              title={language.name}
                              descriptions={language.levels}
                              onRemove={() => handleOnClearLanguages(language.id)}/>
                        </Col>
                     ))}
                  </Row>
                  
                  {/*<PositionDetailsList details={languages} clearDetails={handleOnClearLanguages} modalTitle='Языки'/>*/}
               </Form.Item>
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
      </>
   );
}

export default FormSetPositionEducation;