import React from 'react';

function BackgroundWelcome({children}) {
   return (
      <section className='welcome _flex-row_center'>
         <span className="welcome__bullet welcome__bullet-bullet1 _flex-row_center"> </span>
         <span className="welcome__bullet welcome__bullet-bullet2 _flex-row_center"> </span>
         <span className="welcome__bullet welcome__bullet-bullet3 _flex-row_center"> </span>
         <span className="welcome__bullet welcome__bullet-bullet4 _flex-row_center"> </span>
         <span className="welcome__bullet welcome__bullet-bullet5 _flex-row_center"> </span>
         
         {children}
      </section>
   );
}

export default BackgroundWelcome;