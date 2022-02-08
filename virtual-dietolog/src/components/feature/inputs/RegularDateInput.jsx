import React from 'react';
import {ThemeProvider} from "@material-ui/styles";
import {Orange} from "@/components/feature/DatePickerTheme";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import ruLocale from "date-fns/locale/ru";
import CalendarIcon from "@img/icons/calendarBlank.svg";
import DateFnsUtils from "@date-io/date-fns";
import format from "date-fns/format";
import {input_focus_add, input_focus_remove, input_remove_error} from "@scripts/inputsInit";

const handleOnBlurInput = (e) => !e.target.value ? input_focus_remove(e.target) : null
const handleOnFocusInput = (e) => {
   input_focus_add(e.target)
   input_remove_error(e.target)
}

class LocalizedUtils extends DateFnsUtils {
   getDatePickerHeaderText(date) {
      return format(date, "d MMMM", {locale: this.locale});
   }
}

RegularDateInput.propTypes = {};

function RegularDateInput({value, isError, changeDate}) {
   const classes = 'form__input input';
   const spanClasses = 'form__input-span';
   return (
      <>
         <div className="form__input-container">
            <ThemeProvider theme={Orange}>
               <MuiPickersUtilsProvider utils={LocalizedUtils} locale={ruLocale}>
                  <DatePicker
                     value={value}
                     onChange={(date) => {
                        changeDate(date)
                     }}
                     format='d MMMM yyyy'
                     variant='inline'
                     name='date'
                     data-error='Ошибка'
                     autoOk
                     className={value ? classes.concat(' _focus') : classes}
                     onBlur={handleOnBlurInput}
                     onFocus={handleOnFocusInput}
                  />
               </MuiPickersUtilsProvider>
            </ThemeProvider>
            {!value &&
            <span className={spanClasses}>напр. 23 Мая 1995</span>}
            {/*{isError && <div className="form__error">Пожалуйста, заполните поле</div>}*/}
            <img className="form__icon form__icon-calendar" src={CalendarIcon} alt="img"/>
         </div>
      </>
      
   );
}

export default RegularDateInput;