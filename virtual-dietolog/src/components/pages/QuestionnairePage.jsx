import React, { useEffect, useState } from 'react';
import GenderInputs from '@/components/feature/inputs/GenderInputs.jsx';
import {
  input_add_error,
  input_focus_add,
  input_focus_remove,
  input_remove_error,
} from '@scripts/inputsInit';
import { TippyActivityInfo } from '@/components/feature/tippy/Tippys.jsx';
import ActivityInputs from '@/components/feature/inputs/ActivityInputs.jsx';
import DateInput from '@/components/feature/inputs/DateInput.jsx';
import { observer } from 'mobx-react-lite';
import userStore from '@/store/user-store';
import QuestionnaireDialog from '@/components/feature/modals/QuestionnaireDialog.jsx';
import moment from 'moment';
import calcStore from '@store/calc-store';

const handleOnBlurInput = (e) =>
  !e.target.value ? input_focus_remove(e.target) : null;
const handleOnFocusInput = (e) => {
  input_focus_add(e.target);
  input_remove_error(e.target);
};

function QuestionnairePage() {
  document.title = 'Виртуальный диетолог | Анкета';
  const { user, changeUserValue, updateUser } = userStore;
  const { fetchCalc } = calcStore;
  const inputs = [...document.querySelectorAll('input')];
  const [openDialog, setOpenDialog] = useState(false);
  const handleOnChangeDialog = () => {
    setOpenDialog((prev) => !prev);
  };
  // birthday ===========================================
  const [birthday, setBirthday] = useState(null);
  const [isBirthdaySelectError, setIsBirthdaySelectError] = useState(false);
  const handleChangeBirthday = (name, date) => {
    setBirthday(moment(date).format('YYYY-MM-DD'));
    setIsBirthdaySelectError(false);
  };
  // height ===========================================
  const [height, setHeight] = useState('');
  const handleChangeHeight = (e) => setHeight(e.target.value);

  // weight ===========================================
  const [weight, setWeight] = useState('');
  const handleChangeWeight = (e) => setWeight(e.target.value);

  // genders ===========================================
  const [genders, setGenders] = useState([
    {
      id: 1,
      value: '1',
      name: 'gender',
      text: 'Мужчина',
      selected: false,
    },
    {
      id: 2,
      value: '2',
      name: 'gender',
      text: 'Женщина',
      selected: false,
    },
  ]);
  const [isSelectGenderError, setIsSelectGenderError] = useState(false);
  const handleOnChangeGender = (id) => {
    setIsSelectGenderError(false);
    setGenders(
      genders.map((input) => {
        input.selected = false;
        if (input.id === id) {
          input.selected = !input.selected;
        }
        return input;
      })
    );
  };

  // activityLevel ===========================================
  const [activityLevel, setActivityLevel] = useState([
    {
      id: 1,
      value: '1',
      name: 'activity',
      text: 'Сидячий образ жизни',
      selected: false,
    },
    {
      id: 2,
      value: '2',
      name: 'activity',
      text: 'Легкие физ нагрузки',
      selected: false,
    },
    {
      id: 3,
      value: '3',
      name: 'activity',
      text: 'Интенсивные физ нагрузки',
      selected: false,
    },
  ]);
  const [isSelectActivityLevelError, setIsSelectActivityLevelError] =
    useState(false);
  const handleOnChangeLevel = (id) => {
    setIsSelectActivityLevelError(false);
    setActivityLevel(
      activityLevel.map((input) => {
        input.selected = false;
        if (input.id === id) {
          input.selected = !input.selected;
        }
        return input;
      })
    );
  };
  useEffect(() => {
    setBirthday(user.bdate && new Date(user.bdate));
    setHeight(user.height ? user.height : '');
    setWeight(user.weight ? user.weight : '');
    setGenders((prevState) =>
      prevState.map((gender) => {
        if (user.id_sex === gender.value) {
          gender.selected = true;
        }
        return gender;
      })
    );
    setActivityLevel((prevState) =>
      prevState.map((level) => {
        if (user.id_act === level.value) {
          level.selected = true;
        }
        return level;
      })
    );
  }, [user]);
  useEffect(() => {
    inputs.forEach((input) => (input.value ? input_focus_add(input) : null));
  }, [inputs]);
  // FORM
  const handleOnResetForm = () => {
    setIsBirthdaySelectError(false);
    setIsSelectActivityLevelError(false);
    setIsSelectGenderError(false);
    setBirthday(null);
    setGenders(
      genders.map((input) => {
        input.selected = false;
        return input;
      })
    );
    setActivityLevel(
      activityLevel.map((input) => {
        input.selected = false;
        return input;
      })
    );
    setHeight('');
    setWeight('');
    const formInputs = [...document.querySelectorAll('input')];
    formInputs.forEach((input) => {
      input_focus_remove(input);
      input_remove_error(input);
    });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const inputs = [...document.querySelectorAll('input')];
    let errors = 0;
    const requestObj = {};
    inputs.forEach((input) => {
      if (input.name === 'date') {
        if (input.value !== '') {
          changeUserValue('bdate', birthday);
          requestObj.bdate = birthday;
        } else {
          errors++;
          input_add_error(input);
          setIsBirthdaySelectError(true);
        }
      }
      if (input.name === 'height') {
        if (input.value !== '') {
          changeUserValue('height', height);
          requestObj.height = height;
        } else {
          errors++;
          input_add_error(input);
        }
      }
      if (input.name === 'weight') {
        if (input.value !== '') {
          changeUserValue('weight', weight);
          requestObj.weight = weight;
        } else {
          errors++;
          input_add_error(input);
        }
      }
      if (input.name === 'gender') {
        const [selectGender] = genders.filter((gender) => gender.selected);
        if (selectGender) {
          changeUserValue('id_sex', selectGender.value);
          requestObj.id_sex = selectGender.value;
        } else {
          errors++;
          setIsSelectGenderError(true);
        }
      }
      if (input.name === 'activity') {
        const [activity] = activityLevel.filter((level) => level.selected);

        if (activity) {
          changeUserValue('id_act', activity.value);
          requestObj.id_act = activity.value;
        } else {
          errors++;
          setIsSelectActivityLevelError(true);
        }
      }
    });
    if (errors === 0) {
      updateUser(requestObj).then((res) => {
        if (res.ok) {
          fetchCalc();
          // !isSuccess && setIsSuccess(true)
          // setOpenInfoSelectDates(true)
        } else {
          // !isSuccess && setIsSuccess(false)
          // setOpenInfoSelectDates(true)
        }
      });
      setOpenDialog(true);
    }
  };
  return (
    <>
      <div className="headline-box">
        <h2 className="_title">Анкета</h2>
      </div>

      <div className="questionnaire">
        <form
          className="form"
          action="#"
          onReset={handleOnResetForm}
          onSubmit={handleOnSubmit}
        >
          <div className="form__column _w400 ">
            <div className={birthday ? 'form__item _focus' : 'form__item'}>
              <label className="form__subtitle ">День рождения</label>

              <div className="form__input-container">
                <DateInput
                  value={birthday ? new Date(birthday) : birthday}
                  isError={isBirthdaySelectError}
                  changeDate={handleChangeBirthday}
                ></DateInput>
              </div>
            </div>
            <div className="form__item">
              <label className="form__subtitle">Ваш рост (см)</label>
              <div className="form__input-container">
                <input
                  data-error="Пожалуйста, заполните поле"
                  data-value="Ваш рост (см)"
                  className="form__input input _req"
                  type="number"
                  name="height"
                  value={height}
                  onChange={handleChangeHeight}
                  onFocus={handleOnFocusInput}
                  onBlur={handleOnBlurInput}
                />
                <span className="form__input-span">напр. 175</span>
              </div>
            </div>

            <div className="form__item">
              <label className="form__subtitle">Ваш вес (кг)</label>
              <div className="form__input-container">
                <input
                  data-error="Пожалуйста, заполните поле"
                  data-value="Ваш вес (кг)"
                  className="form__input input _req"
                  type="number"
                  name="weight"
                  value={weight}
                  onChange={handleChangeWeight}
                  onFocus={handleOnFocusInput}
                  onBlur={handleOnBlurInput}
                />
                <span className="form__input-span">напр. 75</span>
              </div>
            </div>
          </div>
          <div className="form__column">
            <div className="form__item">
              {!isSelectGenderError ? (
                <label className="_subtitle">Какой Ваш пол?</label>
              ) : (
                <label className="_subtitle _error">
                  Пожалуйста, выберите свой пол.
                </label>
              )}

              <GenderInputs
                genders={genders}
                changeGender={handleOnChangeGender}
              />
            </div>
            <div className="form__item">
              {!isSelectActivityLevelError ? (
                <label className="_subtitle">Ваш уровень активности?</label>
              ) : (
                <label className="_subtitle _error">
                  Пожалуйста, выберите уровень активности
                </label>
              )}
              <TippyActivityInfo />
              <ActivityInputs
                levels={activityLevel}
                changeLevel={handleOnChangeLevel}
              />
            </div>
          </div>

          <div className="form__buttons">
            <button
              type="reset"
              className="form__button _btn _main-btn _grey-btn"
            >
              Отменить
            </button>
            <button
              type="submit"
              className="form__button _btn _main-btn _orange-btn"
            >
              Сохранить
            </button>
            <QuestionnaireDialog
              userWeight={weight}
              open={openDialog}
              changeDialog={handleOnChangeDialog}
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default observer(QuestionnairePage);
