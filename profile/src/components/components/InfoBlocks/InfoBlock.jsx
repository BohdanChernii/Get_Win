import React from 'react';
import {bool, func, string} from 'prop-types';
import moment from "moment";
import warning from "@img/icons/warning.svg";

InfoBlock.propTypes = {
   isWarning: bool,
   onClick: func,
   title: string,
   subtitle: string,
   date: string,
};

function InfoBlock({isWarning, onClick, title, subtitle, date}) {
   const day = moment(date, 'DD.MM.YYYY').format('DD');
   const month = moment(date, 'DD.MM.YYYY').format('MMM');
   
   return (
      <div className={`info-blocks__item ${isWarning && '_warning'}` } onClick={() => onClick()} >
         <div className="info-blocks__date">
            <span className='info-blocks__day'>{day}</span>
            <span className='info-blocks__month'>{month}</span>
         </div>
         <div className="info-blocks__message">
            <span className='info-blocks__title'>{title}</span>
            <span className='info-blocks__subtitle'>{subtitle}</span>
         </div>
         {isWarning && <img src={warning} alt="warning" className='info-blocks__img-warning'/>}
      </div>
   );
}

export default InfoBlock;