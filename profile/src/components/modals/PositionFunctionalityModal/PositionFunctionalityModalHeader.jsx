import React from 'react';
import PropTypes, {func, object, string} from 'prop-types';
import {Col, Row, Tabs} from "antd";

PositionFunctionalityModalHeader.propTypes = {
   positionData: object
};

function PositionFunctionalityModalHeader({positionData}) {
   const {changeTabIndex} = positionData;
   return (
      <Row>
         <Col span={12}>
            <Tabs className='functionality-modal__header' onChange={index => changeTabIndex(index)}>
               <Tabs.TabPane tab="Все" key="1"/>
               <Tabs.TabPane tab="База данных" key="2"/>
               <Tabs.TabPane tab="Мои" key="3"/>
            </Tabs>
         </Col>
      </Row>
   );
}

export default PositionFunctionalityModalHeader;