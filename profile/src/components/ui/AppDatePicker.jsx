import React, {useEffect, useState} from 'react';
import DatePickerCalendarIcon from "@/components/icons/picker/DatePickerCalendarIcon.jsx";
import {DatePicker} from "antd";
import {string} from "prop-types";

AppDatePicker.propTypes = {
   placeholder: string,
};

function AppDatePicker({placeholder, isHideOkButton, ...rest}) {
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
      <DatePicker
         suffixIcon={<DatePickerCalendarIcon/>}
         format='DD.MM.YYYY'
         style={{width: '100%'}}
         placeholder={placeholder}
         showToday={false}
         showNow={false}
         onOpenChange={setIsOpen}
         {...rest}/>
   );
}

export default AppDatePicker;