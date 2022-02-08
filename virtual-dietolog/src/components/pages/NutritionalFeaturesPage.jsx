import React, { useEffect, useState } from 'react';
// import dataProducts from "@assets/data/products.json";
import NutritionalHeader from '@/components/feature/nutrional/NutrionalHeader.jsx';
import ProductSelectedList from '@/components/feature/nutrional/ProductSelectedList.jsx';
import EmptyDashboard from '@/components/feature/dashboards/EmptyDashboard.jsx';

// console.clear()

// console.log(dataProducts)
function NutritionalFeaturesPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([
    'Жиры и масла',
    'Бобовые',
    'Овощи и зелень',
    'Фрукты и ягоды',
    'Крупы',
    'Мясо',
    'Молочка',
    'Рыба',
  ]);
  // const [categoriesCheckList, setCategoriesCheckList] = useState([]);
  const [categoriesCheckList, setCategoriesCheckList] = useState([
    {
      categoryName: 'Жиры и масла',
      products: [
        { name: 'Арахис', isSelected: true },
        { name: 'Миндаль', isSelected: true },
        { name: 'Фисташки, сырые', isSelected: true },
        { name: 'Оливковое масло', isSelected: true },
        { name: 'Льняное масло', isSelected: true },
      ],
    },
    {
      categoryName: 'Бобовые',
      products: [{ name: 'Чечевица, зерно', isSelected: true }],
    },
    { categoryName: 'Овощи и зелень', products: [] },
    { categoryName: 'Фрукты и ягоды', products: [] },
    { categoryName: 'Крупы', products: [] },
    { categoryName: 'Мясо', products: [] },
    { categoryName: 'Молочка', products: [] },
    { categoryName: 'Рыба', products: [] },
  ]);
  useEffect(() => {
    const urlDevDataProduct = 'src/assets/data/products.json';

    // const urlProdDataProduct = 'data/products.json'
    async function getProducts() {
      await fetch(urlDevDataProduct)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          let categoriesList = [];
          let categoriesCheckList = [];
          const dataLength = Object.keys(data.products.data.products).length;
          // category
          for (let i = 0; i < dataLength; i++) {
            const category = data.products.data.products[i];
            if (category) categoriesList.push(category.dep1.trim());
          }
          categoriesList = [...new Set(categoriesList)];
          for (let cat = 0; cat < categoriesList.length; cat++) {
            const categoryName = categoriesList[cat];
            const productsItems = [];
            for (let prod = 0; prod < dataLength; prod++) {
              // products
              let productOfCategory = data.products.data.products[prod];
              if (productOfCategory) {
                if (productOfCategory.dep1.trim() === categoryName) {
                  productsItems.push({
                    name: productOfCategory.name,
                    isSelected: false,
                  });
                }
              }
            }
            categoriesCheckList.push({
              categoryName,
              productsItems,
            });
          }
          setProducts(categoriesCheckList);
        })
        .catch((err) => console.error(err));
    }

    getProducts();
  }, []);

  return (
    <>
      <div className="headline-box">
        <h2 className="_title">Особенности питания</h2>
      </div>
      <EmptyDashboard text={'Особенности питания отсутствуют'} />

      <div className="nutritional">
        <div className="nutritional__question">
          Есть ли продукты, которые Вы не употребляете?
        </div>
        <div className="nutritional__list _spollers _one">
          {categories.map((categoryName, index, categoriesArr) => {
            return (
              <div key={index} className="nutritional__item">
                <NutritionalHeader name={categoryName} />

                <div className="nutritional__body" style={{ display: 'block' }}>
                  <div className="selected">
                    <div className="selected__container">
                      <ProductSelectedList
                        name={categoryName}
                        checkList={categoriesCheckList}
                      />
                    </div>
                  </div>
                  <div className="product">
                    {/*<ProductList name={categoryName} products={products} checkList={categoriesCheckList}/>*/}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default NutritionalFeaturesPage;
