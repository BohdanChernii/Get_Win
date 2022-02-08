import React from 'react';
import Board from "@img/icons/board.svg";
import eventStore from "@store/event-store";
import {observer} from "mobx-react-lite";
import Clock from "@img/icons/clock-orange.svg";
import Fire from "@img/icons/fire.svg";
import EmptyDashboard from "@/components/feature/dashboards/EmptyDashboard.jsx";

function ActivityDashboard(props) {
   const {dashboard_events} = eventStore;
   return (
      <>
            {dashboard_events.length
               ?
               (<div className='dashboard_events'>
                     {dashboard_events.map(item => {
                        const days = item.days.split(', ').length === 7 ? "Пн-Вс" : item.days
                        return (<div key={item.id} className='event' style={{width: "auto"}}>
                           <div className="event__header">
                              <h4 className="event__title">{item.title}</h4>
                           </div>
                           <div className="event__body">
                              <div className="event__item item">
                                 <img className="item__icon" src={Clock} alt="clock"/>
                                 <span className="item__title">{item.duration}</span>
                                 <p className="item__info">{days}</p>
                              </div>
                              <div className="event__item item">
                                 <img className="item__icon" src={Fire} alt="fire"/>
                                 <span className="item__title">{item.cal} Ккал</span>
                                 <p className="item__info">{item.time} - {item.time_end}</p>
                              </div>
                           </div>
                        </div>)})}
                  </div>)
               : <EmptyDashboard text='Нет запланированних активностей'/>
            }
        
      </>
      
   );
}

export default observer(ActivityDashboard);