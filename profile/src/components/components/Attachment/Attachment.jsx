import React from 'react';
import downloadIcon from "@img/icons/download-file.svg";
import removeIcon from "@img/icons/remove.svg";
import {LoadingOutlined} from "@ant-design/icons";
import {Progress} from "antd";
import {bool, func, object} from "prop-types";


Attachment.propTypes = {
   file: object,
   isEditable: bool,
   onRemove: func,
   isDownload: bool,
   showProgress: bool,
};

function Attachment({file, isEditable, onRemove, isDownload, showProgress}) {
   return (
      <div className="attachment">
         <div className="attachment__content">
            <div className="attachment__format-box">
               {file.status === 'loading'
                  ? <LoadingOutlined size='default'/>
                  : file.status === 'done' && <span className='attachment__format-text'>{file.format}</span>}
            </div>
            <div className="attachment__block">
               
               <div className="attachment__info">
                  <span className='attachment__name'>{file.name}</span>
                  <span className='attachment__size'>{file.size}</span>
               </div>
            
            </div>
            {isEditable && file.status === 'done' && (
               <div className="attachment__icons">
                  {isEditable && isDownload && (
                     <a
                        href={file.href} target="_blank" download={file.name}>
                        <img src={downloadIcon} alt='downloadIcon' className='attachment__icon'/>
                     </a>)}
                  <img src={removeIcon} alt='downloadIcon' className='attachment__icon' onClick={onRemove}/>
               </div>
            )}
         </div>
         {file.progress > 0 && showProgress && <Progress size='small' strokeColor={'#4E5AF2'} percent={file.progress}/>}
      </div>
   );
}

export default Attachment;