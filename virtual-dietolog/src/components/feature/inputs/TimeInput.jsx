import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, TimePicker,} from '@material-ui/pickers';
import ruLocale from "date-fns/locale/ru";
import {ThemeProvider} from "@material-ui/styles";
import {Orange} from "@/components/feature/DatePickerTheme";
import {input_focus_add, input_focus_remove, input_remove_error} from "@scripts/inputsInit";
import {bool, func, string} from "prop-types";

const handleOnBlurInput = (e) => !e.target.value ? input_focus_remove(e.target) : null
const handleOnFocusInput = (e) => {
   input_focus_add(e.target)
   input_remove_error(e.target)
}

TimeInput.prototype = {
   date: string,
   isError: bool,
   changeValue: func,
   name: string
}

const ResetButton = (<p
   style={{
      color: '#000',
      textTransform: 'capitalize',
      fontFamily: 'Gilroy',
      fontSize: 'inherit',
   }}
   className="_btn _main-btn _grey-btn">Отменить</p>);

const SubmitButton = (<p
   style={{
      color: '#fff',
      textTransform: 'capitalize',
      fontFamily: 'Gilroy',
      fontSize: 'inherit',
   }}
   className="_btn _main-btn _orange-btn">Сохранить</p>);


function TimeInput({date, isError, changeValue, name}) {
   const classes = 'form__input input';
   let newDate = null;
   if (date) {
      const time = date.split(':');
      const hours = Number(time[0]);
      const minutes = Number(time[1]);
      newDate = new Date().setHours(hours && hours);
      newDate = new Date(newDate).setMinutes(minutes);
   }
   return (
      <>
         <div className="form__input-container">
            <ThemeProvider theme={Orange}>
               <MuiPickersUtilsProvider locale={ruLocale} utils={DateFnsUtils}>
                  <TimePicker
                     ampm={false}
                     minutesStep={5}
                     value={newDate}
                     cancelLabel={ResetButton}
                     okLabel={SubmitButton}
                     className={date ? classes.concat(' _focus') : classes}
                     onChange={(date) => {
                        const hours = new Date(date).getHours()
                        let minutes = new Date(date).getMinutes()
                        if (minutes < 10) minutes = `${minutes}0`
                        changeValue(name, `${hours}:${minutes}`)
                     }}
                     onBlur={handleOnBlurInput}
                     onFocus={handleOnFocusInput}
                  />
               </MuiPickersUtilsProvider>
            </ThemeProvider>
            {!date && <span className='form__input-span'>напр. 09:00</span>}
            {isError && <div className="form__error">Пожалуйста, заполните поле</div>}
         </div>
      
      </>
   );
}

export default TimeInput;