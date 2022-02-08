import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import FormCreateTaskMain from "@/components/form/FormCreateTask/FormCreateTaskMain.jsx";
import FormAddUser from "@/components/form/FormAddUser/FormAddUser.jsx";
import FormCreateTaskDescription from "@/components/form/FormCreateTask/FormCreateTaskDescription.jsx";
import FormTaskView from "@/components/form/FormCreateTask/FormTaskView.jsx";
import {setTaskInfo} from "@store/actions/tasks-actions";

export const useAddTasksSteps = () => {
   const dispatch = useDispatch();
   const {
      tasks: {info: taskInfo}
   } = useSelector(state => ({
      tasks: state.tasks,
   }));
   const [isVisibleAddTask, setIsVisibleAddTask] = useState(false);
   
   const [currentTasksStep, setCurrentTasksStep] = useState(1);
   const [isDuplicateTask, setIsDuplicateTask] = useState(false);
   const [isSendDuplicateTask, setIsSendDuplicateTask] = useState(false);
   const [isSuccessAddTask, setIsSuccessAddTask] = useState(false);
   
   const addUsers = users => {
      dispatch(setTaskInfo(users));
      setCurrentTasksStep(currentTasksStep + 1)
   };
   
   const tasksSteps = [
      {
         id: 1,
         content: <FormCreateTaskMain step={currentTasksStep} changeStep={setCurrentTasksStep}/>,
         description: 'Общее',
      },
      {
         id: 2,
         content: <FormAddUser
            info={taskInfo}
            onSubmitForm={addUsers}
            onCancel={() => setCurrentTasksStep(currentTasksStep - 1)}
            cancelText='Отмена'/>,
         description: 'Участники',
      },
      {
         id: 3,
         content: <FormCreateTaskDescription step={currentTasksStep} changeStep={setCurrentTasksStep}/>,
         description: 'Дополнительно',
      },
      {
         id: 4,
         content: <FormTaskView step={currentTasksStep} changeStep={setCurrentTasksStep} isDuplicate={isSendDuplicateTask}
                                changeIsDuplicate={setIsSendDuplicateTask}/>,
         description: 'Просмотр',
      },
   ];
   
   const resetTasksSteps = () => {
      setIsVisibleAddTask(false)
      setIsDuplicateTask(false);
      setIsSuccessAddTask(false);
      setIsSendDuplicateTask(false);
      setCurrentTasksStep(1);
   };
   
   useEffect(() => {
      if (currentTasksStep === 0) {
         resetTasksSteps();
      } else if (currentTasksStep > tasksSteps.length) {
         if (isSendDuplicateTask) {
            setIsDuplicateTask(true)
         } else {
            setIsSuccessAddTask(true)
            // todo add async fn to add task
         }
      }
   }, [currentTasksStep]);
   
   return {
      isVisibleAddTask,
      changeVisibleAddTask: setIsVisibleAddTask,
      
      tasksSteps,
      currentTasksStep,
      changeTasksStep: setCurrentTasksStep,
      
      isDuplicateTask,
      changeIsDuplicateTask: setIsDuplicateTask,
      
      isSuccessAddTask,
      changeIsSuccessAddTask: setIsSuccessAddTask,
      
      resetTasksSteps,
   }
};