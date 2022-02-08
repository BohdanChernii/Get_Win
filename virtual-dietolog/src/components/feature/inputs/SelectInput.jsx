import React from 'react';
import Select, {components} from "react-select";
import SelectArrow from "@img/icons/arrow_select.svg";
import {array, bool, func, string} from "prop-types";
import {customStyles} from "@scripts/select";

const DropdownIndicator = (props) => {
   return (
      <components.DropdownIndicator {...props}>
         <img src={SelectArrow}/>
      </components.DropdownIndicator>
   );
};


SelectInput.propTypes = {
   error: bool,
   errorMessage: string,
   options: array,
   value: string,
   changeValue: func.isRequired,
};

function SelectInput({error, errorMessage, options, value, changeValue, name,}) {
   const opt = options.find(item => item.value === value)
   // value - має бути обєктом з полями value i label
   return (
      <>
         {!error
            ? <label className="_subtitle">{name}</label>
            : <label className="_subtitle _error">{errorMessage}</label>
         }
         <Select
            styles={customStyles}
            options={options}
            value={opt ? opt : ''}
            onChange={value => changeValue(value)}
            placeholder={options[0].label}
            components={{DropdownIndicator}}
         />
      </>
   );
}

export default SelectInput;
