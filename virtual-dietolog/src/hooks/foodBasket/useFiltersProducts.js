import foodBasketStore from "@store/food-basket-store";
import exceptionGroupStore from "@store/exception-group-store";
import {sortArrByName} from '@scripts/functions'

export const useFiltersProducts = () => {
   
   const {groups} = exceptionGroupStore
   const {basket} = foodBasketStore
   const notAcceptedGroupsArr = []
   let acceptedGroupsArr = []
   
   if (groups) {
      for (const groupsKey in groups) {
         const name = groups[groupsKey].name
         const id = groups[groupsKey].id
         let notAccepted = []
         
         basket.forEach(group => {
            if (id === group.id) {
               group.products.forEach(product => {
                  if (typeof product === 'object' && product !== null) {
                     for (let key in product) {
                        const categoryProducts = product[key]
                        if (Array.isArray(categoryProducts)) {
                           categoryProducts.forEach(item => {
                              const productList = Object.values(item)
                              productList.forEach(prList => {
                                 prList.forEach(pr => {
                                    !pr.selected && acceptedGroupsArr.push(pr.name.trim())
                                    pr.selected && notAccepted.push(pr.name.trim())
                                 })
                              })
                           })
                        }
                     }
                  }
               })
            }
         })
         notAccepted = sortArrByName(notAccepted)
         notAcceptedGroupsArr.push({id, name, notAccepted})
      }
      acceptedGroupsArr = [...new Set(sortArrByName(acceptedGroupsArr))]
      notAcceptedGroupsArr.forEach(item => {
         item.notAccepted.forEach(product => {
               if (acceptedGroupsArr.includes(product)) {
                  const index = acceptedGroupsArr.indexOf(product);
                  acceptedGroupsArr.splice(index, 1)
               }
            }
         )
      })
   }
   return {notAcceptedGroupsArr, acceptedGroupsArr}
}
