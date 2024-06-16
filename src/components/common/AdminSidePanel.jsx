import { ADMIN_PRODUCTS, ADMIN_ORDERS,ADMIN_DASHBOARD,ADMIN_USERS,ADMIN_DELIVERED_ORDERS,ADMIN_REJECTED_ORDERS } from '@/constants/routes';
import { StopFilled } from '@ant-design/icons';
import React from 'react';
import { NavLink } from 'react-router-dom';

const SideNavigation = () => (
  <aside className="sidenavigation">
    <div className="sidenavigation-wrapper">
    <div className="sidenavigation-item">
        <NavLink
          activeClassName="sidenavigation-menu-active"
          className="sidenavigation-menu"
          to={ADMIN_DASHBOARD}
        >
          Dashboard
        </NavLink>
      </div>
      <div className="sidenavigation-item">
        <NavLink
          activeClassName="sidenavigation-menu-active"
          className="sidenavigation-menu"
          to={ADMIN_PRODUCTS}
        >
          Products
        </NavLink>
      </div>      
      <div className="sidenavigation-item">
        <NavLink
          activeClassName="sidenavigation-menu-active"
          className="sidenavigation-menu"
          to={ADMIN_ORDERS}
        >
          Orders
        </NavLink>
      </div>
      <div className="sidenavigation-item">
        <NavLink
          activeClassName="sidenavigation-menu-active"
          className="sidenavigation-menu"
          to={ADMIN_DELIVERED_ORDERS}
        >
          Delivered Orders
        </NavLink>
      </div>
      <div className="sidenavigation-item">
        <NavLink
          activeClassName="sidenavigation-menu-active"
          className="sidenavigation-menu"
          to={ADMIN_REJECTED_ORDERS}
        >
          Rejected Orders
        </NavLink>
      </div>
      <div className="sidenavigation-item">
        <NavLink
          activeClassName="sidenavigation-menu-active"
          className="sidenavigation-menu"
          to={ADMIN_USERS}
        >
          Manage Users
        </NavLink>
      </div>
     
    </div>
  </aside>
);

export default SideNavigation;
