import React, {useState} from 'react';
import {Button, Checkbox, Col, Divider, Input, message, Row} from 'antd';
import {func, object} from 'prop-types';
import AppSearchInput from "@/components/ui/AppSearсhInput.jsx";
import {useListFunctionality} from "@/hooks/useListFunctionality";


PositionFunctionalityModalPositionItems.propTypes = {
   positionData: object,
   addItem: func,
   removeItem: func,
};

function PositionFunctionalityModalPositionItems({positionData, addItem, removeItem}) {
   const [isAdd, setIsAdd] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [name, setName] = useState('');
   const [searchItem, setSearchItem] = useState('');
   
   const {
      allOptions,
      indeterminate,
      onChangeAllFunctionality,
      removeCheckListItem,
      checkAll,
      onChangeFunctionality,
      positionName,
      tabIndex
   } = positionData;
   
   const list = useListFunctionality(allOptions, tabIndex);
   const handleAddName = async () => {
      const props = {
         key: 'add',
         duration: 4
      };
      if (name) {
         const indexEl = allOptions.findIndex(el => el.name.toLowerCase().trim() === name.toLowerCase().trim())
         if (indexEl >= 0) {
            return message.warn({content: <span>Значение <strong>{name}</strong> уже добавлено!</span>, ...props});
         }
         try {
            message.loading({content: <span>Пытаемся добавить значение <strong>{name}</strong> ...</span>, ...props});
            setIsLoading(true)
            await addItem(name)
            message.success({content: <span>Значение <strong>{name}</strong> добавлено!</span>, ...props});
         } catch (err) {
            console.error(err)
            message.error({content: `Ошибка: ${err.message}`, ...props});
         } finally {
            setIsLoading(false);
            setIsAdd(!isAdd);
            setName('');
         }
      } else setIsAdd(!isAdd);
      
   }
   
   const handleOnRemoveItem = async (id, name) => {
      const props = {
         key: 'remove',
         duration: 4
      };
      message.loading({...props, content: <span>Пытаемся удалить значение <strong>{name}</strong> ...</span>});
      try {
         await removeItem(id)
         removeCheckListItem(id)
         message.success({...props, content: <span>Значение <strong>{name}</strong> удалено!</span>});
      } catch (err) {
         console.error(err)
         message.error({...props, content: `Ошибка: ${err.message}`});
      }
   };
   
   return (
      <>
         <AppSearchInput value={searchItem} changeValue={setSearchItem} placeholder='Найти'/>
         <div className='functionality-list'>
            <Row className='functionality-list__group_row'>
               <Col span={24} className='functionality-list__group_col'>
                  <Checkbox className='functionality-list__item' indeterminate={indeterminate}
                            onChange={e => onChangeAllFunctionality(e, tabIndex, list)}
                            checked={checkAll}>
                     <span className='functionality-list__name position-name'>{positionName}</span>
                  </Checkbox>
                  <span className='functionality-list__add' onClick={() => setIsAdd(!isAdd)}> </span>
               </Col>
            </Row>
            <Divider dashed style={{margin: '5px 0 18px'}}/>
            <Row gutter={[5, 5]}>
               {isAdd && (
                  <div className='form__row' style={{gap: 6, marginBottom: 16}}>
                     <Input size='small' value={name} onChange={e => setName(e.target.value)} style={{height: 24}}/>
                     <Button size='small' onClick={() => handleAddName()} type='primary' style={{fontSize: 10}} disabled={isLoading}
                             loading={isLoading}>
                        {name ? 'Добавить' : 'Отменить'}
                     </Button>
                  </div>
               )}
               {list.filter(opt => opt?.name?.toLowerCase().includes(searchItem.toLowerCase())).map(opt => {
                  return (
                     <Col key={opt.id} span={24} className='functionality-list__group_col'>
                        <Checkbox onChange={() => onChangeFunctionality(opt.id)} className='functionality-list__item' value={opt.name}
                                  checked={opt.selected}>
                           <span className='functionality-list__name'>{opt.name}</span>
                        </Checkbox>
                        {opt.isUserAdd && (
                           <span className='functionality-list__icon' onClick={() => handleOnRemoveItem(opt.id, opt.name)}> </span>
                        )}
                     </Col>
                  )
               })}
            </Row>
         </div>
      </>
   );
}

export default PositionFunctionalityModalPositionItems;