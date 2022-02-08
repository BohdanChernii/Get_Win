import React, {useEffect, useState} from 'react';
import {array, func, number} from 'prop-types';
import usersStore from "@store/user-store";
import {observer} from "mobx-react-lite";
import DietInputs from "@/components/pagesComponents/Target/TargetInputs/DietInputs.jsx";
import ProteinInputs from "@/components/pagesComponents/Target/TargetInputs/ProteinInputs.jsx";
import FatsInputs from "@/components/pagesComponents/Target/TargetInputs/FatsInputs.jsx";
import CarbohydratesInputs from "@/components/pagesComponents/Target/TargetInputs/CarbohydratesInputs.jsx";
import spravStore from "@store/sprav-store";
import {TippyTargetInfo} from "@/components/feature/tippy/Tippys.jsx";
import calcStore from "@store/calc-store";

TargetStepTwo.propTypes = {
   changeStep: func,
   currentStepId: number,
   steps: array,
};

function TargetStepTwo({changeStep, currentStepId, steps}) {
   const {inProgress} = steps.find(item => item.id === currentStepId)
   const handleOnClickGoBack = () => changeStep(currentStepId - 2)
   const {changeUserValue, updateUser} = usersStore
   const popupText = {
      diet: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam dolorem eligendi facilis, minus soluta tenetur?',
      protein: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam dolorem eligendi facilis, minus soluta tenetur?',
      fats: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam dolorem eligendi facilis, minus soluta tenetur?',
      carbohydrates: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam dolorem eligendi facilis, minus soluta tenetur?',
   }
   // Тип діети ===========================================================================
   const [dietTypeSource, setDietTypeSource] = useState({
      type: 'id_diet',
      error: false,
      value: null,
   });
   const handleOnChangeDiet = (id) => {
      setDietTypeSource(prev => ({...prev, value: id}))
   }
   const dietOption = []
   if (spravStore.srav?.sprav_diet) {
      for (let spravDietKey in spravStore.srav?.sprav_diet) {
         const objDiet = {...spravStore.srav?.sprav_diet[spravDietKey]}
         dietOption.push({...objDiet})
      }
   }

   // Тип белков ===========================================================================
   const [proteinTypeSource, setProteinTypeSource] = useState({
      type: 'id_protein',
      error: false,
      value: null,
   });
   const handleOnChangeProtein = (id) => setProteinTypeSource(prev => ({...prev, value: id}))
   const proteinOption = []
   if (spravStore.srav?.sprav_protein) {
      for (let key in spravStore.srav?.sprav_protein) {
         const opt = {...spravStore.srav?.sprav_protein[key]}
         proteinOption.push({...opt})
      }
   }

// Тип жиров ===========================================================================
   const [fatsTypeSource, setFatsTypeSource] = useState({
      type: 'id_fat',
      error: false,
      value: null,
   });
   const handleOnChangeFats = (id) => setFatsTypeSource(prev => ({...prev, value: id}))
   const fatsOption = []
   if (spravStore.srav?.sprav_fat) {
      for (let key in spravStore.srav?.sprav_fat) {
         const opt = {...spravStore.srav?.sprav_fat[key]}
         fatsOption.push({...opt})
      }
   }
// Тип углеводов ===========================================================================
   const [carbohydratesTypeSource, setCarbohydratesTypeSource] = useState({
      type: 'id_carb',
      error: false,
      value: null,
   });
   const handlerOnChangeCarbohydrates = (id) => setCarbohydratesTypeSource(prev => ({...prev, value: id}))
   const carbohydratesOption = []
   if (spravStore.srav?.sprav_carb) {
      for (let key in spravStore.srav?.sprav_carb) {
         const opt = {...spravStore.srav?.sprav_carb[key]}
         carbohydratesOption.push({...opt})
      }
   }
// Submit ===========================================================================
   const handleOnSubmitForm = async (e) => {
      e.preventDefault();
      let error = 0;
      const targetItems = [
         [dietTypeSource, setDietTypeSource],
         [proteinTypeSource, setProteinTypeSource],
         [fatsTypeSource, setFatsTypeSource],
         [carbohydratesTypeSource, setCarbohydratesTypeSource],
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
         targetItems.forEach(opt => {
            const name = opt[0].type
            const value = opt[0].value
            changeUserValue(name, value)
         })
         await updateUser()
         changeStep(currentStepId)
      }
   };
   
   
   
   if (inProgress) {
      return (
         <form className="form" action="#" onSubmit={handleOnSubmitForm}>
            <div className="form__item" style={{marginBottom: 60}}>
               {!dietTypeSource.error
                  ? <label className="_subtitle">Выберите тип диеты</label>
                  : <label className="_subtitle _error">Пожалуйста, выберите тип диеты</label>
               }
               <TippyTargetInfo text={popupText.diet}/>
               <DietInputs
                  type={dietTypeSource.type}
                  options={dietOption}
                  value={dietTypeSource.value}
                  changeDiet={handleOnChangeDiet}
               />
            </div>
            
            <div className="form__item">
               {!proteinTypeSource.error
                  ? <label className="_subtitle">Выберите иточник получения белков</label>
                  : <label className="_subtitle _error">Пожалуйста, выберите источник получения белков</label>
               }
               <TippyTargetInfo text={popupText.protein}/>
               <ProteinInputs
                  type={proteinTypeSource.type}
                  options={proteinOption}
                  value={proteinTypeSource.value}
                  changeProtein={handleOnChangeProtein}
               />
            </div>
            
            <div className="form__item">
               {!fatsTypeSource.error
                  ? <label className="_subtitle">Выберите источник получения жиров</label>
                  : <label className="_subtitle _error">Пожалуйста, выберите источник получения жиров</label>
               }
               <TippyTargetInfo text={popupText.fats}/>
               <FatsInputs
                  type={fatsTypeSource.type}
                  options={fatsOption}
                  value={fatsTypeSource.value}
                  changeFats={handleOnChangeFats}
               />
            </div>
            
            <div className="form__item">
               {!carbohydratesTypeSource.error
                  ? <label className="_subtitle">Выберите источник получения углеводов</label>
                  : <label className="_subtitle _error">Пожалуйста, выберите источник получения углеводов</label>
               }
               <TippyTargetInfo text={carbohydratesTypeSource.error}/>
               <CarbohydratesInputs
                  type={carbohydratesTypeSource.type}
                  options={carbohydratesOption}
                  value={carbohydratesTypeSource.value}
                  changeCarbohydrates={handlerOnChangeCarbohydrates}
               />
            </div>
            
            <div className="form__buttons">
               <button type="reset" onClick={handleOnClickGoBack}
                       className="form__button _btn _main-btn _grey-btn">Назад
               </button>
               <button type="submit"
                       className="form__button _btn _main-btn _orange-btn ">Сохранить и Продолжить
               </button>
            </div>
         </form>
      );
   } else return <></>
}

export default observer(TargetStepTwo);