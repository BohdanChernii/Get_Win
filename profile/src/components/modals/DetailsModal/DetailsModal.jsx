import React, {useEffect} from 'react';
import {array, bool, func, string} from 'prop-types';
import {Col, Modal, Row} from "antd";
import deleteIcon from "@img/icons/remove.svg";
import CloseModalIcon from "@/components/icons/CloseModalIcon/CloseModalIcon.jsx";

DetailsModal.propTypes = {
   visible: bool,
   data: array,
   removeItem: func,
   changeVisible: func,
   title: string,
};

function DetailsModal({data, removeItem, visible, changeVisible, title}) {
   
   useEffect(() => {
      if (!data.length) {
         changeVisible()
      }
   }, [data])
   
   return (
      <Modal
         visible={visible}
         title={title}
         width='80vw'
         destroyOnClose
         okText='Применить'
         onOk={() => changeVisible(!visible)}
         cancelButtonProps={{style: {display: 'none'}}}
         bodyStyle={{height: '75vh', overflow: 'auto'}}
         closable
         centered
         closeIcon={<CloseModalIcon onClick={() => changeVisible(!visible)}/>}
      >
         <Row className='position-details' gutter={[0, 8]}>
            {data.map(el => (
               <Col span={24} key={el.id}>
                  <Row wrap={false} gutter={[8, 0]}>
                     <Col className={`position-details__item `} flex={1}>
                        <span className={`position-details__name`}>{el.name}</span>
                        <img className='position-details__remove' src={deleteIcon} alt="delete"
                             onClick={() => removeItem(el.id)}/>
                     </Col>
                  </Row>
               </Col>
            ))}
         </Row>
      </Modal>
   );
}

export default DetailsModal;