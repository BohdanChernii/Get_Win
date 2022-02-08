import React from 'react';
import {func} from 'prop-types';
import collapsedArrow from "@img/icons/collapsedArrow.svg";

CollapsedButton.propTypes = {
   onClick: func
};

function CollapsedButton({onClick, isCollapsed}) {
   const collapsed = isCollapsed ? 'collapsed is_collapsed' : 'collapsed';
   return (
      <li className={collapsed} onClick={onClick}>
         <img className='collapsed__arrow' src={collapsedArrow} alt="collapsedArrow"/>
      </li>
   );
}

export default CollapsedButton;