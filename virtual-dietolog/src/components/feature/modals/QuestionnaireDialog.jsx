import React from 'react';
import {observer} from "mobx-react-lite";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useButtonStyles} from "@/hooks/useButtonStyles";
import {useTitleStyles} from "@/hooks/useTitleStyles";
import {TippyHowItCounts} from "@/components/feature/tippy/Tippys.jsx";
import {useHistory} from "react-router-dom";
import userStore from "@store/user-store";
import calcStore from "@store/calc-store";
import {Transition} from "@/components/feature/modals/Transition/Transition.jsx";

function QuestionnaireDialog({userWeight, open, changeDialog}) {
   const {calc} = calcStore
   const imt = Math.floor(calc && calc?.imt);
   const minNorm = Math.floor(calc && calc?.weight_min_norm);
   const maxNorm = Math.floor(calc && calc?.weight_max_norm);
   const diagnosis = calc && calc?.imt_diagnoz;
   
   const titleStyles = useTitleStyles();
   const history = useHistory()
   
   const handleGoToTarget = () => {
      history.push('/target')
      // updateUser()
   };
   
   return (
      <>
         <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={changeDialog}
         >
            <DialogTitle classes={{root: titleStyles.h3}} disableTypography>{"Итог"}
               <hr style={{display: "block", width: '100%', height: 1, background: '#E9E9E9', marginTop: 20}}/>
            </DialogTitle>
            
            <DialogContent style={{width: 600,overflowY: 'initial',}}>
               <DialogContentText style={{fontWeight: 600}} id="alert-dialog-slide-description">
                  Ваш текущий вес:
                  <strong style={{color: '#404040', fontSize: '24px', fontWeight: 500}}> {userWeight} кг</strong>
               </DialogContentText>
            
            </DialogContent>
            
            <DialogContent style={{width: 600,marginBottom: 24, overflowY: 'initial',}}>
               <DialogContentText style={{fontWeight: 600}} id="alert-dialog-slide-description">
                  Ваш Индекс массы тела: <strong
                  style={{color: '#404040', fontSize: '24px', fontWeight: 500}}
               >{imt} (норма {minNorm} - {maxNorm} кг)</strong>
                  <span style={{color: '#D22513', display: 'block'}}>{diagnosis}</span>
               </DialogContentText>
               <TippyHowItCounts>
                  <button type="reset" className=" _btn _main-btn _grey-btn">Как считается</button>
               </TippyHowItCounts>
            </DialogContent>
            
            
            <DialogContent style={{width: 600,marginBottom: 24, overflowY: 'initial',}}>
               <DialogContentText style={{fontWeight: 600}} id="alert-dialog-slide-description">
                  Ваш нормальный вес находится в диапазоне: <strong
                  style={{color: '#404040', fontSize: '24px', fontWeight: 500}}> {`${minNorm} - ${maxNorm}`} кг</strong>
               </DialogContentText>
               <TippyHowItCounts>
                  <button type="reset" className=" _btn _main-btn _grey-btn">Как считается</button>
               </TippyHowItCounts>
            </DialogContent>
            
            <DialogContent style={{width: 600,marginBottom: 24, overflowY: 'initial',}}>
               <DialogContentText id="alert-dialog-slide-description">
                  <strong style={{color: '#404040'}}>Идеальный вес</strong> - это такой вес в рамках нормального, при
                  котором ваша фигура будет выглядеть стройной и красивой. Конечно, при хорошо развитой мускулатуре
                  фигура выглядит идеальной и при гораздо больших значениях веса.
               </DialogContentText>
            </DialogContent>
            <DialogContent style={{width: 600,overflowY: 'initial', marginBottom: '16px'}}>
               <div className="form__buttons">
                  <button type='button' className="form__button _btn-reset _btn _main-btn _grey-btn"
                          onClick={changeDialog}>Отменить
                  </button>
                  <button type="button" className="form__button _btn _main-btn _orange-btn "
                          onClick={handleGoToTarget}>Сохранить
                  </button>
               </div>
               {/*<div style={{}} className="_flex-row_start">*/}
               {/*   <Button classes={{root: buttonStyles.mainGray}} >*/}
               {/*      Закрить*/}
               {/*   </Button>*/}
               {/*   <Button classes={{root: buttonStyles.mainOrange}} >*/}
               {/*      Перейти к Цели*/}
               {/*   </Button>*/}
               {/*</div>*/}
            </DialogContent>
         </Dialog>
      </>
   );
}

export default observer(QuestionnaireDialog)
