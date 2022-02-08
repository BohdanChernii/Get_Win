import React, {useEffect, useState} from 'react';
import {useForm} from "antd/es/form/Form";
import {Button, Col, Form, Input, Row} from "antd";
import AppSelect from "@/components/ui/AppSelect.jsx";
import {getDepartmentInfo, getDepartments, setDepartmentsName} from "@store/actions/departments-actions";
import {useDispatch, useSelector} from "react-redux";
import {func, number} from "prop-types";
import {checkFormValues, toArray} from "@assets/helpers/helpers";
import __ from "lodash";
import {useAttachment} from "@/hooks/useAttachment.jsx";
import Uploader from "@/components/components/Uploader/Uploader.jsx";
import Attachment from "@/components/components/Attachment/Attachment.jsx";
import {value} from "lodash/seq";
import {setCandidateInfo} from "@store/actions/candidates-actions";

FormSelectCandidateCompany.propTypes = {
   step: number,
   changeStep: func
};


function FormSelectCandidateCompany({step, changeStep}) {
   const [form] = useForm();
   const {files, setFiles, removeFile, settings} = useAttachment(`candidates/${Date.now()}`);
   const dispatch = useDispatch();
   const {
      company,
      departments: {loading: departmentsLoading, list: departmentsList, info: departmentsInfo, name: departmentsName},
      candidate,
   } = useSelector(state => ({
      company: state.company.company,
      departments: state.departments,
      candidate: state.candidates.info,
   }));
   const [cityListOfDepartments, setCityListOfDepartments] = useState([]);
   
   const handleOnRemoveFile = id => {
      removeFile(id);
      form.setFields([{name: 'resume', value: files.filter(file => file.id !== id)}]);
   };
   
   const handleOnSelectDepartment = async name => {
      form.resetFields(['city']);
      dispatch(setDepartmentsName(name));
      await dispatch(getDepartmentInfo(name));
   };
   
   const onFinish = () => {
      const values = checkFormValues(form.getFieldsValue());
      values.resume = files;
      dispatch(setCandidateInfo(values));
      form.resetFields()
      changeStep(step + 1);
   };
   useEffect(() => {
      dispatch(getDepartments())
   }, []);
   
   useEffect(() => {
      company && form.setFields([{name: 'company', value: company.companyName}]);
   }, [company]);
   
   useEffect(() => {
      if (candidate) {
         candidate?.resume && setFiles(candidate.resume)
         form.setFields([
            {name: 'city', value: candidate?.city ? candidate?.city : []},
            {name: 'department', value: candidate?.department},
            {name: 'resume', value: candidate?.resume},
            {name: 'job_name', value: candidate?.job_name},
         ])
      }
   }, [candidate]);
   
   useEffect(() => {
      if (departmentsInfo) {
         const addresses = toArray(departmentsInfo.address);
         setCityListOfDepartments(addresses.map(({city_name}) => ({id: __.uniqueId(), name: city_name})))
      }
   }, [departmentsInfo]);
   return (
      <Form
         name="select-candidate-company"
         layout='vertical'
         size='large'
         onFinish={onFinish}
         className='form'
         form={form}>
         <div className="form__wrapper">
            <div className="form__body">
               <Row>
                  <Col span={24}>
                     <Row gutter={24}>
                        <Col span={12}>
                           <Form.Item label='Компания' name='company'>
                              <Input disabled className='form__input' type='text'/>
                           </Form.Item>
                        </Col>
                        <Col span={12}>
                           <Form.Item label='Район / Город' name='city'>
                              <AppSelect
                                 options={cityListOfDepartments}
                                 disabled={!departmentsName}
                                 placeholder="Выберите из списка"
                                 mode='multiple'/>
                           </Form.Item>
                        </Col>
                     </Row>
                     <Row gutter={24}>
                        <Col span={12}>
                           <Form.Item label='Подразделение / Отдел' name='department'>
                              <AppSelect
                                 allowClear={false}
                                 placeholder="Выберите из списка"
                                 options={departmentsList}
                                 isLoading={departmentsLoading}
                                 onSelect={handleOnSelectDepartment}
                                 onDropdownVisibleChange={async open => open && await dispatch(getDepartments())}
                              />
                           </Form.Item>
                        </Col>
                        <Col span={12}>
                           <Form.Item label='Должность' name='job_name'
                              // rules={[{required: true, message: rules.required}]}
                           >
                              <AppSelect
                                 placeholder="Выберите из списка"
                                 options={[]}
                                 onSelect={() => console.log('onSelect')}
                                 onDropdownVisibleChange={open => open && console.log('onDropdownVisibleChange')}
                              />
                           </Form.Item>
                        </Col>
                     </Row>
                  </Col>
                  <Col span={24}>
                     <Uploader name='resume' label='Резюме'
                               {...settings}
                               files={files}
                               multiple={true}
                               showUploadList={false}/>
                     <Row>
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
               <Row justify='space-between' align='bottom'>
                  <Col>
                     <Button type="default" shape="round" htmlType="button" onClick={() => changeStep(step - 1)}>
                        Назад
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

export default FormSelectCandidateCompany;