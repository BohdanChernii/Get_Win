import React from 'react';
import InfoBlock from "@/components/components/InfoBlocks/InfoBlock.jsx";
import moment from "moment";
import {useSelector} from "react-redux";

function InfoBlocks() {
   const {user: {step}} = useSelector(state => state.user);
   const handleOnClick = () => {
   }
   
   return (
      <div className='info-blocks'>
         {step === '6' && <InfoBlock title='Добавить свой первый отдел' subtitle='Для которого нужно открыть вакансии'
                                     date={moment(Date.now()).format('DD.MM.YYYY')}
                                     onClick={handleOnClick}
                                     isWarning/>}
         
         {step === '7' &&
         <InfoBlock title='Добавить свою первую вакансию' subtitle='Начните закрывать свою первую п штото там'
                    date={moment(Date.now()).format('DD.MM.YYYY')}
                    onClick={handleOnClick}
                    isWarning/>}
      </div>
   );
}

export default InfoBlocks;