import React from 'react';
import {Link, useHistory} from "react-router-dom";
import BigSalad from "@img/icons/big-salad.svg";
import permission from "@/store/permission";


function HomePage() {
   const history = useHistory();
   const goToRegistration = () => {
      history.push("/registration");
   }
   
   const handleOnSkipRegistration = () => {
      permission.changePermission()
   }
   
   return (
      <div className="application">
         <img className='application__logo' src={BigSalad} alt="logo"/>
         <h2 className='application__name'>App Name</h2>
         <h3 className='application__title'>Добро пожаловать!</h3>
         <p className='application__subtitle'>Вы можете пропустить регистрацию и посмотреть, как работает приложение,
            прежде чем принять решение.
         </p>
         <button className='application__btn _btn _main-btn _grey-btn' onClick={handleOnSkipRegistration}>Пропустить
            регистрацию
         </button>
         <button onClick={goToRegistration} className='application__btn _btn _main-btn _orange-btn'>Зарегистрироваться</button>
         <p style={{display: "block", margin: '20px auto 0 auto'}} className='application__subtitle'>Уже есть аккаунт? <Link to='/login'
                                                                                                             id='orange'>Вход</Link>
         </p>
      </div>
   );
}

export default HomePage;