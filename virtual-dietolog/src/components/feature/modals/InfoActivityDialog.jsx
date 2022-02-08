import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {useTitleStyles} from "@/hooks/useTitleStyles";
import {Transition} from "@/components/feature/modals/Transition/Transition.jsx";
import moment from "moment";

InfoActivityDialog.propTypes = {};

function InfoActivityDialog({open, changeDialog}) {
   const infoPopupText = <span>Выбор события возможен только с сегодняшней даты - <strong >{moment().format('DD.MM.YYYY')}</strong></span>
   const titleStyles = useTitleStyles();
   return (
      <>
         <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => changeDialog()}
         >
            <DialogTitle classes={{root: titleStyles.h5}} style={{textAlign: "center"}} disableTypography>
               Выбранная не правильная дата
               <hr style={{display: "block", width: '100%', height: 1, background: '#E9E9E9', marginTop: 20}}/>
            </DialogTitle>
            
            <DialogContent style={{textAlign: "center"}}>
               <DialogContentText>
                  {infoPopupText}
               </DialogContentText>
            </DialogContent>
            <DialogContent style={{marginBottom: 0, padding: 0, overflowY: 'initial', margin: "auto"}}>
               <div className="form__buttons">
                  <button type="button" className="form__button _btn _main-btn _orange-btn " onClick={() => changeDialog()}>
                     Продолжить
                  </button>
               </div>
            </DialogContent>
         </Dialog>
      </>
   );
}

export default InfoActivityDialog;