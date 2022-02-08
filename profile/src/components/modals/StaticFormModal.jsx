import React, {useEffect} from 'react';
import {bool, element, func, string} from 'prop-types';
import {Col, Modal, Row} from "antd";
import CloseModalIcon from "@/components/icons/CloseModalIcon/CloseModalIcon.jsx";
import successIcon from "@img/icons/succes-icon.svg";

StaticFormModal.propTypes = {
   title: string,
   text: string,
   component: element,
   visible: bool,
   changeVisible: func,
   img: string,
   isHideAside: bool,
   isSuccess: bool,
   successFn: func,
   successMessage: string,
};

function StaticFormModal(props) {
   const {
      title,
      text,
      visible,
      changeVisible,
      component: FormComponent,
      img,
      isHideAside,
      isSuccess,
      successFn,
      successMessage,
      ...rest
   } = props;
   
   
   const currentTitle = isSuccess ? '' : title;
   const currentText = isSuccess ? successMessage : text;
   
   useEffect(() => {
      const index = setTimeout(() => {
         isSuccess && successFn();
      }, 2500);
      return () => {
         clearTimeout(index)
      }
   }, [isSuccess]);
   
   return (
      <Modal className='static-modal'
             visible={visible}
             footer={null}
             width={!isHideAside ? 984 : 504}
             onCancel={() => changeVisible(!visible)}
             style={{paddingBottom: 0}}
             bodyStyle={{padding: 0}}
             centered
             closable={!isSuccess}
             closeIcon={<CloseModalIcon onClick={() => changeVisible(!visible)}/>}
             {...rest}
      >
         <Row wrap={false} className={`static-modal__wrapper ${isHideAside ? 'small' : ''}`}>
            {!isHideAside ? (
               <Col flex={isSuccess ? '100%' : `360px`} className={`static-modal__aside`}>
                  <div className={`static-modal__aside-content aside-content  ${isSuccess ? 'aside-content-success' : ''}`}>
                     <div className="aside-content__body">
                        {isSuccess && <img className='success__icon' src={successIcon} alt="successIcon"/>}
                        <h4 className={'aside-content__title'}>{currentTitle}</h4>
                        <p className={'aside-content__message'}>{currentText}</p>
                     </div>
                     {img && (
                        <div className="aside-content__footer">
                           <Row align='bottom' justify='center'>
                              <Col>
                                 <img className='aside-content__img' src={img} alt="img-bg"/>
                              </Col>
                           </Row>
                        </div>
                     )}
                  </div>
               </Col>
            ) : null}
            {!isSuccess && (
               <Col flex={1} className='static-modal__content'>
                  {FormComponent}
               </Col>
            )}
         </Row>
      </Modal>
   );
}

export default StaticFormModal;