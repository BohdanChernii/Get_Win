import React from 'react';
import google from "@img/icons/socials/google.svg";
import facebook from "@img/icons/socials/facebook.svg";
import linkedin from "@img/icons/socials/linkedin.svg";


function LoginOptions() {
   return (
      <div className='login-options'>
         <p className='login-options__title'>Или войдите с помощью</p>
         <div className="login-options__options options">
            <div className="options__card"><img className='options__icon' src={google} alt="google"/></div>
            <div className="options__card"><img className='options__icon' src={facebook} alt="facebook"/></div>
            <div className="options__card"><img className='options__icon' src={linkedin} alt="linkedin"/></div>
         </div>
      </div>
   );
}

export default LoginOptions;