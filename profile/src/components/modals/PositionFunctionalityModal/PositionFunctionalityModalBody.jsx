import React, {Fragment} from 'react';
import {func, object, string} from 'prop-types';
import {Checkbox, Col, Row, Typography} from "antd";
import PositionFunctionalityModalPositionNames from "@/components/modals/PositionFunctionalityModal/PositionFunctionalityModalPositionNames.jsx";
import PositionFunctionalityModalPositionItems from "@/components/modals/PositionFunctionalityModal/PositionFunctionalityModalPositionItems.jsx";
import PositionFunctionalityModalPositionSelected
   from "@/components/modals/PositionFunctionalityModal/PositionFunctionalityModalPositionSelected.jsx";

PositionFunctionalityModalBody.propTypes = {
   title: string,
   positionsId: string,
   setPositionId: func,
   addItem: func,
   removeItem: func,
   positionData: object,
};

function PositionFunctionalityModalBody(
   {
      title,
      positionsId,
      setPositionId,
      positionData,
      addItem,
      removeItem
   }) {
   const {indeterminateSelected, checkAllSelected, onChangeAllCheckListFunctionality} = positionData;
   return (
      <div className='functionality-modal__body'>
         <Row className='functionality-modal__row' wrap={false}>
            <Fragment>
               <Col className='functionality-modal__column functionality-modal__column_left'>
                  <Typography.Text className='functionality-modal__text'>Должности</Typography.Text>
                  <PositionFunctionalityModalPositionNames
                     positionsId={positionsId}
                     setPositionId={setPositionId}
                     positionData={positionData}
                  />
               </Col>
               
               <Col className='functionality-modal__column functionality-modal__column_center'>
                  <Typography.Text className='functionality-modal__text'>{title}</Typography.Text>
                  
                  <PositionFunctionalityModalPositionItems
                     positionData={positionData}
                     addItem={addItem}
                     removeItem={removeItem}
                  />
               </Col>
               
               <Col className='functionality-modal__column functionality-modal__column_right'>
                  <Checkbox className='functionality-list__item' checked={checkAllSelected}
                            indeterminate={indeterminateSelected} onChange={onChangeAllCheckListFunctionality}>
                     <Typography.Text className='functionality-modal__text'>Выбранные</Typography.Text>
                  </Checkbox>
                  <PositionFunctionalityModalPositionSelected positionData={positionData}/>
               </Col>
            </Fragment>
         </Row>
      </div>
   );
}

export default PositionFunctionalityModalBody;