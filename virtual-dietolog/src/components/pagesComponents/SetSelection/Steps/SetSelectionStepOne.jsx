import React, {useEffect} from 'react';
import {array, func, number} from "prop-types";
import SelectionProductsList from "@/components/pagesComponents/SetSelection/SelectionProductsList/SelectionProductsList.jsx";
import {observer} from "mobx-react-lite";
import setSelectionStore from "@store/set-selection-store";
import dietStore from "@store/diet-store";
import {getAllCookies} from "@scripts/functions";

SetSelectionStepOne.propTypes = {
   changeProgressSteps: func,
   steps: array,
   currentStepId: number
};

function SetSelectionStepOne({changeProgressSteps, steps, currentStepId}) {
   const {inProgress} = steps.length > 0 && steps.find(item => item.id === currentStepId)
   const {chooseAllSelectionStore, changeSelectionProduct, selectionStore,} = setSelectionStore;
   const {findDifferentInDiet} = dietStore;
   
   const handleOnSubmit = () => {
      changeProgressSteps(currentStepId)
      findDifferentInDiet()
   }
  
   return (
      <>
         {inProgress && (
            <form className='form'>
               <h3 className='_title-h3'>Выберите способ подбора сета</h3>
               <div className="form__buttons">
                  <button type='button' style={{marginLeft: "auto"}}
                          className='form__button _btn _main-btn _grey-btn' onClick={chooseAllSelectionStore}>
                     Вибрать все
                  </button>
                  <button type='button'
                          className='form__button _btn _main-btn _orange-btn' onClick={handleOnSubmit}>
                     Сохранить и Продолжить
                  </button>
               </div>
               <SelectionProductsList columns={2} checkBy={0} storeProducts={selectionStore} changeSelectionProduct={changeSelectionProduct}/>
            </form>
         )}
      </>
   )
}

export default observer(SetSelectionStepOne);