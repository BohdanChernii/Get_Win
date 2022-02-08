import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import AddFilesDialog from "@/components/feature/modals/AddFilesDialog.jsx";
import DelIcon from '@img/icons/trash.svg'
import {array, func, number} from "prop-types";
import analysesStore from "@store/analyses-store";
import moment from "moment";

FoodBasketStepTwo.propTypes = {
   currentStepId: number,
   changeStep: func,
   steps: array
};

function FoodBasketStepTwo({steps, changeStep, currentStepId,}) {
   const {inProgress} = steps.find(item => item.id === currentStepId)
   const {analyses, delAnalyses} = analysesStore;
   const handleOnClickGoBack = () => changeStep(currentStepId - 2)
   const handleOnNextStep = () => {
      changeStep(currentStepId)
      document.cookie = `isDoneFoodBasket=true;`
   }
  
   // openDialog ============================================================
   const [openDialog, setOpenDialog] = useState(false);
   const handleOnChangeDialog = () => setOpenDialog(prev => !prev)
   // files ============================================================

   if (inProgress) {
      return (
         <>
            <h3 className='_title-h3' style={{marginBottom: 24}}>Анализы</h3>
            <div className='steps-container'>
               <form className='form'>
                  <div className="form__item">
                     <div className='_flex-row_space-between'>
                        <p>Загрузите файлы с результатами анализов.</p>
                        <div className='form__buttons'>
                           {analyses && analyses.length === 0 && (
                              <button type="button" className="form__button _btn _main-btn _grey-btn"
                                      onClick={handleOnNextStep}>
                                 Пропустить
                              </button>
                           )}
                           <button type="button" className="form__button _btn _main-btn _orange-btn"
                                   onClick={handleOnChangeDialog}>
                              Загрузить Файлы
                           </button>
                        </div>
                     </div>
                  </div>
                  {analyses && analyses.map(file => {
                     const time = file.date.split('.').reverse().join('-')
                     const momentTime = moment(new Date(time)).format('DD MMMM YYYY')
                     return (
                        <div key={file.fname} className="plank" style={{maxWidth: 530, padding: 16, borderRadius: 10}}>
                           <div className="_flex-row_space-between" style={{marginBottom: 12}}>
                              <p className='_subtitle' style={{margin: 0}}>{file.name}</p>
         
                              <a href={file.filename} target='_blank' className='_orange'
                                 style={{fontWeight: 600, fontSize: 14}}>
                                 Смотреть результат</a>
                           </div>
                           <div className="_flex-row_space-between">
                              <p className='form__label _font14' style={{color: '#686A7C'}}>{momentTime}</p>
                              <img style={{width: 16, cursor: "pointer"}} src={DelIcon} alt="del"
                                   onClick={() => {
                                      console.log(file.fname)
                                      delAnalyses(file.fname)
            
                                   }}/>
                           </div>
                        </div>
                     )
                  })}
                  <div className="form__buttons">
                     <button type="reset" onClick={handleOnClickGoBack}
                             className="form__button _btn _main-btn _grey-btn">Вернуться Назад
                     </button>
                     <button type="button"
                             onClick={handleOnNextStep}
                             className="form__button _btn _main-btn _orange-btn ">Сохранить и Продолжить
                     </button>
                  </div>
               </form>
            </div>
            <AddFilesDialog open={openDialog} changeDialog={handleOnChangeDialog} />
         </>
      );
   }
}

export default observer(FoodBasketStepTwo);