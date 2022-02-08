import React from 'react';
import Select, {components} from "react-select";
import SelectArrow from "@img/icons/arrow_select.svg";
import {activityCustomStyles} from "@scripts/select";
import {bool, func, string} from "prop-types";
import useActivityDuration from "@/hooks/useActivityDuration";
import activityStore from "@store/activity-store";
import eventStore from "@store/event-store";

const DropdownIndicator = (props) => {
   return (
      <components.DropdownIndicator {...props}>
         <img src={SelectArrow}/>
      </components.DropdownIndicator>
   );
};

function DurationSelectInput() {
   const {changeEvent, eventInfoError, eventInfo} = activityStore
   const {options, placeholder, optValue} = useActivityDuration(eventInfo.activity_duration)
   return (
      <div className="form__input-container">
         <Select
            styles={activityCustomStyles}
            options={options}
            value={optValue ? optValue : null}
            onChange={type => {
               const {id} = eventStore.activity_duration.find(item => item.value === type.value)
               changeEvent('activity_duration', id)
               
            }}
            placeholder={placeholder}
            components={{DropdownIndicator}}
         />
         {eventInfoError.activity_duration && <div className="form__error">Пожалуйста, заполните поле</div>}
      </div>
   );
}

export default DurationSelectInput;
