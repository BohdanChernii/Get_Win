import React, {useEffect, useState} from 'react';
import {func, number} from 'prop-types';
import {Button, Form, Input, message, Switch} from "antd";
import {checkFormValues} from "@assets/helpers/helpers";
import AppText from "@/components/ui/AppText.jsx";
import {addItemsTypes, removeItemsTypes} from "@assets/helpers/constants";
import AppSelect from "@/components/ui/AppSelect.jsx";
import FormAddButton from "@/components/components/FormAddButton/FormAddButton.jsx";
import PositionDetailsList from "@/components/components/PositionDetailsList/PositionDetailsList.jsx";
import {initPositionKPI} from "@store/actions/kpi-actions";
import {useDispatch, useSelector} from "react-redux";
import PositionFunctionalityModal from "@/components/modals/PositionFunctionalityModal/PositionFunctionalityModal.jsx";
import {setNewPositionsInfo, setSelectPositionId} from "@store/actions/positions-actions";
import usePositionData from "@/hooks/usePositionFunctionality";
import {addNewPositionItem, getInteractions, removePositionItem} from "@assets/helpers/asyncHelpers";
import {initPositionResult} from "@store/actions/result-actions";
import {initPositionTarget} from "@store/actions/target-actions";
import {positionErrorsMsg, rules} from "@assets/helpers/messages";

FormSetPositionRequirements.propTypes = {
   changeStep: func,
   step: number,
};

