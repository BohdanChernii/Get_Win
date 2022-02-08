import React from 'react';
import Close from "@img/icons/close_orange.svg";


function ProductSelectedList({name, checkList}) {
   const [list] = checkList.filter(item => name === item.categoryName)
   
   return (
      <>
         <ul className='selected__list _flex-row_start _spoller'>
            {list.products.map((item, index) => (
               <li key={index} className="selected__box">
                  <p>{item.name}</p>
                  <img src={Close} alt="X"/>
               </li>
            ))}
            <button data-category={list.categoryName} className="selected__button _btn _sub-btn _grey-btn"
                    data-type="reset">Очистить все
            </button>
         </ul>
        
      </>
   );
}

// ProductSelectedList.propTypes =
// {
//    categoryName: PropTypes.string.isRequired,
//    checkList: PropTypes.array.isRequired
// };

export default ProductSelectedList;