import React from 'react';
import formAdd from "@img/icons/form-add-button-plus.svg";

function FormAddButton({onClick, text, extraClasses, containerStyle, icon}) {
   return (
      <div style={{minWidth: 120, ...containerStyle}} className={`add-buttons__button ${extraClasses ? extraClasses : ''}`} onClick={onClick}>
         {icon || <img src={formAdd} alt='form-add' className='add-buttons__icon'/>}
         <p className='add-buttons__title'>{text}</p>
      </div>
   );
}

export default FormAddButton;