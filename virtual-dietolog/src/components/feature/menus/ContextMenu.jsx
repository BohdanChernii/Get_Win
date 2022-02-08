import React from 'react';
import arrow from "@img/icons/arrow_bottom-grey.svg";
import user from "@img/icons/user-square.svg";
import service from "@img/icons/service.svg";
import settings from "@img/icons/settings.svg";
import out from "@img/icons/out-doors.svg";
import Tippy from "@tippyjs/react";
import {groupOption} from "@/components/feature/tippy/Tippys.jsx";
import {useHistory} from "react-router-dom";
import permission from "@store/permission";
import {delCookiesByName} from "@scripts/functions";


function TippyContextMenu({children}) {
   const history = useHistory()
   const listLink = [
      {
         id: 1,
         src: user,
         text: 'Мой профиль',
         func: () => {
         },
      },
      {
         id: 2,
         src: service,
         text: 'Служба поддержки ',
         func: () => {
         },
      },
      {
         id: 3,
         src: settings,
         text: 'Настройки',
         func: () => {
         },
      }, {
         id: 4,
         src: out,
         text: 'Выйти',
         func: () => {
            // delCookiesByName('token')
            permission.changePermission()
            history.push('/')
         },
      },
   ]
   
   
   const content = () => (
      <ul className='context-menu'>
         {listLink.map(link => (
            <li key={link.id} className='context-menu__item _flex-row_start' style={{alignItems: 'center'}}>
               <img className='context-menu__img' src={link.src} alt='link'/>
               <p onClick={() => link.func()} className='context-menu__text'>{link.text}</p>
            </li>
         ))}
      </ul>
   )
   return (
      <Tippy {...groupOption} trigger='click' offset={[10, 30]} content={content()}>
         {children}
      </Tippy>
   );
}

function ContextMenu() {
   return (
      <TippyContextMenu>
         <div className='user__logout _flex-row_center'>
            <img style={{width: 16}} src={arrow} alt="arrow"/>
         </div>
      </TippyContextMenu>
   );
   
}

export default ContextMenu;