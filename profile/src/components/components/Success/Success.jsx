import React, {useEffect, useState} from 'react';
import {func, string} from 'prop-types';
import successIcon from "@img/icons/succes-icon.svg";

Success.propTypes = {
   successFn: func.isRequired,
   title: string.isRequired,
   message: string.isRequired,
   img: string,
};

function Success({title, img, message, successFn}) {
   const [counter, setCounter] = useState(3);
   
   useEffect(() => {
      const index = setInterval(() => {
         counter && setCounter(counter - 1)
      }, 1000);
      return () => {
         clearInterval(index)
      };
   }, [counter]);
   
   useEffect(() => {
      const index = setTimeout(() => {
         successFn()
      }, 3500);
      return () => {
         clearTimeout(index)
      };
   }, []);
   
   return (
      <div className='success'>
         <img className='success__icon' src={successIcon} alt="successIcon"/>
         <p className='success__title'>{title}</p>
         {message && <p className='success__message'>{message} {counter}</p>}
         {img && <img className='success__big-img' src={img} alt="img"/>}
      </div>
   );
}

export default Success;