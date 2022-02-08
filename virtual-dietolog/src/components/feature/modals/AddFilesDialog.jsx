import React, {useCallback, useState} from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import {useTitleStyles} from "@/hooks/useTitleStyles";
import {bool, func} from "prop-types";
import {input_focus_add, input_focus_remove, input_remove_error} from "@scripts/inputsInit";
import RegularDateInput from "@/components/feature/inputs/RegularDateInput.jsx";
import moment from "moment";
import {Transition} from "@/components/feature/modals/Transition/Transition.jsx";
import analysesStore from "@store/analyses-store";


const handleOnBlurInput = (e) => !e.target.value ? input_focus_remove(e.target) : null
const handleOnFocusInput = (e) => {
   input_focus_add(e.target)
   input_remove_error(e.target)
}

AddFilesDialog.propTypes = {
   open: bool,
   changeDialog: func,
};

function AddFilesDialog({open, changeDialog}) {
   const titleStyles = useTitleStyles();
   const {uploadAnalyses} = analysesStore
   moment.locale('ru')
   const handleOnReset = () => {
      changeDialog()
      setTimeout(() => {
         setIsFileError(false)
         setFileStore(null)
         setNameFile({
            name: '',
            isError: false
         });
         setDate({
            date: null,
            isError: false,
         })
      }, 500)
   }
   const handleOnSubmit = (e) => {
      console.log('upload here')
      e.preventDefault()
      handleOnReset()
   }
   
   const [isFileError, setIsFileError] = useState(false);
   // fileStore ======================================================
   const [fileStore, setFileStore] = useState(null);
   const handleOnChangeFiles = (e) => {
      e.preventDefault()
      const file = e.target.files[0]
      if (file) {
         isFileError && setIsFileError(false)
         
         if (!['application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
         ].includes(file.type)) {
            setIsFileError(true)
            e.target.value = '';
            return;
         }
         const data = new FormData()
         data.append('file', file)
         setFileStore(file);
      }
   }
   // nameFile ======================================================
   const [nameFile, setNameFile] = useState({
      name: '',
      isError: false
   });
   
   // date ======================================================
   const [date, setDate] = useState({
      date: null,
      isError: false,
   });
   
   const handleOnChangeDate = (date) => {
      
      console.log(moment(new Date(date)).format('YYYY-MM-DD'))
      setDate({
         date: date,
         isError: false,
      })
   }
   
   // SendFile ======================================================
   const handleOnSendFile = useCallback(async () => {
      if (typeof fileStore === 'object' && fileStore !== null) {
         if (nameFile.name && date.date) {
            handleOnReset()
            const name = nameFile.name;
            const data = new FormData();
            data.append('file', fileStore)
            const time = moment(date.date).format('YYYY-MM-DD')
            await uploadAnalyses(name, time, data)
         }
         if (!nameFile.name) setNameFile(prev => ({...prev, isError: true}))
         if (!date.date) setDate(prev => ({...prev, isError: true}))
      }
   });
   return (
      <Dialog
         open={open}
         TransitionComponent={Transition}
         keepMounted
         onClose={handleOnReset}
      >
         <DialogTitle
            classes={{root: titleStyles.h5}} disableTypography>
            Загрузите анализы
            <hr style={{display: "block", width: '100%', height: 1, background: '#E9E9E9', marginTop: 24}}/>
         </DialogTitle>
         <DialogContent style={{width: 500, minHeight: 100}}>
            <form className="form" onReset={handleOnReset} onSubmit={handleOnSubmit}>
               <div className="form__item">
                  <label style={{color: '#686A7C'}} className={`form__label ${isFileError ? '_error' : ''}`}>
                     {!fileStore && 'Разрешенные форматы: pdf, doc, docx.'}
                     {fileStore && fileStore.name}
                  </label>
               
               </div>
               <div className="form__item">
                  {fileStore && (
                     <div className='form__row'>
                        <div className="form__row-box" style={{flex: '1 0 auto'}}>
                           {!nameFile.isError && <h6 className="form__subtitle">Название анализа</h6>}
                           {nameFile.isError && <h6 className="form__subtitle _error">Ввведите название анализа</h6>}
                           <div className="form__input-container">
                              <input
                                 style={{height: 32}}
                                 data-error="Пожалуйста, заполните поле"
                                 className="form__input input"
                                 type="text"
                                 name="group-name"
                                 value={nameFile.name}
                                 onChange={(e) => setNameFile({
                                    name: e.target.value,
                                    isError: false
                                 })}
                                 onFocus={handleOnFocusInput}
                                 onBlur={handleOnBlurInput}
                              />
                              <span className='form__input-span'>Введите название анализа</span>
                           </div>
                        </div>
                        <div className="form__row-box " style={{flex: '1 0 auto'}}>
                           {!date.isError && <h6 className="form__subtitle">Дата анализа</h6>}
                           {date.isError && <h6 className="form__subtitle _error">Введите дату анализа</h6>}
                           <RegularDateInput value={date.date} isError={date.isError} changeDate={handleOnChangeDate}/>
                        </div>
                     </div>
                  )}
               </div>
               <div className="form__buttons">
                  <button type="reset" className="form__button _btn _main-btn _grey-btn">Отменить</button>
                  <button type="button" className="form__button _btn _main-btn _orange-btn"
                          onClick={handleOnSendFile}>
                     {fileStore ? "Продолжить" : "Загрузить Файл"}
                     {!fileStore && (
                        <input id="formDoc"
                               accept=".pdf, .doc, .docx"
                               type="file"
                               name="image"
                               title=""
                               className="file__input"
                               onChange={handleOnChangeFiles}
                        />
                     )}
                  </button>
               </div>
            </form>
         </DialogContent>
      </Dialog>);
}

export default AddFilesDialog;