import {useMemo, useState} from "react";
import {filersCategoriesFunctionality} from "@assets/helpers/helpers";

export const usePositionNamesOfCategory = (category) => {
   const [tabIndex, setTabIndex] = useState('1');
   
   const categoryNames = useMemo(() => filersCategoriesFunctionality(tabIndex, category), [category, tabIndex]);
   return {
      categoryNames,
      tabIndex,
      changeTabIndex: setTabIndex
   }
}