import dietStore from '@store/diet-store';
import { useEffect, useState } from 'react';

const useDietList = () => {
  const { diet, deleteProductFromDiet, setDiet } = dietStore;
  const [dietList, setDietList] = useState(diet);
  const [isLoad, setIsLoad] = useState(false);

  const deleteProductList = (dayNumber, takeFoodNumber, productId) => {
    deleteProductFromDiet(dayNumber, takeFoodNumber, productId);
    setDietList((prev) => {
      return prev.map((item) => {
        if (item.dayNumber === dayNumber) {
          item.takeFoods.forEach((foods) => {
            if (foods.take_food === takeFoodNumber) {
              foods.products = foods.products.filter((pr) => pr !== productId);
            }
          });
        }
        return item;
      });
    });
  };

  const draggableDietList = (result, selectedArr) => {
    const { destination } = result;
    if (!destination) return;

    const newDiet = JSON.parse(JSON.stringify(dietList));
    selectedArr.forEach((selectedItem) => {
      // ==================== source ====================
      const sourceDay = parseInt(selectedItem.split('_')[0].split('-')[1]);
      const sourceBasket = parseInt(selectedItem.split('_')[1].split('-')[1]);

      // ==================== destination ====================
      const destinationDay = parseInt(
        destination.droppableId.split('_')[0].split('-')[1]
      );
      const destinationBasket = parseInt(
        destination.droppableId.split('_')[1].split('-')[1]
      );

      // ==================== indexes ====================
      const destinationIdx = parseInt(destination.index);

      // ==================== product ====================
      const product = parseInt(selectedItem.split('_')[2].split('-')[1]);

      newDiet.forEach((diet) => {
        if (diet.dayNumber === sourceDay) {
          diet.takeFoods.forEach((basket) => {
            if (basket.take_food === sourceBasket) {
              basket.products = basket.products.filter(
                (item) => item !== product
              );
            }
          });
        }
      });

      newDiet.forEach((diet) => {
        if (diet.dayNumber === destinationDay) {
          diet.takeFoods.forEach((basket) => {
            if (basket.take_food === destinationBasket) {
              if (!basket.products.includes(product)) {
                basket.products.splice(destinationIdx, 0, product);
              }
            }
          });
        }
      });
    });

    setDietList(newDiet);
    setDiet(newDiet);
  };
  useEffect(() => {
    if (diet && !isLoad) {
      const newDiet = diet.map((dietItem) => {
        dietItem.takeFoods.forEach((basket) => {
          if (!basket.products) {
            basket.products = [];
          }
        });
        return dietItem;
      });
      setDietList(newDiet);
      setIsLoad(true);
    }
  }, [diet]);

  return { dietList, setDietList, deleteProductList, draggableDietList };
};

export default useDietList;