function FormSetPositionRequirements({changeStep, step}) {
   const [form] = Form.useForm();
   const dispatch = useDispatch();
   const {
      lists,
      target: {categories: targetList},
      kpi: {categories: kpiList},
      result: {categories: resultList},
      positions: {id: positionsId, info, list: positionsList},
   } = useSelector(state => ({
      target: state.target,
      kpi: state.kpi,
      result: state.result,
      positions: state.positions,
      lists: state.dropDownList.lists,
   }));
   
   const [visibleTargetsModal, setVisibleTargetsModal] = useState(false);
   const [visibleResultsModal, setVisibleResultsModal] = useState(false);
   const [visibleKpiModal, setVisibleKpiModal] = useState(false);
   
   const [isSwitch, setIsSwitch] = useState(true);
   const handleOnChangeSwitch = () => setIsSwitch(!isSwitch);
   // interaction
   const [interactions, setInteractions] = useState([]);
   const handleOnGetInteractions = async open => {
      if (open && !interactions.length) {
         const result = await getInteractions();
         setInteractions(result);
      }
   }
   // target
   const positionTargets = usePositionData(positionsId, targetList);
   const [targetsSelected, setTargetsSelected] = useState([]);
   const handleOnClearTarget = id => {
      setTargetsSelected(prev => prev.filter(el => el.id !== id));
   };
   const handleOnAddTarget = async name => {
      try {
         await addNewPositionItem(name, addItemsTypes.TARGET);
         await dispatch(initPositionTarget())
      } catch (err) {
         console.error(err)
         message.error({content: err.message})
         throw err
      }
   }
   const handleOnRemoveTarget = async id => {
      try {
         await removePositionItem(id, addItemsTypes.TARGET, removeItemsTypes.TARGET);
         await dispatch(initPositionTarget())
      } catch (err) {
         console.error(err)
         message.error({content: err.message})
         throw err
      }
   }
   
   // result
   const positionResult = usePositionData(positionsId, resultList);
   const [resultsSelected, setResultsSelected] = useState([]);
   const handleOnClearResults = id => {
      setResultsSelected(prev => prev.filter(el => el.id !== id));
   };
   const handleOnAddResult = async name => {
      try {
         await addNewPositionItem(name, addItemsTypes.RESULT);
         await dispatch(initPositionResult())
      } catch (err) {
         console.error(err)
         message.error({content: err.message})
         throw err
      }
   }
   const handleOnRemoveResult = async id => {
      try {
         await removePositionItem(id, addItemsTypes.RESULT, removeItemsTypes.RESULT);
         await dispatch(initPositionResult())
      } catch (err) {
         console.error(err)
         message.error({content: err.message})
         throw err
      }
   }
   
   // kpi
   const positionKpi = usePositionData(positionsId, kpiList);
   const [kpiSelected, setKpiSelected] = useState([]);
   const handleOnClearKpi = id => {
      setKpiSelected(prev => prev.filter(el => el.id !== id));
   };
   const handleOnAddKpi = async name => {
      try {
         await addNewPositionItem(name, addItemsTypes.KPI);
         await dispatch(initPositionKPI());
      } catch (err) {
         console.error(err);
         message.error({content: err.message});
         throw err;
      }
   }
   const handleOnRemoveKpi = async id => {
      try {
         await removePositionItem(id, addItemsTypes.KPI, removeItemsTypes.KPI);
         await dispatch(initPositionKPI());
      } catch (err) {
         console.error(err);
         message.error({content: err.message});
         throw err;
      }
   }
   
   const onFinish = async () => {
      if (targetsSelected.length === 0) {
         return message.warn(positionErrorsMsg.TARGET);
      } else if (resultsSelected.length === 0) {
         return message.warn(positionErrorsMsg.RESULT);
      } else if (kpiSelected.length === 0) {
         return message.warn(positionErrorsMsg.KPI);
      }
      const values = checkFormValues(form.getFieldsValue());
      values.target = targetsSelected;
      values.result = resultsSelected;
      values.kpi = kpiSelected;
      try {
         dispatch(setNewPositionsInfo(values))
         changeStep(step + 1);
      } catch (err) {
         message.error(err.message);
         throw err;
      }
   }
   
   useEffect(() => {
      dispatch(initPositionTarget());
      dispatch(initPositionResult());
      dispatch(initPositionKPI());
   }, []);
   
   useEffect(() => {
      if (info) {
         const {credentials, interaction, kpi, opportunities, result, target,} = info
         
         if (info) {
            setTargetsSelected(target || [])
            setResultsSelected(result || [])
            setKpiSelected(kpi || [])
            form.setFields([
               {name: 'opportunities', value: opportunities ? opportunities : null},
               {name: 'credentials', value: credentials ? credentials : null},
               {name: 'interaction', value: interaction ? interaction : []},
            ])
         }
      }
   }, [info]);
   
   useEffect(() => {
      if (!visibleTargetsModal || !visibleResultsModal || !visibleKpiModal) {
         const id = positionsList.find(el => el.name === info.name).id;
         dispatch(setSelectPositionId(id.toString()));
      }
   }, [visibleTargetsModal, visibleResultsModal, visibleKpiModal])
   
   return (
      <>
         <PositionFunctionalityModal
            title='????????'
            visible={visibleTargetsModal}
            changeVisible={setVisibleTargetsModal}
            userSelectedList={targetsSelected}
            changeUserSelectedList={setTargetsSelected}
            
            positionsId={positionsId}
            setPositionId={id => dispatch(setSelectPositionId(id.toString()))}
            positionData={positionTargets}
            
            addItem={handleOnAddTarget}
            removeItem={handleOnRemoveTarget}
         />
         
         <PositionFunctionalityModal
            title='kpi'
            visible={visibleKpiModal}
            changeVisible={setVisibleKpiModal}
            userSelectedList={kpiSelected}
            changeUserSelectedList={setKpiSelected}
            
            positionsId={positionsId}
            setPositionId={id => dispatch(setSelectPositionId(id.toString()))}
            positionData={positionKpi}
            
            addItem={handleOnAddKpi}
            removeItem={handleOnRemoveKpi}
         />
         
         <PositionFunctionalityModal
            title='??????????????????'
            visible={visibleResultsModal}
            changeVisible={setVisibleResultsModal}
            userSelectedList={resultsSelected}
            changeUserSelectedList={setResultsSelected}
            
            positionsId={positionsId}
            setPositionId={id => dispatch(setSelectPositionId(id.toString()))}
            positionData={positionResult}
            
            addItem={handleOnAddResult}
            removeItem={handleOnRemoveResult}
         />
         
         <Form
            name="set-position-requirements"
            layout='vertical'
            size='large'
            onFinish={onFinish}
            form={form}
            className='form'>
            <AppText text='???????????????????? ?? ????????????????????'
                     style={{color: '#20272E', fontSize: 18, fontWeight: 700, marginBottom: 24, lineHeight: 1.5715, display: 'block'}}/>
            
            {/*  ???????? ??????????????????  */}
            <Form.Item label='???????? ??????????????????' required>
               <Form.Item noStyle name="target">
                  <FormAddButton
                     extraClasses={`_card`}
                     onClick={() => setVisibleTargetsModal(!visibleTargetsModal)}
                     text='???????????????? ????????'/>
               </Form.Item>
               <Form.Item noStyle>
                  <PositionDetailsList details={targetsSelected} clearDetails={handleOnClearTarget} modalTitle='??????????????????'/>
               </Form.Item>
            </Form.Item>
            
            {/*  ??????????????????  */}
            <Form.Item label='??????????????????' required>
               <Form.Item noStyle name="result">
                  <FormAddButton
                     extraClasses={`_card`}
                     onClick={() => setVisibleResultsModal(!visibleResultsModal)}
                     text='???????????????? ??????????????????'/>
               </Form.Item>
               <Form.Item noStyle>
                  <PositionDetailsList details={resultsSelected} clearDetails={handleOnClearResults} modalTitle='??????????????????'/>
               </Form.Item>
            </Form.Item>
            
            {/*  KPI  */}
            <Form.Item label='KPI' required>
               <Form.Item noStyle name="kpi">
                  <FormAddButton
                     extraClasses={`_card`}
                     onClick={() => setVisibleKpiModal(!visibleKpiModal)}
                     text='???????????????? KPI'/>
               </Form.Item>
               <Form.Item noStyle>
                  <PositionDetailsList details={kpiSelected} clearDetails={handleOnClearKpi} modalTitle='KPI'/>
               </Form.Item>
            </Form.Item>
            
            <Form.Item className='form__container' label='????????????????????' name='credentials' rules={[{required: true, message: rules.required}]}>
               <AppSelect options={lists?.s_credentials} placeholder='???????????????? ?????? ???????????????? ???? ????????????'/>
            </Form.Item>
            
            <Form.Item className='form__container' label='????????????????????????????' name='interaction' rules={[{required: true, message: rules.required}]}>
               <AppSelect onDropdownVisibleChange={handleOnGetInteractions}
                          options={interactions} placeholder='???????????????? ?????? ???????????????? ???? ????????????'
                          mode='multiple'/>
            </Form.Item>
            
            <Form.Item label="?????????????????????? ???????????????????? ??????????">
               <div className="form__row">
                  <Switch style={{width: 80}} defaultChecked onChange={handleOnChangeSwitch} checkedChildren={'????'} unCheckedChildren={'??????'}/>
                  <Form.Item name="opportunities" noStyle>
                     <Input disabled={!isSwitch} className='form__input' placeholder="??????????????"/>
                  </Form.Item>
               </div>
            </Form.Item>
            
            <Form.Item className='form__container'>
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
      </>
   
   );
}

export default FormSetPositionRequirements;