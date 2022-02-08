import React, {useEffect, useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useTitleStyles} from "@/hooks/useTitleStyles";
import DateInput from "@/components/feature/inputs/DateInput.jsx";
import ActivitySelectInput from "@/components/feature/inputs/ActivitySelectInput.jsx";
import DurationSelectInput from "@/components/feature/inputs/DurationSelectInput.jsx";
import ActivityDays from "@/components/feature/inputs/ActivityDays.jsx";
import activityStore from "@store/activity-store";
import {observer} from "mobx-react-lite";
import eventStore from "@store/event-store";
import CustomTimePicker from "@/components/content/CustomTimePicker.jsx";
import ActivityColors from "@/components/content/ActivityColors.jsx";
import {TippyEventEndDate} from "@/components/feature/tippy/Tippys.jsx";
import InfoIcon from "@img/icons/info-icon.svg";
import {bool, func, object, string} from "prop-types";
import {Transition} from "@/components/feature/modals/Transition/Transition.jsx";

EventsDialog.propTypes = {
   postType: string,
   changePostType: func,
   open: bool,
   changeDialog: func,
   dates: object,
   setDates: func,
   isTargetStep: bool,
   restartDefaultEvent: func,
   idEvent: string || null
   
};

function EventsDialog({
                         postType,
                         changePostType,
                         idEvent,
                         open,
                         changeDialog,
                         dates,
                         setDates,
                         isTargetStep,
                         restartDefaultEvent
                      }) {
   // hooks ==================================================
   const titleStyles = useTitleStyles();
   
   // eventStore ==================================================
   const {
      eventInfo,
      eventSelectedDay,
      eventInfoError,
      eventDisabledDay,
      changeEvent,
      resetEventInfo,
      setEventError,
   } = activityStore;
   
   const [time, setTime] = useState(null);
   const handleChangeTime = (time) => {
      setEventError('time_start')
      setTime(time)
   }
   
   const [minDate, setMinDate] = useState({
      date_start: new Date(),
      date_end: new Date(Date.now() + (24 * 60 * 60 * 1000)),
   });
   
   const handleOnChangeDate = (name, date) => {
      activityStore.setEventError(name)
      setDates(prev => ({
         ...prev,
         [name]: date
      }))
   }
   
   useEffect(() => {
      if (dates.date_start && dates.date_end) {
         const timeDifference = dates.date_end.getTime() - dates.date_start.getTime();
         const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
         // const events = []
         if (daysDifference < 1) {
            const date_end = new Date(new Date(dates.date_start).getTime() + (24 * 60 * 60 * 1000))
            setDates(prev => ({...prev, date_end}))
            activityStore.setEventInfo('date_end', date_end)
         } else {
            // reset days eventInfo ===============
            Object.keys(eventInfo).forEach(name => eventInfo[name] === 1 ? changeEvent(name, 0) : null)
            Object.keys(eventSelectedDay).forEach(name => eventSelectedDay[name] = false)
            Object.keys(eventDisabledDay).forEach(name => eventDisabledDay[name] = false)
            let x = 0;
            let day = new Date(dates.date_start).getDate();
            while (x < daysDifference) {
               const date = new Date(new Date(dates.date_start).setDate(day)).getDay();
               activityStore.changeEvent(`w${date}`, 1);
               activityStore.setDisabledDay(`w${date}`, true);
               x++
               day++
            }
         }
      }
      setMinDate(prev => ({
         ...prev,
         date_end: new Date(new Date(eventInfo.date_start).getTime() + (24 * 60 * 60 * 1000))
      }))
   }, [dates.date_start, dates.date_end]);
   // formEvents ==================================================
   const handleOnReset = () => {
      changeDialog()
      changePostType && changePostType('add')
      resetEventInfo()
      setTime(null)
      setDates({
         date_start: null,
         date_end: null
      })
      const allFocus = document.querySelectorAll('._focus')
      allFocus.forEach(item => item.classList.remove('_focus'))
   };
   const handleOnSubmit = async (e) => {
      e.preventDefault();
      let errors = 0;
      Object.keys(eventInfo).forEach(item => {
         // eslint-disable-next-line no-prototype-builtins
         if (eventInfoError.hasOwnProperty(item) && !eventInfo[item]) {
            errors++
            setEventError(item, true)
         }
      });
      if (!errors) {
         const response = await eventStore.postEventToTargetStep(postType, idEvent)
         if (response.ok) await eventStore.fetchEventsData().then(res => {
            // if (res.ok && isTargetStep) {
            //    restartDefaultEvent()
            // }
         })
         handleOnReset()
      }
   };
   return (
      <>
  
         <div style={{justifyContent: 'flex-end'}} className="form__row">
            <button type="button" onClick={changeDialog}
                    className="form__row-box _btn _main-btn _orange-btn ">Запланировать активность
            </button>
         </div>
         <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleOnReset}>
            <DialogTitle
               classes={{root: titleStyles.h3}} disableTypography id="alert-dialog-slide-title">
               {postType === 'add' ? 'Запланировать' : 'Изменить'} Активность
               <hr style={{display: "block", width: '100%', height: 1, background: '#E9E9E9', marginTop: 24}}/>
            </DialogTitle>
            <DialogContent style={{width: 600}}>
               <form className="form" onReset={handleOnReset}>
                  <div className="form__item">
                     <div className="form__row">
                        <div style={{flexBasis: '50%'}} className="form__row-box">
                           <label className="form__label">Ночало</label>
                           <DateInput
                              minDate={new Date()}
                              value={eventInfo.date_start && new Date(eventInfo.date_start)}
                              changeDate={handleOnChangeDate}
                              name='date_start'
                              isError={eventInfoError.date_start}
                              placeholder
                           />
                        </div>
                        <div style={{flexBasis: '50%'}} className="form__row-box">
                           <div className="_flex-row_center">
                              <label className="form__label">Конец</label>
                              <TippyEventEndDate>
                                 <img style={{marginLeft: 5, width: 18, height: 18,}} src={InfoIcon}
                                      alt="info-icon"/>
                              </TippyEventEndDate>
                           </div>
                           <DateInput
                              minDate={minDate.date_end}
                              value={eventInfo.date_end && new Date(eventInfo.date_end)}
                              changeDate={handleOnChangeDate}
                              name='date_end'
                              isError={eventInfoError.date_end}
                              disabled={!eventInfo.date_start}
                              placeholder
                           />
                        </div>
                     </div>
                  </div>
                  <div className="form__item">
                     <div className="form__row">
                        <div style={{flexBasis: '50%'}} className="form__row-box">
                           <label className="form__label">Активность</label>
                           <ActivitySelectInput
                              value={eventInfo.id_act}
                              changeValue={changeEvent}
                              isError={eventInfoError.id_act}
                           />
                        </div>
                        <div style={{flexBasis: '50%'}} className="form__row-box">
                           <label className="form__label">Продолжительность</label>
                           <DurationSelectInput/>
                        </div>
                     </div>
                  </div>
                  <div className="form__item">
                     <label className="form__label">Ночало</label>
                     <CustomTimePicker time={time} changeTime={handleChangeTime}/>
                  </div>
                  <div className="form__item" style={{margin: 0}}>
                     <label className="form__label">Какие дни</label>
                     <ActivityDays eventInfoDays={eventInfo} selectDays={eventSelectedDay} changeValue={changeEvent}/>
                  </div>
                  <div className="form__item" style={{margin: 0}}>
                     <label className="form__label">Цвет</label>
                     <ActivityColors/>
                  </div>
                  <div style={{justifyContent: 'flex-end'}} className="form__buttons">
                     <button type="reset" className="form__button _btn _main-btn _grey-btn">Отменить</button>
                     <button type="button" onClick={handleOnSubmit}
                             className="form__button _btn _main-btn _orange-btn">Сохранить
                     </button>
                  </div>
               </form>
            </DialogContent>
         </Dialog>
      </>
   )
}

