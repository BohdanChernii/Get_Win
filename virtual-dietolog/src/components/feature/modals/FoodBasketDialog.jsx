import React, {useRef} from 'react';
import {observer} from "mobx-react-lite";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import {useTitleStyles} from "@/hooks/useTitleStyles";
import {bool, func, number, string} from "prop-types";
import UnacceptedGroupProducts
   from "@/components/pagesComponents/FoodBasket/UnacceptedGroupProducts/UnacceptedGroupProducts,.jsx";
import {Transition} from "@/components/feature/modals/Transition/Transition.jsx";
import AddGroupInput from "@/components/feature/inputs/AddGroupInput.jsx";
import exceptionGroupStore from "@store/exception-group-store";
import foodBasketStore from "@store/food-basket-store";

FoodBasketDialog.propTypes = {
   open: bool,
   changeDialog: func,
   tabIndex: number,
   changeTabIndex: func,
   unacceptedName: string,
   isAddGroup: bool,
   isEditName: bool,
   changeIsAddGroup: func,
   changeStep: func,
   currentStepId: number,
   groupName: string,
   changeGroupName: func,
   
   
};

const styleDialogContent = {maxWidth: 460, minHeight: 100, maxHeight: 500, position: "relative", marginBottom: 50}

function FoodBasketDialog(props) {
   const {
      open,
      changeDialog,
      tabIndex,
      changeTabIndex,
      unacceptedName,
      isAddGroup,
      changeIsAddGroup,
      changeStep,
      currentStepId,
      groupName,
      changeGroupName,
      isEditName,
   } = props
   const {addGroups, groups, editGroup, groupsLength, fetchGroups, editGroupName} = exceptionGroupStore
   const {fetchProduct} = foodBasketStore
   const titleStyles = useTitleStyles();
   const dialogContentRef = useRef(null);
   const boxWhiteShadowRef = useRef(null);
   
   if (dialogContentRef.current?.offsetHeight >= 500) {
      boxWhiteShadowRef.current?.classList.add('active')
   } else boxWhiteShadowRef.current?.classList.remove('active')
   
   
   const handleOnReset = () => {
      
      changeDialog()
      setTimeout(() => {
         changeIsAddGroup(false)
         changeGroupName('')
      }, 300)
      dialogContentRef.current?.scrollTo({
         top: 0,
         behavior: "smooth"
      })
   }
   const handleOnSubmit = async (e) => {
      e.preventDefault()
      handleOnReset()
      window.scrollTo({
         top: 0,
         behavior: "smooth"
      });
      if (isAddGroup) {
         if (isEditName) {
            const {id} = Object.values(groups).find(item => Number(item.id) === Number(tabIndex))
            await editGroupName(id, groupName)
               .then(async res => {
                  if (res.ok) {
                     await fetchGroups()
                     await fetchProduct()
                  }
               })
         } else {
            await addGroups(groupName)
               .then(async res => {
                  if (res.ok) {
                     await fetchGroups()
                     await fetchProduct()
                  }
               })
         }
      } else {
         const arrGroups = Object.values(groups)
         const idTab = arrGroups.findIndex(item => Number(item.id) === Number(tabIndex)) + 1
         if (arrGroups[idTab]) {
            changeTabIndex(Number(arrGroups[idTab].id))
         } else {
            const index = arrGroups[0].id
            changeTabIndex(Number(index))
            changeStep(currentStepId)
         }
         editGroup(tabIndex)
      }
   }
   const handleOnScrollDialog = (e) => {
      const scrollHeight = e.target.scrollHeight;
      const scrollTop = e.target.scrollTop;
      const offsetHeight = e.target.offsetHeight;
      
      if (offsetHeight === 0) {
         !boxWhiteShadowRef.current?.classList.contains('active') && boxWhiteShadowRef.current?.classList.add('active')
      }
      if (scrollTop === scrollHeight - offsetHeight) {
         boxWhiteShadowRef.current?.classList.contains('active') && boxWhiteShadowRef.current?.classList.remove('active')
      } else {
         !boxWhiteShadowRef.current?.classList.contains('active') && boxWhiteShadowRef.current?.classList.add('active')
      }
   }
   
   
   return (
      <Dialog
         open={open}
         TransitionComponent={Transition}
         keepMounted
         onClose={handleOnReset}
      >
         <DialogTitle
            classes={{root: titleStyles.h5}} disableTypography style={{maxWidth: 460, zIndex: 20}}>
            {isAddGroup
               ? isEditName ? 'Изменить группу исключенных продуктов' : 'Создать группу исключенных продуктов'
               : `Вы действительно желаете исключить следующие продукты из рациона питания и переместить их в группу
               "${unacceptedName}"`}
            
            
            <hr style={{display: "block", width: '100%', height: 1, background: '#E9E9E9', marginTop: 24}}/>
         </DialogTitle>
         <DialogContent ref={dialogContentRef} style={styleDialogContent}
                        onScroll={handleOnScrollDialog}>
            <form className="form">
               {isAddGroup
                  ? <AddGroupInput value={groupName} changeValue={changeGroupName}/>
                  : <UnacceptedGroupProducts tabIndex={Number(tabIndex)}/>}
            
            </form>
         </DialogContent>
         <div ref={boxWhiteShadowRef} className="_box-white-shadow">
            <div className="form__buttons form__buttons-absolute">
               <button type="reset"
                       onClick={handleOnReset}
                       className="form__button _btn _main-btn _grey-btn">
                  {isAddGroup
                     ? 'Отменить'
                     : 'Внести Изменения'}
               </button>
               
               <button type="button" onClick={handleOnSubmit}
                       className="form__button _btn _main-btn _orange-btn">Подтвердить
               </button>
            </div>
         </div>
      </Dialog>);
}

export default observer(FoodBasketDialog);