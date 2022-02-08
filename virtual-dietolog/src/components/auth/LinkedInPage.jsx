import React, {useEffect, useState} from 'react';

import {LinkedIn} from 'react-linkedin-login-oauth2';
import LinkedinIcon from '@img/icons/social/linkedin.svg'

function LinkedInPage() {
   const [state, setState] = useState({
      state: 'randomStringForNow',
      code: '',
      errorMessage: '',
   });
   const clientId = "78fzbpun88db4u"
   const clientSecret = "DI4ilSnQ8435IMNc"
   const redirect_url = "http://localhost:4200/linkedin"
   const scopes = ['r_liteprofile', 'r_emailaddress']
   // const urlAuthorizationCallback = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirect_url}scope=${scopes[0]}%20${scopes[1]}`
   //grant_type=client_credentials&client_id={your_client_id}&client_secret={your_client_secret}
   
   //   https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&redirect_uri=${redirect_url}&client_id=${clientId}&client_secret=${clientSecret}`
   const urlPostAccessToken = `
   https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${state.code}&redirect_uri=${redirect_url}&client_id=${clientId}&client_secret=${clientSecret}
`
   // const urlPostAccessToken = `https://www.linkedin.com/oauth/v2/accessToken`
   
   const handleSuccess = (data) => {
      setState(prev => ({...prev, code: data.code}))
   }
   
   const handleFailure = (error) => {
      console.log(error)
   }
   
   useEffect(() => {
      const body = {
         grant_type: 'authorization_code',
         client_id: clientId,
         client_secret: clientSecret,
      }
      const getUserInfo = async () => {
   
         const requestOptions = {
            method: 'POST',
            // mode: "no-cors",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            // body: JSON.stringify(body)
         };
         await fetch(urlPostAccessToken, requestOptions)
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.error(err))
      }
      state.code && getUserInfo()
      state.code && console.log(state.code)
   }, [state.code]);
   
   return (
      <div>
         <LinkedIn
            clientId={clientId}
            onFailure={handleFailure}
            state={state.state}
            scope={scopes.join(' ')}
            onSuccess={handleSuccess}
            redirectUri={redirect_url}
         >
            <img className='social__link' src={LinkedinIcon} alt="Linkedin"/>
         </LinkedIn>
      </div>
   );
}

export default LinkedInPage;