export default observer(EventsDialog)

//
// import React, {useEffect, useState} from 'react';
// import ActivityCalendar from "@/components/content/ActivityCalendar.jsx";
// import AddEventsDialog from "@/components/feature/modals/EventsDialog.jsx";
// import ActivityDashboard from "@/components/feature/dashboards/ActivityDashboard.jsx";
// import {observer} from "mobx-react-lite";
// import eventStore from "@store/event-store";
// import activityStore from "@store/activity-store";
// import InfoPersonalDialog from "@/components/feature/modals/InfoPersonalDialog.jsx";
// import moment from "moment";
// import InfoActivityDialog from "@/components/feature/modals/InfoActivityDialog.jsx";
//
// function ActivityPage() {
//    document.title = 'Виртуальный диетолог | Активности';
//
//    const [postType, setPostType] = useState('add');
//
//    const [openEventDialog, setOpenEventDialog] = useState(false);
//    const handleOnChangeDialog = () => setOpenEventDialog(prev => !prev)
//
//    const [openInfoDialog, setOpenInfoDialog] = useState(false);
//    const handleOnChangeInfoDialog = () => setOpenInfoDialog(prev => !prev)
//
//    const [openInfoSelectDates, setOpenInfoSelectDates] = useState(false);
//    const handleOnChangeInfoSelectDates = () => setOpenInfoSelectDates(true)
//
//    const [idEvent, setIdEvent] = useState(null);
//    // DialogEvents ==================================================================
//    const [dates, setDates] = useState({
//       date_start: null,
//       date_end: null
//    });
//    const handleOnEditEvent = (id) => {
//       const event = {...eventStore.data.activity_events[id]}
//       for (let key in event) {
//          if (key in activityStore.eventInfo) {
//             activityStore.setEventInfo(key, event[key]);
//          }
//          if ('duration' in event) {
//             const {id} = eventStore.activity_duration.find(item => item.value === event.duration)
//             activityStore.setEventInfo('activity_duration', id);
//          }
//       }
//
//       for (let key in activityStore.eventDisabledDay) {
//          activityStore.setDisabledDay(key, false)
//       }
//
//       for (let key in event) {
//          if (key in activityStore.eventSelectedDay) {
//             const timeDifference = new Date(activityStore.eventInfo.date_end).getTime() - new Date(activityStore.eventInfo.date_start).getTime();
//             const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
//             let x = 0;
//             let day = new Date(activityStore.eventInfo.date_start).getDate();
//             while (x < daysDifference) {
//                const date = new Date(new Date(activityStore.eventInfo.date_start).setDate(day)).getDay();
//                activityStore.setDisabledDay(`w${date}`, true);
//                if (activityStore.eventInfo[key] == 1) {
//                   activityStore.setChangeDay(key, true);
//                }
//                x++
//                day++
//             }
//          }
//       }
//       setIdEvent(id)
//       setPostType('edit')
//       handleOnChangeDialog()
//    }
//    // useEffect ==================================================================
//    useEffect(() => {
//       const index = setTimeout(() => {
//          openInfoSelectDates && setOpenInfoSelectDates(false)
//       }, 3000)
//       return () => clearInterval(index)
//    }, [openInfoSelectDates])
//    return (
//       <>
//          <div className="headline-box">
//             <h2 className="_title">Активности</h2>
//             <AddEventsDialog
//                postType={postType}
//                changePostType={setPostType}
//                idEvent={idEvent}
//                dates={dates}
//                setDates={setDates}
//                open={openEventDialog}
//                changeDialog={handleOnChangeDialog}
//
//             />
//          </div>
//          <ActivityDashboard/>
//          <ActivityCalendar canEventChange={true} setDates={setDates} changeDialog={handleOnChangeDialog}
//                            changeInfoSelectDates={handleOnChangeInfoSelectDates} editEvent={handleOnEditEvent}/>
//          <InfoActivityDialog  open={openInfoDialog} changeDialog={handleOnChangeInfoDialog}/>
//       </>
//    );
// }
//
// export default observer(ActivityPage);