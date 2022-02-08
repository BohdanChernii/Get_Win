import React from 'react';
import {string} from 'prop-types';
import AppTitle from "@/components/ui/AppTitle.jsx";
import AppText from "@/components/ui/AppText.jsx";
import AppBenefits from "@/components/ui/AppBenefits.jsx";
import {Layout, Space} from 'antd';
const {Sider} = Layout;

AuthenticationAside.propTypes = {
   img: string, title: string, subTitle: string
};

function AuthenticationAside({img, title, subTitle}) {
   
   return (
      <Sider className='authentication__sider'>
         <Space direction='vertical' size={48}>
            <Space direction='vertical' size='large'>
               <AppTitle title={title} level={1}/>
               <AppText text={subTitle} style={{fontSize: 18, flex: '1 0 auto'}}/>
            </Space>
            
            <AppBenefits/>
            <img className='authentication__bg-img' src={img} alt='img'/>
         </Space>
      
      </Sider>
   );
}

export default AuthenticationAside;