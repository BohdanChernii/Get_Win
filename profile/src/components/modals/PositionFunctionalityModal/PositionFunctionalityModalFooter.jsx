import React from 'react';
import {Button, Row} from "antd";
import {func} from "prop-types";

PositionFunctionalityModalFooter.propTypes = {
   onClick: func,
};

function PositionFunctionalityModalFooter({onClick}) {
   return (
      <div className='functionality-modal__footer'>
         <Row justify='end'>
            <Button type="primary" shape="round" onClick={onClick}>Применить</Button>
         </Row>
      </div>
   );
}

export default PositionFunctionalityModalFooter;