import React, {useEffect, useState} from 'react';
import {Button, Col, message, Modal, Row} from "antd";
import danger from "@img/icons/danger-circle.svg";
import {bool, func, string} from "prop-types";
import {setUserStep} from "@assets/helpers/asyncHelpers";
import {resetVerification} from "@store/actions/company-actions";
import {getUser} from "@store/actions/user-actions";
import {useDispatch} from "react-redux";

ChangeVerifyModal.propTypes = {
   visible: bool,
   text: string,
   changeVisible: func,
};

function ChangeVerifyModal({visible, changeVisible, text}) {
   const dispatch = useDispatch();
   const [isLoading, setIsLoading] = useState(false);
   
   const resetUser = async () => {
      try {
         setIsLoading(true)
         await setUserStep(1);
         dispatch(resetVerification());
         await dispatch(getUser());
      } catch (err) {
         message.error(err.message)
      }
   }
   
   useEffect(() => {
      return () => {
         setIsLoading(false)
      };
   }, []);
   
   return (
      <Modal
         className='modal-verify_success'
         visible={visible}
         width={504}
         footer={null}
         closable={false}
         bodyStyle={{padding: '44px 24px'}}
         centered
      >
         <Row gutter={[32, 32]}>
            <Col flex={1}>
               <img className='modal-verify_success__success_img' src={danger} alt="success"/>
            </Col>
            <Col flex={1}>
               <span className='modal-verify_success__success_text'>
                  {text}
               </span>
            </Col>
            <Col flex={1}>
               <Row justify='space-between'>
                  <Col>
                     <Button type='default' onClick={() => changeVisible(!visible)}>
                        Отменить
                     </Button>
                  </Col>
                  
                  <Col>
                     <Button type="primary" shape="round" onClick={() => resetUser()} loading={isLoading}>
                        Отправить на верификацию
                     </Button>
                  </Col>
               </Row>
            </Col>
         </Row>
      </Modal>
   );
}

export default ChangeVerifyModal;