import React from 'react';
import {useHistory} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {array, func, number} from "prop-types";
import ProductsListAccepted from "@/components/pagesComponents/FoodBasket/ProductsList/ProductsListAccepted.jsx";
import closeRedIcon from "@img/icons/close_red.svg";
import selectedGreen from "@img/icons/selected_grean.svg";
import {useFiltersProducts} from "@/hooks/foodBasket/useFiltersProducts";
import ProductsListNotAccepted from "@/components/pagesComponents/FoodBasket/ProductsList/ProductsListNotAccepted.jsx";
import ScrollContainer from "@/components/feature/ScrollContainer/ScrollContainer.jsx";
import {delCookiesByName} from "@scripts/functions";

FoodBasketStepThree.propTypes = {
   currentStepId: number,
   changeStep: func,
   steps: array
};

function FoodBasketStepThree({steps, changeStep, currentStepId}) {
   const {inProgress} = steps.find(item => item.id === currentStepId)
   const {acceptedGroupsArr, notAcceptedGroupsArr} = useFiltersProducts()
   const history = useHistory()
   const handleOnClickGoBack = () => {
      changeStep(0)
      delCookiesByName('isDoneFoodBasket')
      window.scrollTo({
         top: 0,
         behavior: "smooth"
      });
   }
   
   const handleOnClickGoSetSelection = () => history.push('/set-selection')
   if (inProgress) {
      return (
         <>
            <h3 className='_title-h3' style={{marginBottom: 24}}>Ваша персональная продуктовая корзина</h3>
            <div className='plank' style={{padding: 20}}>
               <ScrollContainer height={724}>
                  <div className="_flex-row_start" style={{marginBottom: 24}}>
                     <div className="_flex-block">
                        <h4 className="_subtitle">Из продуктовой корзины исключены продукты:</h4>
                        <ProductsListNotAccepted products={notAcceptedGroupsArr} icon={closeRedIcon}/>
                     </div>
                     <div className="_flex-block">
                        <h4 className="_subtitle">Приоритетные категории продуктов:</h4>
                        <ProductsListAccepted products={acceptedGroupsArr} icon={selectedGreen}/>
                     </div>
                  </div>
               </ScrollContainer>
               <div className="form__buttons">
                  <button type="button"
                          onClick={handleOnClickGoBack}
                          className="form__button _btn _main-btn _grey-btn">
                     Изменить Продуктовую Корзину
                  </button>
                  <button type="button"
                          onClick={handleOnClickGoSetSelection}
                          className="form__button _btn _main-btn _orange-btn ">
                     Перейти к подбору сета
                  </button>
               </div>
            </div>
         </>
      
      );
   }
}

export default observer(FoodBasketStepThree);