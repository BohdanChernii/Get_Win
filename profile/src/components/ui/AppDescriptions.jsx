import React from 'react';
import {bool, func, object, oneOfType, shape, string} from 'prop-types';
import {getDescriptions} from "@assets/helpers/helpers";
import remove from "@img/icons/remove.svg";
import arrowRight from "@img/icons/form-arrow-right.svg";
import {Checkbox} from "antd";
import {AiOutlineHolder} from "react-icons/ai";


AppDescriptions.propTypes = {
   title: oneOfType([object, string]).isRequired,
   descriptions: oneOfType([object, string]).isRequired,
   
   isChecked: bool,
   isSelected: bool,
   disabled: bool,
   isDraggable: bool,
   
   onRemove: func,
   onOpen: func,
   onChecked: func,
   onClear: func,
   
   draggableProvided: shape({
      draggableProps: object,
      dragHandleProps: object,
      innerRef: func,
   }),
};

function AppDescriptions(props) {
   const {
      title,
      descriptions,
      isChecked = false,
      isSelected = false,
      disabled,
      onChecked,
      onRemove,
      onOpen,
      isDraggable,
      draggableProvided,
      children,
      ...rest
   } = props;
   const name = getDescriptions(title);
   const subTitle = getDescriptions(descriptions);
   const descriptionsClassNames = `descriptions ${disabled && !isSelected ? 'disabled' : ''} ${isSelected ? 'selected' : ''}`;
   
   return (
      <div className={descriptionsClassNames} ref={draggableProvided?.innerRef} {...draggableProvided?.draggableProps} {...rest}>
         
         {isDraggable && (
            <div className={`descriptions__icons ${disabled ? 'disabled' : ''}`} {...draggableProvided?.dragHandleProps}>
               <AiOutlineHolder fill={disabled ? '#8D97B0' : '#4E5AF2'} size={18} style={{marginRight: 15}}/>
            </div>
         )}
         
         {isChecked && (
            <Checkbox disabled={disabled} checked={isSelected} onChange={(e) => !disabled && onChecked(e.target.checked)}/>
         )}
         
         <div className="descriptions__block">
            <h5 className="descriptions__name">{name}</h5>
            <span className='descriptions__address'>{subTitle} </span>
         </div>
         
         {children}
         {onRemove && (
            <div className="descriptions__icons">
               <img className='descriptions__icon' src={remove} alt="remove" onClick={onRemove}/>
               <img className='descriptions__icon' src={arrowRight} alt="right" onClick={onOpen}/>
            </div>
         )}
      </div>
   );
}

export default AppDescriptions;