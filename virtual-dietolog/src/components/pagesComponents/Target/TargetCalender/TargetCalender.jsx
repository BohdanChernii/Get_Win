import React, {useRef} from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import {observer} from "mobx-react-lite";
import {func} from "prop-types";
import Tippy from "@tippyjs/react";
import 'tippy.js/themes/light.css';
import eventStore from '@store/event-store'
import activityStore from "@store/activity-store";
import {eventOption} from "@/components/feature/tippy/Tippys.jsx";
import EventContent from "@/components/content/EventContent.jsx";
import TargetEventContent from "@/components/pagesComponents/Target/TargetEventContent/TargetEventContent.jsx";


TargetCalendar.propTypes = {
   changeDialog: func,
};

function TargetCalendar({canEventChange,changeDialog, setDates, changeInfoSelectDates, editEvent}) {
   const ref = useRef();
   const {setEventInfo} = activityStore
   
   // selected data =======================================================
   const handleDateSelect = selectInfo => {
      const selectedStartTime = new Date(selectInfo.startStr).getTime()
      const selectedStartDate = new Date(selectInfo.startStr).getDate()
      const selectedStartMounts = new Date(selectInfo.startStr).getMonth()
      
      const currentTime = new Date().getTime()
      const currentDate = new Date().getDate()
      const currentMounts = new Date().getMonth()
      if (selectedStartTime - currentTime > 0 || (selectedStartDate === currentDate && selectedStartMounts >= currentMounts)) {
         changeDialog()
         setDates({
            date_start: new Date(selectInfo.startStr),
            date_end: new Date(selectInfo.endStr)
         })
         setEventInfo('date_start', selectInfo.startStr)
         setEventInfo('date_end', selectInfo.endStr)
      } else changeInfoSelectDates()
   }
   
   //  render event=======================================================
   const renderEventContent = eventInfo => {
      const {hexColor} = eventStore.events_colors.find(item => item.id == eventInfo.event.backgroundColor);
      const style = {
         borderColor: hexColor,
         backgroundColor: hexColor + '25',
      }
      return (
         <>
            <div onMouseEnter={({target}) => {
               target.style.backgroundColor = hexColor + '45'
            }}
                 onMouseOut={({target}) => {
                    target.style.backgroundColor = hexColor + '25'
                 }}
                 className='calendar-event'
                 style={style}
                 ref={ref}>
               <h5 className='calendar-event__title'>{eventInfo.event.title}</h5>
               <p className='calendar-event__time'>{eventInfo.timeText}</p>
            </div>
            
            <Tippy {...eventOption} reference={ref}
                   content={
                      <TargetEventContent event={eventInfo.event}
                                    timeText={eventInfo.timeText}
                                    editEvent={editEvent}
                                    canEventChange={canEventChange}/>}
            
            />
         </>
      )
   }
   
   return (
      <>
         <FullCalendar
            firstDay='1'
            selectable={true}
            editable={false}
            initialView="dayGridMonth"
            locale='ru'
            headerToolbar={{left: 'prev', center: 'title', right: 'next'}}
            dayMaxEvents={true}
            dayHeaderFormat={{weekday: 'long'}}
            titleFormat={{year: 'numeric', month: 'long'}}
            eventTimeFormat={{hour: '2-digit', minute: '2-digit',}}
            slotLabelFormat={{omitZeroMinute: false}}
            plugins={[dayGridPlugin, interactionPlugin]}
            eventContent={renderEventContent}
            select={handleDateSelect}
            events={eventStore.events}
         />
      </>
   );
}

export default observer(TargetCalendar);