import React, {useEffect} from "react";
import {Table} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {getVacancies,} from "@store/actions/vacancies-actions";
import Remainder from "@/components/ui/Remainder/Remainder.jsx";
import {companyStatus} from "@assets/helpers/constants";

function HomeDataTable({setMenuIdx}) {
   const dispatch = useDispatch();
   const {
      user: {isDisabled, user},
      vacancies: {vacancies, loading},
      company: {company}
   } = useSelector((state) => ({
      user: state.user,
      vacancies: state.vacancies,
      company: state.company
   }));
   const goToMyCompany = () => setMenuIdx("2");
   const title = () => (<span className='app-table__title'>Актуальные данные</span>);
   const footer = () => <span>Нет данных. Заполните информацию о <span onClick={goToMyCompany}
                                                                       className='link'>Компании</span></span>;
   const columns = [
      {
         title: "Вакансии",
         dataIndex: "name",
         className: "app-table__column _vacancies",
      },
      {
         title: "Новые отклики",
         dataIndex: "feedback",
         className: "app-table__column _vacancies",
         sorter: (a, b) => a.feedback - b.feedback,
         render: (text, record) => <Remainder text={text} record={record} type='feedback'/>,
      },
      {
         title: "Ожидают звонка",
         dataIndex: "called",
         className: "app-table__column _vacancies",
         sorter: (a, b) => a.called - b.called,
         render: (text, record) => <Remainder text={text} record={record} type='called'/>,
      },
      {
         title: "Прошли тестирование",
         dataIndex: "tested",
         className: "app-table__column _vacancies",
         sorter: (a, b) => a.tested - b.tested,
         render: (text, record) => <Remainder text={text} record={record} type='tested'/>,
      },
      {
         title: "Ожидают собеседование",
         dataIndex: "interviewed",
         className: "app-table__column _vacancies",
         sorter: (a, b) => a.interviewed - b.interviewed,
         render: (text, record) => <Remainder text={text} record={record} type='interviewed'/>,
      },
   ];
   
   useEffect(() => {
      if (vacancies.length === 0) {
         new Promise((resolve) => {
            setTimeout(() => {
               resolve(dispatch(getVacancies()));
            }, 1500);
         });
      }
   }, []);
   
   return (
      <Table
         className='app-table'
         size='middle'
         columns={columns}
         dataSource={(company?.status === companyStatus.SUCCESS && !isDisabled) && vacancies}
         // footer={vacancies?.length === 0 ? footer : null}
         footer={footer}
         title={title}
         pagination={false}
         loading={loading}
         scroll={{x: false}}
         onRow={record => ({style: {backgroundColor: record.key % 2 ? "#EDF2FF70" : "#fff"}})}
      />
   );
}

export default HomeDataTable;