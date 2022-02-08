import React, {useEffect, useRef, useState} from 'react';
import {array, bool, func} from "prop-types";
import {useIsomorphicEffect} from "@material-ui/pickers/_shared/hooks/useKeyDown";
import {_slideDown, _slideUp} from "@scripts/slides";
import calcStore from "@store/calc-store";

BoostMode.propTypes = {
   mode: bool,
   changeMode: func,
   boostModeList: array,
   changeBoostModeList: func,
};


function BoostMode({mode, changeMode, boostModeList, changeBoostModeList }) {
   const boostModeDiv = useRef(null);

   useEffect(() => {
      mode ?  _slideDown(boostModeDiv.current) : _slideUp(boostModeDiv.current)
   }, [mode]);
   
   return (
      <>
         <div className="checkbox _flex-row_space-between">
            <input
               id='boostMode'
               className="checkbox__input-circle"
               type="checkbox"
               checked={mode}
               onChange={() => changeMode('boost')}
            />
            <label className="checkbox__text-circle" htmlFor='boostMode'>
               Ускоренный
            </label>
         </div>
         <div className="boost-mode" ref={boostModeDiv}>
            <ul className="boost-mode__list">
               {boostModeList.map(item => (
                  <li key={item.id}
                      onClick={() => {
                         changeBoostModeList(item.id)
                      }}
                      className={`boost-mode__item ${item.selected ? 'active' : ''}`}
                  >
                     {item.name}
                  </li>
               ))}
            </ul>
         </div>
      </>
   );
}

export default BoostMode;