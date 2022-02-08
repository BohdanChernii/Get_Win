import React, {useEffect, useState} from 'react';
import {Col, Divider, Row} from "antd";
import {func, number} from "prop-types";
import {colors} from "@assets/helpers/colors";
import icons from "@/components/icons/tooltips/inputTag.jsx";

TooltipInputTagTitle.propTypes = {
   changeColor: func,
   changeIcon: func,
   colorId: number,
   iconId: number,
};

function TooltipInputTagTitle({colorId, iconId, changeColor, changeIcon, width}) {
   const [gap, setGap] = useState(0);
   const [currentColor, setCurrentColor] = useState('');
   
   useEffect(() => {
      if (colorId && iconId) {
         const {color} = colors.find(({id}) => id === colorId);
         setCurrentColor(color);
      }
   }, [colorId, iconId]);
   useEffect(() => {
      if (width >= 478) {
         setGap(3)
      }
      if (width >= 486) {
         setGap(7)
      }
      if (width >= 526) {
         setGap(12)
      }
      if (width >= 558) {
         setGap(14)
      }
   }, [width]);
   
   return (
      <div className='tooltip_input_tag'>
         
         <div className="tooltip_input_tag__colors">
            <Row align='middle' justify='space-between'>
               {colors.map(({id, color}) => (
                  <Col key={id}>
                     <div
                        className={`tooltip_input_tag__color ${id === colorId ? 'selected' : ''}`}
                        onClick={() => changeColor(id)}
                        style={{backgroundColor: color}}>
                     </div>
                  </Col>
               ))}
            </Row>
         </div>
         <Divider style={{marginTop: 0, marginBottom: 12}}/>
         <div className="tooltip_input_tag__icons">
            <Row align='middle' justify='space-between' gutter={[gap, 16]}>
               {icons.map(({id, icon: Icon}) => (
                  <Col key={id}>
                     <div
                        className={`tooltip_input_tag__icon ${id === iconId ? currentColor && 'selected' : ''}`}
                        onClick={() => changeIcon(id)}
                        style={{
                           backgroundColor: id === iconId ? currentColor && currentColor : 'transparent',
                        }}>
                        <Icon/>
                     </div>
                  </Col>
               ))}
            </Row>
         </div>
      </div>
   );
}

export default TooltipInputTagTitle;

