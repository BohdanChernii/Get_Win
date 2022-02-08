import React, {useState} from 'react';
import {array, bool, func} from 'prop-types';
import {Button, Col, Form, message, Row} from "antd";
import FormAddButton from "@/components/components/FormAddButton/FormAddButton.jsx";
import DeputyForm from "@/components/form/FormAddDeputy/DeputyForm.jsx";
import AppDescriptions from "@/components/ui/AppDescriptions.jsx";
import {checkFormValues} from "@assets/helpers/helpers";
import {addCompanyDeputy} from "@store/actions/deputy-actions";

FormAddDeputy.propTypes = {
   isSuccess: bool,
   changeSuccess: func,
   changeVisible: func,
   otherDeputy: array,
   onRemoveDeputy: func,
   onOpenDeputy: func,
};

const ErrorContent = ({email}) =>
   <span>Ошибка, пользователь
      {<span style={{fontWeight: 600}}>"{email}"</span>}, уже существует
   </span>;

function FormAddDeputy(props) {
   const {isSuccess, changeSuccess, changeVisible, otherDeputy, onRemoveDeputy, onOpenDeputy} = props;
   const [form] = Form.useForm();
   const [isLoading, setIsLoading] = useState(false);
   
   const onFinish = () => {
      form.submit();
      setTimeout(async () => {
         const values = form.getFieldsValue();
         const email = otherDeputy.find(item => item.email === values.email)?.email;
         if (email) {
            form.setFields([{name: 'email', errors: ['Заместитель с таким адресом уже добавлен!']}])
            return
         }
         
         const errorsLength = form.getFieldsError().filter(({errors}) => errors.length).length;
         if (errorsLength) {
            return
         }
         setIsLoading(true)
         const checkValues = checkFormValues(values);
         const deputy = [...otherDeputy, checkValues]
         try {
            const json = await addCompanyDeputy(deputy);
            if (json.ok) {
               setIsLoading(false);
               changeSuccess(!isSuccess);
            } else if (json.error) {
               const emails = Object.keys(json?.data);
               emails.forEach(email => {
                  message.error({content: React.createElement(ErrorContent, {email}), duration: 5})
               })
               setIsLoading(false)
            } else {
               throw new Error('Ошибка создания заместителя')
            }
         } catch (err) {
            setIsLoading(false)
            message.error(err.message)
         }
      }, 0)
   }
   return (
      <>
         <DeputyForm form={form} isSubmit={false}/>
         <Row wrap justify='end' gutter={[24, 24]}>
            <Col span={24}>
               <FormAddButton onClick={() => changeVisible()} extraClasses='_card'
                              text='Добавить еще заместителя'/>
            </Col>
            {!!otherDeputy.length && (
               <Col span={24}>
                  <Row wrap gutter={[24, 24]}>
                     {otherDeputy.map(({id, last_name, first_name, middle_name, tel, email}) => (
                        <Col key={id} span={24}>
                           <AppDescriptions
                              title={{last_name, first_name, middle_name}}
                              descriptions={{email, tel}}
                              onRemove={() => onRemoveDeputy(id)}
                              onOpen={() => onOpenDeputy(id)}
                           />
                        </Col>
                     ))}
                  </Row>
               </Col>
            )}
            <Col>
               <Button type="primary" shape='round' loading={isLoading} onClick={() => onFinish()}>
                  Сохранить и продолжить
               </Button>
            </Col>
         </Row>
      </>
   );
}

export default FormAddDeputy;