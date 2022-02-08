import setSelectionStore from '@store/set-selection-store';

export const useSelectionProducts = (dietSource = []) => {
  const { selectionStore } = setSelectionStore;

  let filterStore = JSON.parse(JSON.stringify(selectionStore));
  if (filterStore) {
    filterStore.forEach((basket) => {
      if (typeof basket === 'object' && basket !== null) {
        for (let key in basket) {
          const categoryProducts = basket[key];
          if (Array.isArray(categoryProducts)) {
            categoryProducts.forEach((item) => {
              const productList = Object.values(item);
              productList.forEach((prList) => {
                prList.forEach((pr, index, arr) => {
                  if (Number(pr.selected) === 1) {
                    arr.splice(index, 1);
                  }
                });
                prList.forEach((pr) => {
                  if (dietSource.includes(Number(pr.id))) {
                    pr.selected = 1;
                  } else pr.selected = 0;
                });
              });
            });
          }
        }
      }
    });
  } else filterStore = [];

  return filterStore;
};

export default useSelectionProducts;
