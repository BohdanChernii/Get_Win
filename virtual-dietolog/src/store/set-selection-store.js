import {makeAutoObservable} from "mobx";
import {checkSelectProducts, sortArrByObjName} from "@scripts/functions";
import dietStore from "@store/diet-store";

class SetSelectionStore {
   
   // список продусків для вибору до тижневого раціону
   selectionStore = null
   
   // список усіх продусків які входитимуть в раціон
   selectionStoreIdx = null
   
   // обєк поділений по дням та прийомами харчування з його списком id продуктів
   // diet = null
   
   // список продусків для вибору до денного раціону
   filtersSelectionStore = null
   
   constructor() {
      makeAutoObservable(this)
   }
   
   setSelectionStore = (store, storeIsx) => {
      this.selectionStore = store
      this.selectionStoreIdx = storeIsx
   }
   setFiltersSelectionStore = payload => {
      this.filtersSelectionStore = payload
   }
   
   chooseAllSelectionStore = () => {
      const store = JSON.parse(JSON.stringify(this.selectionStore))
      let selectionStoreIdx = []
      store.forEach(basket => {
         if (typeof basket === 'object' && basket !== null) {
            for (let key in basket) {
               const categoryProducts = basket[key]
               if (Array.isArray(categoryProducts)) {
                  categoryProducts.forEach(item => {
                     const productList = Object.values(item)
                     productList.forEach(prList => {
                        prList.forEach(pr => {
                           pr.selected = 0
                           selectionStoreIdx.push(pr)
                        })
                     })
                  })
               }
            }
         }
      })
      this.setSelectionStore(store, selectionStoreIdx)
      this.setFiltersSelectionStore(store)
   }
   changeSelectionProduct = (prId) => {
      const store = JSON.parse(JSON.stringify(this.selectionStore))
      let selectionStoreIdx = JSON.parse(JSON.stringify(this.selectionStoreIdx))
      store.forEach(basket => {
         if (typeof basket === 'object' && basket !== null) {
            for (let key in basket) {
               const categoryProducts = basket[key]
               if (Array.isArray(categoryProducts)) {
                  categoryProducts.forEach(item => {
                     const productList = Object.values(item)
                     productList.forEach(prList => {
                        prList.forEach(pr => {
                           if (pr.id === prId) {
                              pr.selected = pr.selected === 0 ? 1 : 0
                              const idx = selectionStoreIdx.findIndex(item => item.id == pr.id)
                              if (idx > 0) {
                                 selectionStoreIdx.splice(idx, 1)
                              } else {
                                 selectionStoreIdx.push(pr)
                              }
                           }
                        })
                     })
                  })
               }
            }
         }
      })
      this.setSelectionStore(store, selectionStoreIdx)
      this.createFiltersSelectionStore(store)
   }
   crateSelectionStore = (data) => {
      const objFood = {
         'c0': 'Углеводы простые 10%',
         'c1': 'Углеводы сложные 90%',
         'f0': 'Жиры растительные 70%',
         'f1': 'Жиры животные 30%',
         'p0': 'Белки растительные 50%',
         'p1': 'Белки животные 50%',
      }
      const products = []
      let productsIdx = []
      for (const key in data) {
         const name = objFood[key]
         const baseProduct = [];
         const otherProduct = [];
         
         const base = data[key].base
         const other = data[key].other
         
         if (typeof base === 'object' && base !== null && !Array.isArray(base)) {
            // base =================================
            for (const key in base) {
               const {unSelectedProducts: acceptedProducts, unSelectedProductsIds} = checkSelectProducts(base[key])
               if (acceptedProducts.length) {
                  productsIdx = productsIdx.concat(unSelectedProductsIds)
                  baseProduct.push({[key]: acceptedProducts})
               }
            }
         }
         if (typeof other === 'object' && other !== null && !Array.isArray(other)) {
            // other =================================
            for (const key in other) {
               const {unSelectedProducts: acceptedProducts, unSelectedProductsIds} = checkSelectProducts(other[key])
               if (acceptedProducts.length) {
                  productsIdx = productsIdx.concat(unSelectedProductsIds)
                  otherProduct.push({[key]: acceptedProducts})
               }
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
      this.setSelectionStore(products, sortArrByObjName(productsIdx))
      this.setFiltersSelectionStore(products)
   }
   
   // Filters
   createFiltersSelectionStore = products => {
      let filterStore = JSON.parse(JSON.stringify(products))
      if (filterStore) {
         filterStore.forEach(basket => {
            if (typeof basket === 'object' && basket !== null) {
               for (let key in basket) {
                  const categoryProducts = basket[key]
                  if (Array.isArray(categoryProducts)) {
                     categoryProducts.forEach(item => {
                        const productList = Object.values(item)
                        productList.forEach(prList => {
                           prList.forEach((pr, index, arr) => {
                              if (Number(pr.selected) === 1) {
                                 arr.splice(index, 1)
                              }
                           })
                        })
                     })
                  }
               }
            }
         })
      }
      this.setFiltersSelectionStore(filterStore)
   }
   
   changeFiltersSelectionProduct = (prId) => {
      const store = JSON.parse(JSON.stringify(this.filtersSelectionStore))
      // let selectionStoreIdx = JSON.parse(JSON.stringify(this.selectionStoreIdx))
      store.forEach(basket => {
         if (typeof basket === 'object' && basket !== null) {
            for (let key in basket) {
               const categoryProducts = basket[key]
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
      this.setFiltersSelectionStore(store)
   }
   checkOfSelectFilterProducts = (dietArr) => {
      const store = JSON.parse(JSON.stringify(this.filtersSelectionStore))
      store.forEach(basket => {
         if (typeof basket === 'object' && basket !== null) {
            for (let key in basket) {
               const categoryProducts = basket[key]
               if (Array.isArray(categoryProducts)) {
                  categoryProducts.forEach(item => {
                     const productList = Object.values(item)
                     productList.forEach(prList => {
                        prList.forEach(pr => {
                           if (dietArr && dietArr.includes(Number(pr.id))) {
                              pr.selected = 1
                           }
                        })
                     })
                  })
               }
            }
         }
      })
      this.setFiltersSelectionStore(store)
   }
   resetOfSelectFilterProducts = () => {
      const store = JSON.parse(JSON.stringify(this.filtersSelectionStore))
      store.forEach(basket => {
         if (typeof basket === 'object' && basket !== null) {
            for (let key in basket) {
               const categoryProducts = basket[key]
               if (Array.isArray(categoryProducts)) {
                  categoryProducts.forEach(item => {
                     const productList = Object.values(item)
                     productList.forEach(prList => {
                        prList.forEach(pr => {
                           pr.selected = 0
                        })
                     })
                  })
               }
            }
         }
      })
      this.setFiltersSelectionStore(store)
   }
   makeDietByFilterStore = (day, takeFood) => {
      const {makeDiet} = dietStore
      const store = JSON.parse(JSON.stringify(this.filtersSelectionStore))
      const products = []
      store.forEach(basket => {
         if (typeof basket === 'object' && basket !== null) {
            for (let key in basket) {
               const categoryProducts = basket[key]
               if (Array.isArray(categoryProducts)) {
                  categoryProducts.forEach(item => {
                     const productList = Object.values(item)
                     productList.forEach(prList => {
                        prList.forEach(pr => {
                           pr.selected === 1 && products.push(Number(pr.id))
                        })
                     })
                  })
               }
            }
         }
      })
      return makeDiet(day, takeFood, products)
   }
}

const setSelectionStore = new SetSelectionStore();
export default setSelectionStore;