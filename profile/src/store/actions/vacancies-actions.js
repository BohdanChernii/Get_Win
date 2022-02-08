import {INIT_VACANCIES, SET_VACANCIES_SUCCESS} from "@store/types";

export const getVacancies = () => dispatch => {
   dispatch({type: INIT_VACANCIES})
   const remainders = [
      {
         id: 2,
         name: 'Дизайнер',
         tested: `4`,
         interviewed: `5`,
      },
      {
         id: 1,
         name: 'Юрист',
         feedback: `2`,
         called: `3`,
      },
      {
         id: 3,
         name: 'Финансист',
         feedback: `2`,
         interviewed: `5`,
      },
      {
         id: 3,
         name: 'Full Stack Developer',
         called: `2`,
      },
      {
         id: 3,
         name: 'Front-End',
         tested: `4`,
      }
   ]
   const vacancies = [
      {
         id: 1,
         key: 1,
         name: 'Юрист',
         feedback: `2`,
         called: `3`,
         tested: `4`,
         interviewed: `5`,
      },
      {
         id: 2,
         key: 2,
         name: 'Дизайнер',
         feedback: `2`,
         called: `3`,
         tested: `4`,
         interviewed: `5`,
      },
      {
         id: 3,
         key: 3,
         name: 'Full Stack Developer',
         feedback: `2`,
         called: `3`,
         tested: `4`,
         interviewed: `5`,
      },
      {
         id: 4,
         key: 4,
         name: 'Финансист',
         feedback: `2`,
         called: `3`,
         tested: `4`,
         interviewed: `5`,
      },
      {
         id: 5,
         key: 5,
         name: 'Front-End',
         feedback: `2`,
         called: `3`,
         tested: `4`,
         interviewed: `5`,
      },
   ]
   dispatch({
      type: SET_VACANCIES_SUCCESS,
      payload: {vacancies, remainders}
   })
}
