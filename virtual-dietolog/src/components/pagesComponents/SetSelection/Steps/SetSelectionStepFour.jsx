import React, {useEffect, useState} from 'react';
import ScrollContainer from "@/components/feature/ScrollContainer/ScrollContainer.jsx";
import ReactDOMServer from 'react-dom/server';
import useSummation from "@/hooks/setSelection/useSummation";
import selected from '@img/icons/selected_grean.svg'
import send from '@img/icons/send.svg'
import print from '@img/icons/print.svg'
import delivery from '@img/icons/delivery.svg'
import {useReactToPrint} from "react-to-print";
import PrintSection from "@/components/pagesComponents/SetSelection/PrintSection/PrintSection.jsx";
import {delCookiesByName, getAllCookies} from "@scripts/functions";
import setSelectionStore from "@store/set-selection-store";

SetSelectionStepFour.propTypes = {};

function SetSelectionStepFour({steps, changeProgressSteps, currentStepId}) {
   const {inProgress} = steps.length > 0 && steps.find(item => item.id === currentStepId)
   const {checkOfSelectFilterProducts, filtersSelectionStore} = setSelectionStore;
   const [isCanChange, setIsCanChange] = useState(true);
   const summations = useSummation()
   
   const handleOnGoBack = () => {
      changeProgressSteps(0);
      delCookiesByName('setSelection')
   }
   
   const handleOnSendPdf = () => {
      console.log(ReactDOMServer.renderToString(<PrintSection/>))
   }
   
   const handleOnPrint = useReactToPrint({
      content: () => {
         const print_section = document.createElement('section')
         print_section.innerHTML = ReactDOMServer.renderToString(<PrintSection/>)
         return print_section
      },
   });
   
   useEffect(() => {
      const cookies = getAllCookies()
      if (cookies.setSelection && filtersSelectionStore && isCanChange) {
         setIsCanChange(false)
         const productsIdx = JSON.parse(cookies.setSelection)
         checkOfSelectFilterProducts(productsIdx)
      }
   }, [filtersSelectionStore]);
   return (
      <>
         {inProgress && (
            <>
               <h3 className='_title-h3' style={{marginBottom: 24}}>Ваш список продуктов на неделю</h3>
               <div className='plank' style={{padding: 20}}>
                  <ScrollContainer height={724}>
                     <div className='_grid-column-2'>
                        {summations.map(item => (
                           <ul key={item.name} style={{marginBottom: 24}}>
                              <li className='_subtitle'>{item.name}</li>
                              {item.products.map(product => (
                                 <li key={product} className='_flex-row_start'>
                                    <img src={selected} alt="selected" style={{marginRight: 8, marginTop: 5}}/>
                                    <p>{product}</p>
                                 </li>
                              ))}
                           </ul>
                        ))}
                     </div>
                  </ScrollContainer>
                  <div className="form__buttons">
                     <button type="button"
                             onClick={handleOnGoBack}
                             className="form__button _btn _main-btn _grey-btn">
                        Редактировать
                     </button>
                     <button type="button"
                        // onClick={handleOnClickGoSetSelection}
                             className="form__button _btn _main-btn _orange-btn _flex-row_center">
                        Доставка
                        <img style={{marginLeft: 8, height: 18}} src={delivery} alt="delivery"/>
                     </button>
                     <button type="button"
                             onClick={handleOnSendPdf}
                             className="form__button _btn _main-btn _grey-btn ">
                        Переслать pdf
                        <img style={{marginLeft: 8, height: 18}} src={send} alt="send"/>
                     </button>
                     
                     <button type="button"
                             onClick={handleOnPrint}
                             className="form__button _btn _main-btn _grey-btn _flex-row_center">
                        Печать
                        <img style={{marginLeft: 8, height: 18}} src={print} alt="print"/>
                     </button>
                  
                  </div>
               </div>
            </>
         )}
      </>
   );
}

export default SetSelectionStepFour;