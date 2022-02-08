import React from 'react';
import {array, func, string} from "prop-types";
import {observer} from "mobx-react-lite";
import loseWeight from "@img/lose-weight.svg";
import gainWeight from "@img/gain-weight.svg";
import healthyEating from "@img/healthy-eating.svg";

ProgramInputs.propTypes = {
   options: array.isRequired,
   value: string,
   changeProgram: func,
   type: string
};
const programImg = [loseWeight, healthyEating, gainWeight]

function ProgramInputs({options, value, changeProgram, type}) {
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
                           onChange={() => changeProgram && changeProgram(opt.id)}
                        />
                        <label className={`form__label-custom ${opt.id === value ? 'active' : ''}`}
                               htmlFor={type + opt.id}>
                           <span
                              className={`_target-checkbox checkbox__text ${opt.id === value ? 'active' : ''} _font14 `}>{opt.name}</span>
                           <img src={programImg[index]} alt="program"/>
                        </label>
                     </div>
                  )
               }
            )}
         </div>
      
      </>
   );
}

export default observer(ProgramInputs);
