import React, {useRef, useState} from 'react';
import {bool, func} from 'prop-types';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {useTitleStyles} from "@/hooks/useTitleStyles";
import {Transition} from "@/components/feature/modals/Transition/Transition.jsx";
import {input_add_error, input_focus_add, input_focus_remove, input_remove_error} from "@scripts/inputsInit";
import usersStore from "@/store/user-store";

InfoPersonalDialog.propTypes = {
   open: bool,
   isSuccess: bool,
   isPassUpdate: bool,
   changeDialog: func
};

const handleOnFocusInput = ({target}) => {
   input_focus_add(target)
   input_remove_error(target)
}
const handleOnBlurInput = ({target}) => {
   if (!target.value) {
      input_focus_remove(target)
   }
}

function InfoPersonalDialog({open, changeDialog, isSuccess, isPassUpdate, newPass}) {
   const {user, updatePass} = usersStore
   const titleStyles = useTitleStyles();
   const infoPopupTextWarning = `Неизвестная ошибка, проверьте связь с интернетом и повторите попытку.`;
   const infoPopupTextSuccess = `Данные успешно сохранены.`;
   const refInput = useRef()
   const [code, setCode] = useState('');
   const handleOnChangeKod = (e) => setCode(e.target.value);
   
   
   const handleOnClick = () => {
      if (isPassUpdate) {
         if (code !== user.code) {
            input_add_error(refInput.current)
         } else {
            updatePass(newPass, 0)
            changeDialog()
   
         }
      } else {
         changeDialog()
      }
    
      
   }
   return (
      <>
         <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={changeDialog}
            style={{zIndex: 3147483645}}
         >
            <DialogTitle classes={{root: titleStyles.h5}} style={{textAlign: "center"}} disableTypography>
               {isSuccess ? infoPopupTextSuccess : 'Неизвестная ошибка'}
               <hr style={{display: "block", width: '100%', height: 1, background: '#E9E9E9', marginTop: 20}}/>
            </DialogTitle>
            
            <DialogContent style={{marginBottom: 12, padding: '0 12', overflowY: 'initial', textAlign: "center"}}>
               <DialogContentText>
                  {isSuccess ?
                     isPassUpdate
                        ? 'В целях безопасности, на Email Вашей учетной записи отправлено подтверждение этого изменения.'
                        : `${infoPopupTextSuccess}`
                     : infoPopupTextWarning}
               </DialogContentText>
            </DialogContent>
            <DialogContent style={{marginBottom: 0, padding: '0 12px', textAlign: "center"}}>
               <form
                  className="form _center _w400" action='#'>
                  {isSuccess && isPassUpdate && (
                     <div className="form__item">
                        <label className="form__subtitle">Код</label>
                        <div className="form__input-container">
                           <input data-error="Пожалуйста, заполните поле"
                                  className="form__input input"
                                  type="number"
                                  name="name"
                                  ref={refInput}
                                  value={code}
                                  onChange={handleOnChangeKod}
                                  onFocus={handleOnFocusInput}
                                  onBlur={handleOnBlurInput}
                           />
                           <span className='form__input-span'>напр. 123456</span>
                        </div>
                     </div>
                  )}
                  <div className="form__buttons ">
                     <button type="button" className="form__button _btn _main-btn _orange-btn " style={{margin: "auto"}}
                             onClick={handleOnClick}>Продолжить
                     </button>
                  </div>
               </form>
            </DialogContent>
         </Dialog>
      </>
   );
}

export default InfoPersonalDialog;