import React from 'react';
import SearchIcon from '@img/icons/search.svg';
import UserIcon from '@img/user.png';
import { observer } from 'mobx-react-lite';
import ContextMenu from '@/components/feature/menus/ContextMenu.jsx';

const Header = () => {
  // const history = useHistory()

  // const userOut = () => {
  //    delCookies()
  //    permission.changePermission()
  //    history.push('/')
  // }
  return (
    <header className="header">
      <div className="header__content">
        <div className="header__search-block search _flex-row_center">
          <img className="search__icon" src={SearchIcon} alt="search" />
          <input
            className="search__input"
            type="text"
            name="search"
            placeholder="Поиск"
          />
        </div>

        <div className="header__user-block user _flex-row_center ">
          {/*<img className='user__icon' src={user?.icon ? user?.icon : UserIcon } alt="user-icon"/>*/}
          <img className="user__icon" src={UserIcon} alt="user-icon" />
          <div className="user__name">Vadim</div>
          <ContextMenu />

          {/*<p onClick={userOut} >Выйти</p>*/}
        </div>
      </div>
    </header>
  );
};

export default observer(Header);
