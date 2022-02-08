import {makeAutoObservable} from "mobx";
// import Events from "@assets/data/events.json";
import {activityAdd, activityDel, activityEdit, activityGet} from "@scripts/api";
import userStore from '@store/user-store'
import activityStore from "@store/activity-store";

class EventStore {
   data = {}
   events = []
   dashboard_events = []
   selected_events = []
   
   events_colors = [
      {
         id: 1,
         hexColor: '#0085e3'
      },
      {
         id: 2,
         hexColor: '#f34561'
      },
      {
         id: 3,
         hexColor: '#feb403'
      },
      {
         id: 4,
         hexColor: '#d22513'
      },
      {
         id: 5,
         hexColor: '#AE95ED'
      },
      {
         id: 6,
         hexColor: '#6cd7b0'
      },
      {
         id: 7,
         hexColor: '#95653f'
      },
      {
         id: 8,
         hexColor: '#e9856b'
      },
   ]
// {id: "3", name: "#0085E3"}
// {id: "4", name: "#AE95ED"}
// {id: "5", name: "#E9856B"}
// {id: "6", name: "#6CD7B0"}
// {id: "7", name: "#FEB403"}
// {id: "8", name: "#95653F"}
// {id: "9", name: "#C32442"}
   activities = [
      {
         category_id: "101",
         ccal: "100",
         consumption: "15",
         created_at: null,
         default: "1",
         id: "101",
         label: "Ходьба, 3,8 км/час",
         updated_at: "2020-08-13 14:18:08",
      },
      {
         category_id: "102",
         ccal: "150",
         consumption: "17",
         created_at: null,
         default: "0",
         id: "103",
         label: "Бадминтон",
         updated_at: null,
      },
      {
         category_id: "101",
         ccal: "200",
         consumption: "44",
         created_at: null,
         default: "0",
         id: "106",
         label: "Бег 12 км/час",
         updated_at: null,
      },
      {
         category_id: "102",
         ccal: "250",
         consumption: "18",
         created_at: null,
         default: "0",
         id: "107",
         label: "Баскетбол",
         updated_at: null,
      },
      {
         category_id: "101",
         ccal: "300",
         consumption: "19",
         created_at: null,
         default: "0",
         id: "109",
         label: "Езда на велосипеде 16 км/час",
         updated_at: null,
      },
      {
         category_id: "103",
         ccal: "200",
         consumption: null,
         created_at: null,
         default: "0",
         id: "112",
         label: "Силовая тренировка",
         updated_at: null,
      },
   ]
   activity_categories = [
      {id: "101", label: "Кардио", description: "Описание к кардио", created_at: null, updated_at: null},
      {id: "102", label: "Игры", description: "Описание к играм", created_at: null, updated_at: null},
      {id: "103", label: "Силовые", description: null, created_at: null, updated_at: null},
   ]
   activity_duration = [
      {id: "1", name: "15 мин", value: "0.25"},
      {id: "2", name: "30 мин", value: "0.50"},
      {id: "3", name: "45 мин", value: "0.75"},
      {id: "4", name: "1 час", value: "1.00"},
      {id: "5", name: "1,5 часа", value: "1.50"},
      {id: "6", name: "2 часа", value: "2.00"},
      {id: "7", name: "2,5 часа", value: "2.50"},
      {id: "8", name: "3 часа", value: "3.00"},
   ]
   activity_days = [
      {
         name: 'w1',
         day: 'Пн',
      },
      {
         name: 'w2',
         day: 'Вт',
      },
      {
         name: 'w3',
         day: 'Ср',
      },
      {
         name: 'w4',
         day: 'Чт',
      },
      {
         name: 'w5',
         day: 'Пт',
      },
      {
         name: 'w6',
         day: 'Сб',
      },
      {
         name: 'w0',
         day: 'Вс',
      },
   ]
   
   constructor() {
      makeAutoObservable(this)
   }
   
   setData(data) {
      this.data = data
   }
   
