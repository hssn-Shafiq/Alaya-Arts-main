import { ADMIN_PRODUCTS, ADMIN_ORDERS,ADMIN_DASHBOARD,ADMIN_USERS,ADMIN_DELIVERED_ORDERS,ADMIN_REJECTED_ORDERS, ADMIN_CONTACT_DETAILS } from '@/constants/routes';
import { CloseCircleFilled, ContactsFilled, DashboardOutlined, DeliveredProcedureOutlined, OrderedListOutlined, StopFilled,  UserOutlined, TagsFilled  } from '@ant-design/icons';
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
        <DashboardOutlined />  Dashboard
        </NavLink>
      </div>
      <div className="sidenavigation-item">
        <NavLink
          activeClassName="sidenavigation-menu-active"
          className="sidenavigation-menu"
          to={ADMIN_PRODUCTS}
        >
        <TagsFilled />  Products
        </NavLink>
      </div>      
      <div className="sidenavigation-item">
        <NavLink
          activeClassName="sidenavigation-menu-active"
          className="sidenavigation-menu"
          to={ADMIN_ORDERS}
        >
        <OrderedListOutlined />  Orders
        </NavLink>
      </div>
      <div className="sidenavigation-item">
        <NavLink
          activeClassName="sidenavigation-menu-active"
          className="sidenavigation-menu"
          to={ADMIN_DELIVERED_ORDERS}
        >
        <DeliveredProcedureOutlined />  Delivered Orders
        </NavLink>
      </div>
      <div className="sidenavigation-item">
        <NavLink
          activeClassName="sidenavigation-menu-active"
          className="sidenavigation-menu"
          to={ADMIN_REJECTED_ORDERS}
        >
        <CloseCircleFilled />  Rejected Orders
        </NavLink>
      </div>
      <div className="sidenavigation-item">
        <NavLink
          activeClassName="sidenavigation-menu-active"
          className="sidenavigation-menu"  
          to={ADMIN_USERS}
        >

          <UserOutlined />
          Manage Users 
        </NavLink>
      </div>
      <div className="sidenavigation-item">
        <NavLink
          activeClassName="sidenavigation-menu-active"
          className="sidenavigation-menu"
          to={ADMIN_CONTACT_DETAILS}
        >
         <ContactsFilled /> Contact Details
        </NavLink>
      </div>
    </div>
  </aside>
);

export default SideNavigation;
