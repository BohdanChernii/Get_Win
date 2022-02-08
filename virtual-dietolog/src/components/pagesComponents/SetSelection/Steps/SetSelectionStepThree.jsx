import React, {useEffect, useState} from 'react';
import {array, func, number} from 'prop-types';
import DaysOfIntake from "@/components/pagesComponents/SetSelection/DaysOfIntake/DaysOfIntake.jsx";
import EachMealDialog from "@/components/feature/modals/EachMealDialog.jsx";
import {observer} from "mobx-react-lite";
import dietStore from "@store/diet-store";
import setSelectionStore from "@store/set-selection-store";
import useDietList from "@/hooks/setSelection/useDietList";

SetSelectionStepThree.propTypes = {
   changeProgressSteps: func,
   steps: array,
   currentStepId: number
};

function SetSelectionStepThree({changeProgressSteps, steps, currentStepId, changeIsDoneDiet}) {
   const {inProgress} = steps.length > 0 && steps.find(item => item.id === currentStepId)
   const {diet, createAllProductsForDiets} = dietStore;
   const {checkOfSelectFilterProducts, resetOfSelectFilterProducts} = setSelectionStore;
   const {dietList, setDietList, deleteProductList, draggableDietList} = useDietList();
   
   const [dataNumbers, setDataNumbers] = useState({
      day: null, takeFood: null
   });
   const [product, setProduct] = useState([]);
   const [isOpen, setIsOpen] = useState(false);
   
   const handleOnChangeDialog = (dayNumber, takeFoodNumber) => {
      setDataNumbers({day: dayNumber, takeFood: takeFoodNumber});
      setIsOpen(prev => !prev);
   }
   
   const handleOnGoBack = () => {
      changeProgressSteps(currentStepId - 2);
   }
   
   const handleOnSubmit = () => {
      changeProgressSteps(currentStepId)
      changeIsDoneDiet()
      const products = JSON.stringify(createAllProductsForDiets())
      document.cookie = `setSelection=${products};`
   }
   
   useEffect(() => {
      if (dataNumbers.day && dataNumbers.takeFood) {
         diet.forEach(source => {
            if (Number(source.dayNumber) === Number(dataNumbers.day)) {
               source.takeFoods.forEach(item => {
                  if (Number(item.take_food) === Number(dataNumbers.takeFood)) {
                     item.products && setProduct(item.products)
                     !item.products && setProduct([])
                     checkOfSelectFilterProducts(item.products)
                  }
               })
            }
         })
      } else if (product.length > 0) {
         setProduct([])
         resetOfSelectFilterProducts()
      }
   }, [dataNumbers]);
   return (
      <>
         {inProgress && (
            <>
               <form className='form' style={{maxWidth: 779, width: '100%'}}>
                  <h3 className='_title-h3' style={{marginBottom: 24}}>Выберите желаюмые продукты для каждого приема пищи.</h3>
                  <h4 className='form__subtitle' style={{marginBottom: 24}}>Если хотите пропустить какой-то прием, просто не добавляйте туда
                     продукты.</h4>
                  
                  <div className="form__item" style={{width: '100%'}}>
                     <div className="form__row" style={{flexWrap: "wrap", alignItems: "flex-start"}}>
                        <DaysOfIntake changeDialog={handleOnChangeDialog}
                                      dietList={dietList}
                                      deleteProductList={deleteProductList}
                                      draggableDietList={draggableDietList}
                        />
                     </div>
                  
                  </div>
                  <div className="form__buttons">
                     <button className='form__button _btn _main-btn _grey-btn' onClick={handleOnGoBack}>
                        Вернуться Назад
                     </button>
                     <button type='button' className='form__button _btn _main-btn _orange-btn' onClick={handleOnSubmit}>
                        Сформировать Список Продуктов на Неделю
                     </button>
                  </div>
               </form>
               <EachMealDialog product={product} isOpen={isOpen} changeDialog={handleOnChangeDialog} dataNumbers={dataNumbers}
                               setDietList={setDietList}/>
            </>
         )}
      </>
   );
}

export default observer(SetSelectionStepThree);