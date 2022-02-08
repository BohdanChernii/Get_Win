import React from 'react';
import eventStore from "@store/event-store";
import activityStore from "@store/activity-store";

function ActivityColors() {
   const {changeEvent, eventInfo} = activityStore
   const {id} = eventStore.events_colors.find(item => item.hexColor.toLowerCase() === eventInfo.color.toLowerCase())
   return (
      <div className='event-colors-container _flex-row_space-between'>
         {eventStore.events_colors.map(item => (
            <span key={item.id}
                  className='event__color'
                  style={{
                     background: `${item.hexColor}`,
                     boxShadow: `0 0 4px 8px ${item.id === id ? `${item.hexColor}60` : 'transparent'}`
                  }}
                  onClick={() => changeEvent('color', item.hexColor)}>
               </span>
         ))}
      </div>
   )
}

export default ActivityColors;