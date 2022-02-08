import {makeAutoObservable} from "mobx";
import userStore from "@store/user-store";
import {exceptionGroupAdd, exceptionGroupDel, exceptionGroupEdit, exceptionGroupGet} from "@scripts/api";
import foodBasketStore from "@store/food-basket-store";

class ExceptionGroupStore {
   groups = null
   
   constructor() {
      makeAutoObservable(this)
   }
   
   get groupsLength() {
      if (this.groups) {
         return Object.values(this.groups).length
      }
      return 0
   }
   
   setGroups(payload) {
      this.groups = payload
   }
   
   resetGroups = id => {
      const groups = {...this.groups}
      for (const key in groups) {
         if (groups[key].id === id) {
            groups[key].data = JSON.stringify([])
         }
      }
      this.setGroups(groups)
   }
   changeGroups = (basketId, prId) => {
      const groups = {...this.groups}
      for (const key in groups) {
         if (groups[key].id === basketId) {
            let products = groups[key].data
            if (products === null) {
               products = [Number(prId)]
            } else if (typeof products === 'string') {
               products = JSON.parse(products)
               if (products.includes(Number(prId))) {
                  products.splice(products.indexOf(Number(prId)), 1)
               } else {
                  products.push(Number(prId))
               }
            }
            if (products.length === 0) {
               groups[key].data = JSON.stringify([])
            } else {
               groups[key].data = JSON.stringify(products)
            }
         }
      }
      this.setGroups(groups)
   }
   
   addGroups = async name => {
      const url = `${exceptionGroupAdd}?token=${userStore.token}&name=${name}`
      const opt = {
         method: 'POST',
         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      }
      try {
         const response = await fetch(url, opt)
         if (response.ok) {
            await this.fetchGroups()
         }
         return response
      } catch (err) {
         console.error(err)
      }
   }
   editGroupName = async (basketId, name) => {
      const groups = {...this.groups}
      let urlBody = ''
      for (const groupsKey in groups) {
         if (Number(groups[groupsKey].id) === Number(basketId)) {
            groups[groupsKey].name = name
            const obj = groups[groupsKey]
            for (const k in obj) {
               if (obj[k] !== null){
                  urlBody += `&${k}=${obj[k]}`
               }
            }
         }
      }
      this.setGroups(groups)
      try {
         const url = `${exceptionGroupEdit}?token=${userStore.token}${urlBody}`
         const config = {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            charset: 'utf8'
         }
         return await fetch(url, config)
      } catch (err) {
         console.error(err)
      }
   }
   editGroup = async (basketId) => {
      const groups = {...this.groups}
      let urlBody = ''
      for (const key in groups) {
         if (Number(groups[key].id) === Number(basketId)) {
            const obj = groups[key]
            for (const k in obj) {
               if (obj[k] !== null){
                  urlBody += `&${k}=${obj[k]}`
               }
            }
         }
      }
      try {
         const url = `${exceptionGroupEdit}?token=${userStore.token}${urlBody}`
         const config = {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            charset: 'utf8'
         }
         return await fetch(url, config)
      } catch (err) {
         console.error(err)
      }
   }
   delGroup = async (basketId) => {
      let urlBody = ''
      for (const key in this.groups) {
         if (Number(this.groups[key].id) === Number(basketId)) {
            urlBody = `&id=${this.groups[key].id}`
         }
      }
      try {
         const url = `${exceptionGroupDel}?token=${userStore.token}${urlBody}`
         const config = {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            charset: 'utf8'
         }
         const res = await fetch(url, config)
         if (res.ok) {
            await this.fetchGroups()
            await foodBasketStore.fetchProduct()
         }
         return res
      } catch (err) {
         console.error(err)
      }
   }
   fetchGroups = async () => {
      try {
         const response = await fetch(`${exceptionGroupGet}?token=${userStore.token}`)
         if (response.ok) {
            const data = await response.json()
            this.setGroups(data.exeption_group)
         }
         
      } catch (err) {
         console.error(err)
      }
   }
}

const exceptionGroupStore = new ExceptionGroupStore()
export default exceptionGroupStore


