import React from 'react';
import {useSelector} from "react-redux";
import {object, string} from "prop-types";

Remainder.propTypes = {
   text: string,
   type: string,
   record: object,
};

function Remainder({text, record, type}) {
   const {remainders} = useSelector(state => state.vacancies);
   const remainder = remainders.find(r => r.name === record.name);
   const isUpdate = remainder && remainder[type];
   return (
      <div className='app-table__block'>
         <span className={`${isUpdate ? "app-table__text active" : "app-table__text"}`}>{text}</span>
         {isUpdate && <span className='app-table__remainder'>
            +{remainder[type]}
         </span>}
      </div>
   );
}

export default Remainder;