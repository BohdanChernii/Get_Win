import React from 'react';
import {func} from 'prop-types';

Arrow.propTypes = {
   changeSlide: func
};
// const changeSlide = (type) => {
//
//    type === 'increment' && setSlide(prev => {
//       if (prev > 1) {
//          return 0
//       }
//       return prev + 1
//    })
//    type === 'decrement' && setSlide(prev => {
//       if (prev <= 0) {
//          return 2
//       }
//       return prev - 1
//    })
// }
function Arrow({changeSlide}) {
   return (
      <div className=' _flex-row_space-between'>
         <div className="arrow arrow_left" onClick={() => changeSlide('decrement')}>
            <span className="arrow__line arrow__line-1"> </span>
            <span className="arrow__line arrow__line-2"> </span>
         </div>
         <h3 className='_title-h3'>{name}</h3>
         <div className="arrow arrow_right" onClick={() => changeSlide('increment')}>
            <span className="arrow__line arrow__line-1"> </span>
            <span className="arrow__line arrow__line-2"> </span>
         </div>
      </div>
   );
}

export default Arrow;