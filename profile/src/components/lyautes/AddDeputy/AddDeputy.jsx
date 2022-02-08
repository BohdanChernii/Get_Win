import React, {useState} from 'react';
import AuthenticationAside from "@/components/lyautes/Authentication/AuthenticationAside.jsx";
import bgAside from "@img/bg-aside.svg";
import {Form, Layout} from "antd";
import {Content} from "antd/es/layout/layout";
import {companyAddDeputyText} from "@assets/helpers/constants";
import FormAddDeputy from "@/components/form/FormAddDeputy/FormAddDeputy.jsx";
import Success from "@/components/components/Success/Success.jsx";
import {messages} from "@assets/helpers/messages";
import {useHistory} from "react-router-dom";
import StaticFormModal from "@/components/modals/StaticFormModal.jsx";
import girl from "@img/girl-ilustaration.svg";
import DeputyForm from "@/components/form/FormAddDeputy/DeputyForm.jsx";
import __ from "lodash";
import {checkFormValues} from "@assets/helpers/helpers";


function AddDeputy() {
   const [form] = Form.useForm();
   const history = useHistory()
   const [isSuccess, setIsSuccess] = useState(false);
   const [visibleDeputy, setVisibleDeputy] = useState(false);
   const [otherDeputy, setOtherDeputy] = useState([]);
   const [deputySelectedId, setDeputySelectedId] = useState(0);
   
   const onRemove = id => {
      setOtherDeputy(prev => prev.filter(item => item.id !== id))
   }
   const onOpen = id => {
      setDeputySelectedId(id)
      const deputy = otherDeputy.find(item => item.id === id);
      const formValues = form.getFieldsValue();
      
      for (const deputyElement in deputy) {
         if (Object.hasOwn(formValues, deputyElement)) {
            form.setFields([{name: deputyElement, value: deputy[deputyElement]}])
         }
      }
      setVisibleDeputy(true)
   }
   const onFinish = (values) => {
      const formValues = checkFormValues(values)
      const email = otherDeputy.find(item => item.email === formValues.email)?.email;
      if (email && !deputySelectedId) {
         form.setFields([{name: 'email', errors: ['Заместитель с таким адресом уже добавлен!']}])
         return
      }
      
      if (deputySelectedId) {
         setOtherDeputy(prev => prev.map(item => {
            if (item.id.toString() === deputySelectedId.toString()) {
               return {...formValues, id: item.id}
            }
            return item
         }))
         setDeputySelectedId(0)
      } else {
         setOtherDeputy(prev => [{id: __.uniqueId(), ...formValues}, ...prev])
      }
      setVisibleDeputy(!visibleDeputy);
      form.resetFields();
   }
   
   if (isSuccess) {
      return <Success title={messages.deputyRegistration}
                      img={bgAside}
                      message={messages.goToHome}
                      successFn={() => history.push('/')}
      />
   } else {
      return (
         <>
            <StaticFormModal
               visible={visibleDeputy}
               changeVisible={setVisibleDeputy}
               title={deputySelectedId ? companyAddDeputyText.titleReplace : 'Новый заместитель'}
               text='Заполните информацию о новом заместителе'
               img={girl}
               component={<DeputyForm form={form} isSubmit onSubmit={onFinish}/>}
            />
            
            <Layout className='new-company'>
               <AuthenticationAside
                  title={companyAddDeputyText.titleAdd}
                  subTitle={companyAddDeputyText.subTitle}
                  img={bgAside}/>
               
               <Layout className='new-company__layout layout'>
                  <Content className='new-company__container' style={{paddingTop: 120}}>
                     <FormAddDeputy isSuccess={isSuccess}
                                    changeSuccess={setIsSuccess}
                                    changeVisible={() => setVisibleDeputy(!visibleDeputy)}
                                    otherDeputy={otherDeputy}
                                    onRemoveDeputy={onRemove}
                                    onOpenDeputy={onOpen}
                     />
                  </Content>
               </Layout>
            </Layout>
         </>
      );
   }
}

export default AddDeputy;