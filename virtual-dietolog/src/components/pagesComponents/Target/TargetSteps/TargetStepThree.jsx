import React, {useEffect, useState} from 'react';
import {array, bool, func, number} from 'prop-types';
import {observer} from "mobx-react-lite";
import AddEventsDialog from "@/components/feature/modals/EventsDialog.jsx";
import TargetDefaultEvent from "@/components/pagesComponents/Target/TargetDefaultEvent/TargetDefaultEvent.jsx";
import CheckboxDefaultEvent from "@/components/pagesComponents/Target/CheckboxSetDefaultEvent/CheckboxDefaultEvent.jsx";
import InfoActivityDialog from "@/components/feature/modals/InfoActivityDialog.jsx";
import TargetCalendar from "@/components/pagesComponents/Target/TargetCalender/TargetCalender.jsx";
import eventStore from "@store/event-store";
import activityStore from "@store/activity-store";

TargetStepThree.propTypes = {
   isDefaultEventChecked: bool,
   changeCheckedValue: func,
   changeStep: func,
   currentStepId: number,
   steps: array,
};

function TargetStepThree({isDefaultEventChecked, changeCheckedValue, changeStep, currentStepId, steps}) {
   const {inProgress} = steps.find(item => item.id === currentStepId)
   const [openInfoSelectDates, setOpenInfoSelectDates] = useState(false);
   const handleOnChangeInfoSelectDates = () => setOpenInfoSelectDates(prev => !prev)
   
   // dialog state ====================================
   const [openEventDialog, setOpenEventDialog] = useState(false);
   const handleOnChangeDialog = () => setOpenEventDialog(prev => !prev)
   // selected dates ====================================
   const [dates, setDates] = useState({
      date_start: null,
      date_end: null
   });
   
   const [idEvent, setIdEvent] = useState(null);
   const [postType, setPostType] = useState('add');
   
   const handleOnEditEvent = (id) => {
      const event = {...eventStore.data.activity_events[id]}
      for (let key in event) {
         if (key in activityStore.eventInfo) {
            activityStore.setEventInfo(key, event[key]);
         }
         if ('duration' in event) {
            const {id} = eventStore.activity_duration.find(item => item.value === event.duration)
            activityStore.setEventInfo('activity_duration', id);
         }
      }
      
      for (let key in activityStore.eventDisabledDay) {
         activityStore.setDisabledDay(key, false)
      }
      
      for (let key in event) {
         if (key in activityStore.eventSelectedDay) {
            const timeDifference = new Date(activityStore.eventInfo.date_end).getTime() - new Date(activityStore.eventInfo.date_start).getTime();
            const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
            let x = 0;
            let day = new Date(activityStore.eventInfo.date_start).getDate();
            while (x < daysDifference) {
               const date = new Date(new Date(activityStore.eventInfo.date_start).setDate(day)).getDay();
               activityStore.setDisabledDay(`w${date}`, true);
               if (activityStore.eventInfo[key] == 1) {
                  activityStore.setChangeDay(key, true);
               }
               x++
               day++
            }
         }
      }
      setIdEvent(id)
      setPostType('edit')
      handleOnChangeDialog()
   }
   
   const handleOnClickGoBack = () => changeStep(currentStepId - 2)
   
   // Submit ===========================================================================
   
   const handleOnSubmitForm = (e) => {
      e.preventDefault();
      changeStep(currentStepId)
   };
   // useEffect(() => {
   //    if (inProgress) {
   //       changeCheckedValue(true)
   //    }
   // }, [inProgress]);
   if (inProgress) {
      return (
         <>
            <form
               className="form"
               onSubmit={handleOnSubmitForm}>
               <div style={{marginBottom: 24}} className="_flex-row_start_space-between">
                  <div style={{marginBottom: 0}} className="form__item">
                     <TargetDefaultEvent isChecked={isDefaultEventChecked}/>
                     
                     <CheckboxDefaultEvent isChecked={isDefaultEventChecked}
                                           changeCheckedValue={changeCheckedValue}/>
                  </div>
                  <AddEventsDialog
                     postType={postType}
                     dates={dates}
                     setDates={setDates}
                     open={openEventDialog}
                     changeDialog={handleOnChangeDialog}
                     isTargetStep
                     idEvent={idEvent}
                  />
               </div>
               <div style={{marginBottom: 48}}>
                  <TargetCalendar canEventChange={false}
                                  dates={dates} setDates={setDates}
                                  changeDialog={handleOnChangeDialog}
                                  changeInfoSelectDates={handleOnChangeInfoSelectDates}
                                  editEvent={handleOnEditEvent}
                  />
               </div>
               <div className="form__buttons">
                  <button onClick={handleOnClickGoBack} type="button"
                          className="form__button _btn _main-btn _grey-btn">Назад
                  </button>
                  <button type="submit" className="form__button _btn _main-btn _orange-btn ">Сохранить и Продолжить
                  </button>
               </div>
            </form>
            <InfoActivityDialog open={openInfoSelectDates} changeDialog={handleOnChangeInfoSelectDates}/>
         </>
      );
   } else return <></>
}

export default observer(TargetStepThree);