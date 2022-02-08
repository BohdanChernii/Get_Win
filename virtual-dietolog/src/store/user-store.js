import {makeAutoObservable} from "mobx";
import {userInfoGet, userInfoUpdate, userUploadImg} from "@scripts/api";

class UsersStore {
   user = {
      bdate: null,
      cal_max: null,
      cal_min: null,
      created_at: null,
      data: null,
      email: null,
      email_verified_at: null,
      height: null,
      id: null,
      id_act: null,
      id_carb: null,
      id_diet: null,
      id_fat: null,
      id_program: null,
      id_protein: null,
      id_sex: null,
      name: null,
      phone: null,
      remember_token: null,
      target: null,
      token: null,
      updated_at: null,
      weight: null,
      pass: null,
      icon: null
   }
   token = ''
   
   constructor() {
      makeAutoObservable(this)
   }
   
   setUser(user) {
      this.user = user
   }
   
   setToken(token) {
      this.token = token
   }
   
   setUserByToken = async (token) => {
      // console.log(token)
      try {
         const res = await fetch(`${userInfoGet}?token=${token}`);
         const user = await res.json()
         if (user) {
            console.log(user)
            this.setUser(user)
            this.setToken(token)
         }
         return res
      } catch (err) {
         console.error(err)
      }
   }
   changeUserValue = (name, value) => {
      const user = {...this.user}
      user[name] = value
      this.setUser(user)
   }
   
   updateUser = async (requestObj) => {
      let bodyUrl = ''
      for (const key in requestObj) {
         if (requestObj[key] && key !== 'icon') {
            if (key !== 'pass') {
               bodyUrl += `&${key}=${requestObj[key]}`
            }
         }
      }
      const url = `${userInfoUpdate}?token=${this.user.token}${bodyUrl}`
      const opt = {
         method: 'POST',
         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      }
      try {
         // запит на отримання user та перезапис його в state
         const response = await fetch(url, opt)
         if (response.ok) {
         // якщо окб то обновляю user за токеном та перезапис його в state
            await this.setUserByToken(this.user.token)
         }
         return response
      } catch (err) {
         console.error(err)
         return err
      }
   }
   updatePass = async (pass, is_confirm = 0) => {
      let url = `${userInfoUpdate}?token=${this.user.token}&pass=${pass}`
      if (is_confirm === 1) {
         url += `&is_confirm=${is_confirm}`
      }
      const opt = {
         method: 'POST',
         headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
      console.log(url)
      try {
         const res = await fetch(url, opt)
         console.log(res)
         if (res.ok) {
            await this.setUserByToken(this.user.token)
         }
         return res
      } catch (err) {
         console.error(err)
         return err
      }
   }
   updateImg = async data => {
      const url = `${userUploadImg}?token=${this.user.token}`
      const opt = {
         method: 'POST',
         // headers: {'Content-Type': 'application/x-www-form-urlencoded'},
         body: data
      }
      try {
         const res = await fetch(url, opt)
         if (res.ok) {
            await this.setUserByToken(this.user.token)
         }
         return res
      } catch (err) {
         console.error(err)
      }
   }
}

export default new UsersStore()