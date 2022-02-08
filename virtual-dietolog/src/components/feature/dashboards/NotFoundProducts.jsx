import React from 'react';
import PropTypes, {string} from 'prop-types';
import product_not_found from "@img/product_not_found.svg";

NotFoundProducts.propTypes = {
   text: string
};

function NotFoundProducts({text}) {
   return (
      <div style={{textAlign: "center"}}>
         <p style={{color: 'rgba(104, 106, 124, 1)', marginBottom: 32}}>{text}</p>
         <img  style={{width: 205}} src={product_not_found} alt="product_not_found"/>
      </div>
   );
}

export default NotFoundProducts;