import React from 'react';
import NavLeft from "@img/icons/calendarNavLeft.svg";
import NavRight from "@img/icons/calendarNavRight.svg";


import useCalendar from '@/hooks/useCalendar';

const SmallCalendar = () => {
   const {calendarRows, selectedDate, todayFormatted, daysShort, monthNames, getNextMonth, getPrevMonth} = useCalendar();
   const calendarMonth = `${monthNames[selectedDate.getMonth()]} - ${selectedDate.getFullYear()}`;
   
   const dateClickHandler = date => {
      console.log(date);
   }
   
   return (
      <>
         <div className="calendar">
            <div className="calendar__header">
               <div className="calendar__navigation">
                  <img className='calendar__arrow' src={NavLeft} alt="left" onClick={getPrevMonth}/>
                  <p className='calendar__month'>{calendarMonth}</p>
                  <img className='calendar__arrow' src={NavRight} alt="right" onClick={getNextMonth}/>
               </div>
            </div>
            <div className="calendar__container">
               {daysShort.map(day => (
                  <span key={day} className='calendar__weeks'>{day}</span>
               ))}
            </div>
            <div className="calendar__body">
               {
                  Object.values(calendarRows).map(cols => {
                     return <div className='calendar__row' key={cols[0].date}>
                        {cols.map(col => (
                           col.date === todayFormatted
                              ? <div key={col.date} className={`${col.classes} calendar__day calendar__day-today`}
                                     onClick={() => dateClickHandler(col.date)}>
                                 <span>{col.value}</span>
                              </div>
                              : <div key={col.date} className={`${col.classes} calendar__day`}
                                     onClick={() => dateClickHandler(col.date)}>{col.value}</div>
                        ))}
                     </div>
                  })
               }
            </div>
         </div>
      </>
   );
}

export default SmallCalendar;