import React, {useEffect, useState} from 'react';
import {object} from 'prop-types';
import {Checkbox, Col, Row} from "antd";
import AppSearchInput from "@/components/ui/AppSearсhInput.jsx";
import __ from "lodash";

PositionFunctionalityModalPositionSelected.propTypes = {
   positionData: object,
};

function PositionFunctionalityModalPositionSelected({positionData}) {
   const [searchItem, setSearchItem] = useState('');
   const {checkedList, onChangeCheckListFunctionality, tabIndex} = positionData;
   const [list, setList] = useState(checkedList);
   
   useEffect(() => {
      setList(__.sortBy(checkedList, 'name'))
   }, [checkedList]);
   
   useEffect(() => {
      setList(__.sortBy(checkedList, 'name'))
      if (tabIndex === '2') {
         setList(prev => __.sortBy(prev.filter(item => !item.isUserAdd), 'name'))
      } else if (tabIndex === '3') {
         setList(pre => __.sortBy(pre.filter(item => item.isUserAdd), 'name'))
      }
   }, [tabIndex]);
   
   return (
      <>
         <AppSearchInput value={searchItem} changeValue={setSearchItem} placeholder='Найти'/>
         <Row gutter={[5, 5]}>
            {list.filter(opt => opt.name.toLowerCase().includes(searchItem.toLowerCase())).map(opt => {
               return (
                  <Col key={opt.id} span={24}>
                     <Checkbox onChange={() => onChangeCheckListFunctionality(opt.id)} className='functionality-list__item' value={opt.name}
                               checked={opt.selected}>
                        <span className='functionality-list__name'>{opt.name}</span>
                     </Checkbox>
                  </Col>
               )
            })}
         </Row>
      </>
   );
}

export default PositionFunctionalityModalPositionSelected;