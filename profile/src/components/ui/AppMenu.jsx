import React from 'react';
import {bool, func, string} from "prop-types";
import {Menu} from "antd";
import {useSelector} from "react-redux";
import {menuLinks} from "@assets/helpers/menu.jsx";
import {companyStatus} from "@assets/helpers/constants";

AppMenu.propTypes = {
   isCollapsed: bool,
   menuIdx: string,
   setMenuIdx: func
};

function AppMenu({isCollapsed, menuIdx, setMenuIdx}) {
   const {org, rang, step} = useSelector(state => state.user.user);
   const company = useSelector(state => state.company.company);
   
   const handleOnSelect = ({key}) => {
      setMenuIdx(key)
   }
   
   return (
      <Menu
         className={isCollapsed ? 'sider__menu menu is_collapsed' : 'sider__menu menu'}
         defaultSelectedKeys={['1']}
         selectedKeys={[menuIdx]}
         onSelect={handleOnSelect}>
         
         {menuLinks.map(link => (
            <Menu.Item key={link.id.toString()}
                       icon={link.icon}
                       className='menu__item'
                       disabled={
                          rang.name === 'Пользователь' && Number(step) === 3
                             ? true
                             : link.isCompanySynchronise && company?.status !== companyStatus.SUCCESS}
            >
               {link.title}
            </Menu.Item>
         ))}
      </Menu>
   
   );
}

export default AppMenu;