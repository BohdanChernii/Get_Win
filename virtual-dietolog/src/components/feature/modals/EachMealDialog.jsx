import React, {useRef, useState} from 'react';
import Dialog from "@material-ui/core/Dialog";
import {Transition} from "@/components/feature/modals/Transition/Transition.jsx";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {useTitleStyles} from "@/hooks/useTitleStyles";
import {observer} from "mobx-react-lite";
import SelectionProductsList from "@/components/pagesComponents/SetSelection/SelectionProductsList/SelectionProductsList.jsx";
import setSelectionStore from "@store/set-selection-store";
import useDietList from "@/hooks/setSelection/useDietList";

const nameOfCategory = [
   {number: 0, name: 'Белки'},
   {number: 1, name: 'Жиры'},
   {number: 2, name: 'Углеводы'}
]
EachMealDialog.propTypes = {};

function EachMealDialog({product, isOpen, changeDialog, dataNumbers, setDietList}) {
   const {filtersSelectionStore, changeFiltersSelectionProduct, makeDietByFilterStore, resetOfSelectFilterProducts} = setSelectionStore
   const titleStyles = useTitleStyles();
   const formRef = useRef(null);
   const [contentWidth, setContentWidth] = useState(980);
   const [slide, setSlide] = useState(0);
   // const name = nameOfCategory.find(i => i.number === slide).name
   
   const handleOnReset = () => {
      changeDialog(null, null)
      resetOfSelectFilterProducts()
      setSlide(0)
   }
   const contentStyle = {
      maxWidth: '100%',
      width: contentWidth,
      minHeight: 100,
   }
   const translateX = contentWidth * slide;
   
   const handleOnSubmitProducts = (e) => {
      e.preventDefault();
      const diet = makeDietByFilterStore(dataNumbers.day, dataNumbers.takeFood)
      setDietList(diet)
      handleOnReset()
   }
   return (
      <Dialog
         open={isOpen}
         TransitionComponent={Transition}
         keepMounted
         onClose={handleOnReset}
      >
         <DialogTitle
            classes={{root: titleStyles.h5}} disableTypography>
            Выберите продукт/продукты для {dataNumbers.takeFood}-й Приёма приёма пищи.
            <hr style={{display: "block", width: '100%', height: 1, background: '#E9E9E9', marginTop: 24}}/>
         </DialogTitle>
         <DialogContent style={contentStyle}>
            
            <div className='_flex-row_space-around'>
               {nameOfCategory.map(category => (
                  <h4 key={category.number}
                      onClick={() => setSlide(category.number)}
                      className={`_title-h4 tabs__name ${category.number === slide ? 'active' : ''}`}>{category.name}</h4>
               ))}
            </div>
            <form className="form" ref={formRef}
                  onReset={handleOnReset} style={{overflow: 'hidden'}}>
               <div style={{transform: `translateX(-${translateX}px)`, transition: 'all .3s ease-in-out'}}>
                  <SelectionProductsList columns={6} checkBy={1}
                                         storeProducts={filtersSelectionStore}
                                         changeSelectionProduct={changeFiltersSelectionProduct}
                  />
               </div>
            </form>
         </DialogContent>
         <DialogContent>
            <div className="form__buttons " style={{paddingTop: 0}}>
               <button type="reset"
                       onClick={handleOnReset}
                       className="form__button _btn _main-btn _grey-btn">
                  Отменить
               </button>
               <button type="button" onClick={handleOnSubmitProducts}
                       className="form__button _btn _main-btn _orange-btn">Сохранить
               </button>
            </div>
         </DialogContent>
      </Dialog>);
}

export default observer(EachMealDialog);