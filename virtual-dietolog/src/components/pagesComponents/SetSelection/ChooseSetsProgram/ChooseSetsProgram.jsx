import React from 'react';
import PropTypes from 'prop-types';

import foodBag from "@img/food-bag.svg";
import foodBagBig from "@img/food-bag-big.svg";


ChooseSetsProgram.propTypes = {

};

function ChooseSetsProgram({options, type, value, changeProgram}) {
   const images = [foodBag, foodBagBig]
   return (
      <div className="form__row " style={{maxWidth: 779 + 50 , margin: '0 -25px', paddingTop: 24}}>
         {options.map((opt, index) => {
               return (
                  <div key={index} className="form__row-box" style={{flex: '1 0 auto', margin: '0 25px'}}>
                     <input
                        className="form__input-radio"
                        type='radio'
                        id={type + opt.id}
                        value={value ? value : ''}
                        checked={opt.id == value}
                        onChange={() => changeProgram && changeProgram(opt.id)}
                     />
                     <label className={`form__label-custom ${opt.id == value ? 'active' : ''}`}
                            style={{width: '100%'}}
                            htmlFor={type + opt.id}>
                           <span
                              style={{width: 200}}
                              className={`_target-checkbox checkbox__text ${opt.id == value ? 'active' : ''} _font14 `}>{opt.name}</span>
                        <img style={{right: 15}} src={images[index]} alt="program"/>
                     </label>
                  </div>
               )
            }
         )}
      </div>
   );
}

export default ChooseSetsProgram;