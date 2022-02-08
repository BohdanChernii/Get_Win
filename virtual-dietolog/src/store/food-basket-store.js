import {configure, makeAutoObservable} from "mobx";
import {productsDenyGet} from "@scripts/api";
import userStore from '@store/user-store'
import exceptionGroupStore from "@store/exception-group-store";
import setSelectionStore from "@store/./set-selection-store";
import {checkSelectProducts} from "@scripts/functions";

configure({
   enforceActions: 'observed'
})

class FoodBasketStore {
   
   basket = []
   
   constructor() {
      makeAutoObservable(this)
   }
   
   setBasket(payload) {
      this.basket = payload
   }
   
   createBasket(data) {
      const {groups} = exceptionGroupStore
      const objFood = {
         'c0': 'Углеводы простые 10%',
         'c1': 'Углеводы сложные 90%',
         'f0': 'Жиры растительные 70%',
         'f1': 'Жиры животные 30%',
         'p0': 'Белки растительные 50%',
         'p1': 'Белки животные 50%',
      }
      const basket = []
      if (groups) {
         Object.values(groups).forEach(group => {
            const id = group.id
            const name = group.name
            const products = []
            
            let dataProducts = []
            if (group.data !== null && typeof group.data === "string") {
               dataProducts = JSON.parse(group.data)
            }
   
            for (const key in data) {
             
               const name = objFood[key]
               const baseProduct = [];
               const otherProduct = [];
               
               const base = data[key].base
               const other = data[key].other
               if (typeof base === 'object' && base !== null && !Array.isArray(base)) {
                  // base =================================
                  for (const key in base) {
                     const {selectedProducts} = checkSelectProducts(base[key], dataProducts)
                     baseProduct.push({[key]: selectedProducts})
                  }
               }
               if (typeof other === 'object' && other !== null && !Array.isArray(other)) {
                  // other =================================
                  for (const key in other) {
                     const {selectedProducts} = checkSelectProducts(other[key], dataProducts)
                     otherProduct.push({[key]: selectedProducts})
                  }
               }
               products.push(
                  {
                     name,
                     baseProduct,
                     otherProduct
                  }
               )
            }
            basket.push({id, name, products})
         })
         this.setBasket(basket)
      } else {
         this.setBasket(basket)
      }
   }
   
   changeProduct = (basketId, prId) => {
      const basket = JSON.parse(JSON.stringify(this.basket))
      basket.forEach(group => {
         if (Number(group.id) === Number(basketId)) {
            group.products.forEach(product => {
               if (typeof product === 'object' && product !== null) {
                  for (let key in product) {
                     const categoryProducts = product[key]
                     if (Array.isArray(categoryProducts)) {
                        categoryProducts.forEach(item => {
                           const productList = Object.values(item)
                           productList.forEach(prList => {
                              prList.forEach(pr => {
                                 if (pr.id === prId) {
                                    pr.selected = pr.selected === 0 ? 1 : 0
                                 }
                              })
                           })
                        })
                     }
                  }
               }
            })
         }
      })
      this.setBasket(basket)
   }
   
   resetProduct = (basketId) => {
      const basket = JSON.parse(JSON.stringify(this.basket))
      basket.forEach(group => {
         if (Number(group.id) === Number(basketId)) {
            group.products.forEach(product => {
               if (typeof product === 'object' && product !== null) {
                  for (let key in product) {
                     const categoryProducts = product[key]
                     if (Array.isArray(categoryProducts)) {
                        categoryProducts.forEach(item => {
                           const productList = Object.values(item)
                           productList.forEach(prList => {
                              prList.forEach(pr => pr.selected = 0)
                           })
                        })
                     }
                  }
               }
            })
         }
      })
      this.setBasket(basket)
   }
   
   fetchProduct = async () => {
      try {
         const response = await fetch(`${productsDenyGet}?token=${userStore.token}`)
         if (response.status === 200) {
            const data = await response.json();
            this.createBasket(data)
            setSelectionStore.crateSelectionStore(data)
         }
         return response
      } catch (err) {
         console.error(err)
      }
   }
}

const foodBasketStore = new FoodBasketStore()


export default foodBasketStore