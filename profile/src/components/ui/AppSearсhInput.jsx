import React, {useState} from 'react';
import search from "@img/icons/search-icon.svg";
import {func, string} from "prop-types";

AppSearchInput.propTypes = {
   value: string,
   changeValue: func
};

function AppSearchInput({value, changeValue, placeholder}) {

   return (
      <form className="search-form">
         <button type='submit' className="search-form__button">
            <img src={search} alt="search" className="search-form__icon"/>
         </button>
         <input placeholder={placeholder}
                value={value}
                onChange={e => changeValue(e.target.value)}
                type="text"
                className='search-form__input'/>
      </form>
   );
}

export default AppSearchInput;