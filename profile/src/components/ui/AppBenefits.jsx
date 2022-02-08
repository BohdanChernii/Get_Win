import React from 'react';

function AppBenefits() {
   const benefits = [
      'Автоматизация HR',
      'Оценка персонала',
      'Синхронизация с Outlook',
      'Безопасность данных',
      'Парсинг резюме',
      'Мультиязычность',
      'Конструктор отчетности',
      'Интеграция с job-порталами',
   ]
   return (
      <div className='benefits'>
         <ul className='benefits__list'>
            {benefits.map((benefit, ind) => (
               <li key={ind} className='benefits__item'>{benefit}</li>
            ))}
         </ul>
      
      </div>
   );
}

export default AppBenefits;