import React from 'react';
import {Form, Upload} from "antd";
import {normFile} from "@assets/helpers/helpers";
import {array, bool, object, string} from "prop-types";

Uploader.propTypes = {
   files: array.isRequired,
   multiple: bool.isRequired,
   showUploadList: bool.isRequired,
   itemStyle: object,
   name: string,
   label: string,
};

function Uploader({files, showUploadList, name, label, itemStyle, ...rest}) {
   const isLoading = files.filter(file => file.status === 'loading').length;
   return (
      <Form.Item style={itemStyle} name={name} label={label} valuePropName="fileList" getValueFromEvent={normFile}>
         <Upload.Dragger {...rest} showUploadList={showUploadList} className={`form__dragger ${isLoading ? 'disabled' : ''}`}>
            <p className="_upload-text">Перетащите сюда файл или <span className='link _bold'>Загрузите</span></p>
         </Upload.Dragger>
      </Form.Item>
   );
}

export default Uploader;