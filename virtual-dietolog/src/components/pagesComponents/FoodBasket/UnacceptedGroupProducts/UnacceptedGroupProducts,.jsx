import React, {Fragment} from 'react';
import foodBasketStore from "@store/food-basket-store";
import {number} from "prop-types";
import {sortArrByObjName} from "@scripts/functions";
import {useSelectedProducts} from "@/hooks/foodBasket/useSelectedProducts";

UnacceptedGroupProducts.propTypes = {
   tabIndex: number
}

function UnacceptedGroupProducts({tabIndex}) {
   const selectedProducts = useSelectedProducts()
   return (
      <>
         {selectedProducts.map(group => {
            if (Number(group.id) === tabIndex) {
               return (
                  <Fragment key={group.id}>
                     <div key={group.id} className='form__item'>
                        {group.products.base.map(basket => (
                           <ul key={basket.name} style={{marginBottom: 18}}>
                              <p className='_subtitle' style={{marginBottom: 0}}>{basket.name}</p>
                              {sortArrByObjName(basket.products).map(pr => (
                                 <li key={pr.id}>{pr.name}</li>
                              ))}
                           </ul>
                        ))}
                     </div>
                     {group.products.other.length > 0 && (
                        <div className='form__item'>
                           <p className='_subtitle' style={{marginBottom: 0}}>Дополнительные продукты</p>
                           <ul style={{marginBottom: 18}}>
                              {group.products.other.map(basket => (
                                 <li key={basket.name}>{basket.name}</li>
                              ))}
                           </ul>
                        </div>)
                     }
                  </Fragment>
               )
            }
         })}
      </>
   );
}

export default UnacceptedGroupProducts;

