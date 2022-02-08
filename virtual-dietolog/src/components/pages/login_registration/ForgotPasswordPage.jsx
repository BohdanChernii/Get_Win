import React, {useState} from 'react';
import BigSalad from "@img/icons/big-salad.svg";
import {input_add_error, input_focus_add, input_focus_remove, input_remove_error} from "@scripts/inputsInit";
import {email_test} from "@scripts/regulars";
import ArrowLeft from "@img/icons/arrow-left.svg";
import {Link, useHistory} from "react-router-dom";

const handleOnFocusInput = ({target}) => {
   input_focus_add(target)
   input_remove_error(target)
}
const handleOnBlurInput = ({target}) => {
   if (!target.value) {
      input_focus_remove(target)
   }
}

function ForgotPasswordPage(props) {
   // history ========================================================================
   
   const history = useHistory()
   const handleOnGoBack = () => history.goBack()
   // email ========================================================================
   
   const [email, setEmail] = useState('');
   const handleOnChangeEmail = (e) => setEmail(e.target.value.toLowerCase())
   // submit ========================================================================

   const handleOnSubmitForm = (e) => {
      e.preventDefault();
      const formInputs = [...document.querySelectorAll('input')]
      let errors = 0
      formInputs.forEach(input => {
         if (input.name === 'email') {
            if (!email_test(email)) {
               errors++
               input_add_error(input);
            }
         }
      })
      if (errors === 0) {
         console.log(email)
      }
   }
   return (
      <div className="application">
         <img className='application__logo' src={BigSalad} alt="logo"/>
         <h2 className='application__name'>App Name</h2>
         <h3 style={{marginBottom: 40}} className='application__title'>Восстановление пароля</h3>
         <form action="#"
               className="form _center _w400"
               onSubmit={handleOnSubmitForm}>
            <div style={{marginBottom: 48}} className="form__item">
               <h6 className="form__subtitle">Email</h6>
               <div className="form__input-container">
                  <input data-error="Пожалуйста, введите правильный email"
                         data-value="hello.user@gmail.com"
                         className="form__input input _req"
                         type="email"
                         name="email"
                         value={email}
                         onChange={handleOnChangeEmail}
                         onFocus={handleOnFocusInput}
                         onBlur={handleOnBlurInput}
                  />
                  <span className='form__input-span'>hello.user@gmail.com</span>
               </div>
            </div>
            <div>
               <button
                  type='reset'
                  onClick={handleOnGoBack}
                  className='form__button _display-inline-block _btn _main-btn _grey-btn _flex-row_center'>
                  <img style={{marginRight: '28px'}} src={ArrowLeft} alt="back"/>Назад
               </button>
               <button
                  type='submit'
                  className='form__button _display-inline-block _btn _main-btn _orange-btn'>Отправить</button>
            </div>
         
         </form>
      </div>
   );
}

export default ForgotPasswordPage;