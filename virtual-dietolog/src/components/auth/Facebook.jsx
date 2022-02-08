import React, {useState} from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import FacebookIcon from '@img/icons/social/facebook.svg'


function Facebook(props) {
   const [state, setState] = useState({
      isLoggedIn: false,
      userID: '',
      name: '',
      email: '',
      picture: '',
   });
   
   const componentClicked = () => {
      // console.log('click')
   }
   
   const responseFacebook = response => {
      console.log(response)
      setState({
         isLoggedIn: true,
         userID: response.userID,
         name: response.name,
         email: response.email,
         picture: response.picture.data.url,
      })
   }
   let fbContent;
   
   if (state.isLoggedIn) {
      fbContent = (
         <img className='social__link' src={FacebookIcon} alt="Facebook"/>
      )
   } else {
      fbContent = (
         <FacebookLogin
            appId="2650453035251767"
            // autoLoad={true}
            fields="name,email,picture"
            onClick={componentClicked}
            callback={responseFacebook}
            render={({onClick}) => (
               <img onClick={onClick} className='social__link' src={FacebookIcon} alt="Facebook"/>
            )}
         />
      )
   }
   return (
      <div>{fbContent}</div>
   );
}

export default Facebook;