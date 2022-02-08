import foodBasketStore from "@store/food-basket-store"
import {sortArrByObjName} from "@scripts/functions";

export const useSearchingProducts = value => {
   const {basket} = foodBasketStore
   const groupBasket = JSON.parse(JSON.stringify(basket))
   let searchProduct = []
   if (value) {
      groupBasket.forEach(group => {
         const obj = {
            id: group.id,
            products: []
         }
         group.products.forEach(product => {
            for (let key in product) {
               const category = product[key]
               if (Array.isArray(category)) {
                  category.forEach(item => {
                     const productList = Object.values(item)
                     productList.forEach(prList => {
                        prList.forEach(pr => {
                           const name = pr.name.toLowerCase();
                           const search = value.toLowerCase()
                           if (name.includes(search)) {
                              obj.products.push({...pr})
                           }
                        })
                     })
                  })
               }
            }
            obj.products = sortArrByObjName(obj.products)
         })
         searchProduct.push(obj)
      })
   } else searchProduct.length = 0
   return searchProduct
}

