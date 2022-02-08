import React, {useEffect} from 'react';
import {array, bool, func, object, string} from 'prop-types';
import {Modal} from "antd";
import CloseModalIcon from "@/components/icons/CloseModalIcon/CloseModalIcon.jsx";
import PositionFunctionalityModalHeader from "@/components/modals/PositionFunctionalityModal/PositionFunctionalityModalHeader.jsx";
import PositionFunctionalityModalFooter from "@/components/modals/PositionFunctionalityModal/PositionFunctionalityModalFooter.jsx";
import PositionFunctionalityModalBody from "@/components/modals/PositionFunctionalityModal/PositionFunctionalityModalBody.jsx";
import __ from "lodash";

PositionFunctionalityModal.propTypes = {
   title: string,
   visible: bool,
   changeVisible: func,
   userSelectedList: array,
   changeUserSelectedList: func,
   positionsId: string,
   setPositionId: func,
   positionData: object,
   addItem: func,
   removeItem: func,
};

function PositionFunctionalityModal(props) {
   const {
      visible,
      changeVisible,
      userSelectedList,
      changeUserSelectedList,
      positionsId,
      setPositionId,
      positionData,
      addItem,
      removeItem,
      title
   } = props
   const {checkedList, setCheckedList, setAllOptions} = positionData;
   
   function handleOnSubmitFunctionality() {
      changeUserSelectedList(__.sortBy(checkedList, 'name').filter(el => el.selected))
      changeVisible(!visible)
   }
   
   useEffect(() => {
      if (visible) {
         setAllOptions(prev => prev.map(p => ({...p, selected: false})))
         setCheckedList(userSelectedList)
      }
   }, [visible])
   
   return (
      <Modal
         className='functionality-modal'
         visible={visible}
         footer={null}
         bodyStyle={{padding: 0}}
         closable
         centered
         closeIcon={<CloseModalIcon onClick={() => changeVisible(!visible)}/>}
      >
         <PositionFunctionalityModalHeader positionData={positionData}/>
         
         <PositionFunctionalityModalBody
            title={title}
            positionsId={positionsId}
            setPositionId={setPositionId}
            positionData={positionData}
            addItem={addItem}
            removeItem={removeItem}
         />
         
         <PositionFunctionalityModalFooter onClick={() => handleOnSubmitFunctionality()}/>
      </Modal>
   );
}

export default PositionFunctionalityModal;