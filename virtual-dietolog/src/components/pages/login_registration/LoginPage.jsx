import React from 'react';
import BigSalad from "@img/icons/big-salad.svg";
import WelcomeArrow from "@img/icons/welcome_arrow.svg";
import {Link} from "react-router-dom";
import Google from "@/components/auth/Google.jsx";
import Facebook from "@/components/auth/Facebook.jsx";
import LinkedInPage from "@/components/auth/LinkedInPage.jsx";

function LoginPage() {
   return (
      <div className="application">
         <img className='application__logo' src={BigSalad} alt="logo"/>
         <h2 className='application__name'>App Name</h2>
         <h3 className='application__title'>Войти в приложение</h3>
         <p className='application__subtitle'>Вы можете войти используя любой из способов ниже</p>
         <div className="application__container _w400">
            <Link id='orange' className='application__link _flex-row_center' to='/login-email'>С помощью email <img
               className='application__arrow' src={WelcomeArrow} alt="arrow"/></Link>
            <Link id='orange' className='application__link _flex-row_center' to='/login-phone'>С помощью моб.
               телефона <img
                  className='application__arrow' src={WelcomeArrow} alt="arrow"/></Link>
            <div className="social">
               <p className="social__subtitle">Или используйте</p>
               <div className="social__links">
                  <Facebook/>
                  <Google/>
                  {/*<LinkedInPage/>*/}
               </div>
            </div>
         </div>
         <p className='application__subtitle'>Нет аккаунта?<Link to='/registration' id='orange'> Зарегистрироваться</Link>
         </p>
      </div>
   );
}

export default LoginPage;