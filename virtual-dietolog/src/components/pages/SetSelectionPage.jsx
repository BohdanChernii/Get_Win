import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import useSteps from '@/hooks/useSteps';
import Steps from '@/components/feature/Steps/Steps.jsx';
import SetSelectionStepOne from '@/components/pagesComponents/SetSelection/Steps/SetSelectionStepOne.jsx';
import SetSelectionStepThree from '@/components/pagesComponents/SetSelection/Steps/SetSelectionStepThree.jsx';
import SetSelectionStepTwo from '@/components/pagesComponents/SetSelection/Steps/SetSelectionStepTwo.jsx';
import dietStore from '@store/diet-store';
import SetSelectionStepFour from '@/components/pagesComponents/SetSelection/Steps/SetSelectionStepFour.jsx';
import IsDoneDietDialog from '@/components/feature/modals/IsDoneDietDialog.jsx';
import { getAllCookies } from '@scripts/functions';
import setSelectionStore from '@store/set-selection-store';

function SetSelectionPage() {
  document.title = 'Виртуальный диетолог | Подбор сета';
  const { steps, changeProgressSteps, selectAllSteps } = useSteps(4);
  const { fetchDiet, diet } = dietStore;
  const { checkOfSelectFilterProducts, filtersSelectionStore } =
    setSelectionStore;
  const [isDoneDiet, setIsDoneDiet] = useState(false);
  const changeIsDoneDiet = () => setIsDoneDiet((prev) => !prev);

  useEffect(() => {
    fetchDiet();
    const cookies = getAllCookies();
    if (cookies.setSelection) {
      selectAllSteps();
    }
  }, []);
  return (
    <>
      <div className="headline-box">
        <h2 className="_title">Подбор сета - выбор продуктов на неделю</h2>
      </div>
      <Steps steps={steps} />

      <SetSelectionStepOne
        currentStepId={1}
        steps={steps}
        changeProgressSteps={changeProgressSteps}
      />
      <SetSelectionStepTwo
        currentStepId={2}
        steps={steps}
        changeProgressSteps={changeProgressSteps}
      />
      <SetSelectionStepThree
        currentStepId={3}
        steps={steps}
        changeProgressSteps={changeProgressSteps}
        changeIsDoneDiet={changeIsDoneDiet}
      />
      <SetSelectionStepFour
        currentStepId={4}
        steps={steps}
        changeProgressSteps={changeProgressSteps}
        isDoneDiet={isDoneDiet}
        changeIsDoneDiet={changeIsDoneDiet}
      />
      <IsDoneDietDialog
        isDoneDiet={isDoneDiet}
        changeIsDoneDiet={changeIsDoneDiet}
      />
    </>
  );
}

export default observer(SetSelectionPage);
