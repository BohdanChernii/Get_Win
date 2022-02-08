import React, {useState} from 'react';
import ArrowBottom from "@img/icons/arrow_bottom.svg";
import eventStore from "@store/event-store";
import Clock from "@img/icons/clock-orange.svg";
import Fire from "@img/icons/fire.svg";
import {_slideToggle, _slideUp} from "@scripts/slides";
import {observer} from "mobx-react-lite";
import {bool} from "prop-types";
import {onHiddenColors} from "@scripts/functions";

TargetDefaultEvent.propTypes = {
   isChecked: bool
};

function TargetDefaultEvent({isChecked}) {
   const [colorId, setColorId] = useState(1);
   const {hexColor} = eventStore.events_colors.find(item => item.id == colorId)
   
   const onToggleHiddenColors = () => {
      if (isChecked) {
         const spoilerMainColor = document.querySelector('.spoilers_default.hidden');
         const spoilersArrow = document.querySelector('.spoilers_default__arrow');
         spoilersArrow.classList.toggle('active')
         _slideToggle(spoilerMainColor)
      }
   }
   const handleChangeColorEvent = async (e) => {
      onToggleHiddenColors();
      const dataColor =  e.target.dataset.color
      const {hexColor} = eventStore.events_colors.find(item => item.hexColor === dataColor);
      const {id} = eventStore.dashboard_events.find(even => even.isDefault === true)
      await eventStore.changeEventColor(id, hexColor);
      setColorId(colorId)
   }
   
   return (
      <>
         <div onMouseLeave={onHiddenColors} className='event' style={{width: 290}}>
            <div className="event__header _flex-row_space-between">
               <h4 className="event__title">Ходьба, 3,8 км/час</h4>
               <div className="event__spoilers">
                  <div onClick={onToggleHiddenColors} className="spoilers_default">
                     <span className="spoilers_default__color " style={{backgroundColor: `${hexColor}`}}> </span>
                     <img className='spoilers_default__arrow' src={ArrowBottom} alt="arrow"/>
                  </div>
                  <div className="spoilers_default hidden">
                     {eventStore.events_colors.map(item => (
                        <div key={item.id} className='hidden__item' data-color={item.hexColor}
                             onClick={handleChangeColorEvent}
                        >
                        <span style={{backgroundColor: `${item.hexColor}`, pointerEvents: "none"}}
                              className="spoilers_default__color"> </span>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
            <div className="event__body">
               <div className="event__item item">
                  <img className="item__icon" src={Clock} alt="clock"/>
                  <span className="item__title">15 мин</span>
                  <p className="item__info">Пн-Вс</p>
               </div>
               <div className="event__item item">
                  <img className="item__icon" src={Fire} alt="fire"/>
                  <span className="item__title">150 Ккал</span>
                  <p className="item__info">09:00 - 09:15</p>
               </div>
            </div>
         </div>
      
      </>
   );
}

export default observer(TargetDefaultEvent);