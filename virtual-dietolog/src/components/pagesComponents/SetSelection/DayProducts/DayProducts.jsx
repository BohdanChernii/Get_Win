import React, {useState} from 'react';
import setSelectionStore from "@store/set-selection-store";
import delIcon from "@img/icons/close_gray.svg";

import {observer} from "mobx-react-lite";
import {array, number} from "prop-types";
import dietStore from "@store/diet-store";

DayProducts.propTypes = {
   dayNumber: number,
   takeFoodNumber: number,
   products: array,
};


function DayProducts({dayNumber, takeFoodNumber, products}) {
   const {selectionStoreIdx} = setSelectionStore;
   const {deleteProductFromDiet} = dietStore;
   const [el, setEl] = useState(null);
   const deleteProduct = (e, productId) => {
      deleteProductFromDiet(dayNumber, takeFoodNumber, productId);
      setEl(productId)
   }
   return (
      <ul>
         {selectionStoreIdx && products && products.map(productId => {
            const product = selectionStoreIdx.find(pr => Number(pr.id) === Number(productId))
            if (product) {
               const productName = product.name.length > 20 ? product.name.slice(0, 20) + '..' : product.name
               const productCal = product.cal + 'kcal / 100гр'
               return (
                  <li  key={productId} className='_flex-row_space-between' style={{margin: '0 12px 0 24px', padding: '8px 0'}}>
                     <p>{productName} <span style={{color: '#727486', fontSize: 14}}>{productCal}</span></p>
                     <img src={delIcon} alt="del" style={{cursor: "pointer", width: 18, height: 18}}
                          onClick={(e) => deleteProduct(e, productId)}/>
                  </li>
               )
            }
         })}
         {selectionStoreIdx && products == null || products.length === 0 && (
            <li className='_flex-row_space-between' style={{margin: '0 12px 0 24px', padding: '8px 0'}}>
               {console.log(el)}
               <p>Упс</p>
            </li>
         )}
      </ul>
   );
}

export default observer(DayProducts);