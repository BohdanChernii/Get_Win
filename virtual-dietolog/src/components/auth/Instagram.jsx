import React, {useState} from 'react';
import InstagramLogin from 'react-instagram-login';
import InstagramIcon from '@img/icons/social/instagram.svg'


function Instagram() {
   const [state, setState] = useState({
      isLoggedIn: false,
      userID: '',
      name: '',
      email: '',
      picture: '',
   });
   
   const componentClicked = () => {
      console.log('click')
   }
   
   const responseInstagram = (response) => {
      console.log(response);
      // setState({
      //    isLoggedIn: true,
      //    userID: response.userID,
      //    name: response.name,
      //    email: response.email,
      //    picture: response.picture.data.url,
      // })
   }
   let Content;
   const instagramToken= 'IGQVJWUDlaaGtDVzRYdTJfZAmRFbG5oRXhVTWFuY19uNF8ydW10UHJlNTlEcDFGRWdBS2xZARC01QzVwZAGRHZAlE0X212d0EwcHNnTmdqblptOGlDazZAGX3JMQlZAfY0VKcVZAyZA3h2Qmo2dDgzdko3T1FGOQZDZD'
   if (state.isLoggedIn) {
      Content = (
         <div style={{margin: "auto", width: 500, display: "flex", alignItems: "center", justifyContent: "space-evenly"}}>
            <h3>Привіт {state.name}</h3>
            <img  style={{width: 75, height: 75, borderRadius: '50%'}}  src={state.picture} alt={state.name}/>
         </div>
      )
   } else {
      Content = (
         <InstagramLogin
            clientId={instagramToken}
            buttonText="Login"
            onSuccess={responseInstagram}
            onFailure={responseInstagram}
            render={({onClick}) => (<button onClick={onClick}>Login with Instagram</button>)}
         />
      )
   }
   return (
      <div>{Content}</div>
   );
}

export default Instagram;