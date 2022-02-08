import {makeAutoObservable} from "mobx";
import {filesDel, filesGet, filesUpload} from "@scripts/api";
import userStore from "@store/user-store";

class AnalysesStore {
   
   analyses = null
   
   constructor() {
      makeAutoObservable(this)
   }
   
   setAnalyses = payload => {
      this.analyses = payload
   }
   createFiles = (data) => {
      for (const key in data.files) {
         if (data.files[key].length > 0) {
            this.setAnalyses(data.files[key])
         } else this.setAnalyses(null)
      }
   }
   
   delAnalyses = async (fname) => {
      let urlBody = ``
      const objUrl = {
         dir: 'analise',
         name: fname,
      }
      for (const key in objUrl) {
         urlBody += `&${key}=${objUrl[key]}`
      }
      const config = {
         method: 'POST',
         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      }
      const url = `${filesDel}?token=${userStore.token}${urlBody}`
      try {
         const response = await fetch(url, config)
         if (response.status === 200) {
            const analyses = [...this.analyses].filter(item => item.fname !== fname)
            this.setAnalyses(analyses)
         }
         return response
      } catch (err) {
         console.error(err)
      }
   }
   
   
   uploadAnalyses = async (name, time, data) => {
      console.log(name, time, data)
      let url = ``
      const objUrl = {
         dir: 'analise',
         name,
         date: time,
      }
      for (const key in objUrl) {
         url += `&${key}=${objUrl[key]}`
      }
      const config = {
         method: 'POST',
         body: data
      }
      try {
         const response = await fetch(`${filesUpload}?token=${userStore.token}${url}`, config)
         if (response.status === 200) {
            await this.fetchAnalyses()
         }
         return response
      } catch (err) {
         console.error(err)
      }
   }
   
   fetchAnalyses = async () => {
      try {
         const response = await fetch(`${filesGet}?token=${userStore.token}&dir=analise/`)
         if (response.status === 200) {
            const data = await response.json();
            this.createFiles(data)
         }
         return response
      } catch (err) {
         console.error(err)
      }
   }
}

const analysesStore = new AnalysesStore()
export default analysesStore