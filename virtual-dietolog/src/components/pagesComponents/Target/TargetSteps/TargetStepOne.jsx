import React, {useState} from 'react';
import {array, func, number} from 'prop-types';
import UiSlider from "@/components/feature/sliders/NoUiSlider.jsx";
import usersStore from "@store/user-store";
import {observer} from "mobx-react-lite";
import ProgramInputs from "@/components/pagesComponents/Target/TargetInputs/ProgramInputs.jsx";
import spravStore from "@store/sprav-store";
import calcStore from "@store/calc-store";

TargetStepOne.propTypes = {
   changeStep: func,
   currentStepId: number,
   steps: array,
   
};

function TargetStepOne({changeStep, currentStepId, steps}) {
   const {changeUserValue, updateUser} = usersStore
   // Вибір програми ===========================================================================
   const [programsType, setProgramsType] = useState({
      name: 'id_program',
      value: '',
      error: false,
   });
   const handleOnChangeProgram = (id) => setProgramsType(prev => ({...prev, value: id}));
   const programsOption = []
   if (spravStore.srav?.sprav_program) {
      for (let key in spravStore.srav?.sprav_program) {
         const opt = {...spravStore.srav?.sprav_program[key]}
         programsOption.push({...opt})
      }
   }
   // Вибір ваги ===========================================================================
   const [weight, setWeight] = useState({
      name: 'target',
      error: false,
      value: ''
   });
   const handleChangeSlider = (value) => {
      setWeight(prev => {
         prev.error = false;
         prev.value = value;
         return {...prev}
      })
   };

// Submit ===========================================================================
   const handleOnSubmitForm = async (e) => {
      e.preventDefault();
      let error = 0;
      const targetItems = [
         [programsType, setProgramsType],
         [weight, setWeight],
      ];
      targetItems.forEach(opt => {
         const item = opt[0];
         const setItem = opt[1];
         if (!item.value) {
            setItem(prev => ({...prev, error: true}));
            error++;
         }
      })
      if (error === 0) {
         targetItems.forEach(opt => changeUserValue(opt[0].name, opt[0].value))
         await updateUser()
         //    .then(res => {
         //    if (res.ok) {
         //       calcStore.fetchCalc()
         //    }
         // })
         changeStep(currentStepId)
      }
   };
   const {inProgress} = steps.find(item => item.id === currentStepId)
   if (inProgress) {
      return (
         <form
            className="form"
            action="#"
            // onReset={handleOnResetForm}
            onSubmit={handleOnSubmitForm}>
            <div className="form__item" style={{marginBottom: 60}}>
               {!programsType.error
                  ? <label className="_subtitle">Программа</label>
                  : <label className="_subtitle _error">Пожалуйста, выберите программу</label>
               }
               <ProgramInputs
                  options={programsOption} value={programsType.value}
                  changeProgram={handleOnChangeProgram} type={'program'}
               />
            </div>
            <div className="form__item" style={{maxWidth: 690}}>
               {
                  !weight.error
                     ? <label className="_subtitle">Выберите свой идеальный вес:</label>
                     : <label className="_subtitle _error">Пожалуйста, выберите вес</label>
               }
               <UiSlider value={weight.value} changeValue={handleChangeSlider}/>
               <div className="_flex-row_space-between">
                  <h6 className='weight-info'>50 кг</h6><h6 className='weight-info'>80 кг</h6>
               </div>
            </div>
            <div className="form__buttons">
               <button type="submit"
                       className="form__button _btn _main-btn _orange-btn ">Сохранить и Продолжить
               </button>
            </div>
         </form>
      );
   } else return <></>
}

export default observer(TargetStepOne);