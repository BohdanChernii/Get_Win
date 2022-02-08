import React from 'react';
import {Typography} from 'antd';
import {number, object, string} from "prop-types";

const {Title} = Typography

AppTitle.propTypes = {
   title: string,
   level: number,
   style: object
}

function AppTitle({title, level, style}) {
   return (
      <Title level={level} style={{color: '#ffffff', fontWeight: 700, ...style}}>{title}</Title>
   );
}

export default AppTitle;