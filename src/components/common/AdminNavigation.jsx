import { ADMIN_DASHBOARD } from '@/constants/routes';
import logo from '@/images/alaya-arts-removebg.png';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import UserAvatar from '@/views/account/components/UserAvatar';
import { BarChartOutlined, BarsOutlined } from '@ant-design/icons';

const AdminNavigation = () => {
  const { isAuthenticating, profile } = useSelector((state) => ({
    isAuthenticating: state.app.isAuthenticating,
    profile: state.profile
  }));
  
  return (
    <nav className="navigation navigation-admin">
      <div className="logo d-flex">
        <Link to={ADMIN_DASHBOARD} style={{ display: 'flex', alignItems: 'center' }}>
          <img alt="Logo" src={logo} />
          <h3>ADMIN PANEL</h3>
        </Link>
      <BarsOutlined className='menu_bar' style={{}} />
      </div>
      <ul className="navigation-menu">
        <li className="navigation-menu-item">
          <UserAvatar
            isAuthenticating={isAuthenticating}
            profile={profile}
          />
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavigation;
