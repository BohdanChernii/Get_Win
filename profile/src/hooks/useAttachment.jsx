import React, {useState} from "react";
import {fileApi} from "@assets/helpers/api";
import {message} from "antd";
import __ from "lodash";
import axios from "axios";
import {deleteFile} from "@assets/helpers/asyncHelpers";
import {getFileFormat, getFileName, getFileSize} from "@assets/helpers/helpers";


export const useAttachment = (dir, accept = ['.doc', '.docx', '.pdf']) => {
   const [files, setFiles] = useState([]);
   const settings = {
      action: `${fileApi.add_file}?token=${localStorage.getItem('token')}&dir=${dir}`,
      accept: [...accept].join(','),
      beforeUpload: file => {
         const name = getFileName(file);
         const format = getFileFormat(file).toLocaleLowerCase();
         const size = getFileSize(file);
         const formats = accept.map(name => name.replaceAll('.', ''));
         const currentFile = files.find(item => item.name === name);
         
         if (currentFile) {
            message.error(`Файл с именем ${file.name} уже существует!`);
            return false;
         }
         
         if (!formats.includes(format)) {
            message.error(`Файл с типом "${format}" не допустим!`);
            return false;
         }
         
         setFiles(prev => [...prev, {
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
      
      onSuccess(files, __, filesDir) {
         setFiles(prev => prev.map(item => {
            const itemFullName = `${item.name}.${item.format}`;
            files.forEach(file => {
               if (file.name.toLocaleLowerCase() === itemFullName.toLocaleLowerCase()) {
                  item.href = file.url;
                  item.status = 'done';
                  item.progress = 100;
                  item.dir = filesDir;
               }
            });
            return item;
         }))
      },
      
      onError(err) {
         console.error(err)
         message.error(`Штото пошло не так: ${err}`);
         setFiles([])
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
                  setFiles(prev => prev.map(item => {
                     if (item.name === name) {
                        item.progress = progress - 1;
                     }
                     return item
                  }))
               }
            })
            .then(({data, status}) => {
               if (status === 200 && !data.error) {
                  onSuccess(data.files, dir)
               } else {
                  throw data.msg
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
   
   const removeFile = async id => {
      const {name, format, dir} = files.find(file => file.id === id);
      const fullName = `${name}.${format}`;
      setFiles(prev => prev.map(file => {
         if (file.id === id) {
            file.status = 'loading';
            file.progress = 99;
         }
         return file
      }))
      const res = await deleteFile(dir, fullName);
      if (res === 200) {
         setFiles(prev => prev.filter(item => item.name + '.' + item.format !== fullName));
      }
   }
   
   return {
      files,
      setFiles,
      settings,
      removeFile,
   }
}