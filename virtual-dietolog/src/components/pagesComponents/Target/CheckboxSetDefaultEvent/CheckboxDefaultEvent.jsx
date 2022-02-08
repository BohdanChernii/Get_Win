import React, {useEffect} from 'react';
import {bool, func} from "prop-types";
import eventStore from "@store/event-store";
import moment from "moment";
import {activityAdd} from "@scripts/api";
import userStore from "@store/user-store";
import {observer} from "mobx-react-lite";

const styleLabel = {color: '#323339', fontWeight: 500,}

CheckboxDefaultEvent.propTypes = {
   isChecked: bool,
   changeCheckedValue: func,
};
const addDefaultEvents = async (checked) => {
   const arr = eventStore.dashboard_events.filter(even => even.isDefault === true)
   if (checked && arr.length === 0) {
      const hexColor = eventStore.events_colors.find(item => item.id === 1).hexColor;
      const color = hexColor.replace('#', '%23').toUpperCase()
      const objUrl = {
         date_start: moment().format('YYYY-MM-DD'),
         date_end: moment().add(365, 'days').format('YYYY-MM-DD'),
         time_start: '09:00',
         activity_duration: '1',
         activities: '101',
         w0: '1',
         w1: '1',
         w2: '1',
         w3: '1',
         w4: '1',
         w5: '1',
         w6: '1',
         color: color,
         is_default: '1'
      }
      let urlBody = ''
      for (const key in objUrl) {
         urlBody += `&${key}=${objUrl[key]}`
      }
      const url = `${activityAdd}?token=${userStore.token}${urlBody}`
      await fetch(url).then(res => {
         if (res.ok) eventStore.fetchEventsData()
      })
   }
   if (!checked) {
      const id = arr.find(even => even.isDefault === true).id
      await eventStore.deleteEvent(id)
   }
}

function CheckboxDefaultEvent({isChecked, changeCheckedValue}) {
   
   const handleOnChange = async () => {
      changeCheckedValue()
      addDefaultEvents(!isChecked)
   }
   
   useEffect(() => {
      if (isChecked) {
         addDefaultEvents(isChecked)
      }
   }, [])
   
   return (
      <div className='checkbox'>
         <input
            id='default-event'
            className="checkbox__input"
            type="checkbox"
            checked={isChecked}
            onChange={handleOnChange}
         />
         <label style={styleLabel} className="checkbox__text" htmlFor='default-event'>
            Активность "Ходьба (3 км/день)" - установлена по умолчанию
         </label>
      </div>
   );
}

export default observer(CheckboxDefaultEvent);