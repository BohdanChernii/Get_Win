import React, {useRef} from 'react';
import {number} from "prop-types";

ScrollContainer.propTypes = {
   height: number,
};

function ScrollContainer({height, children}) {
   const ref = useRef(null);
   
   const handleOnScroll = (e) => {
      const scrollHeight = e.target.scrollHeight;
      const scrollTop = e.target.scrollTop;
      const offsetHeight = e.target.offsetHeight;
      if (offsetHeight === 0) {
         !ref.current?.classList.contains('active') && ref.current?.classList.add('active')
      }
      if (scrollTop === scrollHeight - offsetHeight) {
         ref.current?.classList.contains('active') && ref.current?.classList.remove('active')
      } else {
         !ref.current?.classList.contains('active') && ref.current?.classList.add('active')
      }
   }
   
   return (
      <div className='_scroll-container' style={{height}} onScroll={handleOnScroll}>
         {children}
         <div ref={ref} className='_scroll-container__shadow'></div>
      </div>
   );
}

export default ScrollContainer;