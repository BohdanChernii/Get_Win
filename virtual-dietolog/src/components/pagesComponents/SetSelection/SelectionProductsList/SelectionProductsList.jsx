import React from 'react';
import {observer} from "mobx-react-lite";
import {number} from "prop-types";

SelectionProductsList.propTypes = {
   columns: number,
   checkBy: number,
};

function SelectionProductsList(props) {
   const {columns, checkBy, storeProducts, changeSelectionProduct} = props
   const style = {paddingTop: 24, gridTemplateColumns: `repeat(${columns}, 436px)`}
   return (
      <>
        
         <div className='basket' style={style}>
            {storeProducts && storeProducts.map(item => {
               return (
                  <div key={item.name} className="basket__item">
                     <h4 className='basket__name'>{item.name}</h4>
                     {item.baseProduct.map((product, index) => {
                        const base_products = Object.entries(product)
                        const basketProductName = base_products[0][0]
                        const basketProductList = base_products[0][1]
                        
                        return (
                           <div className='basket__product-block' key={index + 'asd'}>
                              {basketProductList && basketProductList.length > 0 && <p className='basket__product-name'>{basketProductName}</p>}
                              {basketProductList && basketProductList.map(pr => (
                                 <div className='form__input-container_' key={pr.id}>
                                    <input
                                       id={pr.id}
                                       className="checkbox__input"
                                       type="checkbox"
                                       checked={pr.selected == checkBy}
                                       onChange={() => {
                                          changeSelectionProduct(pr.id)
                                       }}
                                    />
                                    <label className="checkbox__text" htmlFor={pr.id}>
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
                                       id={pr.id}
                                       className="checkbox__input"
                                       type="checkbox"
                                       checked={pr.selected == checkBy}
                                       onChange={() => {
                                          changeSelectionProduct(pr.id)
                                       }}
                                    />
                                    <label className="checkbox__text" htmlFor={pr.id}>
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
      </>
   );
}

export default observer(SelectionProductsList);