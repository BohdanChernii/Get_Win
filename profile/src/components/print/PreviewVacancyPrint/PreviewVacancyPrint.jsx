import React from 'react';
import {getPriorityName} from "@assets/helpers/helpers";

function PreviewVacancyPrint({store, subTitle, users}) {
   const {positions, user, company, lists} = store;
   const {info} = positions;
   
   const styles = {
      header: {
         marginBottom: 24,
      },
      title: {
         fontSize: 24,
         fontWeight: 600,
      },
      block: {
         fontFamily: 'Montserrat, sans-serif',
         fontWeight: 400,
      },
      subtitle: {
         color: 'rgb(141, 151, 176)',
         fontSize: 14,
         fontWeight: 500,
      },
      description: {
         width: '100%',
         marginBottom: 5,
      },
      description_name: {
         fontSize: 14,
         fontWeight: 600,
         marginBottom: 5
      },
      description_list: {
         marginLeft: 16,
      },
      description_list_item: {
         listStyle: 'disc',
         fontSize: 12,
         margin: 0,
      },
      grid: {
         display: 'grid',
         gridTemplateColumns: 'repeat(auto-fill, minmax(45%, 1fr))',
         gridAutoRows: 'auto',
         gap: 12,
      }
   }
   return (
      <>
         <div style={{...styles.block}}>
            {/*header*/}
            <div style={styles.header}>
               <h3 style={styles.title}>{info.name}</h3>
               <span style={styles.subtitle}>{subTitle}</span>
            </div>
            {/*Функционал*/}
            <div style={styles.description}>
               <span style={styles.description_name}>Функционал:</span>
               <ul style={styles.description_list}>
                  {info?.functionality.map(func => (
                     <li style={styles.description_list_item} key={func.id}>{func.name.trim()}</li>
                  ))}
               </ul>
            </div>
            {/*Результат*/}
            <div style={styles.description}>
               <span style={styles.description_name}>Результат:</span>
               <ul style={styles.description_list}>
                  {info?.result.map(func => (
                     <li style={styles.description_list_item} key={func.id}>{func.name.trim()}</li>
                  ))}
               </ul>
            </div>
            
            {/*KPI*/}
            <div style={styles.description}>
               <span style={styles.description_name}>KPI:</span>
               <ul style={styles.description_list}>
                  {info?.kpi.map(func => (
                     <li style={styles.description_list_item} key={func.id}>{func.name.trim()}</li>
                  ))}
               </ul>
            </div>
            <span style={{margin: '24px 0', background: 'rgb(203, 213, 226)', width: '100%', height: 1, display: 'block'}}/>
            <div style={{...styles.grid}}>
               {/*Языки*/}
               <div style={styles.description}>
                  <span style={styles.description_name}>Языки:</span>
                  <ul style={styles.description_list}>
                     {info?.languages?.length > 0 ? info?.languages.map(el => (
                        <li style={styles.description_list_item} key={el.id}>{el.name}</li>
                     )) : <span>-</span>}
                  </ul>
               </div>
               {/*Программы*/}
               <div style={styles.description}>
                  <span style={styles.description_name}>Программы:</span>
                  <ul style={{...styles.description_list}}>
                     {info?.programs?.length > 0 ? info?.programs.map(el => (
                        <li style={styles.description_list_item} key={el.id}>{el.name}</li>
                     )) : <span>-</span>}
                  </ul>
               </div>
               {/*Специфика должности:*/}
               <div style={styles.description}>
                  <span style={styles.description_name}>Специфика должности:</span>
                  <ul style={{...styles.description_list}}>
                     <li style={{...styles.description_list_item}}>Дрес-код: {info?.dress_code?.name ? info?.dress_code?.name : '-'}</li>
                     <li style={{...styles.description_list_item}}>Рабочее процесси: {info?.work_process?.name ? info?.work_process?.name : '-'}</li>
                     <li style={{...styles.description_list_item}}>Рабочее место: {info?.work_place?.name ? info?.work_place?.name : '-'}</li>
                     <li style={{...styles.description_list_item}}>Коммуникация с
                        клиентами: {info?.customer_communications?.name ? info?.customer_communications?.name : '-'}
                     </li>
                     <li style={{...styles.description_list_item}}>Коммуникация с
                        руководителем: {info?.supervisor_communications?.name ? info?.supervisor_communications?.name : '-'}
                     </li>
                     <li style={{...styles.description_list_item}}>Полномочия: {info?.credentials ? info?.credentials : '-'}</li>
                     <li style={{...styles.description_list_item}}>Командировки: {info?.missions ? info?.missions : '-'}</li>
                     <li style={{...styles.description_list_item}}>Возможность карьерного
                        роста: {info?.opportunities ? info?.opportunities : '-'}
                     </li>
                  </ul>
               </div>
               {/*Образование*/}
               <div style={styles.description}>
                  <span style={styles.description_name}>Образование:</span>
                  <ul style={{...styles.description_list}}>
                     <li>{info?.education?.name ? info?.education?.name : '-'}</li>
                  </ul>
               </div>
               {/*Права и Авто:*/}
               <div style={{...styles.description}}>
                  <span style={styles.description_name}>Права и Авто:</span>
                  <ul style={{...styles.description_list}}>
                     <li style={{...styles.description_list_item}}>Права необходими - {info.driver_license}</li>
                     <li style={{...styles.description_list_item}}>
                        Нужен свой автомобтль - {info.car_available ? info.car_available : 'Нет'}
                     </li>
                     <li style={{...styles.description_list_item}}>
                        Категории: {info?.driver_categories.length > 0 ? info?.driver_categories?.map(({name}) => name).join(', ') : '-'}
                     </li>
                  </ul>
               </div>
               {/*Компетенции*/}
               <div style={{...styles.description}}>
                  <span style={styles.description_name}>Компетенции:</span>
                  <ul style={{...styles.description_list}}>
                     {info?.competencies?.length > 0 ? info?.competencies?.map(el => (
                        <li style={{...styles.description_list_item}} key={el.idItem}>{el.name}</li>
                     )) : <span>-</span>}
                  </ul>
               </div>
               {/*Компенсационный пакет:*/}
               <div style={{...styles.description}}>
                  <span style={styles.description_name}>Компенсационный пакет:</span>
                  <ul style={{...styles.description_list}}>
                     {info?.compensation_package?.length > 0 ? info?.compensation_package?.map(el => (
                        <li style={{...styles.description_list_item}} key={el.idItem}>{el.name}</li>
                     )) : <span>-</span>}
                  </ul>
               </div>
               {/*Личные качества*/}
               <div style={{...styles.description}}>
                  <span style={styles.description_name}>Личные качества:</span>
                  <ul style={{...styles.description_list}}>
                     {info?.personal_qualities?.length > 0 ? info?.personal_qualities?.map(el => (
                        <li style={{...styles.description_list_item}} key={el.idItem}>{el.name}</li>
                     )) : <span>-</span>}
                  </ul>
               </div>
               {/*Критерии:*/}
               <div style={{...styles.description}}>
                  <span style={styles.description_name}>Критерии:</span>
                  <ul style={{...styles.description_list}}>
                     {info?.criteria?.length > 0 ? info?.criteria?.map(el => (
                        <li style={{...styles.description_list_item}} key={el.id}>{el.name} -
                           приоритет: <strong>{getPriorityName(lists?.s_priority, el.priority)}</strong></li>
                     )) : <span>-</span>}
                  </ul>
               </div>
            </div>
            <span style={{margin: '24px 0', background: 'rgb(203, 213, 226)', width: '100%', height: 1, display: 'block'}}/>
         </div>
         
         <div style={{...styles.block}}>
            
            <div style={{...styles.description}}>
               <span style={styles.description_name}>Отправить на согласование: </span>
               {users.length > 0 ? users.map(el => (
                  <li style={{...styles.description_list_item}} key={el.id}>{el.name} - {el.description}</li>
               )) : <span> - </span>}
            </div>
            
            <div style={{...styles.description}}>
               <span style={styles.description_name}>Автор:</span>
               <p style={{...styles.description_list_item}}>{user.name} {user.sname}</p>
            </div>
            
            <div style={{...styles.description}}>
               <span style={styles.description_name}>Заказчик:</span>
               <p style={{...styles.description_list_item}}>Імя та прізвище Заказчика</p>
            </div>
            
            {company && (
               <>
                  <div style={{...styles.description}}>
                     <span style={styles.description_name}>Компания:</span>
                     <p style={{...styles.description_list_item}}>Название: {company.companyName}</p>
                     <p style={{...styles.description_list_item}}>Код: {company.kod}</p>
                     {company.s_activity?.name &&
                     <p style={{...styles.description_list_item}}>Сфера деятельности: {company.s_activity.name}</p>}
                     {company.s_organizational_structure?.name &&
                     <p style={{...styles.description_list_item}}>Структура: {company.s_organizational_structure.name}</p>}
                     {company.s_workers?.name &&
                     <p style={{...styles.description_list_item}}>Количество сотрудников: {company.s_workers.name}</p>}
                  </div>
                  <div style={{...styles.description}}>
                     <span style={styles.description_name}>Директор:</span>
                     <p style={{...styles.description_list_item}}>Імя та прізвище Директора</p>
                  </div>
                  <div style={{...styles.description}}>
                     <span style={styles.description_name}>Название отдела:</span>
                     <p style={{...styles.description_list_item}}>{info.department_name}</p>
                  </div>
               </>
            )}
         </div>
      </>
   );
}

export default PreviewVacancyPrint;


