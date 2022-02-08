import React from 'react';
import Select, {components} from "react-select";
import SelectArrow from "@img/icons/arrow_select.svg";
import {observer} from "mobx-react-lite";
import {activityCustomStyles} from "@scripts/select";
import useActivitySelect from "@/hooks/useActivitySelect";
import {bool, func, number, string} from "prop-types";
import eventStore from "@store/event-store";

const DropdownIndicator = (props) => (
   <components.DropdownIndicator {...props}>
      <img src={SelectArrow}/>
   </components.DropdownIndicator>
);

ActivitySelectInput.propTypes = {
   value: string || number,
   changeValue: func,
   isError: bool,
};

function ActivitySelectInput({value, changeValue, isError}) {
   const {opt: actValue, placeholder, activityOption} = useActivitySelect(value)
   // value - має бути обєктом з полями value i label
   return (
      <>
         <div className="form__input-container">
            <Select
               styles={activityCustomStyles}
               options={activityOption}
               value={actValue ? actValue : null}
               onChange={type => {
                  changeValue('id_act', type.value)
                  // const title = type.label.length > 12 ? type.label.slice(0, 12) + '..' : type.label;
                  // eventStore.changeSelectedEventsValue('idActivity', type.value)
                  // eventStore.changeSelectedEventsValue('title', title)
                  // eventStore.changeSelectedEventsValue('eventFullTitle', type.label)
               }}
               placeholder={placeholder}
               components={{DropdownIndicator}}
            />
            {isError && <div className="form__error">Пожалуйста, заполните поле</div>}
         </div>
      </>
   );
}

export default observer(ActivitySelectInput);
