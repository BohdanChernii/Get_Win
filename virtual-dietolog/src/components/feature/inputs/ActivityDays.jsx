import React, {useState} from 'react';
import {func, object} from 'prop-types';
import _uniqueId from 'lodash/uniqueId';
import activityStore from "@store/activity-store";

function ActivityDays() {
   const {eventInfo, changeEvent, eventDisabledDay} = activityStore
   const [days, setDays] = useState([
      {
         name: 'w1',
         value: 0,
         day: 'Пн',
         dayOfWeek: 1,
         canChange: false
         
      },
      {
         name: 'w2',
         value: 0,
         day: 'Вт',
         dayOfWeek: 2,
         canChange: false
         
      },
      {
         name: 'w3',
         value: 0,
         day: 'Ср',
         dayOfWeek: 3,
         canChange: false
         
      },
      {
         name: 'w4',
         value: 0,
         day: 'Чт',
         dayOfWeek: 4,
         canChange: false
         
      },
      {
         name: 'w5',
         value: 0,
         day: 'Пт',
         dayOfWeek: 5,
         canChange: false
         
      },
      {
         name: 'w6',
         value: 0,
         day: 'Сб',
         dayOfWeek: 6,
         canChange: false
         
      },
      {
         name: 'w0',
         value: 0,
         day: 'Вс',
         dayOfWeek: 0,
         canChange: false
         
      },
   ]);
   return (
      <div className="checkbox _flex-row_space-between">
         {days.map((item, index) => {
            const id = _uniqueId('day-')
            const dayValue = eventInfo[item.name] == 0 ? 1 : 0;
            const isChecked = Boolean(Number(eventInfo[item.name]))
            return (
               <div className='checkbox' key={index}>
                  <input
                     id={id}
                     className="checkbox__input"
                     type="checkbox"
                     checked={isChecked}
                     onChange={() => changeEvent(item.name, dayValue)}
                     disabled={!eventDisabledDay[item.name]}
                  />
                  <label className="checkbox__text" htmlFor={id}>
                     {item.day}
                  </label>
               </div>)
         })}
      </div>
   );
}

export default ActivityDays;














// if (Boolean(eventInfo.date_start) && Boolean(eventInfo.date_end)) {
//    const start = new Date(eventInfo.date_start).getTime();
{/*   const end = new Date(eventInfo.date_end).getTime();*/}
{/*   const daysDifference = (end - start) / (1000 * 60 * 60 * 24);*/}
{/*   let dayOfMonth = new Date(start).getDate();*/}
{/*   let x = 0*/}
{/*   let selectDay = []*/}
{/*   while (x < daysDifference) {*/}
{/*      const day = new Date(new Date(eventInfo.date_start).setDate(dayOfMonth)).getDay()*/}
{/*      setDays(prev => {*/}
//          const selectDay = prev.map(item => {
//             if (item.dayOfWeek === day) {
//                item.canChange = true
{/*               return item*/}
//             }
//             return item
//          })
//          return selectDay
//       })
//       // console.log(dayOfMonth)
//       // const selDay = days.find(item => item.dayOfWeek === )
//       x++
//       dayOfMonth++
//    }
//    // for (const key of Object.keys(eventInfo)) {
//    //    const selectDays = days.map(item => {
//    //       if (item.name === key) {
//    //          if (eventInfo[key] == 1) item.canChange = true
//    //       }
//    //       return item
//    //    })
//    //    console.log(selectDays)
//    // }
// }
// console.log({...selectDays})