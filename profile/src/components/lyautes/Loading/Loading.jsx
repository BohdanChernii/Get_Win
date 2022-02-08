import React from 'react';
import {Spin} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';

function Loading({text, styleSpin}) {
   const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;
   return (
      <div className='spin' style={{...styleSpin}}>
         <Spin size='large' indicator={antIcon} tip={text}/>
      </div>
   );
}

export default Loading;