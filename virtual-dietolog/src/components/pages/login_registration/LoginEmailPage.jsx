import React, {useEffect, useState} from 'react';
import BigSalad from "@img/icons/big-salad.svg";
import {input_add_error, input_focus_add, input_focus_remove, input_remove_error} from "@scripts/inputsInit";
import {email_test} from "@scripts/regulars";
import HiddenPasswordIcon from "@img/icons/ic_visible password@3x.png";
import ArrowLeft from "@img/icons/arrow-left.svg";
import {handleHideShowPassword} from "@scripts/functions";
import {Link, useHistory} from "react-router-dom";
import {Scrollbars} from "react-custom-scrollbars";
import {initMask} from "@scripts/initMask";
import permission from "@/store/permission";
import userStore from "@/store/user-store";

const handleOnFocusInput = ({target}) => {
   input_focus_add(target)
   input_remove_error(target)
}
const handleOnBlurInput = ({target}) => {
   if (!target.value) {
      input_focus_remove(target)
   }
}

function LoginEmailPage() {
   
   // history ========================================================================
   const history = useHistory()
   const handleOnClickHistory = () => history.push('/login')
   useEffect(() => {
      const inputs = document.querySelectorAll('input')
      inputs.forEach(input => {
         input.value ? input_focus_add(input) : null
         if (input.classList.contains('_mask')) {
            const typeMask = input.dataset.mask
            initMask(typeMask, input)
         }
      })
   }, []);
   
   const getUserInfoByToken = async token => {
      document.cookie = `token=${token};`
      await userStore.setUserByToken(token)
      permission.changePermission()
      history.push('/')
   }
   
   // email ========================================================================
   // wwizarding@gmail.com
   // 123
   const [email, setEmail] = useState('');
   const handleOnChangeEmail = (e) => {
      input_focus_add(e.target)
      setEmail(e.target.value.toLowerCase())
   }
   // password ========================================================================
   const [password, setPassword] = useState('');
   const handleOnChangePassword = (e) => {
      input_focus_add(e.target)
      setPassword(e.target.value)
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
         if (input.name === 'email') {
            if (!email_test(email)) {
               errors++
               input_add_error(input);
            }
         }
         if (input.name === 'password') {
            if (password.length < 3) {
               errors++
               input_add_error(input);
            }
         }
      })
      if (errors === 0) {
         const getUserToken = async () => {
            // ruslan.horyn95@gmail.com
            // tzeU5q9KCKqufn3674zrd5
            await fetch(`https://vn.mh.net.ua/public/api/login/?user=${email}&pass=${password}`, {
               'Content-Type': 'application/x-www-form-urlencoded',
               'Accept': 'application/json'
            })
               .then(res => {
                  return res.json()
               })
               .then(async json => {
                  if (json.token) {
                     await getUserInfoByToken(json.token)
                  } else {
                     const formInputs = [...document.querySelectorAll('input._req')]
                     formInputs.forEach(input => {
                        input_add_error(input)
                     })
                  }
               })
               .catch(err => console.error(err))
         }
         getUserToken()
      }
   }
   return (
      <div style={{height: '730px'}} className="application">
         <Scrollbars style={{width: '100%', height: '100%',}}>
            <img className='application__logo' src={BigSalad} alt="logo"/>
            <h2 className='application__name'>App Name</h2>
            <h3 style={{marginBottom: 40}} className='application__title'>Войти с помощью email</h3>
            <form action="#"
                  className="form _center _w400"
                  onSubmit={handleOnSubmitForm}>
               <div className="form__item">
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
               <div className="form__item">
                  <h6 className="form__subtitle">Введите пароль</h6>
                  <div className="form__input-container">
                     <input data-error="Пожалуйста, введите правильный пароль"
                            data-value="Введите пароль"
                            className="form__input  input _req"
                            type="password"
                            name="password"
                            data="password"
                            value={password}
                            onChange={handleOnChangePassword}
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
                  <Link to='forgot-password' id='orange'>Забыли пароль?</Link>
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

export default LoginEmailPage;
