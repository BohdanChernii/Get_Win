import foodBasketStore from "@store/food-basket-store"
import exceptionGroupStore from "@store/exception-group-store";
import {sortArrByObjName} from "@scripts/functions";

export const useSelectedProducts = () => {
   const {groups} = exceptionGroupStore
   const {basket} = foodBasketStore
   const allBasket = JSON.parse(JSON.stringify(basket))
   const selectedProducts = []
   if (groups) {
      allBasket.forEach(basket => {
         const id = basket.id
         const name = basket.name
         const products = {
            base: [],
            other: []
         }
         basket.products.forEach(category => {
            for (const key in category) {
               if (Array.isArray(category[key])) {
                  const arr = category[key]
                  arr.forEach(pr => {
                     const productInfo = {}
                     for (let key in pr) {
                        productInfo.name = key;
                        productInfo.products = pr[key].filter(product => product.selected === 1);
                     }
                     if (key === 'baseProduct') {
                        productInfo.products.length > 0 && products.base.push(productInfo)
                     } else if (key === 'otherProduct') {
                        productInfo.products.length > 0
                           ? products.other = sortArrByObjName(products.other.concat(productInfo.products))
                           : null
                     }

                  })
               }
            }
         })
         selectedProducts.push({id, name, products})
      })
   }
   return selectedProducts
}

