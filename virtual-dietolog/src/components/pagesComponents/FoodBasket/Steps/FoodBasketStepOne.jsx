import React, {useEffect, useState} from 'react';
import {array, func, number} from 'prop-types';
import {observer} from "mobx-react-lite";
import foodBasketStore from "@store/food-basket-store";
import TabsLabel from "@/components/pagesComponents/FoodBasket/TabsLabel/TabsLabel.jsx";
import TabBody from "@/components/pagesComponents/FoodBasket/TabBodys/TabBody.jsx";
import SearchInput from "@/components/feature/inputs/SearchInput.jsx";
import FoodBasketDialog from "@/components/feature/modals/FoodBasketDialog.jsx";
import exceptionGroupStore from "@store/exception-group-store";

FoodBasketStepOne.propTypes = {
   currentStepId: number,
   changeStep: func,
   steps: array
};

function FoodBasketStepOne({currentStepId, steps, changeStep}) {
   const {inProgress} = steps.find(item => item.id === currentStepId)
   const {basket} = foodBasketStore;
   const {groups, delGroup, groupsLength} = exceptionGroupStore;
   
   const [tabIndex, setTabIndex] = useState(null);
   const handleOnChangeTab = id => {
      Object.values(groups).findIndex(item => item.id == id)
      setSearchValue('')
      setTabIndex(Number(id))
   }
   
   const [searchValue, setSearchValue] = useState('');
   const handleOnSearchValue = value => setSearchValue(value)
   
   const [isAddGroup, setIsAddGroup] = useState(false);
   const handleOnChangeIsAddGroup = (bool) => setIsAddGroup(bool)
   
   const [isEditName, setIsEditName] = useState(false);
   
   const [unacceptedName, setUnacceptedName] = useState('');
   
   const [openDialog, setOpenDialog] = useState(false);
   const handleOnChangeDialog = () => setOpenDialog(prev => !prev)
   
   const [groupName, setGroupName] = useState('');
   const handleOnChangeGroupName = value => setGroupName(value)
   
   const handleOnDelGroupBasket = idGroup => {
      delGroup(idGroup)
         .then(res => {
            if (res.ok) {
               for (let key in groups) {
                  if (Number(groups[key].id) === Number(idGroup)) {
                     setTabIndex(null)
                  }
               }
            }
         })
   }
   
   const handleOnEditGroupBasket = (idGroup) => {
      const {name} = Object.values(groups).find(item => Number(item.id) == Number(idGroup))
      handleOnChangeTab(idGroup)
      setOpenDialog(true)
      setGroupName(name)
      setIsAddGroup(true)
      setIsEditName(true)
   }
   useEffect(() => {
      if (groups) {
         for (let key in groups) {
            if (Number(groups[key].id) === Number(tabIndex)) {
               setUnacceptedName(groups[key].name)
            }
         }
      }
      setSearchValue('')
   }, [openDialog]);
   useEffect(() => {
      if (groupsLength === 1) {
         const index = Object.values(groups)[groupsLength - 1].id
         setTabIndex(Number(index))
      }
   }, [groupsLength]);
   useEffect(() => {
      if (!tabIndex && groups) {
         const index = Object.values(groups)[0].id
         setTabIndex(Number(index))
      }
   });
   
   if (inProgress) {
      return (
         <>
            <h3 className='_title-h3'>Исключение продуктов по параметрам</h3>
            <div className="tabs">
               <ul className="tabs__header">
                  <TabsLabel tabIndex={tabIndex} changeTab={handleOnChangeTab}
                             changeDialog={handleOnChangeDialog}
                             changeIsAddGroup={handleOnChangeIsAddGroup}
                             delGroup={handleOnDelGroupBasket} editGroup={handleOnEditGroupBasket}/>
               </ul>
               <SearchInput value={searchValue} changeValue={handleOnSearchValue}/>
               <div className="tabs__body" style={{
                  width: `${basket.length}00%`,
                  transform: `translateX(-${(groups && Object.values(groups).findIndex(item => item.id == tabIndex)) / basket.length * 100}%)`
               }}>
                  {basket.map(basket => {
                     return (
                        <TabBody key={basket.id} changeOpenDialog={handleOnChangeDialog} searchValue={searchValue}
                                 basketId={basket.id}/>
                     )
                  })}
               </div>
            </div>
            <FoodBasketDialog open={openDialog} changeDialog={handleOnChangeDialog}
                              tabIndex={tabIndex}
                              changeTabIndex={handleOnChangeTab}
                              unacceptedName={unacceptedName}
                              isAddGroup={isAddGroup}
                              isEditName={isEditName}
                              changeIsAddGroup={handleOnChangeIsAddGroup}
                              currentStepId={currentStepId}
                              changeStep={changeStep}
                              groupName={groupName}
                              changeGroupName={handleOnChangeGroupName}
            />
         
         </>
      );
   }
   
}

export default observer(FoodBasketStepOne);
