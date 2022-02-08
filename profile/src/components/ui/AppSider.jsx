import React from 'react';
import Sider from "antd/es/layout/Sider";

function AppSider({children}) {

   return (
      <Sider
         theme='light'
         trigger={null}
         collapsible
         className='sider _app-sider'>
         {children}
      </Sider>
   );
}

export default AppSider;