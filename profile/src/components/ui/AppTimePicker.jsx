import React, {useEffect, useState} from 'react';
import {TimePicker} from "antd";
import {bool, string} from "prop-types";


AppTimePicker.propTypes = {
   placeholder: string.isRequired,
   isHideOkButton: bool,
};

function AppTimePicker({placeholder, isHideOkButton, ...rest}) {
   const [isOpen, setIsOpen] = useState(false);
   
   const hideOkButton = () => {
      const popupContainer = [...document.querySelectorAll('.ant-picker-footer')];
      isHideOkButton && popupContainer.forEach(el => el.classList.add('hide-ok-button'))
   };
   
   useEffect(() => {
      if (isOpen) {
         hideOkButton()
      }
   }, [isOpen]);
   
   return (
      <TimePicker
         style={{width: '100%'}}
         showNow={false}
         minuteStep={5}
         format='HH:mm'
         placeholder={placeholder}
         onOpenChange={setIsOpen}
         {...rest}
      />
   );
}

export default AppTimePicker;