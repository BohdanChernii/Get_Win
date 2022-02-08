import React from 'react';
import {Avatar} from "antd";
import {useSelector} from "react-redux";
import {bool} from "prop-types";

UserAvatar.propTypes = {
   isCollapsed: bool
};

function UserAvatar({isCollapsed}) {
   const {user} = useSelector(state => state.user);
   const name = user && user.name || 'User';
   const rang = user && user.rang.name || 'Person';
   return (
      <div className={isCollapsed ? "user is_collapsed" : 'user'}>
         <Avatar className='user__avatar'
                 size={40}
                 children={name[0].toUpperCase()}
                 style={{backgroundColor: '#6D6BE5'}}
         />
         <div className="user__block">
            <p className="user__name">{name}</p>
            <span className='user__position'>{rang}</span>
         </div>
      </div>
   );
}

export default UserAvatar;