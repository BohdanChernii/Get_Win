import React from 'react';
import {func, string} from 'prop-types';
import SearchIcon from "@img/icons/search.svg";
import close from "@img/icons/close.svg"

SearchInput.propTypes = {
   value: string,
   changeValue: func,
};

function SearchInput({value, changeValue}) {
   return (
      <>
         <div className="search">
            <img className='search__icon' src={SearchIcon} alt="search"/>
            <input className='search__input' type="text" name='search' placeholder='Поиск'
                   value={value} onChange={e => changeValue(e.target.value)}/>
            {value && (
               <div className="search__close-block" onClick={() => changeValue('')}>
                  <img src={close} alt="close" />
               </div>
            )}
         </div>
         <span className='_full-line'> </span></>
   
   );
}

export default SearchInput;