import React from 'react';
import {bool, func, string} from 'prop-types';
import {Modal} from "antd";
import CloseModalIcon from "@/components/icons/CloseModalIcon/CloseModalIcon.jsx";
import close from "@img/icons/close.svg";


InProgressVerifyModal.propTypes = {
   text: string,
   visible: bool,
   changeVisible: func,
};

function InProgressVerifyModal({text, changeVisible, visible}) {
   return (
      <Modal
         className='modal-verify_progress'
         style={{top: 0, minWidth: '100vw'}}
         visible={visible}
         footer={null}
         title={text}
         bodyStyle={{display: "none"}}
         closeIcon={<div onClick={() => changeVisible(!visible)}
                         className='modal-verify_progress__close-container'>
            <CloseModalIcon srcImg={close}/></div>}
      />
   );
}

export default InProgressVerifyModal;