import React from 'react';
import {object, string} from 'prop-types';
import eventStore from "@store/event-store";
import {_slideToggle, _slideUp} from "@scripts/slides";
import {observer} from "mobx-react-lite";
import ArrowBottom from "@img/icons/arrow_bottom.svg";
import verticalDots from "@img/icons/more-vertical.svg";
import closeOrange from "@img/icons/close_orange.svg";
import pen from "@img/icons/pen.svg";
import Clock from "@img/icons/clock-orange.svg";
import Fire from "@img/icons/fire.svg";

const allHidden = () => {
   const dotSpoilersHidden = document.querySelector('.dot-spoilers__hidden');
   const spoilerMainColor = document.querySelector('.spoilers.hidden');
   const spoilersArrow = document.querySelector('.spoilers__arrow');
   spoilersArrow.classList.remove('active')
   _slideUp(spoilerMainColor)
   _slideUp(dotSpoilersHidden)
}

const onToggleHiddenColors = () => {
   const spoilerMainColor = document.querySelector('.spoilers.hidden');
   const spoilersArrow = document.querySelector('.spoilers__arrow');
   spoilersArrow.classList.toggle('active')
   _slideToggle(spoilerMainColor)
}

const handleOnDotsMenu = () => {
   const dotSpoilersHidden = document.querySelector('.dot-spoilers__hidden');
   _slideToggle(dotSpoilersHidden)
}
const handleOnDeleteEventDots = async (id) => {
   handleOnDotsMenu()
   await eventStore.deleteEvent(id);
}

EventContent.propTypes = {
   event: object,
   timeText: string
};

function EventContent({event, timeText, editEvent, canEventChange}) {
   // duration ========================================================
   const activityDuration = eventStore?.activity_duration;
   const {name: duration} = activityDuration.find(item => Number(item.value) === Number(event.extendedProps.durationEventValue));
   // time ========================================================
   const time = timeText.split(':');
   const hours = Number(time[0])
   const minutes = (event.extendedProps.durationEventValue * 60 + Number(time[1]));
   // newTime ========================================================
   const newTime = new Date(new Date().setHours(hours, minutes));
   const newHours = newTime.getHours()
   const newMinutes = newTime.getMinutes() < 10 ? '0' + newTime.getMinutes() : newTime.getMinutes()
   // const days = event.extendedProps.days.split(', ').length === 7 ? 'Пн-Вс' : event.extendedProps.days
   
   let eventDays
   if (event.extendedProps.days) {
      eventDays = event.extendedProps.days.split(', ')
   } else {
      eventDays = []
   }
   let firstDay
   if (eventDays[0] === 'Вс') {
      firstDay = eventDays.shift()
      eventDays.push(firstDay)
   }
   const days = eventDays.length === 7 ? 'Пн-Вс' : eventDays.join(', ')
   // currentColor ========================================================
   const {hexColor} = eventStore.events_colors.find(item => item.id == event.backgroundColor)
   
   const handleChangeColorEvent = (eventId, e) => {
      onToggleHiddenColors();
      const {hexColor} = eventStore.events_colors.find(item => item.hexColor == e.target.dataset.color);
      eventStore.changeEventColor(eventId, hexColor);
   }
   return (
      <div onMouseLeave={allHidden} className='event'>
         <div className="event__header _flex-row_space-between">
            <h4 className="event__title">{event.extendedProps.eventFullTitle}</h4>
            <div className="event__spoilers">
               <div onClick={onToggleHiddenColors} className="spoilers">
                  <span className="spoilers__color " style={{backgroundColor: `${hexColor}`}}> </span>
                  <img className='spoilers__arrow' src={ArrowBottom} alt="arrow"/>
               </div>
               <div className="spoilers hidden">
                  {eventStore.events_colors.map(item => (
                     <div key={item.id} className='hidden__item' data-color={item.hexColor}
                          onClick={(e) => handleChangeColorEvent(event.id, e)}>
                        <span style={{backgroundColor: `${item.hexColor}`, pointerEvents: "none"}}
                              className="spoilers__color"> </span>
                     </div>
                  ))}
               </div>
            </div>
            <div className="dot-spoilers">
               <div className="dot-spoilers__dots" onClick={handleOnDotsMenu}>
                  <img className='dot-spoilers__img' src={verticalDots} alt="dots"/>
               </div>
               <div className="dot-spoilers__hidden">
                  <ul className='dot-spoilers__list' onMouseLeave={handleOnDotsMenu}>
                     <li className='dot-spoilers__item' onClick={() => handleOnDeleteEventDots(event.id)}>
                        <img src={closeOrange} alt="close"/>
                        Удалить
                     </li>
                     <li className='dot-spoilers__item' onClick={() => editEvent(event.id)}>
                        <img src={pen} alt="pen"/>
                        Изменить
                     </li>
                  </ul>
               </div>
            </div>
         </div>
         <div className="event__body">
            <div className="event__item item">
               <img className="item__icon" src={Clock} alt="clock"/>
               <span className="item__title">{duration}</span>
               <p className="item__info">{days}</p>
            </div>
            <div className="event__item item">
               <img className="item__icon" src={Fire} alt="fire"/>
               <span className="item__title">{event.extendedProps.ccal} Ккал</span>
               <p className="item__info">{timeText} - {`${newHours}:${newMinutes}`}</p>
            </div>
         </div>
      </div>
   );
}

export default observer(EventContent);