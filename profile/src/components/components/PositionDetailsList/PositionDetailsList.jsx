import React, {useEffect, useState} from 'react';
import {array, bool, func, string} from 'prop-types';
import {Col, Row} from "antd";
import deleteIcon from "@img/icons/remove.svg";
import DetailsModal from "@/components/modals/DetailsModal/DetailsModal.jsx";

PositionDetailsList.propTypes = {
   details: array,
   clearDetails: func,
   modalTitle: string,
   visible: bool,
   changeVisible: func
};

function PositionDetailsList({details, clearDetails, modalTitle}) {
   const [visible, setVisible] = useState(false);
   const [options, setOptions] = useState([]);
   const [otherOptions, setOtherOptions] = useState([]);
   useEffect(() => {
      if (details.length > 3) {
         setOptions(details.slice(0, 2));
         setOtherOptions(details.slice(2));
      } else {
         setOptions(details);
         setOtherOptions([]);
      }
   }, [details]);
   
   
   return (
      <>
         <DetailsModal title={modalTitle} data={details} changeVisible={setVisible} visible={visible} removeItem={clearDetails}/>
         <Row className='position-details' gutter={[8, 8]}>
            {options.filter(f => f.selected).map(f => (
               <Col span={24} key={f.id}>
                  <div className='position-details__item'>
                     <span className='position-details__name'>{f.name}</span>
                     <img className='position-details__remove' src={deleteIcon} alt="delete" onClick={() => clearDetails(f.id)}/>
                  </div>
               
               </Col>
            ))}
            {!!otherOptions.length && (
               <Col span={24}>
                  <Row wrap={false}>
                     <Col span={22}>
                        <div className='position-details__item'>
                           <span className='position-details__name'>{otherOptions[0].name}</span>
                           <img className='position-details__remove' src={deleteIcon} alt="delete" onClick={() => clearDetails(otherOptions[0].id)}/>
                        </div>
                     
                     </Col>
                     <Col span={2}>
                        <Row wrap={false} justify='end' align='middle'>
                           <span className='position-details__length' onClick={() => setVisible(!visible)}>+ {otherOptions.length - 1}</span>
                        </Row>
                     </Col>
                  </Row>
               </Col>
            )}
         </Row>
      </>
   );
}

export default PositionDetailsList;