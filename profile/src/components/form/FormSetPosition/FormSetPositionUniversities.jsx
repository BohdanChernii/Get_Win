import React, {useEffect, useState} from 'react';
import {func, number} from 'prop-types';
import {Button, Col, Row} from "antd";
import AppText from "@/components/ui/AppText.jsx";
import FormAddButton from "@/components/components/FormAddButton/FormAddButton.jsx";
import FormAddUniversity from "@/components/form/FormAddUniversity/FormAddUniversity.jsx";
import table_1 from "@img/table-1.svg";
import StaticFormModal from "@/components/modals/StaticFormModal.jsx";
import Text from "antd/lib/typography/Text";
import FormAddCourses from "@/components/form/FormAddCourses/FormAddCourses.jsx";
import __ from "lodash";
import AppDescriptions from "@/components/ui/AppDescriptions.jsx";
import {getDescriptions} from "@assets/helpers/helpers";
import {setNewPositionsInfo} from "@store/actions/positions-actions";
import {useDispatch, useSelector} from "react-redux";

FormSetPositionUniversities.propTypes = {
   changeStep: func,
   step: number,
};

function FormSetPositionUniversities({changeStep, step}) {
   const dispatch = useDispatch();
   
   const {positions: {info}} = useSelector(state => ({
      positions: state.positions,
   }))
   
   const [addUniversityVisible, setAddUniversityVisible] = useState(false);
   const [addCoursesVisible, setAddCoursesVisible] = useState(false);
   
   const [universities, setUniversities] = useState([]);
   const [courses, setCourses] = useState([]);
   
   const handleOnChangeUniversityModalVisible = () => {
      setAddUniversityVisible(!addUniversityVisible)
   };
   const handleOnChangeCoursesModalVisible = () => {
      setAddCoursesVisible(!addCoursesVisible)
   }
   
   const handleOnAddUniversity = values => {
      setUniversities([...universities, values])
   };
   
   const handleOnRemoveUniversity = id => {
      setUniversities(prev => prev.filter(item => item.id.toString() !== id.toString()))
   };
   
   const handleOnAddCourses = values => {
      setCourses(prev => [...prev, {
         id: __.uniqueId(),
         ...values,
      }])
   };
   
   const handleOnRemoveCourses = id => {
      setCourses(prev => prev.filter(item => item.id.toString() !== id.toString()))
   };
   
   const onSubmitForm = async () => {
      const values = {universities, courses}
      try {
         dispatch(setNewPositionsInfo(values))
         changeStep(step + 1)
      } catch (err) {
         console.error(err);
         throw err;
      }
   }
   
   useEffect(() => {
      if (info) {
         const {universities, courses} = info
         setUniversities(universities || [])
         setCourses(courses || [])
      }
   }, [info]);
   return (
      <>
         <AppText text='????????'
                  style={{
                     color: '#20272E',
                     fontSize: 18,
                     fontWeight: 700,
                     marginBottom: 24,
                     lineHeight: 1.5715,
                     display: 'block'
                  }}/>
         
         <StaticFormModal visible={addUniversityVisible}
                          changeVisible={setAddUniversityVisible}
                          title='???????????????? ????????'
                          text='?????????????????? ???????????????????? ???? ?????????????? ????????????????'
                          component={<FormAddUniversity
                             changeVisible={() => setAddUniversityVisible(!addUniversityVisible)}
                             onSubmitForm={handleOnAddUniversity}/>}
                          img={table_1}
         />
         
         <StaticFormModal visible={addCoursesVisible}
                          changeVisible={setAddCoursesVisible}
                          title='???????????????? ??????????'
                          text='?????????????????? ???????????????????? ?? ???????????????????? ????????????'
                          component={<FormAddCourses
                             changeVisible={() => setAddCoursesVisible(!addCoursesVisible)}
                             onSubmitForm={handleOnAddCourses}/>}
                          img={table_1}
         />
         
         <Row gutter={[24, 24]}>
            <Col span={24}>
               <Text className='label-text'>????????</Text>
               <FormAddButton extraClasses='_card' onClick={handleOnChangeUniversityModalVisible}
                              containerStyle={{height: 56}}
                              text='???????????????? ??????'/>
            
            
            </Col>
            {!!universities.length && (
               <Col span={24}>
                  <Row gutter={[16, 16]}>
                     {universities.map(({id, name, ...rest}) => (
                        <Col key={id} span={24}>
                           <AppDescriptions
                              title={name}
                              descriptions={getDescriptions(rest)}
                              onRemove={() => handleOnRemoveUniversity(id)}/>
                        </Col>
                     ))}
                  </Row>
               </Col>
            )}
            
            <Col span={24}>
               <Text className='label-text'>?????????? ?? ????????????????</Text>
               <FormAddButton extraClasses='_card' onClick={handleOnChangeCoursesModalVisible}
                              containerStyle={{height: 56}}
                              text='???????????????? ?????????? ?? ????????????????'/>
            </Col>
            {!!courses.length && (
               <Col span={24}>
                  <Row gutter={[16, 16]}>
                     {courses.map(({id, name, ...rest}) => (
                        <Col key={id} span={24}>
                           <AppDescriptions
                              title={name}
                              descriptions={getDescriptions(rest)}
                              onRemove={() => handleOnRemoveCourses(id)}/>
                        </Col>
                     ))}
                  </Row>
               </Col>
            )}
            <Col span={24}>
               <Row justify='space-between'>
                  <Button type="default" htmlType="button" shape="round" onClick={() => changeStep(step - 1)}>
                     ??????????
                  </Button>
                  <Button type="primary" shape="round" htmlType="button" onClick={() => onSubmitForm()}>
                     ?????????????????? ?? ????????????????????
                  </Button>
               </Row>
            </Col>
         </Row>
      </>
   );
}

export default FormSetPositionUniversities;