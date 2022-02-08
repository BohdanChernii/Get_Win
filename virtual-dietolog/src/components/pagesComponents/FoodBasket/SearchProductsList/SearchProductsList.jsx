import React from 'react';
import foodBasketStore from "@store/food-basket-store";
import {observer} from "mobx-react-lite";


function SearchProductsList({basketId, searchProducts}) {
   
   const {changeProduct} = foodBasketStore
   
   if (searchProducts.length > 0) {
      return searchProducts.map(objProduct => {
         if (objProduct.products.length > 0 && basketId === objProduct.id) {
            return objProduct.products.map(pr => (
               <div className='form__input-container_' key={pr.id}>
                  <input
                     id={basketId + '' + pr.id}
                     className="checkbox__input"
                     type="checkbox"
                     checked={pr.selected}
                     onChange={() => {
                        changeProduct(basketId, pr.id)
                     }}
                  />
                  <label className="checkbox__text" htmlFor={basketId + '' + pr.id}>
                     {pr.name}
                     <span className='basket__cal'>{' ' + pr.cal} kcal/100g</span>
                  </label>
               </div>
            ))
         }
      })
   }
}

export default observer(SearchProductsList);