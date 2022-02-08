import React from 'react';
import {array, string} from "prop-types";

ProductsListAccepted.propTypes = {
   products: array,
   icon: string
};

function ProductsListAccepted({products, icon}) {
   return (
      <ul>
         {products.map(product => (
            <li key={product} className='_flex-row_center'>
               <img style={{
                  width: 12, marginRight: 11,
                  alignSelf: 'flex-start', marginTop: 5
               }} src={icon} alt="icon"/>
               <p>{product}</p>
            </li>
         ))}
      </ul>);
}

export default ProductsListAccepted;