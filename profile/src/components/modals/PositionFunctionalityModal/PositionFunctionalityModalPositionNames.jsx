import React, {Fragment, useState} from 'react';
import {func, object, string} from 'prop-types';
import AppSearchInput from "@/components/ui/AppSearсhInput.jsx";
import {checkIsHaveElements} from "@assets/helpers/helpers";
import {Col, Row} from "antd";

PositionFunctionalityModalPositionNames.propTypes = {
   setPositionId: func,
   positionsId: string,
   positionData: object,
};

function PositionFunctionalityModalPositionNames({positionsId, setPositionId, positionData}) {
   const {categoryNames, checkedList} = positionData;
   const [searchItem, setSearchItem] = useState('');
   
   return (
      <>
         <AppSearchInput value={searchItem} changeValue={setSearchItem} placeholder='Найти'/>
         {categoryNames && categoryNames.map(c => (
            <ul key={c.id} className='functionality-position'>
               {c.positions.filter(opt => opt.name.toLowerCase().includes(searchItem.toLowerCase())).map(({id, name, functionality}) => {
                  const isSomeSelect = checkIsHaveElements(functionality, checkedList);
                  return (
                     <Fragment key={id}>
                        <li
                           className={`functionality-position__item ${id.toString() === positionsId ? 'active' : ''}`}
                           onClick={() => setPositionId(id.toString())}
                        >
                           <Row wrap={false} gutter={8} align='middle' justify='space-between'>
                              <Col>
                                 <span className='functionality-position__name'>{name}</span>
                              </Col>
                              <Col>
                                 <span className={`functionality-position__length ${isSomeSelect && 'active'}`}>{functionality.length}</span>
                              </Col>
                           </Row>
                        </li>
                     </Fragment>
                  
                  )
               })}
            </ul>
         ))}
      </>
   );
}

export default PositionFunctionalityModalPositionNames;