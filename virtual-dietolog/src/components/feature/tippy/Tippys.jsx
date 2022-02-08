import React from 'react';
import Tippy from "@tippyjs/react";
import 'tippy.js/dist/tippy.css';
import InfoIcon from "@img/icons/info-icon.svg";
import exceptionGroupStore from "@store/exception-group-store";
import closeOrange from "@img/icons/close_orange.svg";
import pen from "@img/icons/pen.svg";

export const TippyOption = {
   placement: 'bottom',
   hideOnClick: 'true',
   interactive: 'true',
   trigger: 'mouseenter',
   maxWidth: 350,
}
export const eventOption = {
   placement: 'bottom-start',
   animation: 'fade',
   arrow: false,
   duration: [300, 250],
   offset: [0, 3],
   interactive: 'true',
   theme: 'white',
   popperOptions: {
      strategy: 'fixed',
   },
   // showOnCreate: true,
   // trigger: 'click',
   hideOnClick: "toggle"
}
export const groupOption = {
   placement: 'bottom-end',
   animation: 'fade',
   arrow: false,
   duration: [300, 250],
   offset: [0, 3],
   interactive: 'true',
   theme: 'white',
   popperOptions: {
      strategy: 'fixed',
   },
}

export function TippyNumberRegion({regions, changeRegion}) {
   const allRegions = [...regions]
   allRegions.splice(0, 1)
   const content = () => (
      <div className='regions'>
         {allRegions.map((reg, index) => (
            <p style={{padding: ' 2px 7px'}} onClick={changeRegion} key={index}>{reg.toUpperCase()}</p>
         ))}
      </div>
   )
   
   return (
      <Tippy  {...TippyOption} theme='orange' content={content()}>
         <button type='button' className='form__icon _tippy-button '>{regions[0].toUpperCase()}</button>
      </Tippy>
   );
}

export function TippyActivityInfo() {
   const content = () => (
      <div className='tippy-info'>
         <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam dolorem eligendi facilis, minus soluta
            tenetur? Adipisci aut, deleniti ea eaque, earum hic minima odio optio placeat quod temporibus unde
            veritatis.
         </p>
      </div>
   )
   
   return (
      <Tippy maxWidth={250} theme='orange' content={content()}>
         <img style={{marginLeft: 8, marginTop: 4, width: 18, height: 18}} className="questionnaire__icon-info"
              src={InfoIcon} alt="info-icon"/>
      </Tippy>
   );
}

export function TippyHowItCounts({children}) {
   const content = () => (
      <div className='tippy-info'>
         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam dolorem eligendi facilis, minus soluta
            tenetur? Adipisci aut, deleniti ea eaque, earum hic minima odio optio placeat quod temporibus unde
            veritatis.
         </p>
      </div>
   )
   
   return (
      <Tippy placement='bottom' maxWidth={250} theme='orange' content={content()}>
         {children}
      </Tippy>
   );
}

export function TippyEventEndDate({children}) {
   const content = () => (
      <div className='tippy-info'>
         <p>Конечная дата не включает в себя последние день. То есть если мы хотим создать событие с понедельника по
            пятницу, то последний указанный день должна быть суббота
         </p>
      </div>
   )
   
   return (
      <Tippy placement='bottom' maxWidth={250} theme='orange' content={content()}>
         {children}
      </Tippy>
   );
}

export function TippyCurrentMode({children}) {
   const content = () => <p className={'tippy-info'}>Расчет осуществляется исходя из текущего режима.</p>
   return (
      <Tippy placement='bottom' maxWidth={200} theme='grey' arrow={false} content={content()}>
         {children}
      </Tippy>
   );
}

export function TippyBasket({idGroup, delGroup,  editGroup, children}) {
   const content = () => {
      return (
            <ul className='dot-spoilers__list' style={{overflow: "hidden"}}>
               <li className='dot-spoilers__item' onClick={() => delGroup(idGroup)}>
                  <img src={closeOrange} alt="close"/>
                  Удалить
               </li>
               <li className='dot-spoilers__item' onClick={() => editGroup(idGroup)}>
                  <img src={pen} alt="pen"/>
                  Изменить
               </li>
            </ul>
      )
   }
   return (
      <Tippy {...groupOption} content={content()}>
         {children}
      </Tippy>
   );
}


export function TippyTargetInfo({text}) {
   return (
      <Tippy placement='bottom' maxWidth={250} theme='orange' content={<p>{text}</p>}>
         <img style={{marginLeft: 8, marginTop: 4, width: 18, height: 18}} className="questionnaire__icon-info"
              src={InfoIcon} alt="info-icon"/>
      </Tippy>
   );
}

