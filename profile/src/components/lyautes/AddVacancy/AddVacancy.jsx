import React, {Fragment} from 'react';
import {Layout} from "antd";
import AppSider from "@/components/ui/AppSider.jsx";
import AppTitle from "@/components/ui/AppTitle.jsx";
import AppText from "@/components/ui/AppText.jsx";
import DynamicSteps from "@/components/components/DynamicSteps/DynamicSteps.jsx";
import useAddVacancySteps from "@/hooks/steps/useAddVacancySteps.jsx";
import Success from "@/components/components/Success/Success.jsx";
import {useHistory} from "react-router-dom";
import {messages} from "@assets/helpers/messages";

const AddVacancy = () => {
   const history = useHistory();
   const {currentVacancyStep, progressStep, vacancySteps} = useAddVacancySteps();
   if (currentVacancyStep > vacancySteps.length) {
      return <Success title={messages.addVacancyMainTxt} message={messages.goToHome} successFn={() => history.push('/')}/>
   } else {
      return (
         <Layout>
            <AppSider>
               <AppTitle level={3} title='Новая вакансия' style={{marginBottom: 56}}/>
               {vacancySteps.filter(vacancy => vacancy.id === currentVacancyStep).map(vacancy => (
                  <AppText key={vacancy.id} text={vacancy.text} style={{fontWeight: 500, color: '#EDF2FF', margin: 0, fontSize: 16}}/>
               ))}
               {
                  <ul className='vacancy-layout'>
                     {vacancySteps.map(v => (
                        <li key={v.id}
                            className={`vacancy-layout__item ${v.id === currentVacancyStep ? 'progress' : v.id < currentVacancyStep ? 'done' : ''} `}>
                           <span className='vacancy-layout__step'>{v.id}</span>
                           <span className='vacancy-layout__name'>{v.name}</span>
                        </li>
                     ))}
                  </ul>
               }
            
            </AppSider>
            
            <Layout style={{backgroundColor: "#fff", padding: '56px 24px', overflow: "auto", height: '100vh'}}>
               <div style={{maxWidth: 576}}>
                  {vacancySteps.filter(vacancy => vacancy.id === currentVacancyStep).map(vacancy => (
                     <Fragment key={vacancy.id}>
                        <DynamicSteps steps={vacancy.steps} currentStep={progressStep}/>
                     </Fragment>
                  ))}
               </div>
            </Layout>
         </Layout>
      );
   }
   
}

export default AddVacancy;



