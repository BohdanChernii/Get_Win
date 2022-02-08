import React, { useEffect, useRef, useState } from 'react';
import CameraIcon from '@img/icons/camera.svg';
import HiddenPasswordIcon from '@img/icons/ic_visible password@3x.png';
import { TippyNumberRegion } from '@/components/feature/tippy/Tippys.jsx';
import {
  input_add_error,
  input_focus_add,
  input_focus_remove,
  input_remove_error,
} from '@scripts/inputsInit';
import { initMask } from '@scripts/initMask';
import { _slideDown, _slideUp } from '@scripts/slides';
import { email_test, password_test } from '@scripts/regulars';
import { convertMD5, handleHideShowPassword } from '@scripts/functions';
import { useRegions } from '@/hooks/useRegion';
import usersStore from '@/store/user-store';
import { observer } from 'mobx-react-lite';
import InfoPersonalDialog from '@/components/feature/modals/InfoPersonalDialog.jsx';

const checkPasswordSymbols = (value) => {
  const checkbox_inputs = document.querySelectorAll('input[type="checkbox"]');
  checkbox_inputs.forEach((checkbox) => {
    if (checkbox.name === 'symbols') {
      value.length >= 8
        ? (checkbox.checked = true)
        : (checkbox.checked = false);
    }
    if (checkbox.name === 'special_symbols') {
      /[!@#$%^&*]/.test(value)
        ? (checkbox.checked = true)
        : (checkbox.checked = false);
    }
    if (checkbox.name === 'capital_letter') {
      /[A-ZА-Я]/.test(value)
        ? (checkbox.checked = true)
        : (checkbox.checked = false);
    }
    if (checkbox.name === 'one_number') {
      /[0-9]/.test(value)
        ? (checkbox.checked = true)
        : (checkbox.checked = false);
    }
  });
};

function PersonalInformationPage() {
  document.title = 'Виртуальный диетолог | Персональные данные';
  const { region, changeRegion, regionNumber } = useRegions();
  const { user, changeUserValue, updateUser, updatePass, updateImg } =
    usersStore;
  const inputs = [...document.querySelectorAll('input')];
  // useState ========================================================
  // const [regions, setRegion] = useState(['ua', 'ru', 'be']);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [imageData, setImageData] = useState(null);

  const [currentPassword, setCurrentPassword] = useState('');
  console.log();
  // useRef ================================================================
  const formRef = useRef(null);
  const HiddenBodyRef = useRef(null);
  const formPreviewRef = useRef(null);
  const formImageRef = useRef(null);

  const [openInfoSelectDates, setOpenInfoSelectDates] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPassUpdate, setIsPassUpdate] = useState(false);
  const [updateUserPass, setUpdateUserPass] = useState(null);

  // handles ============================================================
  const handleOnChangeDialog = () => setOpenInfoSelectDates((prev) => !prev);
  const handleOnChangeRegion = (e) => {
    setPhoneNumber('');
    const typeRegion = e.target.textContent;
    changeRegion(typeRegion);
    setPhoneNumber('');
    const input = document.querySelector('input[name="phone"]');
    input_focus_remove(input);
  };
  const handleOnChangeName = (e) => setName(e.target.value);
  const handleOnChangeEmail = (e) => setEmail(e.target.value.toLowerCase());
  const handleOnChangePhoneNumber = (e) => {
    let newValue = e.target.value.replaceAll(' ', '');
    if (newValue.includes('(') && newValue.includes(')')) {
      newValue = newValue.split('(')[1].replace(')', '');
    }
    setPhoneNumber(newValue);
  };
  const handleOnChangeCurrentPassword = (e) =>
    setCurrentPassword(e.target.value);
  const handleOnChangeNewPassword = ({ target }) => {
    setNewPassword(target.value);
    checkPasswordSymbols(target.value);
  };
  const handleOnChangeRepeatPassword = (e) => setRepeatPassword(e.target.value);
  const handleOnChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (
        !['image/jpeg', 'image/png', 'image/svg', 'image/gif'].includes(
          file.type
        )
      ) {
        alert('Разрешены только изображения.');
        e.target.value = '';
        return;
      }
      setImageData(file);
      const reader = new FileReader();
      reader.onload = function (e) {
        changeUserValue('icon', reader.result);
      };
      reader.onerror = function (e) {
        alert('Ошибка');
      };
      reader.readAsDataURL(file);
    }
  };
  //INPUT
  const handleOnFocusInput = ({ target }) => {
    input_focus_add(target);
    input_remove_error(target);
    if (target.name === 'new_password' && !target.value)
      _slideDown(HiddenBodyRef.current);
  };
  const handleOnBlurInput = ({ target }) => {
    if (!target.value) {
      input_focus_remove(target);
      if (target.name === 'new_password' && !target.value)
        _slideUp(HiddenBodyRef.current);
    }
  };
  // FORM
  const handleOnResetForm = () => {
    setName('');
    setEmail('');
    setPhoneNumber('');
    setCurrentPassword('');
    setNewPassword('');
    setRepeatPassword('');
    const formInputs = [...formRef.current.querySelectorAll('input')];
    formInputs.forEach((input) => {
      input_focus_remove(input);
      input_remove_error(input);
    });
    _slideUp(HiddenBodyRef.current);
    setTimeout(() => {
      setIsSuccess(false);
      setIsPassUpdate(false);
    }, 500);
  };
  const handleOnSubmitForm = async (e) => {
    e.preventDefault();
    const formInputs = [...formRef.current.querySelectorAll('input')];
    let errors = 0;
    const requestObj = {};
    formInputs.forEach((input) => {
      if (input.name === 'name') {
        if (name.length > 2) {
          changeUserValue('name', name.toString());
          requestObj.name = name.toString();
        } else {
          errors++;
          input_add_error(input);
        }
      }
      if (input.name === 'email') {
        if (email_test(email)) {
          changeUserValue('email', email);
          requestObj.email = email;
        } else {
          errors++;
          input_add_error(input);
        }
      }
      if (input.name === 'phone') {
        if (phoneNumber.length > 0) {
          changeUserValue('phone', phoneNumber);
          requestObj.phone = phoneNumber;
        } else {
          errors++;
          input_add_error(input);
        }
      }
      if (input.name === 'current-password') {
        if (input.value) {
          if (
            !convertMD5(currentPassword) ||
            !(newPassword && repeatPassword && newPassword === repeatPassword)
          ) {
            errors++;
            input_add_error(input);
          }
        }
      }
      if (input.name === 'new_password') {
        if (input.value || input.value !== repeatPassword) {
          if (
            !(
              password_test(newPassword) &&
              currentPassword &&
              convertMD5(currentPassword)
            ) ||
            input.value !== repeatPassword
          ) {
            errors++;
            input_add_error(input);
          }
        }
      }
      if (input.name === 'repeat_new_password') {
        if (input.value || input.value !== repeatPassword) {
          if (
            !(
              password_test(newPassword) &&
              newPassword === repeatPassword &&
              currentPassword &&
              convertMD5(currentPassword)
            )
          ) {
            errors++;
            input_add_error(input);
          }
        } else if (input.value !== newPassword) {
          errors++;
          input_add_error(input);
        }
      }
    });
    if (errors === 0) {
      setUpdateUserPass(newPassword);
      setCurrentPassword('');
      setNewPassword('');
      setRepeatPassword('');
      formInputs.forEach((input) => {
        if (input.type === 'password') {
          input_remove_error(input);
          input_focus_remove(input);
          input_focus_remove(input.parentElement);
          input_focus_remove(input.parentElement.parentElement);
        }
      });
      _slideUp(HiddenBodyRef.current);
      if (imageData) {
        const data = new FormData();
        data.append('file', imageData);
        await updateImg(data);
      }

      if (newPassword) {
        setIsPassUpdate(true);
        updatePass(newPassword, 1).then((res) => {
          if (res.ok) {
            !isSuccess && setIsSuccess(true);
          } else {
            !isSuccess && setIsSuccess(false);
          }
          setOpenInfoSelectDates(true);
        });
      }

      updateUser(requestObj).then((res) => {
        if (res.ok) {
          setIsSuccess(true);
        } else {
          !isSuccess && setIsSuccess(false);
        }
        setOpenInfoSelectDates(true);
      });
    }
  };
  // useEffect ============================================================
  useEffect(() => {
    setName(user.name ? user.name : '');
    setEmail(user.email ? user.email : '');
    setPhoneNumber(user.phone ? user.phone : '');
  }, [user]);

  useEffect(() => {
    inputs.forEach((input) => {
      input.value ? input_focus_add(input) : null;
      if (input.classList.contains('_mask')) {
        const typeMask = input.dataset.mask;
        initMask(typeMask, input);
      }
    });
  }, [inputs, region]);

  // functions ============================================================
  return (
    <>
      <div className="headline-box">
        <h2 className="_title">Персональные данные</h2>
      </div>

      <div className="personal-information__body">
        <form
          ref={formRef}
          className="form _center _w400"
          action="#"
          onReset={handleOnResetForm}
          onSubmit={handleOnSubmitForm}
        >
          <div className="form__item">
            <div className="file">
              <div className="file__box">
                <div
                  ref={formPreviewRef}
                  id="formPreview"
                  className="file__preview"
                >
                  {user?.icon ? <img src={user?.icon} alt="user" /> : 'P'}
                </div>
                <button className="file__button _ibg">
                  <img src={CameraIcon} alt="camera" />
                  <input
                    id="formImage"
                    accept=".jpg, .svg, .png, .gif"
                    type="file"
                    name="image"
                    ref={formImageRef}
                    className="file__input"
                    onChange={handleOnChangeImage}
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="form__item">
            <label className="form__subtitle">Имя</label>
            <div className="form__input-container">
              <input
                data-error="Пожалуйста, заполните поле"
                className="form__input input _req"
                type="text"
                name="name"
                value={name}
                onChange={handleOnChangeName}
                onFocus={handleOnFocusInput}
                onBlur={handleOnBlurInput}
              />
              <span className="form__input-span">Марго</span>
            </div>
          </div>
          <div className="form__item">
            <label className="form__subtitle">Email</label>
            <div className="form__input-container">
              <input
                data-error="Пожалуйста, введите правильный email"
                className="form__input input _req"
                type="email"
                name="email"
                value={email}
                onChange={handleOnChangeEmail}
                onFocus={handleOnFocusInput}
                onBlur={handleOnBlurInput}
              />
              <span className="form__input-span">hello.user@gmail.com</span>
            </div>
          </div>
          <div className="form__item">
            <label className="form__subtitle">Номер телефона</label>
            <div className="form__input-container">
              <input
                data-error="Пожалуйста, введите правильный номер телефона"
                data-mask={regionNumber}
                className="form__input input _phone _req _mask"
                type="tel"
                name="phone"
                value={phoneNumber}
                onChange={handleOnChangePhoneNumber}
                onFocus={handleOnFocusInput}
                onBlur={handleOnBlurInput}
              />
              <span className="form__input-span">{regionNumber}</span>
              <TippyNumberRegion
                regions={region}
                changeRegion={handleOnChangeRegion}
              >
                {' '}
              </TippyNumberRegion>
            </div>
          </div>
          <div className="form__item">
            <label className="form__subtitle">Текущий пароль</label>
            <div className="form__input-container">
              <input
                data-error="Пожалуйста, введите правильный пароль или все поля с паролями"
                className="form__input input _req"
                type="password"
                name="current-password"
                data="password"
                value={currentPassword}
                onChange={handleOnChangeCurrentPassword}
                onFocus={handleOnFocusInput}
                onBlur={handleOnBlurInput}
              />
              <span className="form__input-span form__input-span_password">
                •••••••••••••
              </span>
              <div className="form__viewpass-container">
                <img
                  className=""
                  src={HiddenPasswordIcon}
                  alt="hidden_password"
                  onClick={handleHideShowPassword}
                />
                <span className="form__viewpass"> </span>
              </div>
            </div>
          </div>
          <div className="form__item">
            <label className="form__subtitle">Новый пароль</label>
            <div className="form__input-container">
              <input
                data-error="Пожалуйста, введите правильный пароль или все поля с паролями"
                className="form__input input _req"
                type="password"
                name="new_password"
                data="password"
                value={newPassword}
                onChange={handleOnChangeNewPassword}
                onFocus={handleOnFocusInput}
                onBlur={handleOnBlurInput}
              />
              <span className="form__input-span form__input-span_password">
                •••••••••••••
              </span>
              <div className="form__viewpass-container">
                <img
                  className=""
                  src={HiddenPasswordIcon}
                  alt="hidden_password"
                  onClick={() => {
                    handleHideShowPassword();
                  }}
                />
                <span className="form__viewpass"> </span>
              </div>
            </div>

            <div ref={HiddenBodyRef} className="password-box__hidden-body">
              <div className="checkbox-container">
                <input
                  className="checkbox-container__checkbox"
                  type="checkbox"
                  name="symbols"
                  id="symbols"
                />
                <label htmlFor="symbols" className="checkbox-container__label">
                  Не менее 8 символов
                </label>
              </div>
              <div className="checkbox-container">
                <input
                  className="checkbox-container__checkbox"
                  type="checkbox"
                  name="special_symbols"
                  id="special_symbols"
                />
                <label
                  htmlFor="special_symbols"
                  className="checkbox-container__label"
                >
                  Один специальный символ (! @ # $ % ^ & *)
                </label>
              </div>
              <div className="checkbox-container">
                <input
                  className="checkbox-container__checkbox"
                  type="checkbox"
                  name="capital_letter"
                  id="capital_letter"
                />
                <label
                  htmlFor="capital_letter"
                  className="checkbox-container__label"
                >
                  Одна заглавная буква
                </label>
              </div>
              <div className="checkbox-container">
                <input
                  className="checkbox-container__checkbox"
                  type="checkbox"
                  name="one_number"
                  id="one_number"
                />
                <label
                  htmlFor="one_number"
                  className="checkbox-container__label"
                >
                  Одна цифра
                </label>
              </div>
            </div>
          </div>
          <div className="form__item">
            <label className="form__subtitle">Повторите пароль</label>
            <div className="form__input-container">
              <input
                data-error="Пожалуйста, введите правильный пароль или все поля с паролями"
                className="form__input input _req"
                type="password"
                name="repeat_new_password"
                data="password"
                value={repeatPassword}
                onChange={handleOnChangeRepeatPassword}
                onFocus={handleOnFocusInput}
                onBlur={handleOnBlurInput}
              />
              <span className="form__input-span form__input-span_password">
                •••••••••••••
              </span>
              <div className="form__viewpass-container">
                <img
                  className=""
                  src={HiddenPasswordIcon}
                  alt="hidden_password"
                  onClick={handleHideShowPassword}
                />
                <span className="form__viewpass"> </span>
              </div>
            </div>
          </div>
          <div className="form__buttons">
            <button
              type="reset"
              className="form__button _btn-reset _btn _main-btn _grey-btn"
            >
              Отменить
            </button>
            <button
              type="submit"
              className="form__button _btn _main-btn _orange-btn "
            >
              Сохранить
            </button>
          </div>
        </form>
      </div>
      <InfoPersonalDialog
        open={openInfoSelectDates}
        changeDialog={handleOnChangeDialog}
        isSuccess={isSuccess}
        isPassUpdate={isPassUpdate}
        newPass={updateUserPass}
      />
    </>
  );
}

export default observer(PersonalInformationPage);
