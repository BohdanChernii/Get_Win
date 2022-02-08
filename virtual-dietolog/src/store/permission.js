import {makeAutoObservable} from "mobx";

class Permission {
   constructor() {
      makeAutoObservable(this)
   }
   permission = false
   
   changePermission () {
      this.permission = !this.permission
   }
}

export default new Permission();