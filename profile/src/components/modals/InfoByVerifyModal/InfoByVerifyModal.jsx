import React, {useEffect, useState} from 'react';
import {bool, func, string} from 'prop-types';
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getUser} from "@store/actions/user-actions";
import {Button, Col, Modal, Row} from "antd";
import success from "@img/icons/success-icon-green.svg";
import danger from "@img/icons/danger-circle.svg";
import {companyStatus, companyStatusText} from "@assets/helpers/constants";
import {setUserStep} from "@assets/helpers/asyncHelpers";
import {resetVerification, setVerificationDone} from "@store/actions/company-actions";

InfoByVerifyModal.propTypes = {
   visible: bool,
   status: string,
   changeVisible: func,
};

function InfoByVerifyModal({visible, changeVisible, status}) {
   const dispatch = useDispatch();
   
   const [isLoading, setIsLoading] = useState(false);
   
   const isSuccess = status === companyStatus.SUCCESS
   const text = isSuccess ? companyStatusText.SUCCESS : companyStatusText.FAILED;
   const src = isSuccess ? success : danger;
   
   const history = useHistory()
   const goToDeputy = () => {
      history.push('/add-deputy');
   }
   const goToCompany = () => {
      setIsLoading(true)
      dispatch(setVerificationDone());
      history.push('/company');
   }
   
   const checkPath = () => {
      isSuccess
         ? goToCompany()
         : resetUser()
   }
   
   const resetUser = async () => {
      setIsLoading(true)
      await setUserStep(1);
      dispatch(resetVerification());
      await dispatch(getUser());
   }
   
   useEffect(() => {
      setIsLoading(false)
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
               <img className='modal-verify_success__success_img' src={src} alt="success"/>
            </Col>
            <Col flex={1}>
               <span className='modal-verify_success__success_text'>
                  {text}
               </span>
            </Col>
            <Col flex={1}>
               <Row justify={isSuccess ? 'space-between' : 'center'}>
                  {isSuccess && (
                     <Col>
                        <Button shape="round" type='default' onClick={() => goToDeputy()}>
                           Назначить заместителя
                        </Button>
                     </Col>
                  )}
                  
                  <Col>
                     <Button type="primary" shape="round" onClick={() => checkPath()} loading={isLoading}>
                        Заполнить информацию
                     </Button>
                  </Col>
               </Row>
            </Col>
         </Row>
      </Modal>
   );
}

export default InfoByVerifyModal;