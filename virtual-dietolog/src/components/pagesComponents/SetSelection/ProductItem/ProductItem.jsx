import React from 'react';
import styled from "styled-components";
import delIcon from "@img/icons/close_gray.svg";
import {Draggable,} from 'react-beautiful-dnd';
import setSelectionStore from "@store/set-selection-store";
import {unselectAllDraggableProducts} from "@scripts/functions";

ProductItem.propTypes = {};

const ListItem = styled.li`

  user-select: none;

  background-color: ${props => (props.isDragging ? 'rgb(254,246,244)' : 'white')};
  cursor: ${props =>
          (props.isDragging ? 'grab;' : 'pointer;')};
  border: ${props => (props.isDragging ? '1px dashed #E9856B;' : 'none')};

  &:hover, &.isDraggableProductSelected {
    background-color: ${props => (props.isDragDisabled ? 'white' : 'rgba(254, 246, 244)')};
  }

  &.isDraggableProductDragging {
    background-color: #f7f7f7;
    color: #727486;
  }
`;

const CaloriesSpan = styled.span`
  font-size: 14px;
  color: #727486;
  pointer-events: none;
`;

const MultiProductNumber = styled.div`
  width: 17px;
  height: 17px;
  margin: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 12px;
  line-height: 100%;
  background: #e9856b;
  border-radius: 50%;
`;


function ProductItem({dayNumber, basketNumber, productId, index, isDragDisabled, deleteProductList, setMultiProductDropArr, productLength}) {
   const {selectionStoreIdx} = setSelectionStore;
   const draggableId = `day-${dayNumber}_basket-${basketNumber}_product-${productId}`
   let product, productName, productCal
   if (selectionStoreIdx) {
      product = selectionStoreIdx.find(pr => Number(pr.id) === Number(productId))
      
      productName = product
         ? product.name.length > 20 ? product.name.slice(0, 20) + '..' : product.name
         : `Номер продукту - ${productId}`;
      
      productCal = product
         ? product.cal + 'kcal / 100гр'
         : '150 kcal / 100гр';
   } else {
      productName = `Номер продукту - ${productId}`;
      productCal = '150 kcal / 100гр'
   }
   
   const handleOnDeleteProduct = (dayNumber, basketNumber, productId) => {
      
      deleteProductList(dayNumber, basketNumber, productId)
      setMultiProductDropArr(prev => prev.filter(item => item !== draggableId))
   }
   
   const handleOnSelectProduct = (e, isDragDisabled) => {
      e.persist()
      const dataId = e.target.parentElement.dataset.rbdDraggableId
      const li = e.target.parentElement
      if (!isDragDisabled && e.ctrlKey) {
         setMultiProductDropArr(prev => {
            if (prev.includes(dataId)) {
               prev.splice(prev.indexOf(dataId), 1)
               li.classList.remove('isDraggableProductSelected')
            } else {
               li.classList.add('isDraggableProductSelected')
               return [...prev, dataId]
            }
            return prev
         })
      } else if (!e.ctrlKey) {
         setMultiProductDropArr([dataId])
         unselectAllDraggableProducts()
         li.classList.add('isDraggableProductSelected')
      }
   }
   
   return (
      <Draggable draggableId={draggableId}
                 index={index} isDragDisabled={isDragDisabled}>
         {(provided, snapshot) => (
            <ListItem
               className='day__diet-item'
               ref={provided.innerRef}
               isDragging={snapshot.isDragging}
               isDragDisabled={isDragDisabled}
               {...provided.draggableProps}
               {...provided.dragHandleProps}>
               
               <div className='_flex-row_center'
                    style={{width: '100%', height: '100%', paddingLeft: 24}}
                    onClick={(e) => handleOnSelectProduct(e, isDragDisabled)}>
                  {!isDragDisabled
                     ? <p style={{pointerEvents: "none"}}>{productName} <CaloriesSpan>{productCal}</CaloriesSpan></p>
                     : <CaloriesSpan>Продукты не выбраны</CaloriesSpan>}
               </div>
               
               
               {isDragDisabled || (
                  <div className='_flex-row_center'
                       style={{borderLeft: '1px solid #F5F7FD', cursor: "pointer", zIndex: 5}}
                       onClick={() => handleOnDeleteProduct(dayNumber, basketNumber, productId)}>
                     {
                        snapshot.isDragging
                           ? productLength > 1 && <MultiProductNumber children={<p>{productLength}</p>}/>
                           : <img className='day__icon day__icon_close' src={delIcon} alt="del"/>
                     }
                  </div>
               
               )}
            </ListItem>
         )}
      </Draggable>
   );
}

export default ProductItem;