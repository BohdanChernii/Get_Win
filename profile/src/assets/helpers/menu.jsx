import React from "react";
import Home from "@/components/pages/Home/Home.jsx";
import HomeIcon from "@/components/icons/menu/HomeIcon.jsx";

import MyCompany from "@/components/pages/MyCompany/MyCompany.jsx";
import MyCompanyIcon from "@/components/icons/menu/MyCompanyIcon.jsx";

import PersonnelSelection from "@/components/pages/PersonnelSelection/PersonnelSelection.jsx";
import PersonnelSelectionIcon from "@/components/icons/menu/PersonnelSelectionIcon.jsx";

import StaffAdaptation from "@/components/pages/StaffAdaptation/StaffAdaptation.jsx";
import StaffAdaptationIcon from "@/components/icons/menu/StaffAdaptationIcon.jsx";

import PersonnelEvaluation from "@/components/pages/PersonnelEvaluation/PersonnelEvaluation.jsx";
import PersonnelEvaluationIcon from "@/components/icons/menu/PersonnelEvaluationIcon.jsx";

import PerformersEvaluation from "@/components/pages/PerformersEvaluation/PerformersEvaluation.jsx";
import PerformersEvaluationIcon from "@/components/icons/menu/PerformersEvaluationIcon.jsx";

import HrAdministration from "@/components/pages/HrAdministration/HrAdministration.jsx";
import HrAdministrationIcon from "@/components/icons/menu/HrAdministrationIcon.jsx";

import StaffTraining from "@/components/pages/StaffTraining/StaffTraining.jsx";
import StaffTrainingIcon from "@/components/icons/menu/StaffTrainingIcon.jsx";

import HrAnalytics from "@/components/pages/HrAnalytics/HrAnalytics.jsx";
import HrAnalyticsIcon from "@/components/icons/menu/HrAnalyticsIcon.jsx";

import Surveys from "@/components/pages/Surveys/Surveys.jsx";
import SurveysIcon from "@/components/icons/menu/SurveysIcon.jsx";

import Tasks from "@/components/pages/Tasks/Tasks.jsx";
import TasksIcon from "@/components/icons/menu/TasksIcon.jsx";

import Settings from "@/components/pages/Settings/Settings.jsx";
import SettingsIcon from "@/components/icons/menu/SettingsIcon.jsx";


export const menuLinks = [
   {
      id: 1,
      title: 'Главная',
      isCompanySynchronise: false,
      icon: <HomeIcon/>,
      component: <Home/>,
   },
   {
      id: 2,
      title: 'Моя компания',
      isCompanySynchronise: false,
      icon: <MyCompanyIcon/>,
      component: <MyCompany/>,
   },
   {
      id: 3,
      title: 'Отбор персонала',
      isCompanySynchronise: true,
      icon: <PersonnelSelectionIcon/>,
      component: <PersonnelSelection/>,
   },
   {
      id: 4,
      title: 'Адаптация персонала',
      isCompanySynchronise: true,
      icon: <StaffAdaptationIcon/>,
      component: <StaffAdaptation/>,
   },
   {
      id: 5,
      title: 'Оценка персонала',
      isCompanySynchronise: true,
      icon: <PersonnelEvaluationIcon/>,
      component: <PersonnelEvaluation/>,
   },
   {
      id: 6,
      title: 'Оценка исполнителя',
      isCompanySynchronise: true,
      icon: <PerformersEvaluationIcon/>,
      component: <PerformersEvaluation/>,
   },
   {
      id: 7,
      title: 'HR-администрирование',
      isCompanySynchronise: true,
      icon: <HrAdministrationIcon/>,
      component: <HrAdministration/>,
   },
   {
      id: 8,
      title: 'Обучение персонала',
      isCompanySynchronise: true,
      icon: <StaffTrainingIcon/>,
      component: <StaffTraining/>,
   },
   {
      id: 9,
      title: 'HR-аналитика',
      isCompanySynchronise: true,
      icon: <HrAnalyticsIcon/>,
      component: <HrAnalytics/>,
   },
   {
      id: 10,
      title: 'Опросы',
      isCompanySynchronise: true,
      icon: <SurveysIcon/>,
      component: <Surveys/>,
   },
   {
      id: 11,
      title: 'Мои задачи',
      isCompanySynchronise: true,
      icon: <TasksIcon/>,
      component: <Tasks/>,
   },
   {
      id: 12,
      title: 'Настройки',
      isCompanySynchronise: false,
      icon: <SettingsIcon/>,
      component: <Settings/>,
   },
]