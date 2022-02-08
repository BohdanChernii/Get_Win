import React from 'react';
import {bool, func} from "prop-types";

CurrentMode.propTypes = {
   mode: bool,
   changeMode: func,
};

function CurrentMode({mode, changeMode}) {
   return (
      <>
         <div className="checkbox _flex-row_space-between">
            <input
               id='current-mode'
               className="checkbox__input-circle"
               type="checkbox"
               checked={mode}
               onChange={() => changeMode('current')}
            />
            <label className="checkbox__text-circle" htmlFor='current-mode'>
               Текущий режим (рекомендации программы)
            </label>
         </div>
      </>
   );
}

export default CurrentMode;