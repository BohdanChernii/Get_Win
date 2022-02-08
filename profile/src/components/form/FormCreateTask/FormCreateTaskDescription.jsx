import React, {useEffect} from 'react';
import {func, number} from 'prop-types';
import {Button, Col, Form, Input, Row} from "antd";
import AppSelect from "@/components/ui/AppSelect.jsx";
import {useForm} from "antd/es/form/Form";
import {useDispatch, useSelector} from "react-redux";
import Uploader from "@/components/components/Uploader/Uploader.jsx";
import Attachment from "@/components/components/Attachment/Attachment.jsx";
import {useAttachment} from "@/hooks/useAttachment.jsx";
import {setTaskInfo} from "@store/actions/tasks-actions";

FormCreateTaskDescription.propTypes = {
   step: number,
   changeStep: func
};

function FormCreateTaskDescription({step, changeStep}) {
   const [form] = useForm();
   const {files, setFiles, removeFile, settings} = useAttachment(`tasks/${Date.now()}`);
   const dispatch = useDispatch();
   
   const handleOnRemoveFile = id => {
      removeFile(id);
      form.setFields([{name: 'files', value: files.filter(file => file.id !== id)}]);
   };
   
   const {
      lists,
      tasks: {info: taskInfo}
   } = useSelector(state => ({
      lists: state.dropDownList.lists,
      tasks: state.tasks,
   }));
   
   const onFinish = () => {
      const values = form.getFieldsValue();
      dispatch(setTaskInfo(values));
      changeStep(step + 1)
   }
   
   useEffect(() => {
      if (taskInfo) {
         taskInfo?.files && setFiles(taskInfo.files)
         form.setFields([
            {name: 'remind', value: taskInfo?.remind && taskInfo?.remind},
            {name: 'description', value: taskInfo?.description && taskInfo?.description},
            {name: 'link', value: taskInfo?.link && taskInfo?.link},
         ])
      }
   }, [taskInfo]);
   return (
      <Form
         name="add-description"
         layout='vertical'
         size='large'
         onFinish={onFinish}
         className='form'
         form={form}>
         <div className="form__wrapper">
            <div className="form__body">
               <Row>
                  <Col span={24}>
                     <Form.Item label='Напомнить' name='remind'>
                        <AppSelect options={[]} placeholder='Напомнить за'/>
                     </Form.Item>
                  </Col>
                  <Col span={24}>
                     <Form.Item label='Ссылка' name='link'>
                        <Input className='form__input' placeholder="Например на Zoom"/>
                     </Form.Item>
                  </Col>
                  <Col span={24}>
                     <Form.Item label='Описание' name='description'>
                        <Input.TextArea autoSize={{
                           minRows: 3,
                           maxRows: 3,
                        }} rows={5} placeholder="Опишите подробнее задачу"/>
                     </Form.Item>
                  </Col>
                  
                  <Col span={24}>
                     <Uploader name='documents' label='Файлы или документы'
                               itemStyle={{marginBottom: 0}}
                               {...settings}
                               files={files}
                               multiple={true}
                               showUploadList={false}/>
                     <Row style={{marginBottom: 12}}>
                        <Col span={24}>
                           {files.map(file => (
                              <div key={file.id} className='form__attachment'>
                                 <Attachment file={file} isEditable isDownload showProgress onRemove={() => handleOnRemoveFile(file.id)}/>
                              </div>
                           ))}
                        </Col>
                     </Row>
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
      </Form>
   );
}

export default FormCreateTaskDescription;