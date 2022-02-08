import React from 'react';
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import wNumb from 'wnumb'

function UiSlider({value, changeValue}) {
   return (
      <Nouislider
         start={value ? value : '54'}
         clickablePips
         onChange={(values, ) => {
            changeValue(Math.floor(values).toString())
         }}
         behaviour='snap'
         step={1}
         tooltips={wNumb({decimals: 0})}
         range={{
            min: 50,
            max: 80
         }}
      />
   );
}

export default UiSlider;