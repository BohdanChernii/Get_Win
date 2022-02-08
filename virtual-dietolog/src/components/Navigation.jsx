import React from 'react';
import { NavLink } from 'react-router-dom';
//  style={{display: "none"}}
const Navigation = () => {
  return (
    <aside className="aside">
      <nav className="nav">
        <h2 className="nav__project-name">Virtual Nutritionist</h2>
        <ul className="nav__list">
          <li className="nav__item _flex-column_start">
            <p className="nav__name ">Профиль</p>
            <NavLink
              className="nav__link personal-information"
              exact
              to="/personal-information"
            >
              Персональные данные
            </NavLink>
            <NavLink className="nav__link questionnaire" to="/questionnaire">
              Анкета
            </NavLink>
          </li>
          <li className="nav__item _flex-column_start">
            <p className="nav__name">Главная</p>
            <NavLink className="nav__link target" to="/target">
              Цель
            </NavLink>
            <NavLink className="nav__link meal-plan" to="/food-basket">
              Настройка продуктовой корзины
            </NavLink>
            <NavLink className="nav__link activity" to="/activity">
              Активности
            </NavLink>
          </li>
          <li className="nav__item _flex-column_start">
            <p className="nav__name">Сеты</p>
            <NavLink className="nav__link set-selection" to="/set-selection">
              Подбор сета
            </NavLink>
            <NavLink className="nav__link approved-sets" to="/approved-sets">
              Утвержденные сеты
            </NavLink>
            <NavLink
              className="nav__link statistics-on-sets"
              to="/statistics-on-sets"
            >
              Статистика по сетам
            </NavLink>
          </li>
          <li className="nav__item _flex-column_start">
            <p className="nav__name">Питательные вещества</p>
            <NavLink
              className="nav__link macro-nutrients"
              to="/macro-nutrients"
            >
              Макрунутриенты
            </NavLink>
            <NavLink
              className="nav__link micro-nutrients"
              to="/micro-nutrients"
            >
              Микрунутриенты
            </NavLink>
          </li>
          <li className="nav__item _flex-column_start">
            <p className="nav__name">Дополнительные сведения</p>
            <NavLink
              className="nav__link nutritional-features"
              to="/nutritional-features"
            >
              Особенности питания
            </NavLink>
            <NavLink
              className="nav__link excluded-products"
              to="/excluded-products"
            >
              Исключенные продукты
            </NavLink>
            <NavLink
              className="nav__link statistics-on-period"
              to="/statistics-on-period"
            >
              Статистика за период
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Navigation;
