import React, {useEffect, useState} from 'react';
import {array, func, number} from 'prop-types';
import {observer} from "mobx-react-lite";
import CurrentMode from "@/components/pagesComponents/Target/Modes/CurrentMode.jsx";
import {TippyCurrentMode} from "@/components/feature/tippy/Tippys.jsx";
import InfoIcon from "@img/icons/info-icon.svg";
import BoostMode from "@/components/pagesComponents/Target/Modes/BoostMode.jsx";
import PersonalMode from "@/components/pagesComponents/Target/Modes/PersonalMode.jsx";
import calcStore from "@store/calc-store";
import usersStore from "@store/user-store";

TargetStepFour.propTypes = {
   changeStep: func,
   doneTargetInfo: func,
   currentStepId: number,
   steps: array,
};

function TargetStepFour({changeStep, currentStepId, steps, doneTargetInfo}) {
   const {calc, fetchCalc} = calcStore;
   const {token} = usersStore;
   const handleOnClickGoBack = () => changeStep(currentStepId - 2);
   const {inProgress} = steps.find(item => item.id === currentStepId);
   const {updateUser} = usersStore;
   const [mounted, setMounted] = useState(false);
   // Submit ===========================================================================
   const handleOnSubmitForm = (e) => {
      e.preventDefault();
      changeStep(currentStepId);
      doneTargetInfo();
      // updateUser();
      document.cookie = `isDoneTarget=true;`
   };
   // limitation ===========================================================================
   const [limitation, setLimitation] = useState({
      cal_min: 0,
      cal_max: 0,
   });
   const timeMin = calc ? calc?.calc.target_time.min : 0;
   const timeMax = calc ? calc?.calc.target_time.max : 0;
   
   const handleOnChangeLimitation = (e) => {
      if (mode.personal) {
         const value = e.target.value
         const name = e.target.name
         setLimitation(prev => ({
            ...prev,
            [name]: Math.floor(value)
         }))
      }
   };
   const checkValueLimitation = (e) => {
      if (mode.personal) {
         let value = e.target.value
         const name = e.target.name
         value = value < 1200 ? 1200 : value
         setLimitation(prev => ({
            ...prev,
            [name]: Math.floor(value)
         }))
      }
   };
   
   // mode ===========================================================================
   const [mode, setMode] = useState({
      current: true,
      boost: false,
      personal: false,
   });
   const handleOnChangeMode = name => {
      setMode(prevState => {
         for (let modeKey in mode) mode[modeKey] = false;
         prevState[name] = true;
         return {...prevState}
      })
   }
   // boostModeList ===========================================================================
   const [boostModeList, setBoostModeList] = useState([
      {id: 1, name: '10%', value: 1, selected: true},
      {id: 2, name: '15%', value: 2, selected: false},
      {id: 3, name: '20%', value: 3, selected: false},
   ]);
   const handleOnChangeBoostModeList = id => {
      setBoostModeList(prevState => {
         return prevState.map(item => {
            item.selected = false
            if (item.id === id) item.selected = true
            return item
         })
      })
   }
   
   useEffect(() => {
      setMounted(true)
      if (token && mounted) {
         fetchCalc(token)
            .then(res => {
               if (res.ok) {
                  setLimitation({
                     cal_min: Math.floor(calcStore.calc?.limit_cal_min),
                     cal_max: Math.floor(calcStore.calc?.limit_cal_max)
                  })
               }
            })
      }
      return () => {
         setMounted(false)
      }
   }, [token])
   
   useEffect(() => {
      if (limitation.cal_min && limitation.cal_max) {
         calcStore.editCalc(limitation.cal_min, limitation.cal_max)
      }
   }, [limitation])
   
   useEffect(() => {
      if (mode.current) {
         let cal_min = calcStore.calc ? calcStore.calc.limit_cal_min : 0;
         let cal_max = calcStore.calc ? calcStore.calc.limit_cal_max : 0;
         setLimitation({cal_min: Math.floor(cal_min), cal_max: Math.floor(cal_max)})
      }
      if (mode.boost) {
         const percent = boostModeList.find(item => item.selected).name
         const percentValue = percent.replace('%', '') / 100
         let cal_min = calcStore.calc?.limit_cal_min - (calcStore.calc?.limit_cal_min * percentValue)
         let cal_max = calcStore.calc?.limit_cal_max - (calcStore.calc?.limit_cal_max * percentValue)
         cal_min = cal_min < 1200 ? 1200 : cal_min
         setLimitation({cal_min: Math.floor(cal_min), cal_max: Math.floor(cal_max)})
      }
   }, [mode, boostModeList])
   if (inProgress) {
      return (
         <form
            className="form" action="#"
            onSubmit={handleOnSubmitForm}>
            <div className="form__item">
               <div className="_flex-row_center">
                  <label className="_subtitle" style={{margin: 0}}>Выбор режима достижения цели</label>
                  <TippyCurrentMode>
                     <img style={{marginLeft: 5, width: 18, height: 18,}} src={InfoIcon} alt="info-icon"/>
                  </TippyCurrentMode>
               </div>
               
               <CurrentMode mode={mode.current} changeMode={handleOnChangeMode}/>
               
               <BoostMode
                  mode={mode.boost}
                  changeMode={handleOnChangeMode}
                  boostModeList={boostModeList}
                  changeBoostModeList={handleOnChangeBoostModeList}
               />
               
               <PersonalMode mode={mode.personal} changeMode={handleOnChangeMode}/>
            
            </div>
            
            <div className="form__item" style={{pointerEvents: `${mode.personal ? 'auto' : 'none'}`}}>
               <label className="_subtitle" style={{marginBottom: 16}}>Ограничение Ккал</label>
               <div className="form__row" style={{margin: '0 -12px'}}>
                  <div className="form__row__box" style={{margin: '0 12px'}}>
                     <label className="form__subtitle">Ограничение от</label>
                     <input className='form__input input'
                            type="number" name="limitationFrom"
                            style={{width: 168}}
                            name='cal_min'
                            min={calcStore.calc?.cal_min}
                            value={limitation.cal_min}
                            onBlur={checkValueLimitation}
                            onChange={handleOnChangeLimitation}/>
                  </div>
                  
                  <div className="form__row__box" style={{margin: '0 12px',}}>
                     <label className="form__subtitle">Ограничение до</label>
                     <input className='form__input input'
                            type="number" name="limitationTo"
                            style={{width: 168}}
                            name='cal_max'
                            min={calcStore.calc?.cal_min}
                            value={limitation.cal_max}
                            onBlur={checkValueLimitation}
                            onChange={handleOnChangeLimitation}/>
                  </div>
               </div>
            </div>
            {calcStore.calc?.calc?.target_time && (
               <div className="form__item">
                  <label className="_subtitle" style={{marginBottom: 16}}>Срок достижения цели</label>
                  <div className="form__row" style={{margin: '0 -12px'}}>
                     <div className="form__row__box" style={{margin: '0 12px'}}>
                        <label className="form__subtitle">От, мес</label>
                        <p className='form__input input'
                           style={{width: 168}}>{timeMax}</p>
                     </div>
                     <div className="form__row__box" style={{margin: '0 12px'}}>
                        <label className="form__subtitle">До, мес</label>
                        <p className='form__input input'
                           style={{width: 168}}>{timeMin}</p>
                     
                     </div>
                  </div>
               </div>
            )}
            <div className="form__buttons">
               <button type="button" onClick={handleOnClickGoBack}
                       className="form__button _btn _main-btn _grey-btn">Назад
               </button>
               <button type="submit"
                       className="form__button _btn _main-btn _orange-btn ">Сформировать Цель
               </button>
            </div>
         </form>
      );
   } else return <></>
}

export default observer(TargetStepFour);