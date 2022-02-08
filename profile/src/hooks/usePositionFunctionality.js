import {useEffect, useState} from 'react';
import {checkedFunctionalityList, getFunctionality, getPositionName} from "@assets/helpers/helpers";
import {usePositionNamesOfCategory} from "@/hooks/usePositionNamesOfCategory";

function usePositionFunctionality(positionSelect, categories) {
   const {categoryNames, tabIndex, changeTabIndex} = usePositionNamesOfCategory(categories)
   const [allOptions, setAllOptions] = useState([]);
   const [checkedList, setCheckedList] = useState([]);
   
   const [indeterminate, setIndeterminate] = useState(false);
   const [checkAll, setCheckAll] = useState(false);
   
   const [indeterminateSelected, setIndeterminateSelected] = useState(true);
   const [checkAllSelected, setCheckAllSelected] = useState(false);
   
   const positionName = getPositionName(categories, positionSelect);
   
   const onChangeFunctionality = id => {
      setAllOptions(prev => prev.map(item => {
         if (item.id === id) {
            item.selected = !item.selected
         }
         return item
      }))
      setTimeout(() => {
         setCheckedList(prev => {
            const prevObj = prev.find(prevItem => prevItem.id === id);
            const optionObj = allOptions.find(optItem => optItem.id === id);
            
            if (optionObj.selected && !prevObj) {
               return [...prev, optionObj]
            }
            
            if (!optionObj.selected && prevObj) {
               return prev.filter(item => item.id !== id)
            }
            
            if (optionObj.selected && prevObj && !prevObj.selected) {
               return prev.map(item => {
                  if (item.id === id) {
                     item.selected = optionObj.selected
                  }
                  return item
               })
            }
            return prev
         })
      }, 0)
   };
   const onChangeAllFunctionality = (e, tabIndex, list) => {
      const isChecked = e.target.checked;
      setAllOptions(prev => prev.map(item => ({...item, selected: false})));
      setCheckedList(prev => {
         const copy = [...prev]
         const changeList = list.map(el => ({...el, selected: isChecked}))
         if (copy.length === 0) {
            return [...copy, ...changeList]
         } else if (!isChecked) {
            changeList.forEach(checkEl => {
               const index = copy.findIndex(el => el.id === checkEl.id)
               if (index !== -1) {
                  copy.splice(index, 1)
               }
            })
         } else if (isChecked) {
            changeList.forEach(checkEl => {
               const index = copy.findIndex(el => el.id === checkEl.id)
               if (index < 0) {
                  copy.push(checkEl)
               } else copy[index].selected = isChecked
            })
         }
         return copy
      })
   };
   const removeCheckListItem = id => {
      const index = checkedList.findIndex(el => el.id === id);
      index >= 0 && setCheckedList(checkedList.filter(el => el.id.toString() !== id.toString()))
   }
   const onChangeCheckListFunctionality = id => {
      setCheckedList(prev => prev.map(item => {
         if (item.id === id) {
            item.selected = !item.selected
         }
         return item
      }));
   };
   const onChangeAllCheckListFunctionality = e => {
      const isChecked = e.target.checked;
      setCheckedList(prev => prev.map(item => ({...item, selected: isChecked})))
   };
   
   useEffect(() => {
      const isCheckAll = !allOptions.filter(item => !item.selected).length;
      setCheckAll(isCheckAll);
      setIndeterminate(!isCheckAll);
   }, [allOptions]);
   
   useEffect(() => {
      const checkedListLength = checkedList?.length
      const checkedListSelectedLength = checkedList.filter(item => item.selected)?.length;
      const isCheckAll = checkedListLength !== 0 && checkedListLength === checkedListSelectedLength
      setCheckAllSelected(isCheckAll);
      setIndeterminateSelected(!isCheckAll);
      
      setAllOptions(prev => prev.map(item => {
         checkedList.forEach(opt => {
            if (item.id === opt.id) {
               item.selected = opt.selected
            }
         })
         return item
      }));
      
   }, [checkedList]);
   
   useEffect(() => {
      if (categories) {
         // let newCategory = createCategoriesFunctionality(categories);
         const functionality = getFunctionality(categories, positionSelect);
         const checkedFunctionality = checkedFunctionalityList(functionality, checkedList);
         setAllOptions(checkedFunctionality);
      }
   }, [categories, positionSelect]);
   
   return {
      positionName,
      allOptions,
      setAllOptions,
      
      checkedList,
      setCheckedList,
      
      indeterminate,
      checkAll,
      
      indeterminateSelected,
      checkAllSelected,
      
      categoryNames,
      tabIndex,
      changeTabIndex,
      removeCheckListItem,
      
      onChangeFunctionality,
      onChangeAllFunctionality,
      
      onChangeCheckListFunctionality,
      onChangeAllCheckListFunctionality
   }
}

export default usePositionFunctionality;