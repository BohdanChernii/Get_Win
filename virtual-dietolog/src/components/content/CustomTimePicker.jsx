import React from 'react';
import {TimePicker,} from 'antd';
import activityStore from '@store/activity-store'
import moment from "moment";
CustomTimePicker.propTypes = {};


function CustomTimePicker({time, changeTime}) {
   let classes = 'form__input input'
   time ? classes = classes.concat(' _focus') : classes
   let newMomentDate
   if (activityStore.eventInfo.time_start && activityStore.eventInfo.date_start) {
      newMomentDate =  moment(`${activityStore.eventInfo.time_start} ${activityStore.eventInfo.date_start}`,`HH:mm`)
   } else newMomentDate = time
   return (
      <div className='form__input-container'>
         <TimePicker
            style={{height: 42, outline: "none",}}
            placeholder='напр 09:00'
            format='HH:mm'
            showNow={false}
            className={classes}
            minuteStep={5}
            onChange={date => {
               const hours = date.hours() < 10 ? `0${date.hours()}` : date.hours();
               const minutes = date.minutes() < 10 ? `0${date.minutes()}` : date.minutes();
               const eventTime = hours + ':' + minutes;
               activityStore.setEventInfo('time_start', eventTime);
               changeTime(date)
            }}
            value={ newMomentDate }
         />
         {activityStore.eventInfoError.time_start && <div className="form__error">Пожалуйста, заполните поле</div>}
      </div>
   );
}

export default CustomTimePicker;