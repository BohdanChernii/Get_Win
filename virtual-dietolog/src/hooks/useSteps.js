import { useEffect, useState } from 'react';

const useSteps = (number) => {
  const [steps, setSteps] = useState([]);
  const changeProgressSteps = (id) => {
    const stepId = id === 0 ? id + 1 : id;
    setSteps((prev) => {
      return prev.map((item, index, array) => {
        if (item.id === stepId) {
          array.forEach((item) => {
            item.inProgress = false;
            item.isDone = false;
          });
          if (array[id]) array[id].inProgress = true;
          id !== 0 ? (item.isDone = true) : null;
        }
        return { ...item };
      });
    });
  };

  const selectAllSteps = () => {
    setSteps((prev) => {
      return prev.map((item) => {
        item.inProgress = false;
        item.isDone = true;
        prev[prev.length - 1].inProgress = true;
        return { ...item };
      });
    });
  };
  useEffect(() => {
    const stepsArr = [];
    for (let i = 1; i <= number; i++) {
      stepsArr.push({
        id: i,
        name: `Шаг ${i}`,
        isDone: false,
        inProgress: false,
      });
    }
    stepsArr[0].inProgress = true;
    setSteps(stepsArr);
  }, []);

  return { steps, changeProgressSteps, selectAllSteps };
};

export default useSteps;
