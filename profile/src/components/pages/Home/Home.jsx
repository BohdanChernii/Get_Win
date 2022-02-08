import React, {useEffect, useState} from "react";
import {func, string} from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {resetVerification, setVerificationFailed, setVerificationInProgress, setVerificationSuccess} from "@store/actions/company-actions";
import {showTestingModal} from "@store/actions/global-actions";
import {Content} from "antd/es/layout/layout";
import {Col, Row, Space} from "antd";
import {companyStatus, companyStatusText} from "@assets/helpers/constants";
import {messages} from "@assets/helpers/messages";
import {addCandidateStepsImg, addTaskStepsImg} from "@assets/helpers/links";
import SmallCalendar from "@/components/components/Calendar/SmallCalendar.jsx";
import HomeDataTable from "@/components/components/HomeDataTable/HomeDataTable.jsx";
import InfoBlocks from "@/components/components/InfoBlocks/InfoBlocks.jsx";
import VerifyBanner from "@/components/components/Baners/VerifyBanner.jsx";
import HomeBanner from "@/components/components/Baners/HomeBanner.jsx";
import FormAddButton from "@/components/components/FormAddButton/FormAddButton.jsx";
import InProgressVerifyModal from "@/components/modals/InProgressModal/InProgressVerifyModal.jsx";
import InfoByVerifyModal from "@/components/modals/InfoByVerifyModal/InfoByVerifyModal.jsx";
import BigPlusIcon from "@/components/icons/home/BigPlusIcon.jsx";
import StaticFormModal from "@/components/modals/StaticFormModal.jsx";
import testing_candidate from "@img/girl-testing-candidate.svg";
import FormTestingCandidate from "@/components/form/FormTestingCandidate/FormTestingCandidate.jsx";
import DynamicSteps from "@/components/components/DynamicSteps/DynamicSteps.jsx";
import {useTestingCandidate} from "@/hooks/useTestingCandidate";
import {useAddTasksSteps} from "@/hooks/steps/useAddTasksSteps.jsx";
import {useAddCandidateSteps} from "@/hooks/steps/useAddCandidateSteps.jsx";

Home.propTypes = {
   menuIdx: string,
   setMenuIdx: func,
};

