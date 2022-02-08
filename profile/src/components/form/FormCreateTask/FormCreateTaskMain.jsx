import React, {useEffect} from 'react';
import {func, number} from 'prop-types';
import {Button, Col, Form, Input, Row} from "antd";
import {rules} from "@assets/helpers/messages";
import AppDatePicker from "@/components/ui/AppDatePicker.jsx";
import AppSelect from "@/components/ui/AppSelect.jsx";
import {useForm} from "antd/es/form/Form";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {setTaskInfo} from "@store/actions/tasks-actions";
import TooltipInputTag from "@/components/tooltips/TooltipInputTag.jsx";
import {useTooltipInputTag} from "@/hooks/useTooltipInputTag";

FormCreateTaskMain.propTypes = {
   step: number, changeStep: func
};

function FormCreateTaskMain({step, changeStep}) {
   const [form] = useForm();
   const dispatch = useDispatch();
   const {colorId, changeColor, iconId, changeIcon} = useTooltipInputTag();
   const {
      lists, tasks: {info: taskInfo}
   } = useSelector(state => ({
      lists: state.dropDownList.lists, tasks: state.tasks,
   }));
   
   const onFinish = () => {
      const values = form.getFieldsValue();
      values.start = values.start && values.start.format('DD.MM.YYYY HH:mm');
      values.end = values.end && values.end.format('DD.MM.YYYY HH:mm');
      console.log(values)
      dispatch(setTaskInfo(values));
      changeStep(step + 1)
   }
   
   const disabledDate = current => current && current <= moment().add(-1, 'day').endOf("day")
   
   useEffect(() => {
      if (taskInfo) {
         form.setFields([{name: 'name', value: taskInfo.name},
            {name: 'start', value: taskInfo?.start && moment(taskInfo.start, "DD.MM.YYYY HH:mm")},
            {name: 'end', value: taskInfo?.end && moment(taskInfo.end, "DD.MM.YYYY HH:mm")},
            // {name: 'priority', value: taskInfo?.priority && taskInfo?.priority},
            // {name: 'progress', value: taskInfo?.progress && taskInfo?.progress},
            {name: 'status', value: taskInfo?.status && taskInfo?.status}, {name: 'tag', value: taskInfo?.tag && taskInfo?.tag},])
      }
   }, [taskInfo]);
   
   const onChangeDate = (date, name) => {
      form.setFields([{name, value: moment(date, 'DD.MM.YYYY HH:mm'), errors: []}])
   }
   
   return (<Form
      name="task-main"
      layout='vertical'
      size='large'
      onFinish={onFinish}
      className='form'
      form={form}
      initialValues={{
         start: moment(new Date())
      }}>
      <div className="form__wrapper">
         <div className="form__body">
            <Row>
               <Col span={24}>
                  <Form.Item label='Название задачи' name='name' rules={[{required: true, message: rules.required}]}>
                     <Input className='form__input' placeholder="Название задачи"/>
                  </Form.Item>
               </Col>
               <Col span={24}>
                  <Row gutter={[24, 0]}>
                     <Col span={8}>
                        <Form.Item label='Начало' name='start' rules={[{required: true, message: rules.required}]}>
                           <AppDatePicker placeholder='Сегодня 09:00'
                                          showTime={{minuteStep: 5}}
                                          allowClear={false}
                                          format="DD.MM.YYYY HH:mm"
                                          onSelect={date => onChangeDate(date, 'start')}
                                          isHideOkButton
                                          disabledDate={disabledDate}/>
                        </Form.Item>
                     </Col>
                     
                     <Col span={8}>
                        <Form.Item label='Выполнить до' name='end' rules={[{required: true, message: rules.required}]}>
                           <AppDatePicker placeholder='Завтра 09:00'
                                          showTime={{minuteStep: 5}}
                                          format="DD.MM.YYYY HH:mm"
                                          onSelect={date => onChangeDate(date, 'end')}
                                          isHideOkButton
                                          disabledDate={disabledDate}/>
                        </Form.Item>
                     </Col>
                     <Col span={8}>
                        <Form.Item label='Приоритет' name='priority'>
                           <AppSelect options={[]} placeholder='Приоритет'/>
                        </Form.Item>
                     </Col>
                  </Row>
               </Col>
               <Col span={24}>
                  <Row gutter={[24, 0]}>
                     <Col span={16}>
                        <Form.Item label='Состояние' name='status'>
                           <AppSelect options={[]} placeholder='Не началась'/>
                        </Form.Item>
                     </Col>
                     <Col span={8}>
                        <Form.Item label='Выполнено' name='progress'>
                           <AppSelect options={[]} placeholder='0%' disabled/>
                        </Form.Item>
                     </Col>
                  </Row>
               </Col>
               <Col span={24}>
                  <Form.Item label='Метка' name='tag'>
                     <TooltipInputTag placeholder="Название задачи"
                                      colorId={colorId}
                                      changeColor={changeColor}
                     
                                      iconId={iconId}
                                      changeIcon={changeIcon}
                     />
                  </Form.Item>
               </Col>
            </Row>
         </div>
         <div className="form__footer">
            <Row align='middle' justify='space-between'>
               <Col>
                  <Button type="default" shape="round" htmlType="button" onClick={() => changeStep(step - 1)}>
                     Отмена
                  </Button>
               </Col>
               <Col>
                  <Button type="primary" shape="round" htmlType="submit">
                     Дальше
                  </Button>
               </Col>
            </Row>
         </div>
      </div>
   </Form>);
}

export default FormCreateTaskMain;