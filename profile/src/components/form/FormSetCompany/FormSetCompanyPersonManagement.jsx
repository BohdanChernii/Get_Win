import React, {useEffect, useState} from 'react';
import {func, number} from 'prop-types';
import {useDispatch, useSelector} from "react-redux";
import {Button, Col, Form, message, Row, Switch, Upload} from "antd";
import {deleteFile, setCompanyInfo} from "@assets/helpers/asyncHelpers";
import AppText from "@/components/ui/AppText.jsx";
import Attachment from "@/components/components/Attachment/Attachment.jsx";
import AppSelect from "@/components/ui/AppSelect.jsx";
import {getFileFormat, getFileName, getFileSize, normFile} from "@assets/helpers/helpers";
import {fileApi} from "@assets/helpers/api";
import __ from "lodash";
import axios from "axios";
import {useAddItemToDropDownList} from "@/hooks/useAddItemToDropDownList";
import {rules} from "@assets/helpers/messages";
import {getCompanyInfoAction} from "@store/actions/company-actions";

FormSetCompanyPersonManagement.propTypes = {
   changeStep: func,
   step: number,
};

function FormSetCompanyPersonManagement({changeStep, step}) {
   const addItemToDropDownList = useAddItemToDropDownList();
   const dispatch = useDispatch();
   const {lists, company} = useSelector(state => ({
      lists: state.dropDownList.lists,
      company: state.company.company
   }))
   const [form] = Form.useForm();
   
   const [isSwitch, setIsSwitch] = useState(true);
   const [policyFiles, setPolicyFiles] = useState([]);
   
   const dir = 'policy';
   
   const onFinish = async () => {
      const key = 'set-company-management';
      const formValues = form.getFieldsValue();
      message.loading({content: 'Загрузка', key})
      try {
         const json = await setCompanyInfo(formValues);
         if (json.ok) {
            message.success({content: 'Структура компании обновлена', key});
            await dispatch(getCompanyInfoAction());
            changeStep(step + 1)
         } else {
            message.error({content: 'Ошибка', key})
         }
      } catch (e) {
         message.error({content: e.message, key})
      }
   }
   const handleOnChangeSwitch = (switchState) => {
      setIsSwitch(switchState)
   }
   
   const props = {
      name: 'file',
      action: `${fileApi.add_file}?token=${localStorage.getItem('token')}&dir=${dir}`,
      showUploadList: false,
      accept: '.doc,.docx,.pdf',
      beforeUpload: file => {
         const name = getFileName(file);
         const format = getFileFormat(file).toLocaleLowerCase();
         const size = getFileSize(file);
         
         const formats = ['doc', 'docx', 'pdf']
         const currentFile = policyFiles.find(item => item.name === name);
         
         if (currentFile) {
            message.error(`Файл с именем ${file.name} уже существует!`);
            return false;
         }
         
         if (!formats.includes(format)) {
            message.error(`Файл с типом "${format}" не допустим!`);
            return false;
         }
         
         setPolicyFiles(prev => [...prev, {
            id: __.uniqueId(),
            name,
            format,
            size,
            href: '',
            status: 'loading',
            progress: 0,
         }]);
         
         return file
      },
      
      onSuccess(files) {
         setPolicyFiles(prev => prev.map(item => {
            const itemFullName = `${item.name}.${item.format}`;
            files.forEach(file => {
               if (file.name.toLocaleLowerCase() === itemFullName.toLocaleLowerCase()) {
                  item.href = file.url;
                  item.status = 'done';
                  item.progress = 100;
               }
            })
            return item;
         }))
      },
      onError(err) {
         console.error(err)
         message.error(`Штото пошло не так: ${err}`);
         setPolicyFiles(null)
      },
      customRequest: async (props) => {
         const {action, file, onError, onSuccess, withCredentials} = props;
         const formData = new FormData();
         formData.append("file", file);
         
         await axios
            .post(action, formData, {
               headers: {
                  'Content-Type': 'multipart/form-data',
                  'Accept': 'application/json',
               },
               withCredentials,
               onUploadProgress: (e) => {
                  const progress = Math.floor(e.loaded / e.total * 100);
                  const name = getFileName(file);
                  setPolicyFiles(prev => prev.map(item => {
                     if (item.name === name) {
                        item.progress = progress - 1;
                     }
                     return item
                  }))
               }
            })
            .then((data) => {
               if (data.status === 200) {
                  onSuccess(data.data.files)
               }
            })
            .catch(err => onError(err));
         return {
            abort() {
               message.error("Процесс загрузки прерван.");
            }
         };
      },
   };
   
   const handleOnRemoveFile = async fullName => {
      setPolicyFiles(prev => prev.map(item => {
         if (`${item.name}.${item.format}` === fullName) {
            item.status = 'loading';
            item.progress = 99;
         }
         return item
      }))
      const res = await deleteFile(dir, fullName);
      if (res === 200) {
         setPolicyFiles(prev => prev.filter(item => item.name + '.' + item.format !== fullName));
      }
   }
   
   useEffect(() => {
      if (company) {
         form.setFields([
            {name: 's_selection_stages', value: company?.s_selection_stages?.map(item => item.name)},
            {name: 's_training', value: company?.s_training?.map(item => item.name)},
         ]);
      }
   }, [company]);
   
   return (
      <Form
         name="set-company-management"
         layout='vertical'
         size='large'
         onFinish={onFinish}
         form={form}
         className='form'
      >
         <AppText text='Управление персоналом'
                  style={{
                     color: '#20272E',
                     fontSize: 18,
                     fontWeight: 700,
                     marginBottom: 24,
                     lineHeight: 1.5715,
                     display: 'block'
                  }}/>
         
         <Form.Item name="s_selection_stages" label="Этапы отбора" rules={[{required: true, message: rules.required}]}>
            <AppSelect options={lists?.s_selection_stages}
                       placeholder="Необходимо выбрать и проставить в последовательности этапы отбора"
                       mode="multiple"/>
         </Form.Item>
         
         <Form.Item label="Обучение и развитие персонала" required={isSwitch} style={{marginBottom: 0}}>
            <Row align='middle' gutter={12} style={{maxHeight: 64}}>
               <Col span={4} style={{transform: 'translateY(-50%)'}}>
                  <Switch style={{width: '100%'}} checkedChildren="Да" unCheckedChildren="Нет" defaultChecked onChange={handleOnChangeSwitch}/>
               </Col>
               
               <Col flex={1}>
                  <Form.Item name="s_training" rules={[{required: isSwitch, message: rules.required}]}>
                     <AppSelect options={lists?.s_training} disabled={!isSwitch}
                                placeholder="Обучение и развитие персонала" mode="multiple" isHaveFooter
                                onSubmit={name => addItemToDropDownList('s_training', name)}/>
                  </Form.Item>
               </Col>
            </Row>
         
         </Form.Item>
         
         <Form.Item label="Кадровая политика">
            <Form.Item valuePropName="fileList" getValueFromEvent={normFile} noStyle>
               <Upload.Dragger {...props} className={`form__dragger ${policyFiles.length > 0 ? 'disabled' : ''}`}>
                  <p className="_upload-text">Перетащите сюда файл или <span className='link _bold'>Загрузите</span></p>
               </Upload.Dragger>
            </Form.Item>
            <div className='form__row' style={{flexDirection: 'column', gap: 6, alignItems: 'stretch', paddingTop: 12}}>
               {policyFiles.map(file => (
                  <div key={file.id} className='form__attachment'>
                     <Attachment file={file} isEditable isDownload showProgress
                                 onRemove={() => handleOnRemoveFile(`${file.name}.${file.format}`)}/>
                  </div>
               ))}
            </div>
         </Form.Item>
         
         <Form.Item>
            <div className='form__row _between'>
               <Button disabled={policyFiles?.status === 'loading'} shape="round" type="default" htmlType="button"
                       onClick={() => changeStep(step - 1)}>
                  Назад
               </Button>
               <Button disabled={policyFiles?.status === 'loading'} shape="round" type="primary" htmlType="submit">
                  Сохранить и продолжить
               </Button>
            </div>
         </Form.Item>
      
      </Form>
   );
}

export default FormSetCompanyPersonManagement;