function Home({setMenuIdx}) {
   const history = useHistory();
   const dispatch = useDispatch();
   const {
      global: {showBanner, isTestModalOpen},
      company,
      user: {isDisabled, user: {step}}
   } = useSelector(state => ({
      global: state.global,
      company: state.company.company,
      user: state.user,
   }));
   
   //addCandidate
   const {
      candidatesSteps, currentCandidatesStep,
      isVisibleAddCandidate, changeVisibleAddCandidate,
      isCandidateSuccess,
      onClearCandidate,
   } = useAddCandidateSteps();
   
   // addTesting
   const {isSuccessTesting, onClearTesting, onFinishTest} = useTestingCandidate();
   
   //addTasks
   const {
      isVisibleAddTask, changeVisibleAddTask,
      tasksSteps, currentTasksStep,
      isDuplicateTask, changeIsDuplicateTask,
      isSuccessAddTask, changeIsSuccessAddTask,
      resetTasksSteps,
   } = useAddTasksSteps();
   
   // other
   const [inProgressVerify, setInProgressVerify] = useState(false);
   const [infoVerifyModalVisible, setInfoVerifyModalVisible] = useState(false);
   
   useEffect(() => {
      isTestModalOpen && changeVisibleAddCandidate(false);
   }, [isTestModalOpen]);
   
   useEffect(() => {
      company?.status === companyStatus.PROGRESS
         ? setInProgressVerify(true)
         : (company?.status === companyStatus.SUCCESS || company?.status === companyStatus.FAILED) && setInfoVerifyModalVisible(true)
   }, [company]);
   
   useEffect(() => {
      return () => {
         dispatch(resetVerification())
      }
   }, []);
   
   return (
      <>
         {/*Testing candidate*/}
         <StaticFormModal
            visible={isTestModalOpen}
            changeVisible={() => dispatch(showTestingModal(false))}
            img={testing_candidate}
            title='Тестирование'
            destroyOnClose
            onCancel={null}
            closable={false}
            text='Выберите и настройте тип тестирования кандидата.'
            component={<FormTestingCandidate onFinishTest={onFinishTest} onCancel={onClearTesting}/>}
            isSuccess={isSuccessTesting}
            successFn={onClearTesting}
            successMessage='Новый кандидат успешно добавлен в базу и ему отправлено тестовое задание'
         />
         
         {/*New candidate*/}
         <StaticFormModal
            visible={isVisibleAddCandidate}
            changeVisible={() => changeVisibleAddCandidate(false)}
            img={addCandidateStepsImg[currentCandidatesStep - 1]?.src || addCandidateStepsImg[addCandidateStepsImg.length - 1]?.src}
            title='Новый кандидат'
            destroyOnClose
            onCancel={null}
            closable={false}
            text='Заполните информацию о компании, подразделении и должности кандидата.'
            component={<DynamicSteps labelPlacement='vertical' steps={candidatesSteps} currentStep={currentCandidatesStep}/>}
            isSuccess={isCandidateSuccess}
            successFn={onClearCandidate}
            successMessage='Новый кандидат успешно добавлен в базу'
         />
         
         {/*Add task*/}
         <StaticFormModal
            visible={isVisibleAddTask}
            changeVisible={() => changeVisibleAddTask(false)}
            img={addTaskStepsImg[currentTasksStep - 1]?.src || addTaskStepsImg[addTaskStepsImg.length - 1]?.src}
            title='Новая задача'
            destroyOnClose
            onCancel={null}
            closable={false}
            text='Заполните информацию о задаче, чтобы продолжить.'
            component={<DynamicSteps labelPlacement='vertical' steps={tasksSteps} currentStep={currentTasksStep}/>}
            isSuccess={isSuccessAddTask}
            successFn={resetTasksSteps}
            successMessage='Новый кандидат успешно добавлен в базу'
         />
         
         <InProgressVerifyModal visible={inProgressVerify} changeVisible={setInProgressVerify} text={companyStatusText.PROGRESS}/>
         <InfoByVerifyModal visible={infoVerifyModalVisible} status={company?.status} changeVisible={setInfoVerifyModalVisible}/>
         
         <section className='content-section'>
            <Space direction='vertical' size={24}>
               {!isDisabled && step === '4' && showBanner && <VerifyBanner text={messages.bannersText.verifyWait}/>}
               {!isDisabled && step === '5' && showBanner && <HomeBanner text={messages.bannersText.getAccess}/>}
               <Row gutter={[5, 5]}>
                  <Col span={24} lg={24} xl={12} xxl={6}>
                     <FormAddButton text='Добавить кандидата'
                                    icon={<BigPlusIcon fill={'#84df88'}/>}
                                    containerStyle={{backgroundColor: 'rgb(182, 255, 189)'}}
                                    onClick={() => changeVisibleAddCandidate(true)}/>
                  </Col>
                  
                  <Col span={24} lg={24} xl={12} xxl={6}>
                     <FormAddButton text='Добавить вакансию'
                                    icon={<BigPlusIcon fill={'#FFC864'}/>}
                                    containerStyle={{backgroundColor: 'rgb(255, 238, 191)'}}
                                    onClick={() => history.push('add-vacancy')}/>
                  </Col>
                  
                  <Col span={24} lg={24} xl={12} xxl={6}>
                     <FormAddButton text='Добавить встречу'
                                    icon={<BigPlusIcon fill={'#8D8BED'}/>}
                                    containerStyle={{backgroundColor: 'rgb(219, 218, 255)'}}
                                    onClick={() => console.log()}/>
                  </Col>
                  
                  <Col span={24} lg={24} xl={12} xxl={6}>
                     <FormAddButton text='Добавить задание'
                                    icon={<BigPlusIcon fill={'#FF776F'}/>}
                                    containerStyle={{backgroundColor: 'rgb(255, 228, 226)'}}
                                    onClick={() => changeVisibleAddTask(true)}/>
                  </Col>
               </Row>
               
               <Row gutter={[5]}>
                  <Col span={8}>
                     <FormAddButton text='В процессе'
                                    icon={<BigPlusIcon fill={'#84df88'}/>}
                                    containerStyle={{backgroundColor: 'rgb(182, 255, 189)'}}
                                    onClick={() => dispatch(setVerificationInProgress())}/>
                  </Col>
                  <Col span={8}>
                     <FormAddButton text='Успех'
                                    icon={<BigPlusIcon fill={'#FFC864'}/>}
                                    containerStyle={{backgroundColor: 'rgb(255, 238, 191)'}}
                                    onClick={() => dispatch(setVerificationSuccess())}/>
                  </Col>
                  <Col span={8}>
                     <FormAddButton text='Не удалось'
                                    icon={<BigPlusIcon fill={'#FF776F'}/>}
                                    containerStyle={{backgroundColor: 'rgb(255, 228, 226)'}}
                                    onClick={() => dispatch(setVerificationFailed())}/>
                  </Col>
               </Row>
               <HomeDataTable setMenuIdx={setMenuIdx}/>
            </Space>
            <Content>
               <Space direction='vertical' size={24} style={{width: '100%'}}>
                  
                  <SmallCalendar/>
                  
                  {!isDisabled && <InfoBlocks/>}
               </Space>
            </Content>
         </section>
      </>
   
   );
}

export default Home;
