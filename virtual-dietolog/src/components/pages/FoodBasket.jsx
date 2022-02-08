import React, { useEffect, useState } from 'react';
import Steps from '@/components/feature/Steps/Steps.jsx';
import { observer } from 'mobx-react-lite';
import FoodBasketStepOne from '@/components/pagesComponents/FoodBasket/Steps/FoodBasketStepOne.jsx';
import FoodBasketStepTwo from '@/components/pagesComponents/FoodBasket/Steps/FoodBasketStepTwo.jsx';
import FoodBasketStepThree from '@/components/pagesComponents/FoodBasket/Steps/FoodBasketStepThree.jsx';
import { getAllCookies } from '@scripts/functions';

function FoodBasket() {
  document.title = 'Виртуальный диетолог | Настройка продуктовой корзины';
  // Зміна кроків ===========================================================================
  const [steps, setSteps] = useState([
    {
      id: 1,
      name: 'Шаг 1',
      isDone: false,
      inProgress: true,
    },
    {
      id: 2,
      name: 'Шаг 2',
      isDone: false,
      inProgress: false,
    },
    {
      id: 3,
      name: 'Шаг 3',
      isDone: false,
      inProgress: false,
    },
  ]);
  const handleOnChangeProgressSteps = (id) => {
    const stepId = id === 0 ? id + 1 : id;
    setSteps((prev) =>
      prev.map((item, index, array) => {
        if (item.id === stepId) {
          array.forEach((item) => {
            item.inProgress = false;
            item.isDone = false;
          });
          if (array[id]) array[id].inProgress = true;
          id !== 0 ? (item.isDone = true) : null;
        }
        return { ...item };
      })
    );
  };
  useEffect(() => {
    const cookies = getAllCookies();
    if (cookies.isDoneFoodBasket) {
      setSteps((prev) =>
        prev.map((item, index, array) => {
          array.forEach((item) => {
            item.inProgress = false;
            item.isDone = true;
          });
          const el = array.find((item) => item.id === array.length);
          el.inProgress = true;
          el.isDone = false;
          return { ...item };
        })
      );
    }
  }, []);

  return (
    <>
      <div className="headline-box">
        <h2 className="_title">Настройка продуктовой корзины</h2>
      </div>
      <Steps steps={steps} />

      <FoodBasketStepOne
        currentStepId={1}
        steps={steps}
        changeStep={handleOnChangeProgressSteps}
      />
      <FoodBasketStepTwo
        currentStepId={2}
        steps={steps}
        changeStep={handleOnChangeProgressSteps}
      />
      <FoodBasketStepThree
        currentStepId={3}
        steps={steps}
        changeStep={handleOnChangeProgressSteps}
      />
    </>
  );
}

export default observer(FoodBasket);
