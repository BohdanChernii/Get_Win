import React, {useEffect, useState} from 'react';
import plusWhite from "@img/icons/big-plus-white.svg";
import {_slideToggle} from "@scripts/slides";
import Diet from "@/components/pagesComponents/SetSelection/EachMeal/EachMeal.jsx";
import {observer} from "mobx-react-lite";
import {DragDropContext} from 'react-beautiful-dnd';
import {unselectAllDraggableProducts} from "@scripts/functions";

DaysOfIntake.propTypes = {};

const handleOpenBody = e => {
   const headerDay = e.target.dataset.day
   const bodys = document.querySelectorAll('.day__body')
   bodys.forEach(body => {
      if (body.dataset.day === headerDay) {
         e.target.classList.toggle('active')
         _slideToggle(body)
      }
   })
}

function DaysOfIntake({changeDialog, dietList, deleteProductList, draggableDietList}) {
   
   const [multiProductDropArr, setMultiProductDropArr] = useState([]);
   
   const handleOnDragStart = ({draggableId}) => {
      if (multiProductDropArr.includes(draggableId)) {
         
         const products = document.querySelectorAll('.day__diet-item.isDraggableProductSelected')
         products.forEach(li => {
            li.classList.add('isDraggableProductDragging')
         })
        
      } else {
         setMultiProductDropArr([draggableId])
         unselectAllDraggableProducts()
      }
   }
   
   const handleOnDragEnd = (result) => {
      draggableDietList(result, multiProductDropArr)
      setMultiProductDropArr([])
      unselectAllDraggableProducts()
   }
   
   return (
      <>
         <DragDropContext onDragEnd={handleOnDragEnd} onDragStart={handleOnDragStart}>
            {dietList && dietList.map((dietDay, dietDayIdx) => (
               <div key={dietDayIdx} className='form__row-box _flex-row_center' style={{flexBasis: '47%', marginBottom: 40}}>
                  <div className='day' style={{width: '100%'}}>
                     <div className="day__header" onClick={handleOpenBody} data-day={dietDay.dayNumber}>
                        <div className='day__name'>
                           <p>{dietDay.dayName}</p>
                        </div>
                        <img className='day__icon_plus' src={plusWhite} alt="plus"/>
                     </div>
                     <div className="day__body" data-day={dietDay.dayNumber}>
                        <Diet
                           dayNumber={dietDay.dayNumber}
                           basket={dietDay.takeFoods}
                           // dayName={dietDay.dayName}
                           changeDialog={changeDialog}
                           deleteProductList={deleteProductList}
                           setMultiProductDropArr={setMultiProductDropArr}
                           productLength={multiProductDropArr.length}
                        />
                     </div>
                  </div>
               </div>
            ))}
         </DragDropContext>
      </>
   );
}

export default observer(DaysOfIntake);