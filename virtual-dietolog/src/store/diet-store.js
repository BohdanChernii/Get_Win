import eventStore from "@store/event-store";
import setSelectionStore from "@store/set-selection-store";
import diet from '@assets/data/diet.json'

class DietStore {
   // обєк поділений по дням та прийомами харчування з його списком id продуктів
   diet = null
   
   setDiet = (diet) => {
      this.diet = diet
   }
   
   createDiet = (data) => {
      const {activity_days} = eventStore;
      const diet = []
      if (data) {
         let dietDays = JSON.parse(JSON.stringify(data))
         
         dietDays.forEach((item) => {
            const [key] = Object.keys(item)
            if (key === 'w0') {
               const el = dietDays.splice(dietDays.indexOf(item), 1)
               dietDays = dietDays.concat(el)
            }
         })
         
         dietDays.forEach(item => {
            const [key] = Object.keys(item);
            const {day: dayName} = activity_days.find(item => item.name === key);
            const dayNumber = Number(key.replace('w', ''));
            
            const takeFoods = [];
            Object.values(item).forEach(day => {
               Object.values(day).forEach(food => {
                  food.forEach(item => {
                     item.id = Number(item.id)
                     item.take_food = Number(item.take_food)
                     item.products = JSON.parse(item.products)
                  })
                  takeFoods.push(...food);
               })
            })
            diet.push({dayName, dayNumber, takeFoods})
         })
      }
      this.setDiet(diet)
   }
   findDifferentInDiet = () => {
      const diet = JSON.parse(JSON.stringify(this.diet))
      const selectionStoreIdx = [...setSelectionStore.selectionStoreIdx]
      const selectionIdx = selectionStoreIdx.map(item => Number(item.id))
      diet.forEach(item => {
         item.takeFoods.forEach(takeFood => {
            if (takeFood.products) {
               takeFood.products = takeFood.products.filter(productId => selectionIdx.includes(Number(productId)));
            }
         })
         
      })
      this.setDiet(diet)
   }
   makeDiet = (day, takeFood, products) => {
      const diet = JSON.parse(JSON.stringify(this.diet))
      diet.forEach(item => {
         if (item.dayNumber === day) {
            item.takeFoods.forEach(foods => {
               if (foods.take_food === takeFood) {
                  foods.products = products
               }
            })
         }
      })
      this.setDiet(diet)
      return diet
   }
   deleteProductFromDiet = (day, takeFood, productId) => {
      const diet = JSON.parse(JSON.stringify(this.diet))
      diet.forEach(item => {
         if (item.dayNumber === day) {
            item.takeFoods.forEach(foods => {
               if (foods.take_food === takeFood) {
                  foods.products = foods.products.filter(pr => pr !== productId);
               }
            })
         }
      })
      this.setDiet(diet)
   }
   createAllProductsForDiets = () => {
      const {checkOfSelectFilterProducts} = setSelectionStore;
      const diet = JSON.parse(JSON.stringify(this.diet));
      let allProducts = [];
      diet.forEach(item => {
         item.takeFoods.forEach(foods => {
            if (foods.products) {
               allProducts = allProducts.concat(foods.products);
            }
         })
      })
      allProducts = [...new Set(allProducts)]
      checkOfSelectFilterProducts(allProducts)
      return allProducts
   }
   
   fetchDiet = async () => {
      this.createDiet(diet.diet)
      // try {
      //    const response = await fetch(`http://localhost:5555/diet`)
      //    if (response.status === 200) {
      //       const data = await response.json();
      //       this.createDiet(data)
      //    }
      //    return response
      // } catch (err) {
      //    console.error(err)
      // }
   }
}

const dietStore = new DietStore();
export default dietStore;