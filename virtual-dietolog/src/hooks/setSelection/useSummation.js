import setSelectionStore from '@store/set-selection-store';
import { sortArrByName } from '@scripts/functions';

const useSummation = () => {
  const { filtersSelectionStore } = setSelectionStore;
  let summations = [];
  filtersSelectionStore &&
    filtersSelectionStore.forEach((basket) => {
      const opt = {
        name: basket.name,
        products: [],
      };
      if (typeof basket === 'object' && basket !== null) {
        for (let key in basket) {
          const categoryProducts = basket[key];
          if (Array.isArray(categoryProducts)) {
            categoryProducts.forEach((item) => {
              const productList = Object.values(item);
              productList.forEach((prList) => {
                prList.forEach((pr) => {
                  if (pr.selected === 1) {
                    opt.products.push(pr.name);
                  }
                });
              });
            });
          }
        }
        summations.push(opt);
      }
    });
  summations.forEach((item) => sortArrByName(item.products));
  return summations;
};

export default useSummation;
