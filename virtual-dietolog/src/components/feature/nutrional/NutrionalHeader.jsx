import React from 'react';

import Legumes from "@img/icons/legumes.svg";
import Mushrooms from "@img/icons/mushrooms.svg";
import FloodOil from "@img/icons/flood-oil.svg";
import Porridge from "@img/icons/porridge.svg";
import MilkProducts from "@img/icons/milk-products.svg";
import Meat from "@img/icons/meat.svg";
import Vegetables from "@img/icons/vegetables.svg";
import Close from "@img/icons/close.svg";
import Arrow from "@img/icons/arrow_bottom.svg";

const getIconByCategoryName = url => {
   let srcIcon = '';
   switch (url) {
      case 'Бобовые':
         srcIcon = Legumes;
         break;
      case 'Грибы':
         srcIcon = Mushrooms;
         break;
      case 'Жиры и масла':
         srcIcon = FloodOil;
         break;
      case 'Крупы':
         srcIcon = Porridge;
         break;
      case 'Молочные продукты':
         srcIcon = MilkProducts;
         break;
      case 'Мясо':
         srcIcon = Meat;
         break;
      case 'Овощи и зелень':
         srcIcon = Vegetables;
         break;
      case 'Рыба':
         srcIcon = Close;
         break;
      case 'Фрукты и ягоды':
         srcIcon = Close;
         break;
      default:
         srcIcon = Close;
      
   }
   return srcIcon;
   
};

function NutritionalHeader({name}) {
   const icon = getIconByCategoryName(name);
   return (
      <>
         <button data-category={name} data-type="choose" className="nutritional__choose-all">
            Выбрать все из {name}</button>
         <div className="category _spoller">
            <div className="category__name">
               <img className="category__arrow" src={Arrow} alt="arrow"/>
               <img className="category__icon" src={icon} alt="icon"/>
               <h4 className="category__title">{name}</h4>
            </div>
         </div>
      </>
   );
}

export default NutritionalHeader;