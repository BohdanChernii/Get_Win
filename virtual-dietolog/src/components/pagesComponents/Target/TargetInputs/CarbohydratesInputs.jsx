import React from 'react';
import {array, bool, func, number, string} from 'prop-types';
import {observer} from "mobx-react-lite";
import {TippyTargetInfo} from "@/components/feature/tippy/Tippys.jsx";

CarbohydratesInputs.propTypes = {
   options: array.isRequired,
   value: string,
   changeCarbohydrates: func,
   type: string
};

function CarbohydratesInputs({options, value, changeCarbohydrates, type}) {
   return (
      <>
         <div className="form__row">
            {options.map((opt, index) => {
                  return (
                     <div key={index} className="form__row-box">
                        <input
                           className="form__input-radio"
                           type='radio'
                           id={type + opt.id}
                           value={value ? value : ''}
                           checked={opt.id == value}
                           onChange={() => changeCarbohydrates(opt.id)}
                        />
                        <label className={`form__label-custom ${opt.id === value ? 'active' : ''}`} htmlFor={type + opt.id}>
                           <span style={{width: '100%'}}
                                 className={`_target-checkbox checkbox__text ${opt.id === value ? 'active' : ''} _font14 `}>{opt.name}</span>
                           <div className="dots">
                              <span className="dot dot-blue">Простые</span>
                              <span className="dot dot-green">Сложные</span>
                           </div>
                           
                           <div className="form__row _flex-row_space-between" style={{marginBottom: 8}}>
                              <div style={{width: `${opt.p1}%`, justifyContent: 'center'}}
                                   className="form__row-box _flex-row_center _target__percents _target__percents_blue">{opt.p1}%</div>
                              <div style={{width: `${opt.p0}%`, justifyContent: 'center'}}
                                   className="form__row-box _flex-row_center _target__percents _target__percents_green">{opt.p0}%</div>
                           </div>
                        
                        </label>
                     </div>
                  )
               }
            )}
         </div>
      </>
   );
}

export default observer(CarbohydratesInputs);