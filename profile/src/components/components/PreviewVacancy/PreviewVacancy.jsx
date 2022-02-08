import React, {useState} from 'react';
import ReactDOMServer from "react-dom/server";
import {useSelector} from "react-redux";
import {useReactToPrint} from "react-to-print";

import {array, func} from 'prop-types';
import {Avatar, Button, Col, Divider, message, Row, Tooltip} from "antd";
import {getDescriptions, getPriorityName, getDescriptionPreviewVacancy} from "@assets/helpers/helpers";
import {UserOutlined} from "@ant-design/icons";
import StaticFormModal from "@/components/modals/StaticFormModal.jsx";
import FormAddUser from "@/components/form/FormAddUser/FormAddUser.jsx";
import PreviewVacancyPrint from "@/components/print/PreviewVacancyPrint/PreviewVacancyPrint.jsx";
import {createFile} from "@assets/helpers/asyncHelpers";

PreviewVacancy.propTypes = {
   onSubmit: func,
   criteria: array,
};

function PreviewVacancy({onSubmit}) {
   const {
      positions,
      user: {user},
      company: {company},
      dropDownList: {lists}
   } = useSelector(state => state);
   const {info} = positions;
   
   // visible
   const [visible, setVisible] = useState(false);
   
   // description
   const description = getDescriptions({
      salary: getDescriptionPreviewVacancy(info?.salary) ? `${getDescriptionPreviewVacancy(info?.salary)} грн` : null,
      employment_type: info?.employment_type?.name,
      level: info?.level?.name,
   });
   
   // users
   const [users, setUsers] = useState([]);
   const handleOnAddUser = (options) => {
      setUsers(options);
      setVisible(!visible);
   }
   // print
   const handlePrint = useReactToPrint({
      removeAfterPrint: true,
      content: () => {
         const print_section = document.createElement('section');
         print_section.innerHTML = ReactDOMServer.renderToStaticMarkup(<PreviewVacancyPrint
            store={{positions, user, company, lists}}
            users={users}
            subTitle={description}/>)
         return print_section
      },
   });
   const handleOnCreateFile = async () => {
      const HTML = ReactDOMServer.renderToStaticMarkup(<PreviewVacancyPrint
         store={{positions, user, company, lists}}
         users={users}
         subTitle={description}/>)
      try {
         const buffer = await createFile(HTML);
         const file = new Blob([buffer], {type: 'application/pdf'});
         const fileURL = URL.createObjectURL(file);
         const link = document.createElement('a');
         link.href = fileURL;
         link.download = `${info.name}.pdf`;
         link.click();
      } catch (e) {
         message.error(e.message)
      }
   };
   
   return (
      <>
         <StaticFormModal
            visible={visible}
            changeVisible={() => setVisible(!visible)}
            text='Выберите пользователей, которые должны согласовать вакансию'
            title='Согласование вакансии'
            component={<FormAddUser onSubmitForm={handleOnAddUser} info={info}/>}
         />
         
         <div className='preview'>
            <div className='preview__body'>
               <Row className='preview__row' style={{height: '100%'}}>
                  <Col span={16} className='preview__col preview__col-left'>
                     
                     <div className='preview__header'>
                        <span className='preview__title'>{info.name}</span>
                        <span className='preview__subtitle'>{description}</span>
                     </div>
                     <div className='preview__description'>
                        <span className='preview__description-title'>Функционал</span>
                        <Row className='preview__description-list'>
                           {info?.functionality.map(func => (
                              <Col span={24} className='preview__description-list-item' key={func.id}>{func.name}</Col>
                           ))}
                        </Row>
                     </div>
                     <div className='preview__description'>
                        <span className='preview__description-title'>Результат</span>
                        <Row className='preview__description-list' align='stretch'>
                           {info?.result.map(el => (
                              <Col span={24} className='preview__description-list-item' key={el.id}>{el.name}</Col>
                           ))}
                        </Row>
                     </div>
                     <div className='preview__description'>
                        <span className='preview__description-title'>KPI</span>
                        <Row className='preview__description-list'>
                           {info?.kpi.map(el => (
                              <Col span={24} className='preview__description-list-item' key={el.id}>{el.name}</Col>
                           ))}
                        </Row>
                     </div>
                     
                     <Divider style={{background: '#CBD5E2'}}/>
                     
                     <div className='preview__specifics specifics'>
                        <Row gutter={[18, 12]} className='specifics__row'>
                           {/*Языки*/}
                           <Col span={12} className='specifics__col'>
                              <span className='specifics__name'>Языки:</span>
                              <Row gutter={[5, 5]} className='specifics__list'>
                                 {info?.languages?.length > 0
                                    ? info?.languages.map(language => (
                                       <Col className='specifics__list-item' key={language.id}>{language.name} {language.levels}</Col>
                                    ))
                                    : <Col>-</Col>}
                              </Row>
                           </Col>
                           {/*Программы*/}
                           <Col span={12} className='specifics__col'>
                              <span className='specifics__name'>Программы:</span>
                              <Row gutter={[5, 5]} className='specifics__list'>
                                 {info?.programs?.length > 0
                                    ? info?.programs.map(program => (
                                       <Col className='specifics__list-item' key={program.id}>{program.name}</Col>
                                    ))
                                    : <Col>-</Col>}
                              </Row>
                           </Col>
                           {/*Специфика должности*/}
                           <Col span={12} className='specifics__col'>
                              <span className='specifics__name'>Специфика должности:</span>
                              <Row gutter={[5, 5]} className='specifics__list'>
                                 <Col className='specifics__list-item'>{info?.dress_code?.name
                                    ? <Tooltip
                                       overlayInnerStyle={{fontSize: 12, width: 300, textAlign: 'center'}}
                                       placement="topLeft"
                                       color='#4E5AF2'
                                       title={info?.dress_code?.name}>Дрес-код: {info?.dress_code?.name}</Tooltip>
                                    : 'Дрес-код: -'}
                                 </Col>
                                 
                                 <Col className='specifics__list-item'>{info?.work_process?.name
                                    ? <Tooltip
                                       overlayInnerStyle={{fontSize: 12, width: 300, textAlign: 'center'}}
                                       placement="topLeft"
                                       color='#4E5AF2'
                                       title={info?.work_process?.name}>Рабочее
                                       процесси: {info?.work_process?.name}</Tooltip>
                                    : 'Рабочее процесси: -'}
                                 </Col>
                                 <Col className='specifics__list-item'>{info?.work_place?.name
                                    ? <Tooltip
                                       overlayInnerStyle={{fontSize: 12, width: 300, textAlign: 'center'}}
                                       placement="topLeft"
                                       color='#4E5AF2'
                                       title={info?.work_place?.name}>Рабочее место: {info?.work_place?.name}</Tooltip>
                                    : 'Рабочее место: -'}
                                 </Col>
                                 <Col className='specifics__list-item'>{info?.customer_communications?.name
                                    ? <Tooltip
                                       overlayInnerStyle={{fontSize: 12, width: 300, textAlign: 'center'}}
                                       placement="topLeft"
                                       color='#4E5AF2'
                                       title={info?.customer_communications?.name}>
                                       Коммуникация с клиентами: {info?.customer_communications?.name}</Tooltip>
                                    : 'Коммуникация с клиентами: -'}
                                 </Col>
                                 <Col className='specifics__list-item'>{info?.supervisor_communications?.name
                                    ? <Tooltip
                                       overlayInnerStyle={{fontSize: 12, width: 300, textAlign: 'center'}}
                                       placement="topLeft"
                                       color='#4E5AF2'
                                       title={info?.supervisor_communications?.name}>Коммуникация с
                                       руководителем: {info?.supervisor_communications?.name}</Tooltip>
                                    : 'Коммуникация с руководителем: -'}
                                 </Col>
                                 <Col className='specifics__list-item'>{info?.credentials
                                    ? <Tooltip
                                       overlayInnerStyle={{fontSize: 12, width: 300, textAlign: 'center'}}
                                       placement="topLeft"
                                       color='#4E5AF2'
                                       title={info?.credentials}>Полномочия: {info?.credentials}</Tooltip>
                                    : 'Полномочия: -'}
                                 </Col>
                                 <Col className='specifics__list-item'>{info?.missions
                                    ? <Tooltip
                                       overlayInnerStyle={{fontSize: 12, width: 300, textAlign: 'center'}}
                                       placement="topLeft"
                                       color='#4E5AF2'
                                       title={info?.missions}>Командировки: {info?.missions}</Tooltip>
                                    : 'Командировки: -'}
                                 </Col>
                                 <Col className='specifics__list-item'>{info?.opportunities
                                    ? <Tooltip
                                       overlayInnerStyle={{fontSize: 12, width: 300, textAlign: 'center'}}
                                       placement="topLeft"
                                       color='#4E5AF2'
                                       title={info?.opportunities}>Возможность карьерного
                                       роста: {info?.opportunities}</Tooltip>
                                    : 'Возможность карьерного роста: -'}
                                 </Col>
                              </Row>
                           </Col>
                           {/*Образование*/}
                           <Col span={12} className='specifics__col'>
                              <span className='specifics__name'>Образование:</span>
                              <Row gutter={[5, 5]} className='specifics__list'>
                                 <Col className='specifics__list-item'>Образование: {info?.education?.name ? info?.education?.name : '-'}</Col>
                              </Row>
                           </Col>
                           {/*Права и Авто*/}
                           <Col span={12} className='specifics__col'>
                              <span className='specifics__name'>Права и Авто:</span>
                              <Row gutter={[5, 5]} className='specifics__list'>
                                 <Col className='specifics__list-item'>Права необходими - {info?.driver_license ? info?.driver_license : 'Нет'}</Col>
                                 <Col className='specifics__list-item'>
                                    Нужен свой автомобтль - {info.car_available ? info.car_available : 'Нет'}
                                 </Col>
                                 {info?.driver_categories?.map(category => (
                                    <Col className='specifics__list-item' key={category.idItem}>Категория {category.name}</Col>
                                 ))}
                              </Row>
                           </Col>
                           {/*Компетенции*/}
                           <Col span={12} className='specifics__col'>
                              <span className='specifics__name'>Компетенции:</span>
                              <Row gutter={[5, 5]} className='specifics__list'>
                                 {info?.competencies?.length > 0 ? info?.competencies?.map(el => (
                                    <Col className='specifics__list-item' key={el.idItem}>{el.name}</Col>
                                 )) : <Col>-</Col>}
                              </Row>
                           </Col>
                           {/*Личные качества*/}
                           <Col span={12} className='specifics__col'>
                              <span className='specifics__name'>Личные качества:</span>
                              <Row gutter={[5, 5]} className='specifics__list'>
                                 {info?.personal_qualities?.length > 0 ? info?.personal_qualities?.map(el => (
                                    <Col className='specifics__list-item' key={el.idItem}>{el.name}</Col>
                                 )) : <Col>-</Col>}
                              </Row>
                           </Col>
                           {/*Компенсационный пакет*/}
                           <Col span={12} className='specifics__col'>
                              <span className='specifics__name'>Компенсационный пакет:</span>
                              <Row gutter={[5, 5]} className='specifics__list'>
                                 {info?.compensation_package?.length > 0 ? info?.compensation_package?.map(el => (
                                    <Col className='specifics__list-item' key={el.idItem}>{el.name}</Col>
                                 )) : <Col>-</Col>}
                              </Row>
                           </Col>
                        </Row>
                     </div>
                  </Col>
                  <Col span={8} className='preview__col preview__col-right' style={{backgroundColor: '#EDF2FF'}}>
                     <Row gutter={[16, 16]}>
                        <Col span={24}>
                           <Button block shape='round' type='primary' onClick={onSubmit}>
                              {users.length ? 'Отправить на согласование' : 'Принять и опубликовать'}
                           </Button>
                        </Col>
                        <Col span={24}>
                           <Row gutter={16}>
                              <Col span={12}>
                                 <Button block shape='round' type='default' onClick={handlePrint}>Распечатать</Button>
                              </Col>
                              <Col span={12}>
                                 <Button block shape='round' type='default' onClick={handleOnCreateFile}>Скачать</Button>
                              </Col>
                           </Row>
                        </Col>
                     </Row>
                     
                     {/* Автори */}
                     <Divider style={{background: '#CBD5E2'}}/>
                     <div className='preview__specifics specifics'>
                        <Row gutter={[18, 12]} className='specifics__row'>
                           <Col span={24} className='specifics__col'><span className='specifics__name'>Автор:</span>
                              <Row gutter={[5, 5]} className='specifics__list'>
                                 <Col className='specifics__list-item specifics__list-item-avatar'>
                                    <Avatar size={18} style={{backgroundColor: '#8D8BED', marginRight: 5}} icon={<UserOutlined/>}/>
                                    {user.name} {user.sname}
                                 </Col>
                              </Row>
                           </Col>
                           
                           <Col span={24} className='specifics__col'><span className='specifics__name'>Заказчик:</span>
                              <Row gutter={[5, 5]} className='specifics__list'>
                                 <Col className='specifics__list-item specifics__list-item-avatar'>
                                    <Avatar size={18} style={{backgroundColor: '#8D8BED', marginRight: 5}} icon={<UserOutlined/>}/>
                                    Імя та прізвище Заказчика
                                 </Col>
                              </Row>
                           </Col>
                           
                           <Col span={24} className='specifics__col'><span className='specifics__name'>Отправить на согласование:</span>
                              <Row gutter={[5, 5]} className='specifics__list'>
                                 <Col span={24}>
                                    <Button onClick={() => setVisible(!visible)} style={{padding: 0}} type='link'>Выберите коллегу</Button>
                                 </Col>
                                 {users.map(user => (
                                    <Col span={24} key={user.id}>
                                       <Row gutter={5} wrap={false}>
                                          <Col>
                                             <div className='specifics__list-item specifics__list-item-avatar'>
                                                <Avatar size={18} style={{backgroundColor: '#8D8BED', marginRight: 5}} icon={<UserOutlined/>}/>
                                                {user.name}
                                             </div>
                                          </Col>
                                       </Row>
                                    </Col>
                                 ))}
                              </Row>
                           </Col>
                        </Row>
                     </div>
                     
                     {/* Критерии отбора резюме */}
                     <Divider style={{background: '#CBD5E2'}}/>
                     <div className='preview__specifics specifics'>
                        <Row gutter={[18, 12]} className='specifics__row'>
                           <Col span={24} className='specifics__col'>
                              <span className='specifics__name'>Критерии отбора резюме:</span>
                              <Row gutter={[6, 6]}>
                                 {info?.criteria?.length > 0
                                    ? info.criteria.map(el => (
                                       <Col span={24} key={el.id}>
                                          <Row gutter={5}>
                                             <Col><p className='specifics__list-item'>{el.name}</p></Col>
                                             <Col><p className='specifics__list-item'>{getPriorityName(lists?.s_priority, el.priority)}</p></Col>
                                          </Row>
                                       </Col>
                                    ))
                                    : <Col span={24}>-</Col>
                                 }
                              </Row>
                           </Col>
                        </Row>
                     </div>
                     
                     {/*Компания*/}
                     <Divider style={{background: '#CBD5E2'}}/>
                     <div className='preview__specifics specifics'>
                        <Row gutter={[18, 12]} className='specifics__row'>
                           <Col span={24} className='specifics__col'>
                              <span className='specifics__name'>Компания:</span>
                              <Row gutter={[5, 5]} className='specifics__list'>
                                 {company && (
                                    <>
                                       <Col className='specifics__list-item'>{company.companyName}</Col>
                                       <Col className='specifics__list-item'>{company.kod}</Col>
                                       {company.s_activity?.name &&
                                          <Col className='specifics__list-item'>Сфера деятельности: {company.s_activity.name}</Col>}
                                       {company.s_organizational_structure?.name &&
                                          <Col className='specifics__list-item'>Cтруктура: {company.s_organizational_structure.name}</Col>}
                                       {company.s_workers?.name &&
                                          <Col className='specifics__list-item'>Количество сотрудников: {company.s_workers.name}</Col>}
                                    </>
                                 )}
                              </Row>
                           </Col>
                           <Col span={24} className='specifics__col'><span className='specifics__name'>Директор:</span>
                              <Row gutter={[5, 5]} className='specifics__list'>
                                 <Col className='specifics__list-item specifics__list-item-avatar'>
                                    <Avatar size={18} style={{backgroundColor: '#8D8BED', marginRight: 5}} icon={<UserOutlined/>}/>
                                    Імя та прізвище Директора
                                 </Col>
                              </Row>
                           </Col>
                           <Col span={24} className='specifics__col'>
                              <span className='specifics__name'>Название отдела:</span>
                              <Row gutter={[5, 5]} className='specifics__list'>
                                 <Col className='specifics__list-item'>{info.department_name}</Col>
                              </Row>
                           </Col>
                        </Row>
                     </div>
                  </Col>
               </Row>
            </div>
         </div>
      </>
   );
}

export default PreviewVacancy;