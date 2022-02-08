import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Input, Tooltip} from "antd";
import {func, number, string} from "prop-types";
import TooltipInputTagTitle from "@/components/tooltips/TooltipInputTagTitle.jsx";
import {setElementParams} from "@assets/helpers/helpers";

TooltipInputTag.propTypes = {
   placeholder: string,
   changeColor: func,
   changeIcon: func,
   colorId: number,
   iconId: number
};


function TooltipInputTag({placeholder, colorId, changeColor, iconId, changeIcon}) {
   const [styles, setStyles] = useState({});
   const ref = useRef();
   
   const addStyle = useCallback(
      () => {
         const styles = setElementParams.bind(null, ref.current?.input, [{name: 'width', property: 'offsetWidth'}])
         setStyles(styles)
      },
      [ref.current],
   );
   
   
   useEffect(() => {
      addStyle();
      window.addEventListener("change", addStyle);
      window.addEventListener("resize", addStyle);
      
      return () => {
         window.removeEventListener("change", addStyle);
         window.removeEventListener("resize", addStyle);
      }
      
   }, []);
   
   return (
      <Tooltip
         destroyTooltipOnHide
         trigger={['click']}
         color={'#fff'}
         title={<TooltipInputTagTitle changeColor={changeColor} changeIcon={changeIcon} colorId={colorId} iconId={iconId} width={styles.width}/>}
         placement="bottom"
         overlayStyle={{maxWidth: '100%'}}
         overlayInnerStyle={{...styles}}
      >
         <Input ref={ref} className='form__input' placeholder={placeholder}/>
      </Tooltip>
   );
}

export default TooltipInputTag;