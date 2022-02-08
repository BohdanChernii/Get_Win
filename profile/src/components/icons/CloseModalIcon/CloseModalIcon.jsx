import React from 'react';
import closeModal from "@img/icons/close_modal.svg";
import {func} from "prop-types";

CloseModalIcon.propTypes = {
   onClick: func,
   
};

function CloseModalIcon({onClick, srcImg}) {
   return (
      <div className='close_modal' onClick={() => onClick && onClick()}>
         <img className='close_modal__icon' src={srcImg ? srcImg : closeModal} alt="close_modal"/>
      </div>
   );
}

export default CloseModalIcon;