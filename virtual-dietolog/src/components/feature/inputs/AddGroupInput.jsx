import React from 'react';
import {func, string} from 'prop-types';
import {input_focus_add, input_focus_remove, input_remove_error} from "@scripts/inputsInit";
import {observer} from "mobx-react-lite";

const handleOnBlurInput = (e) => !e.target.value ? input_focus_remove(e.target) : null
const handleOnFocusInput = (e) => {
   input_focus_add(e.target)
   input_remove_error(e.target)
}

AddGroupInput.propTypes = {
   value: string,
   changeValue: func,
};

function AddGroupInput({value, changeValue}) {
   return (
      <div className={`form__item  ${value ? '_focus' : ''}`} style={{marginBottom: 50}}>
         <h6 className={`form__subtitle`}>Название группы</h6>
         <div className="form__input-container">
            <input data-error="Пожалуйста, заполните поле"
                   className={`form__input input ${value ? '_focus' : ''}`}
                   type="text"
                   name="group-name"
                   value={value}
                   onChange={(e) => changeValue(e.target.value)}
                   onFocus={handleOnFocusInput}
                   onBlur={handleOnBlurInput}
            />
            {!value && <span className={`form__input-span`}>Введите название группы</span>}
         </div>
      </div>
   
   );
}

export default observer(AddGroupInput);