   // dashboard_events ===================
   setDashboardEvents(payload) {
      this.dashboard_events = payload
   }
   
   getDashboardEvents(events) {
      const dashboardEvents = []
      Object.values(events).forEach(obj_event => {
         if (obj_event.date_start) {
            const {label: title} = this.activities.find(item => Number(item.id) === Number(obj_event.id_act));
            const {name: duration, value: durationValue} = this.activity_duration.find(item => Number(item.value) === Number(obj_event.duration))
            // selectDays ======================
            const selectDays = []
            for (const [key, value] of Object.entries(obj_event)) {
               key.match('w') && value == 1 ? selectDays.push(key) : null
            }
            
            const daysEvent = selectDays.map(item => {
               const {day} = this.activity_days.find(day => {
                  if (day.name === item) return day.day
               })
               return day
            });
            
            // days ======================
            let firstDay
            if (daysEvent[0] === 'Вс') {
               firstDay = daysEvent.shift()
               daysEvent.push(firstDay)
            }
            const days = daysEvent.length === 7 ? 'Пн-Вс' : daysEvent.join(', ')
            // cal ======================
            const cal = this.getCcal(Number(obj_event.id_act), Number(durationValue))
            
            const time = obj_event.time_start.split(':');
            const hours = Number(time[0])
            const minutes = (obj_event.duration * 60 + Number(time[1]));
            const timeEnd = new Date(new Date().setHours(hours, minutes));
            const hoursEnd = timeEnd.getHours()
            const minutesEnd = timeEnd.getMinutes() < 10 ? '0' + timeEnd.getMinutes() : timeEnd.getMinutes()
            const newTimeEnd = `${hoursEnd}:${minutesEnd}`
            
            dashboardEvents.push({
               id: obj_event.id,
               title,
               time: obj_event.time_start,
               time_end: newTimeEnd,
               duration,
               days,
               cal: Math.floor(cal),
               isDefault: Number(obj_event.is_default) > 0
            })
         }
      })
      return dashboardEvents;
   }
   
   // selected_events ===================
   setSelectedEvents(payload) {
      this.selected_events = payload
   }
   
   changeSelectedEventsTime(value) {
      const selected_events = [...this.selected_events];
      const hours = new Date(value).getHours()
      const minutes = new Date(value).getMinutes()
      selected_events.forEach(item => {
         item.start = new Date(new Date(item.start).setHours(hours, minutes))
      })
      this.setSelectedEvents(selected_events)
   }
   
   // events ===================
   setCalendarEvents(payload) {
      this.events = payload
   }
   
   getCalendarEvents(events) {
      const calendarEvents = []
      Object.values(events).forEach(obj_event => {
         // starTime ====================
         const timeStart = obj_event.time_start ? obj_event.time_start : '06:00';
         const time = timeStart.split(':');
         const hours = Number(time[0])
         const minutes = (Number(time[1]));
         const start = new Date(new Date(obj_event.date).setHours(hours, minutes));
         // color ====================
         const eventColor = obj_event.color === '#C32442'
            ? '#f34561'
            : obj_event.color
         const colorIndex = this.events_colors.findIndex(item => item.hexColor.toLowerCase() === eventColor.toLowerCase())
         const is_default = Number(obj_event.is_default) !== 0
         calendarEvents.push({
            id: obj_event.id_act,
            title: obj_event.name.length > 12 ? `${obj_event.name.slice(0, 12)}..` : obj_event.name,
            eventFullTitle: obj_event.name,
            start,
            is_default,
            durationEvent: obj_event.duration_name,
            durationEventValue: obj_event.duration,
            ccal: obj_event.cal,
            color: this?.events_colors[colorIndex].id
         })
      })
      return calendarEvents
   }
   
   async changeEventColor(id, hexColor) {
      const token = userStore.token
      const color = hexColor.replace('#', '%23').toUpperCase()
      const url = `${activityEdit}?token=${token}&id=${id}&color=${color}`
      try {
         const res = await fetch(url)
         if (res.ok) {
            await this.fetchEventsData()
         }
      } catch (err) {
         console.error(err)
      }
   }
   
