import React, {useState} from 'react';
import {bool, func} from "prop-types";

PersonalMode.propTypes = {
   mode: bool,
   changeMode: func,
};

function PersonalMode({mode, changeMode}) {
   
   return (
      <>
         <div className="checkbox _flex-row_space-between">
            <input
               id='personalMode'
               className="checkbox__input-circle"
               type="checkbox"
               checked={mode}
               onChange={() => changeMode('personal')}
            />
            <label className="checkbox__text-circle" htmlFor='personalMode'>
               Персональный (установка вручную)
            </label>
         </div>
      </>
   );
}

export default PersonalMode;