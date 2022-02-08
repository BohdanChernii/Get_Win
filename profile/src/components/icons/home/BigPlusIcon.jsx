import React from "react";

function BigPlusIcon({style, className, fill}) {
   return (
      <svg
         className={className}
         width='32'
         height='32'
         viewBox='0 0 32 32'
         fill='none'
         xmlns='http://www.w3.org/2000/svg'>
         <rect width='32' height='32' rx='16' fill='white'/>
         <path
            style={style}
            d='M19.8419 14.8427H17.1558V12.1581C17.1558 11.5192 16.6381 11 15.9992 11C15.3603 11 14.8411 11.5192 14.8411 12.1581V14.8427H12.1565C11.5176 14.8427 11 15.3619 11 16.0008C11 16.6397 11.5176 17.1589 12.1565 17.1589H14.8411V19.8419C14.8411 20.4808 15.3603 21 15.9992 21C16.6381 21 17.1558 20.4808 17.1558 19.8419V17.1589H19.8419C20.4808 17.1589 21 16.6397 21 16.0008C21 15.3619 20.4808 14.8427 19.8419 14.8427Z'
            fill={fill}
         />
      </svg>
   );
}

export default BigPlusIcon;
