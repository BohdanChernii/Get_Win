import React from 'react';
import Female from "@img/icons/female.svg";
import FemaleOrange from "@img/icons/female-orange.svg";
import Male from "@img/icons/male.svg";
import MaleOrange from "@img/icons/male-orange.svg";

function GenderInputs({genders, changeGender}) {
   
   return (
      <div className="form__row">
         {genders.map((input, index) => {
               return (
                  <div key={index} className="form__row-box">
                     <input
                        className="form__input-radio"
                        type='radio'
                        id={input.text}
                        value={input.value}
                        name={input.name}
                        checked={input.selected}
                        onChange={() => changeGender(input.id)}
                     />
                     <label style={{height: 48, width: "100%"}} className='form__label-questionnaire' htmlFor={input.text}>
                        <img style={{maxHeight: 22, position: "relative"}}
                             src={input.value === '1'
                                ? input.selected ? MaleOrange : Male
                                : input.selected ? FemaleOrange : Female
                             }
                             alt="gender"/>
                        <span>{input.text}</span>
                     </label>
                  </div>
               )
            }
         )}
      </div>
   
   );
}

export default GenderInputs;