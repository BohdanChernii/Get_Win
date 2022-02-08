import {makeAutoObservable} from "mobx";
import {spravGet} from "@scripts/api";

class SpravStore {
   
   srav = {}
   
   // sprav_act
   // sprav_colors
   // sprav_diet
   // sprav_fat
   // sprav_protein
   // sprav_carb
   // sprav_program
   // sprav_sex
   constructor() {
      makeAutoObservable(this)
   }
   
   setSprav(payload) {
      this.srav = payload
   }
   
   async fetchSprav() {
      try {
         const response = await fetch(spravGet);
         const data = await response.json();
         this.setSprav(data)
      } catch (err) {
         console.error(err)
      }
   }
   
}

const spravStore = new SpravStore()
export default spravStore