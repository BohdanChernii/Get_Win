import React from 'react';
import useProfileSteps from "@/hooks/steps/useProfileSteps.jsx";
import Success from "@/components/components/Success/Success.jsx";
import {messages} from "@assets/helpers/messages";
import {useHistory} from "react-router-dom";
import {Layout, message} from "antd";
import AppSider from "@/components/ui/AppSider.jsx";
import AppTitle from "@/components/ui/AppTitle.jsx";
import AppText from "@/components/ui/AppText.jsx";
import DynamicSteps from "@/components/components/DynamicSteps/DynamicSteps.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setUserStep} from "@assets/helpers/asyncHelpers";
import {getUser} from "@store/actions/user-actions";
import {getCompanyInfoAction} from "@store/actions/company-actions";

CompanyRegistrationOther.propTypes = {};

function CompanyRegistrationOther() {
   const dispatch = useDispatch();
   const {user} = useSelector(state => state.user)
   const history = useHistory();
   const {profileSteps, currentProfileStep} = useProfileSteps();
   
   const onFinish = async () => {
      try {
         await setUserStep(user && parseInt(user?.step) + 1)
         history.push('/')
         await dispatch(getUser())
         await dispatch(getCompanyInfoAction())
      } catch (e) {
         message.error({content: e})
      }
   }
   if (currentProfileStep > profileSteps.length) {
      return <Success title='Новая Компания успешно создана и добавлена в базу. ' message={messages.goToHome}
                      successFn={() => onFinish()}/>
   } else {
      return (
         <Layout>
            <AppSider>
               <AppTitle level={3} title='Компания' style={{marginBottom: 56}}/>
               <AppText
                  text='Заполните и подтвердите информацию о компании, чтобы использовать весь функционал платформы.'
                  style={{fontWeight: 500, color: '#EDF2FF', margin: 0, fontSize: 16}}/>
            </AppSider>
            
            <Layout style={{backgroundColor: "#fff", padding: '48px 24px', overflow: "auto", height: '100vh'}}>
               <div style={{maxWidth: 576}}>
                  <DynamicSteps steps={profileSteps} currentStep={currentProfileStep}/>
               </div>
            </Layout>
         </Layout>
      );
   }
}

export default CompanyRegistrationOther;