import React, {useEffect} from 'react';
import {array, bool, func, number, string} from 'prop-types';
import {TippyTargetInfo} from "@/components/feature/tippy/Tippys.jsx";
import spravStore from "@store/sprav-store";
import {observer} from "mobx-react-lite";

DietInputs.propTypes = {
   options: array.isRequired,
   value: string,
   changeDiet: func,
   type: string
   // error: bool,
   // popup: string
};

function DietInputs({options, value, changeDiet, type}) {

   return (
      <>
         <div className="form__row">
            {options && options.map((opt, index) => {
                  return (
                     <div key={index} className="form__row-box">
                        <input
                           className="form__input-radio"
                           type='radio'
                           id={type + opt.id}
                           value={value ? value : ''}
                           checked={opt.id == value}
                           onChange={() => changeDiet && changeDiet(opt.id)}
                        />
                        <label className={`form__label-custom ${opt.id === value ? 'active' : ''} `} htmlFor={type + opt.id}>
                           <span
                              className={`_target-checkbox checkbox__text ${opt.id === value ? 'active' : ''} _font14 `}>{opt.name}</span>
                           <div className="form__row _flex-row_space-between" style={{marginBottom: 8}}>
                              <div style={{width: '40%'}}
                                   className="form__row-box _flex-row_center _target__percents _target__percents_purple">{opt.p_protein}% Белки</div>
                              <div style={{width: '60%'}}
                                   className="form__row-box _flex-row_center _target__percents _target__percents_orange">{opt.p_fat}% Жиры</div>
                           </div>
                           <div
                              className=" _flex-row_center _target__percents _target__percents_blue">{opt.p_carb}% Углеводы</div>
                        </label>
                     </div>
                  )
               }
            )}
         </div>
      </>
   );
}

export default observer(DietInputs);