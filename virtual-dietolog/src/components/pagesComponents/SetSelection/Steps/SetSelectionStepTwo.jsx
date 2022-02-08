import ChooseSetsProgram from "@/components/pagesComponents/SetSelection/ChooseSetsProgram/ChooseSetsProgram.jsx";
import {array, func, number} from 'prop-types';
import React, {useState} from 'react';

SetSelectionStepTwo.propTypes = {
   changeProgressSteps: func,
   steps: array,
   currentStepId: number
};

function SetSelectionStepTwo({changeProgressSteps, steps, currentStepId}) {
   const {inProgress} = steps.length > 0 && steps.find(item => item.id === currentStepId)
   
   
   const [programsType, setProgramsType] = useState({
      name: 'id_program',
      value: '1',
      options: [
         {id: 1, name: 'Рекомендации программы (с возможностью редактирования)'},
         {id: 2, name: 'Настройка вручную'},
      ]
   });
   const handleOnChangeProgram = (id) => setProgramsType(prev => ({...prev, value: id}));
   
   const handleOnGoBack = () => {
      changeProgressSteps(currentStepId - 2)
   }
   
   const handleOnSubmit = () => {
      changeProgressSteps(currentStepId)
   }
   return (
      <>
         {inProgress && (
            <form className='form'>
               <h3 className='_title-h3'>Выберите способ подбора сета</h3>
               <div className="form__item">
                  <ChooseSetsProgram options={programsType.options} value={programsType.value}
                                     changeProgram={handleOnChangeProgram} type={'ser-program'}/>
               </div>
               <div className="form__buttons">
                  <button className='form__button _btn _main-btn _grey-btn' onClick={handleOnGoBack}>
                     Вернуться Назад
                  </button>
                  <button type='button' className='form__button _btn _main-btn _orange-btn' onClick={handleOnSubmit}>
                     Сохранить и Продолжить
                  </button>
               </div>
            </form>
         )}
      </>
   )
   
}

export default SetSelectionStepTwo;