import React, {useEffect, useState} from 'react';
import BigSalad from "@img/icons/big-salad.svg";
import {input_add_error, input_focus_add, input_focus_remove, input_remove_error} from "@scripts/inputsInit";
import ArrowLeft from "@img/icons/arrow-left.svg";
import {Link, useHistory} from "react-router-dom";
import {initMask} from "@scripts/initMask";
import {TippyNumberRegion} from "@/components/feature/tippy/Tippys.jsx";
import {useRegions} from "@/hooks/useRegion";
import {Scrollbars} from "react-custom-scrollbars";

const handleOnFocusInput = ({target}) => {
   input_focus_add(target)
   input_remove_error(target)
}
const handleOnBlurInput = ({target}) => {
   if (!target.value) {
      input_focus_remove(target)
   }
}

function LoginPhonePage() {
   
   const history = useHistory()
   const handleOnClickHistory = () => history.push('/login')
   
   // region ========================================================================
   const {region, changeRegion, regionNumber} = useRegions();
   const handleOnChangeRegion = (e) => {
      const typeRegion = e.target.textContent;
      
      changeRegion(typeRegion)
      setNumber('')
      const input = document.querySelector('input[name="phone"]')
      input_focus_remove(input)
   }
   
   useEffect(() => {
      const input = document.querySelector('input[name="phone"]')
      if (input.classList.contains('_mask')) {
         const typeMask = input.dataset.mask
         initMask(typeMask, input)
      }
   }, [region]);
   // number ========================================================================
   const [number, setNumber] = useState('');
   const handleOnChangePhoneNumber = (e) => {
      const name = e.target.name
      let value = e.target.value
      let number
      if (name === 'phone') {
         region[0] === 'be' ? number = 3 : region[0] === 'ru' ? number = 1 : number = 2
         value = value.replace(/\W/g, '').slice(number)
      }
      setNumber(value)
   }

   // remember ========================================================================
   const [remember, setRemember] = useState(false);
   const handleOnChangeRemember = () => setRemember(!remember)
   
   // submit ========================================================================
   const handleOnSubmitForm = (e) => {
      e.preventDefault();
      const formInputs = [...document.querySelectorAll('input')]
      let errors = 0
      formInputs.forEach(input => {
         const name = input.name
         if (name === 'phone')
         {
            if (number.length <= 3) {
               errors++;
               input_add_error(input)
            }
         }
      })
      console.log(JSON.stringify(number))

   }

   return (
      <div style={{height: '620px'}} className="application">
         <Scrollbars style={{width: '100%', height: '100%',}}>
         <img className='application__logo' src={BigSalad} alt="logo"/>
         <h2 className='application__name'>App Name</h2>
         <h3 style={{marginBottom: 40}} className='application__title'>Войти с помощью мобильного</h3>
         <form action="#"
               className="form _center _w400"
               onSubmit={handleOnSubmitForm}>
            <div className="form__item">
               <h6 className="form__subtitle">Номер телефона</h6>
               <div className="form__input-container">
                  <input data-error="Пожалуйста, введите правильный номер телефона"
                         data-value={regionNumber}
                         data-mask={regionNumber}
                         className="form__input input _phone _req _mask"
                         type="tel"
                         name="phone"
                         value={number}
                         onChange={handleOnChangePhoneNumber}
                         onFocus={handleOnFocusInput}
                         onBlur={handleOnBlurInput}
                  />
                  <span className='form__input-span'>{regionNumber}</span>
                  <TippyNumberRegion regions={region} changeRegion={handleOnChangeRegion}> </TippyNumberRegion>
               </div>
            </div>
            <div className="form__item checkbox _flex-row_space-between">
               <input
                  id='remember'
                  className="checkbox__input"
                  data-type="checkbox"
                  type="checkbox"
                  name='remember'
                  checked={remember}
                  onChange={handleOnChangeRemember}
               />
               <label className="checkbox__text" htmlFor='remember'>
                  Запомнить меня
               </label>
            </div>
            <div>
               <button
                  type='reset'
                  onClick={handleOnClickHistory}
                  className='form__button _display-inline-block _btn _main-btn _grey-btn _flex-row_center'>
                  <img style={{marginRight: '28px'}} src={ArrowLeft} alt="back"/>Назад
               </button>
               <button
                  type='submit'
                  className='form__button _display-inline-block _btn _main-btn _orange-btn'>Войти
               </button>
            </div>
         
         </form>
         </Scrollbars>
      </div>
   );
}

export default LoginPhonePage;