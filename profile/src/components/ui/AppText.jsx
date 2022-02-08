import React from 'react';
import {object, string} from 'prop-types';
import {Typography} from 'antd';

const {Text} = Typography

AppText.propTypes = {
   text: string, style: object
};

function AppText({text, style}) {
   return (
      <Text style={{color: '#ffffff', fontWeight: 400, ...style}}>{text}</Text>
   );
}

export default AppText;