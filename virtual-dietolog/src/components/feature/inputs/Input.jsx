import React, {useEffect, useRef} from 'react';
import {input_focus_add, input_focus_remove, input_remove_error} from "@scripts/inputsInit";
import {initMask} from "@scripts/initMask";
import '@img/icons/arrow_prev.svg'

function Input(props) {
   const {type, hoverText, mask, error, classes, value, changeValue, img, name} = props;
   const refInput = useRef(null);
   const handleOnBlurInput = (e) => {
      if (!e.target.value) {
         input_focus_remove(e.target)
      }
   }
   const handleOnFocusInput = (e) => {
      input_focus_add(e.target)
      input_remove_error(e.target)
   }
   useEffect(() => {

      if (refInput.current.classList.contains('_mask')) {
         const typeMask = refInput.current.dataset.mask
         initMask(typeMask, refInput.current)
      }
      return () => {};
   }, []);
   const days = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]

   return (
      <>
         <input
            ref={refInput}
            type={type}
            value={value}
            name={name}
            data-error={error}
            data-value={hoverText}
            data-mask={mask}
            className={classes}
            onChange={(e) => changeValue(e)}
            onBlur={handleOnBlurInput}
            onFocus={handleOnFocusInput}
         />
         {hoverText && <span className='form__input-span'>{hoverText}</span>}
         {img && <img className="form__icon" src={img} alt="img"/>}

      </>
   );
}

export default Input;