import {useState} from "react";

export const useTooltipInputTag = () => {
   const [colorId, setColorId] = useState();
   const [iconId, setIconId] = useState();
   
   return {
      colorId,
      iconId,
      changeColor: setColorId,
      changeIcon: setIconId,
   }
};