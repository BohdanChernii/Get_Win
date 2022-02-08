import React, {useEffect, useState} from 'react';
import BigSalad from "@img/icons/big-salad.svg";
import {input_add_error, input_focus_add, input_focus_remove, input_remove_error} from "@scripts/inputsInit";
import HiddenPasswordIcon from "@img/icons/ic_visible password@3x.png";
import ArrowLeft from "@img/icons/arrow-left.svg";
import {handleHideShowPassword} from "@scripts/functions";
import {useHistory} from "react-router-dom";
import {useRegions} from "@/hooks/useRegion";
import {TippyNumberRegion} from "@/components/feature/tippy/Tippys.jsx";
import {initMask} from "@scripts/initMask";
import {email_test} from "@scripts/regulars";
import {userRegistration} from "@scripts/api";
import userStore from "@store/user-store";
import permission from "@store/permission";
import exceptionGroupStore from "@store/exception-group-store";
import spravStore from "@store/sprav-store";
import eventStore from "@store/event-store";
import foodBasketStore from "@store/food-basket-store";
import analysesStore from "@store/analyses-store";

const handleOnFocusInput = ({target}) => {
   input_focus_add(target)
   input_remove_error(target)
}
const handleOnBlurInput = ({target}) => {
   if (!target.value) {
      input_focus_remove(target)
   }
}
const newUser = {
   // name: "Руслан Горин",
   // email: "rusl230595@gmail.com",
   // phone: "0977352679",
   // password: "4HW+g&QU*BkZUtm#",
   // repeat_password: "4HW+g&QU*BkZUtm#",
   name: '',
   email: '',
   phone: '',
   password: '',
   repeat_password: '',
}

