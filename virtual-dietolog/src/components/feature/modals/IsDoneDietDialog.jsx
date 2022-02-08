import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import {Transition} from "@/components/feature/modals/Transition/Transition.jsx";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {useTitleStyles} from "@/hooks/useTitleStyles";

IsDoneDietDialog.propTypes = {};

function IsDoneDietDialog({changeIsDoneDiet, isDoneDiet}) {
   const titleStyles = useTitleStyles();
   
   return (
      <Dialog
         open={isDoneDiet}
         TransitionComponent={Transition}
         keepMounted
         onClose={changeIsDoneDiet}
      >
         <DialogTitle
            classes={{root: titleStyles.h5}} disableTypography>
            Готово!
            <hr style={{display: "block", width: '100%', height: 1, background: '#E9E9E9', marginTop: 24}}/>
         </DialogTitle>
         <DialogContent>
            <p>Ваша персональная программа питания успешно сформирована!</p>
         </DialogContent>
         <DialogContent>
            <div className="form__buttons" >
               <button type="button"
                       onClick={() => changeIsDoneDiet()}
                       className="form__button _btn _main-btn _orange-btn">Продолжить
               </button>
            </div>
         </DialogContent>
      </Dialog>);
}

export default IsDoneDietDialog;