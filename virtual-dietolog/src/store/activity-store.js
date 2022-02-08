import {makeAutoObservable} from "mobx";

class ActivityStore {
   constructor() {
      makeAutoObservable(this)
   }
   eventInfo = {
      date_start: null,
      date_end: null,
      time_start: null,
      activity_duration: null,
      id_act: null,
      w0: 0,
      w1: 0,
      w2: 0,
      w3: 0,
      w4: 0,
      w5: 0,
      w6: 0,
      color: '#0085e3',
   }
   eventSelectedDay = {
      w0: false,
      w1: false,
      w2: false,
      w3: false,
      w4: false,
      w5: false,
      w6: false,
   }
   eventDisabledDay = {
      w0: false,
      w1: false,
      w2: false,
      w3: false,
      w4: false,
      w5: false,
      w6: false,
   }
   eventInfoError = {
      date_start: false,
      date_end: false,
      time_start: false,
      activity_duration: false,
      id_act: false,
   }
   activityOption = []

   resetEventInfo = () => {
      this.eventInfo = {
         date_start: null,
         date_end: null,
         time_start: null,
         activity_duration: null,
         id_act: null,
         w0: 0,
         w1: 0,
         w2: 0,
         w3: 0,
         w4: 0,
         w5: 0,
         w6: 0,
         color: '#0085e3',
      }
      this.eventInfoError = {
         date_start: false,
         date_end: false,
         time_start: false,
         activity_duration: false,
         id_act: false,
      }
      this.eventSelectedDay = {
         w0: false,
         w1: false,
         w2: false,
         w3: false,
         w4: false,
         w5: false,
         w6: false,
      }
      this.eventDisabledDay = {
         w0: false,
         w1: false,
         w2: false,
         w3: false,
         w4: false,
         w5: false,
         w6: false,
      }
   }

   setChangeDay(name, value) {
      this.eventSelectedDay = {...this.eventSelectedDay, [name]: value}
   }
   setDisabledDay(name, value) {
      this.eventDisabledDay = {...this.eventDisabledDay, [name]: value}
   }
   setActivityOption = (options) => this.activityOption = options
   
   setEventInfo = (name, value) => {
      this.eventInfo = {...this.eventInfo, [name]: value}
   }
   setEventError = (name, value = false) => {
      // eslint-disable-next-line no-prototype-builtins
      if (this.eventInfoError.hasOwnProperty(name)) {
         this.eventInfoError = {...this.eventInfoError, [name]: value}
      }
   }
   changeEvent = (name, value) => {
      this.setEventInfo(name, value)
      this.setEventError(name)
   }
}

export default new ActivityStore()