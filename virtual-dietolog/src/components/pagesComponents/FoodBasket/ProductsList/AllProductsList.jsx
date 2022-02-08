import React from 'react';
import foodBasketStore from "@store/food-basket-store"
import {observer} from "mobx-react-lite";
import exceptionGroupStore from "@store/exception-group-store";

AllProductsList.propTypes = {};

function AllProductsList({basketId, columns}) {
   const {basket, changeProduct} = foodBasketStore
   const {changeGroups} = exceptionGroupStore
   const style={paddingTop: 24, gridTemplateColumns: `repeat(${columns}, 436px)`}
   return (
      <>
         {basket.map(basket => {
            if (basket.id === basketId) {
               return (
                  <div key={basket.name} className='basket' style={style}>
                     {basket.products.map(item => {
                        return (
                           <div className="basket__item" key={item.name}>
                              <h4 className='basket__name'>{item.name}</h4>
                              {item.baseProduct.map((product, index) => {
                                 const base_products = Object.entries(product)
                                 const basketProductName = base_products[0][0]
                                 const basketProductList = base_products[0][1]
                                 
                                 return (
                                    <div className='basket__product-block' key={index + 'asd'}>
                                       <p className='basket__product-name'>{basketProductName}</p>
                                       {basketProductList && basketProductList.map(pr => (
                                          <div className='form__input-container_' key={pr.id}>
                                             <input
                                                id={basketId + '' + pr.id}
                                                className="checkbox__input"
                                                type="checkbox"
                                                checked={pr.selected}
                                                onChange={() => {
                                                   changeGroups(basketId, pr.id)
                                                   changeProduct(basketId, pr.id)
                                                }}
                                             />
                                             <label className="checkbox__text" htmlFor={basketId + '' + pr.id}>
                                                {pr.name.length > 35 ? pr.name.slice(0, 35) + '...' : pr.name}
                                                <span className='basket__cal'> {' ' + pr.cal} kcal/100g</span>
                                             </label>
                                          </div>
                                       ))}
                                    </div>
                                 )
                              })}
                              {!(!item.otherProduct.length) &&
                              <p className='basket__product-name'>Дополнительные продукты</p>}
                              {item.otherProduct.map((product, index) => {
                                 const other_products = Object.entries(product);
                                 let basketProductList = other_products[0][1];
                                 return (
                                    <div key={index}>
                                       {basketProductList && basketProductList.map(pr => (
                                          <div className='form__input-container_' key={pr.id}>
                                             <input
                                                id={basketId + '' + pr.id}
                                                className="checkbox__input"
                                                type="checkbox"
                                                checked={pr.selected}
                                                onChange={() => {
                                                   changeGroups(basketId, pr.id)
                                                   changeProduct(basketId, pr.id)
                                                }}
                                             />
                                             <label className="checkbox__text" htmlFor={basketId + '' + pr.id}>
                                                {pr.name.length > 35 ? pr.name.slice(0, 35) + '...' : pr.name}
                                                <span className='basket__cal'>{' ' + pr.cal} kcal/100g</span>
                                             </label>
                                          </div>
                                       ))}
                                    </div>
                                 )
                              })}
                           </div>
                        )
                     })}
                  </div>
               )
            }
         })}
      </>
   );
}

export default observer(AllProductsList);

