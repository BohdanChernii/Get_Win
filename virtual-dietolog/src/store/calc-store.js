import {makeAutoObservable} from "mobx";
import {calcEdit, calcGet} from "@scripts/api";
import userStore from '@store/user-store'

class CalcStore {
   calc = null
   
   constructor() {
      makeAutoObservable(this)
   }
   
   setCalc(calc) {
      this.calc = calc
   }
   
   fetchCalc = async () => {
      const token = userStore.user.token
      try {
         const response = await fetch(`${calcGet}?token=${token}`)
         if (response.ok) {
            const data = await response.json()
            this.setCalc(data)
         }
         return response
      } catch (err) {
         console.error(err)
      }
   }
   
   async editCalc(cal_min, cal_max) {
      try {
         const response = await fetch(`${calcEdit}?token=${userStore.token}&cal_min=${cal_min}&cal_max=${cal_max}`);
         if (response.ok) {
            await this.fetchCalc(userStore.token)
         }
         return response
      } catch (err) {
         console.error(err)
      }
   }
}

const calcStore = new CalcStore();
export default calcStore