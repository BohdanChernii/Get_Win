import React from 'react';
import usersStore from "@/store/user-store";
import calcStore from "@store/calc-store";
import {observer} from "mobx-react-lite";
import spravStore from "@store/sprav-store";
import DietInputs from "@/components/pagesComponents/Target/TargetInputs/DietInputs.jsx";
import ProteinInputs from "@/components/pagesComponents/Target/TargetInputs/ProteinInputs.jsx";
import FatsInputs from "@/components/pagesComponents/Target/TargetInputs/FatsInputs.jsx";
import CarbohydratesInputs from "@/components/pagesComponents/Target/TargetInputs/CarbohydratesInputs.jsx";
import {useHistory} from "react-router-dom";

function DietTypeDashboard({dashboardHide}) {
   const history = useHistory()
   const {calc} = calcStore
   
   const goToSetSelection = () => {
      history.push('/set-selection')
   }
   
   const limitingKcal = `${calc?.cal_min} до ${calc?.cal_max}`
   const speed = ` ${calc?.calc?.target_time.max} до ${calc?.calc?.target_time.min}`
   const options = {
      diet: [],
      prot: [],
      fats: [],
      carb: [],
   }
   if (spravStore.srav?.sprav_diet && usersStore.user?.id_diet) {
      options.diet.push(spravStore.srav?.sprav_diet[usersStore.user?.id_diet])
   }
   if (spravStore.srav?.sprav_protein && usersStore.user?.id_protein) {
      options.prot.push(spravStore.srav.sprav_protein[usersStore.user?.id_protein])
   }
   if (spravStore.srav?.sprav_fat && usersStore.user?.id_fat) {
      options.fats.push(spravStore.srav.sprav_fat[usersStore.user?.id_fat])
   }
   if (spravStore.srav?.sprav_carb && usersStore.user?.id_carb) {
      options.carb.push(spravStore.srav.sprav_carb[usersStore.user?.id_carb])
   }
   
   return (
      <div className="plank">
         <div className="diet">
            <div className="diet__item ">
               <h5 className="_subtitle">Тип диеты</h5>
               {/*<h6 className="diet__type diet__type-type">{dietsType?.label}</h6>*/}
               {options.diet && (
                  <DietInputs type={'diet'} options={options.diet} value={usersStore.user.id_diet}/>)}
            </div>
            <div className="form__row" style={{marginBottom: 0}}>
               <div className="form__row-box">
                  <div className="diet__item">
                     <h5 className="_subtitle">Источник белков</h5>
                     {/*<h6 className="diet__type diet__type-protein">{proteinType?.label}</h6>*/}
                     {options.prot && (
                        <ProteinInputs type={'prot'} options={options.prot} value={usersStore.user.id_protein}/>)}
                  </div>
               </div>
               <div className="form__row-box">
                  <div className="diet__item">
                     <h5 className="_subtitle">Источник жиров</h5>
                     {/*<h6 className="diet__type diet__type-fat">{fatsType?.label}</h6>*/}
                     {options.fats && (
                        <FatsInputs type={'fats'} options={options.fats} value={usersStore.user.id_fat}/>)}
                  </div>
               </div>
               <div className="form__row-box">
                  <div className="diet__item">
                     <h5 className="_subtitle">Источник углеводов</h5>
                     {/*<h6 className="diet__type diet__type-carb">{carbohydratesType?.label}</h6>*/}
                     {options.carb && (
                        <CarbohydratesInputs type={'carb'} options={options.carb} value={usersStore.user.id_carb}/>)}
                  </div>
               </div>
            </div>
            
            <div className="diet__item">
               <h5 className="_subtitle">Ограничение потребления ккал</h5>
               <h6 className="diet__type diet__type-carb">{limitingKcal}</h6>
            </div>
            {calc?.calc?.target_time && (
               <div className="diet__item">
                  <h5 className="_subtitle">Скорость достижения цели</h5>
                  <h6 className="diet__type diet__type-carb">{speed}</h6>
               </div>
            )}
            <div className="form__buttons " style={{paddingTop: 0}}>
               <button type="button" onClick={dashboardHide} className="_btn _sub-btn _grey-btn">Изменить Цель</button>
               <button type="button" onClick={goToSetSelection}
                       className="form__button _btn _main-btn _orange-btn">Перейти к Настройке Продуктовой Корзины
               </button>
            </div>
         </div>
      </div>
   );
}

export default observer(DietTypeDashboard);