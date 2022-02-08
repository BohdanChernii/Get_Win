import React from 'react';
import {ThemeProvider} from "@material-ui/styles";
import {Orange} from "@/components/feature/DatePickerTheme";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import ruLocale from "date-fns/locale/ru";
import CalendarIcon from "@img/icons/calendarBlank.svg";
import DateFnsUtils from "@date-io/date-fns";
import format from "date-fns/format";
import PropTypes, {bool, func, string} from "prop-types";
import {input_focus_add, input_focus_remove, input_remove_error} from "@scripts/inputsInit";
import activityStore from "@store/activity-store";

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

DateInput.propTypes = {
   value: PropTypes.instanceOf(Date),
   minDate: PropTypes.instanceOf(Date),
   isError: bool,
   changeDate: func,
   name: string,
   placeholder: bool,
   disabled: bool,
}

function DateInput({value, changeDate, name, isError, minDate, disabled, placeholder}) {
   const classes = 'form__input input';
   const spanClasses = 'form__input-span';
   return (
      <div className="form__input-container">
         <ThemeProvider theme={Orange}>
            <MuiPickersUtilsProvider utils={LocalizedUtils} locale={ruLocale}>
               <DatePicker
                  disabled={disabled}
                  minDate={minDate}
                  value={value}
                  onChange={(date) => {
                     const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
                     const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
                     let formatted_date = date.getFullYear() + "-" + month + "-" + day;
                     activityStore.setEventInfo(name, formatted_date)
                     changeDate(name, date)
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
         <span style={{top: '50%', transform: 'translateY(-50%)'}} className={!placeholder ? spanClasses : spanClasses.concat(' _placeholder')}>напр. 23 Мая 1995</span>}
         {isError && <div className="form__error">Пожалуйста, заполните поле</div>}
         <img className="form__icon form__icon-calendar" src={CalendarIcon} alt="img"/>
      </div>
   );
}

export default DateInput;