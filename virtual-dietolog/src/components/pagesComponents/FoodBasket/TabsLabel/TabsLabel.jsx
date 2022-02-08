import React from 'react';
import {func, number} from 'prop-types';
import plus from "@img/icons/big-plus.svg";
import {observer} from "mobx-react-lite";
import exceptionGroupStore from "@store/exception-group-store";
import {TippyBasket} from "@/components/feature/tippy/Tippys.jsx";
import verticalDots from "@img/icons/more-vertical.svg";

TabsLabel.propTypes = {
   tabIndex: number,
   changeTab: func,
   changeDialog: func,
   editGroup: func,
   delGroup: func,
   changeIsAddGroup: func,
};

function TabsLabel({tabIndex, changeTab, changeDialog, changeIsAddGroup, editGroup, delGroup}) {
   const {groups} = exceptionGroupStore
   return (
      <>
         {groups && Object.values({...groups}).map(group => {
            return (
               <li key={group.id} className='tabs__item'>
                  <p className={`tabs__name ${Number(tabIndex) === Number(group.id) ? 'active' : ''}`}
                     onClick={() => changeTab(Number(group.id))}>
                     {group.name}
                  </p>
                  {Number(group.is_default) === 0 &&
                  <TippyBasket editGroup={editGroup} idGroup={group.id} delGroup={delGroup}>
                     <div className="dot-spoilers__dots" style={{marginLeft: 5}}>
                        <img className='dot-spoilers__img' src={verticalDots} alt="dots"/>
                     </div>
                  </TippyBasket>}
               </li>
            )
         })}
         <li className='tabs__item'>
            <p className='tabs__name' onClick={() => {
               changeIsAddGroup(true)
               changeDialog()
            }}>
               <img src={plus} alt="plus" style={{marginRight: 11}}/>
               Создать группу исключенных продуктов
            </p>
         
         </li>
      </>
   );
}


export default observer(TabsLabel);