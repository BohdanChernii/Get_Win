import React from 'react';
import PropTypes from 'prop-types';
import Tippy from "@tippyjs/react";

ProductList.propTypes = {
   name: PropTypes.string.isRequired,
   products: PropTypes.array.isRequired,
   checkList: PropTypes.array.isRequired,
};

function ProductList({name, products, checkList}) {
   const categoryProducts = products.filter(item => item.dep1.trim() === name)
   const categoryCheckList = checkList.filter(item => item.categoryName.trim() === name)
   return (
      <ul className='product__list'>
         {categoryProducts.map((product, index) => {
            const productName = product.name.length > 15 ? product.name.slice(0, 15) + '...' : product.name
            return (
               <li key={index}>
                  <input data-category={product.dep1.trim()} className="product__checkbox-input" data-type="checkbox"
                         type="checkbox" name={product.name} id={product.id}/>
                  <Tippy  placement='bottom' maxWidth={350} theme='orange' content={product.name}>
                     <label className="product__checkbox-label" htmlFor="${id}">{productName}</label>
                  </Tippy>
               </li>
            )
         })}
      </ul>
   
   
   );
}

export default ProductList;