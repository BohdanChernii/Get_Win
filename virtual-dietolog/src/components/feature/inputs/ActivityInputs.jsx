import React from 'react';

function ActivityInputs({changeLevel, levels}) {
   return (
      <div className="form__row">
         {levels.map((input, index) => {
               return (
                  <div key={index} className="form__row-box">
                     <input
                        className="form__input-radio"
                        type='radio'
                        id={input.text}
                        value={input.value}
                        name={input.name}
                        checked={input.selected}
                        onChange={() => changeLevel(input.id)}
                     />
                     <label className='form__label-questionnaire' htmlFor={input.text}>
                        <span>{input.text}</span>
                     </label>
                  </div>
               )
            }
         )}
      </div>
   );
}

export default ActivityInputs;