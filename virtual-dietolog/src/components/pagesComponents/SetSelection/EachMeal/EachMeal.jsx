import React, {useCallback} from 'react';
import plus from "@img/icons/big-plus.svg"
import clock from "@img/icons/clock-orange.svg"
import {observer} from "mobx-react-lite";
import {Droppable,} from 'react-beautiful-dnd';
import ProductItem from "@/components/pagesComponents/SetSelection/ProductItem/ProductItem.jsx";

Diet.propTypes = {};

function Diet({dayNumber, basket, changeDialog, deleteProductList, setMultiProductDropArr, productLength}) {
   
   const dietHandler = useCallback((products, basketNumber) => {
      if (products && products.length > 0) {
         return products.map((item, index) => (
            <ProductItem key={item}
                         index={index}
                         productId={item}
                         dayNumber={dayNumber}
                         basketNumber={basketNumber}
                         isDragDisabled={false}
                         deleteProductList={deleteProductList}
                         setMultiProductDropArr={setMultiProductDropArr}
                         productLength={productLength}/>
         ))
      } else {
         return <ProductItem
            index={0}
            productId={0}
            dayNumber={dayNumber}
            basketNumber={basketNumber}
            isDragDisabled
            deleteProductList={deleteProductList}
            setMultiProductDropArr={setMultiProductDropArr}
            productLength={productLength}/>
      }
   })
   // <DayProducts  takeFoodNumber={item.take_food} dayNumber={dayNumber} products={item.products}/>
   return (
      <>
         {basket && basket.map((basketItem, basketIndex) => (
            <React.Fragment key={`${basketItem.id}${dayNumber}`}>
               <div className='day__each-meal'>
                  <p className='day__name_each-meal'>{basketItem.take_food}-й Прием</p>
                  <img className='day__icon' src={clock} alt="clock"/>
                  <img className='day__icon day__icon_add-product' src={plus} alt="plus"
                       onClick={() => changeDialog(dayNumber, basketItem.take_food)}/>
               </div>
               
               <Droppable droppableId={`day-${dayNumber}_basket-${basketItem.id}`} index={basketIndex}>
                  {(provided) => (
                     <ul className={'day__diet-list'}
                         ref={provided.innerRef}
                         {...provided.droppableProps}>
                        {dietHandler(basketItem.products, basketItem.take_food)}
                        {provided.placeholder}
                     </ul>
                  )}
               </Droppable>
            </React.Fragment>
         ))}
      </>
   );
}

export default observer(Diet);
