import React from 'react';
import {array} from 'prop-types';

Steps.propTypes = {
   steps: array,
};

function Steps({steps}) {
   return (
      <div className='step-block _flex-row_space-between'>
         {steps.map(item => (
            <div key={item.id} className='progress'>
               <span className={`progress__line ${item.isDone ? 'active' : ''}`}> </span>
               <p className={`progress__name ${item.inProgress ? 'active' : ''}`}>{item.name}</p>
            </div>
         ))}
      </div>
   );
}

export default Steps;