import React from 'react';

function AppMessage({img}) {
   return (
      <div className='message'>
         <img className='message__icon' src={img} alt="message"/>
         <span className='message__span'></span>
      </div>
   );
}

export default AppMessage;