import React from 'react';

ProductsListNotAccepted.propTypes = {};

function ProductsListNotAccepted({products, icon}) {
   return (
      <>
         {products.map(product => (
            <ul key={product.id} style={{marginBottom: 24}}>
               <li>
                  <p style={{color: '#7A7A7A', marginBottom: 12}}>Группа: {product.name}</p>
                  {product.notAccepted.map(item => (
                     <div key={item} className='_flex-row_center'>
                        <img style={{
                           width: 12, marginRight: 11,
                           alignSelf: 'flex-start', marginTop: 5
                        }} src={icon} alt="icon"/>
                        <p>{item}</p>
                     </div>
                  ))}
               </li>
            </ul>
         ))}
      </>
   
   );
}

export default ProductsListNotAccepted;