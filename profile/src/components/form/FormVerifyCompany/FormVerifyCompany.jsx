import React, {useLayoutEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {Button, Form, message, Upload} from "antd";
import AppText from "@/components/ui/AppText.jsx";
import Attachment from "@/components/components/Attachment/Attachment.jsx";
import {fileApi} from "@assets/helpers/api";
import {getFileFormat, getFileName, getFileSize, normFile} from "@assets/helpers/helpers";
import {deleteFile, setUserStep} from "@assets/helpers/asyncHelpers";
import {getUser} from "@store/actions/user-actions";
import {getCompanyInfoAction, setVerificationInProgress} from "@store/actions/company-actions";
import {useHistory} from "react-router-dom";
import __ from "lodash";


function FormVerifyCompany() {
   const dir = 'EDR';
   const token = localStorage.getItem('token')
   
   const dispatch = useDispatch();
   const {user} = useSelector(state => state.user);
   
   const history = useHistory();
   const [form] = Form.useForm();
   
   const [loading, setLoading] = useState(false);
   const [fileList, setFileList] = useState([]);
   const loadingFiles = fileList.filter(item => item.status === 'loading');
   
   const handleOnRemoveFile = async name => {
      setFileList(prev => prev.map(item => {
         if (item.name === name) {
            item.status = 'loading';
            item.progress = 99;
         }
         return item
      }));
      const res = await deleteFile(dir, name);
      if (res === 200) {
         setFileList(prev => prev.filter(item => item.name + '.' + item.format !== name));
         const files = fileList.filter(item => item.name + '.' + item.format !== name);
         form.setFields([{name: 'files', value: files}])
      }
   }
   
   const props = {
      name: 'some_files',
      action: `${fileApi.add_file}?token=${token}&dir=${dir}`,
      accept: '.png,.jpg,.jpeg,.PNG,.JPG,.JPEG,.doc,.docx,.pdf',
      multiple: true,
      showUploadList: false,
      beforeUpload: file => {
         const name = getFileName(file);
         const format = getFileFormat(file).toLocaleLowerCase();
         const size = getFileSize(file);
         const formats = ['png', 'jpg', 'jpeg', 'doc', 'docx', 'pdf'];
         const currentFile = fileList.find(item => item.name === name);
         
         if (currentFile) {
            message.error(`Файл с именем ${file.name} уже существует!`);
            return false;
         }
         
         if (!formats.includes(format)) {
            message.error(`Файл с типом "${format}" не допустим!`);
            return false;
         }
         if (Math.floor(file.size / 1024 / 1024) > 10) {
            message.error(`Файл не может бить больше 10MB!`);
            return false;
         }
         
         setFileList(prev => [...prev, {
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
         
         setFileList(prev => prev.map(item => {
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
      },
      progress: {
         strokeColor: {
            '0%': '#108ee9',
            '100%': '#87d068',
         },
         strokeWidth: 3,
         format: percent => `${parseFloat(percent.toFixed(2))}%`,
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
                  setFileList(prev => prev.map(item => {
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
   
   const handleOnFinish = async () => {
      try {
         setLoading(true)
         await setUserStep(4);
         await dispatch(getCompanyInfoAction());
         await dispatch(getUser());
         dispatch(setVerificationInProgress())
         history.push('/')
      } catch (e) {
         setLoading(false)
         console.error(e)
         message.error({content: e})
      }
   }
   
   useLayoutEffect(() => {
      if (user && parseInt(user?.step) === 4) {
         history.push('/')
      }
   }, [user?.step])
   
   return (
      <Form
         name="set-company-verify"
         initialValues={{files: []}}
         size='large'
         layout='vertical'
         form={form}
         className='form'
         onFinish={handleOnFinish}>
         <AppText text='Верификация компании'
                  style={{
                     color: '#20272E',
                     fontSize: 18,
                     fontWeight: 700,
                     marginBottom: 24,
                     lineHeight: 1.5715,
                     display: 'block'
                  }}/>
         
         <Form.Item label="Файл выписки с ЕДР">
            <Form.Item name="files" valuePropName="fileList" noStyle getValueFromEvent={normFile}>
               <Upload.Dragger {...props} name="files">
                  <p className="_upload-text">Перетащите сюда файл или <span className='link _bold'>Загрузите</span></p>
               </Upload.Dragger>
            </Form.Item>
            <div className='form__row' style={{flexDirection: 'column', gap: 6, alignItems: 'stretch', paddingTop: 12}}>
               {fileList.map(file => (
                  <Attachment key={file.id} file={file} isEditable isDownload showProgress
                              onRemove={() => handleOnRemoveFile(`${file.name}.${file.format}`)}/>
               ))}
            </div>
         </Form.Item>
         
         <Form.Item className='form__container'>
            <div className='form__row _right'>
               <Button type="primary" htmlType="submit" shape='round' disabled={fileList.length === 0 || loadingFiles.length > 0}
                       loading={loading}>
                  Подтвердить
               </Button>
            </div>
         </Form.Item>
      </Form>
   );
}

export default FormVerifyCompany;
