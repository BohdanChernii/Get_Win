import React from 'react';
import {func, number} from 'prop-types';
import {useSelector} from "react-redux";
import {Button, Checkbox, Col, Row} from "antd";
import Attachment from "@/components/components/Attachment/Attachment.jsx";

FormSelectCandidateView.propTypes = {
   step: number,
   changeStep: func
};

function FormSelectCandidateView({step, changeStep, sendToTest, changeSendToTest}) {
   const {candidate} = useSelector(state => ({candidate: state.candidates?.info}));
   
   const onSubmit = () => {
      changeStep(step + 1)
   };
   return (
      <div className="form__wrapper">
         <div className="form__body">
            <Row gutter={[24, 24]}>
               <Col span={24}>
                  <p className='form__view-text'>{candidate?.last_name} {candidate?.first_name} {candidate?.middle_name}</p>
                  {candidate?.birthday && <p className='form__view-text'>{candidate?.birthday}</p>}
                  {candidate?.gender && <p className='form__view-text'>{candidate?.gender.name}</p>}
                  {candidate?.tel && <p className='form__view-text'>{candidate?.tel}</p>}
                  {candidate?.email && <p className='form__view-text'>{candidate?.email}</p>}
               </Col>
               <Col span={24}>
                  <p className='form__view-text'>{candidate?.company}</p>
                  {candidate?.city?.length > 0 && <p className='form__view-text'>{candidate?.city.join(', ')}</p>}
                  <p className='form__view-text'>{candidate?.job_name}</p>
               </Col>
               {candidate?.resume.length > 0 && (
                  <Col span={24}>
                     {candidate?.resume.map((file) => (
                        <div key={file.id} className='form__attachment'>
                           <Attachment file={file} showProgress={false}/>
                        </div>
                     ))}
                  </Col>
               )}
            </Row>
         </div>
         <div className="form__footer">
            <Row justify='space-between' align='middle' gutter={[12, 12]}>
               <Col span={5}>
                  <Button type="default" shape="round" htmlType="button" onClick={() => changeStep(step - 1)}>
                     Назад
                  </Button>
               </Col>
               <Col span={11}>
                  <Row align='middle' justify='end'>
                     <Col>
                        <Row align='middle' wrap={false}>
                           <Checkbox style={{fontSize: 12}} checked={sendToTest} onChange={e => changeSendToTest(e.target.checked)}>
                              Отправить на тестирование
                           </Checkbox>
                        </Row>
                     </Col>
                  </Row>
               </Col>
               <Col span={8}>
                  <Row align='middle' justify='end'>
                     <Col>
                        <Button type="primary" shape="round" onClick={onSubmit}>
                           {sendToTest ? 'Дальше' : 'Зарегистрировать'}
                        </Button>
                     </Col>
                  </Row>
               </Col>
            </Row>
         </div>
      </div>
   );
}

export default FormSelectCandidateView;