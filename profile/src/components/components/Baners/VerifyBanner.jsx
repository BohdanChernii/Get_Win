import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {hideBanner} from "@store/actions/global-actions";
import close from "@img/icons/close.svg";
import person from "@img/person.svg";
import {string} from "prop-types";

VerifyBanner.propTypes = {
   text: string
};

function VerifyBanner({text}) {
   const dispatch = useDispatch();
   const {user} = useSelector(state => state.user);
   
   const handleOnCloseBanner = () => {
      dispatch(hideBanner());
   };
   return (
      <div className='app-banner'>
         <h3 className='app-banner__title'>Привет, {user.name}!</h3>
         <p className='app-banner__text'>
            {text}
         </p>
         <span className='app-banner__close' onClick={handleOnCloseBanner}>
            <img src={close} alt="close"/>
            <span className='app-banner__link'>Закрыть</span>
         </span>
         <img className='app-banner__person' src={person} alt="person"/>
      </div>
   );
}

export default VerifyBanner;