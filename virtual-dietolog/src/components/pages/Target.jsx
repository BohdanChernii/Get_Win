import React, { useEffect, useState } from 'react';
import ProgramInfoDashboard from '@/components/feature/dashboards/ProgramInfoDashboard.jsx';
import DietTypeDashboard from '@/components/feature/dashboards/DietTypeDashboard.jsx';
import ActivityDashboard from '@/components/feature/dashboards/ActivityDashboard.jsx';
import { observer } from 'mobx-react-lite';
import TargetStepOne from '@/components/pagesComponents/Target/TargetSteps/TargetStepOne.jsx';
import TargetStepTwo from '@/components/pagesComponents/Target/TargetSteps/TargetStepTwo.jsx';
import TargetStepThree from '@/components/pagesComponents/Target/TargetSteps/TargetStepThree.jsx';
import TargetStepFour from '@/components/pagesComponents/Target/TargetSteps/TargetStepFour.jsx';
import Steps from '@/components/feature/Steps/Steps.jsx';
import { delCookiesByName, getAllCookies } from '@scripts/functions';

function TargetPage() {
  document.title = 'Виртуальный диетолог | Цель';
  // Показ дашборду ===========================================================================
  const [dashboardShow, setDashboardShow] = useState(false);
  const handlerOnShowHideDashboard = () => {
    delCookiesByName('isDoneTarget');
    setDashboardShow((prev) => !prev);
    setSteps((prev) => {
      return prev.map((item) => {
        item.id === 1 ? (item.inProgress = true) : (item.inProgress = false);
        item.isDone = false;
        return { ...item };
      });
    });
  };

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
    {
      id: 4,
      name: 'Шаг 4',
      isDone: false,
      inProgress: false,
    },
  ]);
  const handleOnChangeProgressSteps = (id) => {
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
    stepId === steps.length && setDashboardShow(true);
  };

  // select default events ====================================
  const [checked, setChecked] = useState(true);

  const handleOnChangeCheckedValue = () => {
    setChecked((prev) => !prev);
  };

  //  target is done ====================================
  const [targetIsDone, setTargetIsDone] = useState(false);
  const handleTargetIsDone = () => setTargetIsDone(true);
  // useEffect ===========================================================================
  useEffect(() => {
    const cookies = getAllCookies();
    if (targetIsDone || cookies.isDoneTarget) {
      setDashboardShow(true);
    }
  }, []);

  // render ===========================================================================
  if (dashboardShow) {
    return (
      <>
        <ProgramInfoDashboard />
        <DietTypeDashboard dashboardHide={handlerOnShowHideDashboard} />
        <div className="headline-box">
          <h2 className="_title">Активности</h2>
        </div>
        <ActivityDashboard />
      </>
    );
  } else
    return (
      <>
        <div className="headline-box">
          <h2 className="_title">Цель</h2>
        </div>
        <Steps steps={steps} width={158} />
        <div className="target">
          <TargetStepOne
            currentStepId={1}
            steps={steps}
            changeStep={handleOnChangeProgressSteps}
          />
          <TargetStepTwo
            currentStepId={2}
            steps={steps}
            changeStep={handleOnChangeProgressSteps}
          />

          <TargetStepThree
            currentStepId={3}
            steps={steps}
            changeStep={handleOnChangeProgressSteps}
            isDefaultEventChecked={checked}
            changeCheckedValue={handleOnChangeCheckedValue}
          />

          <TargetStepFour
            currentStepId={4}
            steps={steps}
            changeStep={handleOnChangeProgressSteps}
            doneTargetInfo={handleTargetIsDone}
          />
        </div>
      </>
    );
}

export default observer(TargetPage);
