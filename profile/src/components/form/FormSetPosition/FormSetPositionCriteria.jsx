import React, {useEffect, useState} from 'react';
import {func, number} from 'prop-types';
import {Button, Col, Drawer, Empty, Form, message, Row, Typography} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {setNewPositionsInfo} from "@store/actions/positions-actions";
import AppText from "@/components/ui/AppText.jsx";
import PreviewVacancy from "@/components/components/PreviewVacancy/PreviewVacancy.jsx";
import AppDescriptions from "@/components/ui/AppDescriptions.jsx";
import {clearData, getTypeName, setCriteriaOptions, sortBy} from "@assets/helpers/helpers";
import {createNewVacancy} from "@assets/helpers/asyncHelpers";

FormSetPositionCriteria.propTypes = {
   changeStep: func,
   step: number,
};

function FormSetPositionCriteria({changeStep, step}) {
   const counter = 5;
   const [form] = Form.useForm();
   const dispatch = useDispatch();
   const {
      positions: {info},
      dropDownList: {lists},
   } = useSelector(state => state);
   const [visiblePreviewDrawer, setVisiblePreviewDrawer] = useState(false);
   const [isMove, setIsMove] = useState(false);
   
   // criteria
   const [criteria, setCriteria] = useState({
      criteria: [],
      selectedCriteria: []
   });
   
   const handleOnDragStart = () => {
      setIsMove(!isMove)
   };
   const handleOnDragEnd = result => {
      const {source, destination} = result;
      setIsMove(!isMove)
      if (!destination) return message.warn('Перетинете в заданое поле');
      
      const {droppableId: sourceName, index: sourceIndex} = source;
      const {droppableId: destinationName, index: destinationIndex} = destination;
      
      if ((sourceName === destinationName) && (sourceIndex === destinationIndex)) return
      
      const criteriaSource = [...criteria[sourceName]];
      const removeElements = criteriaSource.splice(sourceIndex, 1);
      
      if (sourceName !== destinationName) {
         if ((counter - criteria.selectedCriteria.length === 0) && (destinationName === 'selectedCriteria')) {
            return message.warn('Выбрано максимальное количество критериев!');
         }
         const criteriaDestination = [...criteria[destinationName]];
         criteriaDestination.splice(destinationIndex, 0, ...removeElements)
         
         setCriteria(prev => ({
            ...prev,
            [sourceName]: criteriaSource,
            [destinationName]: criteriaDestination.map((el, index) => ({
               ...el, priority: ++index
            }))
         }))
      } else {
         criteriaSource.splice(destinationIndex, 0, ...removeElements);
         criteriaSource.forEach((el, index) => el.priority = ++index);
         if (sourceName === 'selectedCriteria')
            setCriteria(prev => ({
               ...prev,
               [sourceName]: criteriaSource,
            }))
      }
   };
   
   const handleOnAddCriteria = async () => {
      const values = form.getFieldsValue();
      values.criteria = criteria.selectedCriteria;
      try {
         dispatch(setNewPositionsInfo(values))
         setVisiblePreviewDrawer(!visiblePreviewDrawer)
      } catch (err) {
         console.error(err);
         throw err;
      }
   };
   
   const handleOnSubmit = async () => {
      setVisiblePreviewDrawer(!visiblePreviewDrawer);
      const criteriaInfo = info.criteria.map(({idItem, name, priority_id}) => ({
         id: idItem,
         type: getTypeName(name),
         priority_id
      }));
      try {
         dispatch(setNewPositionsInfo({criteriaInfo}));
         await createNewVacancy();
         changeStep(step + 1)
      } catch (err) {
         message.error(err.message);
      }
   };
   
   useEffect(() => {
      if (info) {
         let options = [];
         if (lists) {
            const {s_selection_criteria, s_activity} = lists
            options = setCriteriaOptions(s_selection_criteria, clearData({...info, ...s_activity}));
         }
         options = sortBy(options, 'disabled');
         setCriteria(prev => ({...prev, criteria: options}));
      }
   }, [info, lists]);
   
   return (
      <>
         <Drawer
            visible={visiblePreviewDrawer}
            onClose={() => setVisiblePreviewDrawer(!visiblePreviewDrawer)}
            width='calc(100vw - 360px)'
            bodyStyle={{padding: 0,}}
            closable={false}
         >
            <PreviewVacancy onSubmit={handleOnSubmit}/>
         </Drawer>
         
         <Form
            name="set-position-criteria"
            layout='vertical'
            size='large'
            onFinish={handleOnAddCriteria}
            form={form}
            className='form'>
            <AppText text={`Выберите критерии для поиска резюме: до ${counter - criteria.selectedCriteria.length}`}
                     style={{color: '#20272E', fontSize: 18, fontWeight: 700, marginBottom: 24, lineHeight: 1.5715, display: 'block'}}/>
            
            <DragDropContext onDragEnd={handleOnDragEnd} onDragStart={handleOnDragStart}>
               <Row gutter={[24, 24]}>
                  <Col span={24}>
                     <Typography.Title level={5}>Выбранные Критерии:</Typography.Title>
                     <Droppable droppableId={'selectedCriteria'}>
                        {(provided) => (
                           <>
                              {!criteria.selectedCriteria.length ? (
                                 <>
                                    <div ref={provided.innerRef} {...provided.droppableProps} className={`droppable-area ${isMove ? 'move' : ''}`}>
                                       <Empty description='Перетащите сюда нужные критерии'
                                              image={Empty.PRESENTED_IMAGE_SIMPLE}/>
                                    </div>
                                    {provided.placeholder}
                                 </>
                              ) : (
                                 <div ref={provided.innerRef} {...provided.droppableProps}>
                                    <Row gutter={[16, 16]} style={{marginTop: 8, marginBottom: 24}}>
                                       {criteria.selectedCriteria.map((criterion, index) => (
                                          <Col span={24} key={criterion.id}>
                                             <Draggable draggableId={criterion.id.toString()} index={index}>
                                                {(provided) => (
                                                   <AppDescriptions
                                                      isDraggable
                                                      draggableProvided={provided}
                                                      placeholder={!criterion.disabled ? 'Критерий' : ''}
                                                      title={criterion.name}
                                                      descriptions={criterion.description || 'Не имеет значения'}
                                                      disabled={criterion.disabled}
                                                   >
                                                      <AppText style={{color: '#4E5AF2', fontWeight: 500, fontSize: 12}}
                                                               text={`Приоритет ${criterion.priority}`}/>
                                                   </AppDescriptions>
                                                )}
                                             </Draggable>
                                          </Col>
                                       ))}
                                    </Row>
                                    {provided.placeholder}
                                 </div>
                              )}
                           </>
                        )}
                     </Droppable>
                  </Col>
                  
                  <Col span={24}>
                     <Typography.Title level={5}>Все Критерии:</Typography.Title>
                     <Droppable droppableId={'criteria'}>
                        {(provided) => (
                           <div ref={provided.innerRef} {...provided.droppableProps}>
                              <Row gutter={[16, 16]} style={{marginTop: 8, marginBottom: 24}}>
                                 {criteria.criteria.map((criterion, index) => (
                                    <Col span={24} key={criterion.id}>
                                       <Draggable draggableId={criterion.id.toString()} index={index}>
                                          {(provided) => (
                                             <AppDescriptions
                                                isDraggable
                                                draggableProvided={provided}
                                                title={criterion.name}
                                                descriptions={criterion.description || 'Не имеет значения'}
                                                disabled={criterion.disabled}
                                             />
                                          )}
                                       </Draggable>
                                    </Col>
                                 ))}
                              </Row>
                              {provided.placeholder}
                           </div>
                        )}
                     </Droppable>
                  </Col>
               </Row>
            
            </DragDropContext>
            
            {/*  Критерии  */}
            
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

export default FormSetPositionCriteria;