   addEvents(newEvents) {
      const events = [...this.events].concat(newEvents)
      this.setCalendarEvents(events)
   }
   
   deleteDefaultEvents(id) {
      this.setCalendarEvents([...this.events].filter(item => item.id != id))
   }
   
   async deleteEvent(id) {
      const urlDelEvent = `${activityDel}?token=${userStore.token}&id=${id}`
      await fetch(urlDelEvent, {
         method: 'POST',
         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      })
         .then(res => {
            if (res.ok) {
               this.setCalendarEvents(this.events.filter(item => item.id !== id));
               this.setDashboardEvents(this.dashboard_events.filter(item => item.id !== id));
            }
         })
         .catch(err => console.warn(err))
   }
   
   getEndTime = (startDate, duration) => {
      const timeStart = startDate.getTime();
      const timeEnd = timeStart + (duration * 60 * 1000 * 60);
      return timeEnd
   }
   
   getCcal = (id_act, duration) => {
      const {ccal} = this.activities.find(item => item.id == id_act)
      return ccal * duration;
   }
   
   async postEventToTargetStep(type, id) {
      const date_start = activityStore.eventInfo.date_start
      const date_end = activityStore.eventInfo.date_end
      const time_start = activityStore.eventInfo.time_start
      const activity_duration = activityStore.eventInfo.activity_duration
      const id_act = activityStore.eventInfo.id_act
      const w0 = activityStore.eventInfo.w0
      const w1 = activityStore.eventInfo.w1
      const w2 = activityStore.eventInfo.w2
      const w3 = activityStore.eventInfo.w3
      const w4 = activityStore.eventInfo.w4
      const w5 = activityStore.eventInfo.w5
      const w6 = activityStore.eventInfo.w6
      const color = activityStore.eventInfo.color.replace('#', '%23')
      let url
      if (type === 'add') {
         url = `${activityAdd}?token=${userStore.token}&activities=${id_act}&activity_duration=${activity_duration}&date_start=${date_start}&date_end=${date_end}&color=${color}&w1=${w1}&w2=${w2}&w3=${w3}&w4=${w4}&w5=${w5}&w6=${w6}&w0=${w0}&time_start=${time_start}`
      } else if (type === 'edit') {
         url = `${activityEdit}?token=${userStore.token}&id=${id}&activities=${id_act}&activity_duration=${activity_duration}&date_start=${date_start}&date_end=${date_end}&color=${color}&w1=${w1}&w2=${w2}&w3=${w3}&w4=${w4}&w5=${w5}&w6=${w6}&w0=${w0}&time_start=${time_start}`
         // `${activityEdit}?token=${token}&id=${id}&color=${color}`
      }
      return await fetch(url, {
         method: 'POST',
         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      })
   }
   
   async fetchEventsData() {
      try {
         if (userStore.token) {
            const res = await fetch(`${activityGet}?token=${userStore.token}`)
            if (res.ok) {
               const data = await res.json()
               this.setData(data)
               
               const daysEvents = []
               if (data.activity_events) {
                  let dashboardEvents = this.getDashboardEvents(data.activity_events)
                  dashboardEvents.forEach(item => {
                     daysEvents.push({
                        id: item.id,
                        days: item.days
                     })
                  })
                  this.setDashboardEvents(dashboardEvents)
               }
               if (data.activity_calendar) {
                  let calendarEvents = this.getCalendarEvents(data.activity_calendar)
                  calendarEvents = calendarEvents.map(item => {
                     const days = daysEvents.find(day => day.id === item.id).days
                     days ? item.days = days : null
                     return item
                  })
                  this.setCalendarEvents(calendarEvents)
               }
            }
            return res
         }
      } catch (err) {
         console.error(err)
      }
   }
}

export default new EventStore()