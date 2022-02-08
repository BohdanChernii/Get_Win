import React, {useEffect} from 'react';
import {Form, Input, Modal} from "antd";
import AppTitle from "@/components/ui/AppTitle.jsx";
import {useSelector} from "react-redux";
import {checkFormValues} from "@assets/helpers/helpers";

SocialModal.propTypes = {};

function SocialModal({visible, changeVisible, submitForm}) {
   const [form] = Form.useForm();
   const {lists, company} = useSelector(state => ({
      lists: state.dropDownList.lists,
      company: state.company.company
   }))
   
   useEffect(() => {
      company?.socials && (
         company.socials.forEach(el => {
            form.setFields([{name: el.name, value: el.link}])
         })
      )
   }, [company]);
   
   return (
      <Modal
         centered
         bodyStyle={{padding: '56px 24px 24px'}}
         visible={visible}
         forceRender
         onOk={() => {
            const formValues = checkFormValues(form.getFieldsValue());
            const socials = Object.entries(formValues).map(([key, value]) => ({
               id: lists?.s_social_networks.find(item => item.name === key).id,
               name: key,
               link: value || null
            }))
            submitForm(socials)
         }}
         onCancel={() => changeVisible(false)}
         cancelButtonProps={{style: {display: 'none'}}}
         okButtonProps={{size: 'middle', shape: 'round'}}
         okText='Сохранить'
      >
         <Form
            name="add-socials"
            layout='vertical'
            size='large'
            form={form}
            className='form'
            style={{padding: 0}}
         >
            <AppTitle level={5} title='Профиль Компании в социальных сетях'
                      style={{color: '#20272E', fontWeight: 500, marginBottom: 40, textAlign: 'center'}}/>
            <Form.Item className='form__container' name='facebook' label='Facebook'>
               <Input className='form__input' placeholder="Укажите ссылку в Facebook"/>
            </Form.Item>
            
            <Form.Item className='form__container' name='linkedin' label='LinkedIn'>
               <Input className='form__input' placeholder="Укажите ссылку в LinkedIn"/>
            </Form.Item>
            
            <Form.Item className='form__container' name='youtube' label='Youtube'>
               <Input className='form__input' placeholder="Укажите ссылку в Youtube"/>
            </Form.Item>
            
            <Form.Item className='form__container' name='instagram' label='Instagram'>
               <Input className='form__input' placeholder="Укажите ссылку в Instagram"/>
            </Form.Item>
            
            <Form.Item className='form__container' name='twitter' label='Twitter'>
               <Input className='form__input' placeholder="Укажите ссылку в Twitter"/>
            </Form.Item>
            
            <Form.Item className='form__container' name='telegram' label='Telegram'>
               <Input className='form__input' placeholder="Укажите ссылку @CompanyName"/>
            </Form.Item>
         
         </Form>
      </Modal>
   );
}

export default SocialModal;