import React from 'react';

AppAvatar.propTypes = {};

function AppAvatar({onClick, src, name}) {
   return (
      <div className='avatar' onClick={onClick}>
         <img className='avatar__icon' src={src} alt={name}/>
      </div>
   
   );
}

export default AppAvatar;