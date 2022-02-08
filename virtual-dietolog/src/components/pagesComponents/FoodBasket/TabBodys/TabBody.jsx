import React from 'react';
import {func, string} from 'prop-types';
import foodBasketStore from "@store/food-basket-store";
import AllProductsList from "@/components/pagesComponents/FoodBasket/ProductsList/AllProductsList.jsx";
import SearchProductsList from "@/components/pagesComponents/FoodBasket/SearchProductsList/SearchProductsList.jsx";
import {observer} from "mobx-react-lite";
import {useSearchingProducts} from "@/hooks/foodBasket/useSearchingProducts";
import exceptionGroupStore from "@store/exception-group-store";
import NotFoundProducts from "@/components/feature/dashboards/NotFoundProducts.jsx";

TabBody.propTypes = {
   searchValue: string,
   changeOpenDialog: func,
};

function TabBody({searchValue, changeOpenDialog, basketId}) {
   const searchProducts = useSearchingProducts(searchValue)
   const index = searchProducts.findIndex(item => Number(item.id) === Number(basketId))
   const {resetProduct, basket} = foodBasketStore;
   const {resetGroups} = exceptionGroupStore;
   return (
      <>
         <div style={{width: `${100 / basket.length}%`}} className="tab">
            <div className="form__buttons" style={{justifyContent: "flex-end"}}>
               <button
                  onClick={() => changeOpenDialog()}
                  className='form__button _display-inline-block _btn _main-btn _orange-btn'>Сохранить и Продолжить
               </button>
               {!searchValue && (
                  <button
                     onClick={() => {
                        resetGroups(basketId)
                        resetProduct(basketId)
                     }}
                     className='form__button _btn _main-btn _grey-btn'>Очистить вибор
                  </button>)
               }
            </div>
            <div className="tab__block">
               {!searchValue && searchProducts.length === 0 && <AllProductsList basketId={basketId} columns={2}/>}
               
               {searchValue && searchProducts[index].products.length === 0 && <NotFoundProducts text='Продукт не найден'/>}
               
               {searchValue && searchProducts[index].products.length > 0 && (
                  <SearchProductsList basketId={basketId} searchProducts={searchProducts}/>)
               }
            </div>
         </div>
      </>
   
   );
}

export default observer(TabBody);