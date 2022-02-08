import React from 'react';
import GoogleLogin from 'react-google-login';
import GoogleIcon from '@img/icons/social/google-plus.svg'

const googleID = '312086677404-22kejlu2obq7suu4pf0htsr1hf7ap4qb.apps.googleusercontent.com'
const goodleSecreatID = 'fzYQgQ6TACInac-ZvF-ab_aM'


function Google(props) {
   
   const responseGoogle = (response) => {
      console.log(response);
   }
   
   return (
      <GoogleLogin
         clientId={googleID}
         // autoLoad={true}
         onSuccess={responseGoogle}
         onFailure={responseGoogle}
         cookiePolicy={'single_host_origin'}
         render={({onClick, disabled}) => (
            <img onClick={onClick} disabled={disabled} className='social__link' src={GoogleIcon} alt="Google"/>
         )}
      />
   );
}

export default Google;