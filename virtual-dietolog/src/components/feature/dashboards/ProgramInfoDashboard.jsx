import React, {useEffect} from 'react';
import Mount from "@img/icons/mount.svg";
import Salad from "@img/icons/salad.svg";
import target from "@store/target-store";
import usersStore from "@/store/user-store";
import {TippyHowItCounts} from "@/components/feature/tippy/Tippys.jsx";
import calcStore from "@store/calc-store";
import {observer} from "mobx-react-lite";

function ProgramInfoDashboard() {
   const {calc, fetchCalc} = calcStore
   const {user} = usersStore
   
   // weight  ============================================================
   const currentWeight = Math.floor(usersStore.user.weight)
   const targetWeight = Math.floor(usersStore.user.target)
   const differenceWeight = Number(usersStore.user.target) - Number(usersStore.user.weight)
   // programs  ============================================================
   const programName = target.programs.find(item => item.value == usersStore.user.id_program)
   const cal_min = calc?.cal_min ? calc.cal_min : 0
   const cal_max = calc?.cal_max ? calc.cal_max : 0
   
   useEffect(() => {
      if (user.token) {
         fetchCalc(user.token)
      }
   }, [user]);
   
   return (
      <div className="plank">
         <div className="program-info">
            <div className="program-info__name">
               <div className="program-info__text">
                  <h3 className="program-info__main-title">{programName?.label}</h3>
                  <h4 className="program-info__title">Программа</h4>
               </div>
            </div>
            <div className="program__dashboard dashboard">
               <h3 className="dashboard__name">Цель</h3>
               <div className="dashboard__main-info">
                  <div className="dashboard__target">
                     <div className="dashboard__item">
                        <img className="dashboard__icon" src={Mount} alt="mount"/>
                        <p className="dashboard__title">{differenceWeight > 0 ? '+' + differenceWeight : differenceWeight}
                           <span className="dashboard__span-small">кг</span></p>
                     </div>
                     <div className="dashboard__item body-weight">
                        <div className="body-weight__box body-weight__box_current">
                           <h4 className="body-weight__title">{currentWeight} <span
                              className="dashboard__span-normal">кг</span></h4>
                           <p className="body-weight__subtitle">Текущий вес</p>
                        </div>
                        <div className="body-weight__box weight__box_wanted">
                           <h4 className="body-weight__title">{targetWeight} <span
                              className="dashboard__span-normal">кг</span></h4>
                           <p className="body-weight__subtitle">Желаемый вес</p>
                        </div>
                     </div>
                  </div>
                  <div className="dashboard__calories">
                     <div className="dashboard__item">
                        <img className="dashboard__icon" src={Salad} alt="salad"/>
                        <p className="dashboard__title">{cal_min + ' - ' + cal_max}<span
                           className="dashboard__span-small">ккл</span>
                        </p>
                        <p className="dashboard__subtitle">Суточная калорийность</p>
                        <TippyHowItCounts>
                           <button className="dashboard__calculate _btn _sub-btn _grey-btn">Как считается</button>
                        </TippyHowItCounts>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default observer(ProgramInfoDashboard);