function RegistrationPage() {
   const history = useHistory()
   const handleOnClickHistory = () => history.goBack()
   
   const getUserInfoByToken = async token => {
      document.cookie = `token=${token};`
      const res = await userStore.setUserByToken(token);
      if (res.ok) {
         console.log('start')
         await spravStore.fetchSprav();
         await eventStore.fetchEventsData();
         // await calcStore.fetchCalc()
         await exceptionGroupStore.fetchGroups();
         await foodBasketStore.fetchProduct();
         await analysesStore.fetchAnalyses();
         console.log('end')
      }
      permission.changePermission()
      history.push('/')
   }
   
   // region ========================================================================
   const {region, changeRegion, regionNumber} = useRegions();
   const handleOnChangeRegion = (e) => {
      const typeRegion = e.target.textContent;
      changeRegion(typeRegion)
      setUser({...user, phone: ''})
      const input = document.querySelector('input[name="phone"]')
      input_focus_remove(input)
   }
   useEffect(() => {
      const inputs = document.querySelectorAll('input')
      inputs.forEach(input => {
         input.value ? input_focus_add(input) : null
         if (input.classList.contains('_mask')) {
            const typeMask = input.dataset.mask
            initMask(typeMask, input)
         }
      })
      
   }, [region]);
   
   // user ========================================================================
   const [user, setUser] = useState(newUser);
   const handleOnChangeUser = (e) => {
      const name = e.target.name;
      let value = e.target.value;
      if (name === 'phone') {
         let number;
         region[0] === 'be' ? number = 3 : region[0] === 'ru' ? number = 1 : number = 2;
         value = value.replace(/\W/g, '').slice(number);
      }
      
      setUser(prevState => ({...prevState, [name]: value}))
   }
   
   // remember ========================================================================
   const [remember, setRemember] = useState(false);
   const handleOnChangeRemember = () => setRemember(!remember)
   // submit ========================================================================
   
   const handleOnSubmitForm = async (e) => {
      e.preventDefault();
      let errors = 0
      const formInputs = [...document.querySelectorAll('input')]
      formInputs.forEach(input => {
         const name = input.name
         if (name === 'name' || name === 'phone' || name === 'password') {
            if (user[name].length < 3) {
               input_add_error(input);
               errors++
            }
         }
         if (name === 'email') {
            if (!email_test(user.email)) {
               input_add_error(input);
               errors++
            }
         }
         if (name === 'repeat_password') {
            if (user.repeat_password !== user.password || user.repeat_password.length < 3) {
               input_add_error(input);
               errors++
            }
         }
      })
      if (errors === 0) {
         const registration = async user => {
            let urlBody = ''
            const objBody = {
               regName: user.name,
               regEmail: user.email,
               regPhone: user.phone,
               regPassword: user.password,
               repeatRegPassword: user.repeat_password,
            }
            
            for (const key in objBody) {
               urlBody += `&${key}=${objBody[key]}`
            }
            urlBody = urlBody.slice(1, urlBody.length)
            console.log(urlBody)
            const url = `${userRegistration}?${urlBody}`
            const opt = {
               method: 'POST',
               'Content-type': 'application/x-www-form-urlencoded',
            }
            try {
               const res = await fetch(url, opt)
               console.log(res)
               if (res.ok) {
                  const json = await res.json()
                  console.log(json)
                  await getUserInfoByToken(json.token)
               }
               return res
               
            } catch (e) {
               console.error(e)
            }
         }
         await registration(user)
      }
   }
   return (
      <div style={{height: '90vh'}} className="application">
         <img className='application__logo' src={BigSalad} alt="logo"/>
         <h2 className='application__name'>App Name</h2>
         <h3 style={{marginBottom: 40}} className='application__title'>Регистрация</h3>
         <form action="#"
               className="form _center _w400"
               onSubmit={handleOnSubmitForm}>
            <div className="form__item">
               <label className="form__subtitle">Имя</label>
               <div className="form__input-container">
                  <input data-error="Пожалуйста, заполните поле"
                         data-value="Марго"
                         className="form__input input _req"
                         type="text"
                         name="name"
                         value={user.name}
                         onChange={handleOnChangeUser}
                         onFocus={handleOnFocusInput}
                         onBlur={handleOnBlurInput}
                  />
                  <span className='form__input-span'>Марго</span>
               </div>
            </div>
            <div className="form__item">
               <label className="form__subtitle">Email</label>
               <div className="form__input-container">
                  <input data-error="Пожалуйста, введите правильный email"
                         data-value="hello.user@gmail.com"
                         className="form__input input _req"
                         type="email"
                         name="email"
                         value={user.email}
                         onChange={handleOnChangeUser}
                         onFocus={handleOnFocusInput}
                         onBlur={handleOnBlurInput}
                  />
                  <span className='form__input-span'>hello.user@gmail.com</span>
               </div>
            </div>
            <div className="form__item">
               <label className="form__subtitle">Номер телефона</label>
               <div className="form__input-container">
                  <input data-error="Пожалуйста, введите правильный номер телефона"
                         data-value={regionNumber}
                         data-mask={regionNumber}
                         className="form__input input _phone _req _mask"
                         type="tel"
                         name="phone"
                         value={user.phone}
                         onChange={handleOnChangeUser}
                         onFocus={handleOnFocusInput}
                         onBlur={handleOnBlurInput}
                  />
                  <span className='form__input-span'>{regionNumber}</span>
                  <TippyNumberRegion regions={region} changeRegion={handleOnChangeRegion}> </TippyNumberRegion>
               </div>
            </div>
            <div className="form__item">
               <label className="form__subtitle">Пароль</label>
               <div className="form__input-container">
                  <input data-error="Пожалуйста, введите правильный пароль"
                         data-value="Введите пароль"
                         className="form__input  input _req"
                         type="password"
                         name="password"
                         data="password"
                         value={user.password}
                         onChange={handleOnChangeUser}
                         onFocus={handleOnFocusInput}
                         onBlur={handleOnBlurInput}
                  />
                  <span className='form__input-span form__input-span_password'>•••••••••••••</span>
                  <div className="form__viewpass-container">
                     <img className="" src={HiddenPasswordIcon}
                          alt="hidden_password"
                          onClick={handleHideShowPassword}/>
                     <span className="form__viewpass"> </span>
                  </div>
               </div>
            </div>
            <div className="form__item">
               <label className="form__subtitle">Повоторите пароль</label>
               <div className="form__input-container">
                  <input data-error="Пожалуйста, введите правильный пароль"
                         data-value="Введите пароль"
                         className="form__input  input _req"
                         type="password"
                         name="repeat_password"
                         data="password"
                         value={user.repeat_password}
                         onChange={handleOnChangeUser}
                         onFocus={handleOnFocusInput}
                         onBlur={handleOnBlurInput}
                  />
                  <span className='form__input-span form__input-span_password'>•••••••••••••</span>
                  <div className="form__viewpass-container">
                     <img className="" src={HiddenPasswordIcon}
                          alt="hidden_password"
                          onClick={(e) => handleHideShowPassword(e)}/>
                     <span className="form__viewpass"> </span>
                  </div>
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
                  className='form__button _display-inline-block _btn _main-btn _orange-btn'>Зарегистрироваться
               </button>
            </div>
         </form>
      </div>
   );
}

export default RegistrationPage;