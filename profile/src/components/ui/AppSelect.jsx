import React, {useState} from 'react';
import {Button, Divider, Empty, Input, message, Select, Spin, Tooltip} from "antd";
import {array, bool, func, string} from "prop-types";
import DropDownArrow from "@/components/icons/drop_down_arrow/dropDownArrow.jsx";
import SelectRemoveIcon from "@/components/icons/select/SelectRemoveIcon.jsx";

const TooltipSelectOptionHelp = ({help, children}) => (
   <Tooltip title={<span style={{fontSize: 12}}>{help}</span>} placement="left" style={{fontSize: 12}}>
      {children}
   </Tooltip>
)

AppSelect.propTypes = {
   placeholder: string.isRequired,
   options: array,
   mode: string,
   isHaveFooter: bool,
   isHaveModal: bool,
   modalBtnTxt: string,
   changeVisible: func,
   isLoading: bool,
   onSubmit: func,
   notFoundDescription: string,
   isIdValue: bool,
};

function AppSelect(props) {
   const {
      placeholder,
      options,
      mode,
      isHaveFooter,
      isHaveModal,
      modalBtnTxt,
      changeVisible,
      isLoading,
      onSubmit,
      notFoundDescription,
      isIdValue,
      ...rest
   } = props;
   const [name, setName] = useState('');
   const [loading, setLoading] = useState(false);
   const handleChange = value => setName(value);
   
   const onFinish = async () => {
      const el = options?.find(item => item.name.toLowerCase().trim() === name.toLowerCase().trim());
      if (!el) {
         setLoading(true);
         try {
            await onSubmit(name.trim());
         } catch (err) {
            console.error(err)
            message.error(err.message)
         } finally {
            setLoading(false)
            setName('')
         }
      } else {
         message.warn({content: 'Етa назва уже существует в базе данных', duration: 4})
      }
   }
   
   return (
      <Select
         className={`${mode === 'multiple' && 'form__select-multiple'}`}
         maxTagCount={mode === 'multiple' && 'responsive'}
         style={{width: '100%'}}
         allowClear
         showArrow
         showSearch
         notFoundContent={isLoading ? <Spin size="small"/> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={notFoundDescription}/>}
         onDropdownVisibleChange={(open) => !open && setName('')}
         mode={mode}
         placeholder={placeholder}
         menuItemSelectedIcon={null}
         suffixIcon={<DropDownArrow/>}
         removeIcon={<SelectRemoveIcon/>}
         dropdownRender={(menu) => {
            return (
               <>
                  {menu}
                  {isHaveFooter && (
                     <>
                        <Divider style={{margin: '4px 0'}}/>
                        {isHaveModal
                           ? <span className='select-modal-btn' onClick={() => changeVisible()}>{modalBtnTxt}</span>
                           : (
                              <div className='form__row' style={{gap: 6, padding: '6px 12px'}}>
                                 <Input size='middle' value={name} onChange={e => handleChange(e.target.value)}/>
                                 <Button loading={loading} style={{height: 28, padding: '0 24px'}} onClick={onFinish} type='primary'
                                         disabled={!name}>
                                    Добавить
                                 </Button>
                              </div>
                           )
                        }
                     </>
                  )}
               </>
            )
         }}
         {...rest}>
         {options && options.map(item => (
            <Select.Option
               key={item.id || item.name}
               selected={false}
               disabled={item.disabled}
               className={mode === 'multiple' && 'multiple-select-option'}
               value={isIdValue ? item.id : item.name}>
               <>
                  {item.help ? <TooltipSelectOptionHelp help={item.help} children={item.name}/> : item.name}
                  {/*{item.name}*/}
                  {item.description && (
                     <div className='select__description'>
                        <span className='select__description-name'>{item.description}</span></div>
                  )}
               
               </>
            </Select.Option>
         ))}
      </Select>
   
   );
}

export default AppSelect;