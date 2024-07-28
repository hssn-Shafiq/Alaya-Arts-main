import { ADMIN_PRODUCTS, ADMIN_ORDERS, ADMIN_DASHBOARD,ADMIN_BANK_DETAILS, ADMIN_USERS, ADMIN_DELIVERED_ORDERS, ADMIN_REJECTED_ORDERS, ADMIN_CONTACT_DETAILS, ADMIN_UPLOAD_BANNER, ADMIN_UPLOAD_HOME_BANNER } from '@/constants/routes';
import { CloseCircleFilled, ContactsFilled, DashboardOutlined, DeliveredProcedureOutlined, OrderedListOutlined, StopFilled, UserOutlined, TagsFilled, BarsOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, CloudUploadOutlined, BankFilled } from '@ant-design/icons';
import Upload from 'antd/es/upload/Upload';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';


const SideNavigation = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Initialize sidebar as open

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNavLinkClick = (event) => {
    event.stopPropagation(); // Prevent the sidebar from toggling when clicking a NavLink
  };

  return (
    <>
      <aside className={`sidenavigation ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidenavigation-wrapper">
          <div className="sidenavigation-item">
            <NavLink
              activeClassName="sidenavigation-menu-active"
              className="sidenavigation-menu"
              to={ADMIN_DASHBOARD}
              onClick={handleNavLinkClick}
            >
              <DashboardOutlined /> Dashboard
            </NavLink>
          </div>
          <div className="sidenavigation-item">
            <NavLink
              activeClassName="sidenavigation-menu-active"
              className="sidenavigation-menu"
              to={ADMIN_PRODUCTS}
              onClick={handleNavLinkClick}
            >
              <TagsFilled /> Products
            </NavLink>
          </div>
          <div className="sidenavigation-item">
            <NavLink
              activeClassName="sidenavigation-menu-active"
              className="sidenavigation-menu"
              to={ADMIN_ORDERS}
              onClick={handleNavLinkClick}
            >
              <OrderedListOutlined /> Orders
            </NavLink>
          </div>
          <div className="sidenavigation-item">
            <NavLink
              activeClassName="sidenavigation-menu-active"
              className="sidenavigation-menu"
              to={ADMIN_DELIVERED_ORDERS}
              onClick={handleNavLinkClick}
            >
              <DeliveredProcedureOutlined /> Delivered Orders
            </NavLink>
          </div>
          <div className="sidenavigation-item">
            <NavLink
              activeClassName="sidenavigation-menu-active"
              className="sidenavigation-menu"
              to={ADMIN_REJECTED_ORDERS}
              onClick={handleNavLinkClick}
            >
              <CloseCircleFilled /> Rejected Orders
            </NavLink>
          </div>
          <div className="sidenavigation-item">
            <NavLink
              activeClassName="sidenavigation-menu-active"
              className="sidenavigation-menu"
              to={ADMIN_USERS}
              onClick={handleNavLinkClick}
            >
              <UserOutlined /> Manage Users
            </NavLink>
          </div>
          <div className="sidenavigation-item">
            <NavLink
              activeClassName="sidenavigation-menu-active"
              className="sidenavigation-menu"
              to={ADMIN_CONTACT_DETAILS}
              onClick={handleNavLinkClick}
            >
              <ContactsFilled /> Contact Details
            </NavLink>
          </div>
          <div className="sidenavigation-item">
            <NavLink
              activeClassName="sidenavigation-menu-active"
              className="sidenavigation-menu"
              to={ADMIN_UPLOAD_BANNER}
              onClick={handleNavLinkClick}
            >
              <UploadOutlined /> Upload Carousel
            </NavLink>
          </div>
          <div className="sidenavigation-item">
            <NavLink
              activeClassName="sidenavigation-menu-active"
              className="sidenavigation-menu"
              to={ADMIN_UPLOAD_HOME_BANNER}
              onClick={handleNavLinkClick}
            >
              <CloudUploadOutlined/> Banner Images
            </NavLink>
          </div>
          <div className="sidenavigation-item">
            <NavLink
              activeClassName="sidenavigation-menu-active"
              className="sidenavigation-menu"
              to={ADMIN_BANK_DETAILS}
              onClick={handleNavLinkClick}
            >
              <BankFilled/> Add Bank Details
            </NavLink>
          </div>
        </div>
      </aside>
      <div className={`bar_side ${!isSidebarOpen ? 'closed' : ''}`}>
        {isSidebarOpen ? (
          <MenuFoldOutlined className="menu_bar justify-content-end" style={{ fontSize: "25px", cursor: "pointer" }} onClick={toggleSidebar} />
        ) : (
          <MenuUnfoldOutlined className="menu_bar justify-content-end" style={{ fontSize: "25px", cursor: "pointer" }} onClick={toggleSidebar} />
        )}
      </div>
    </>
  );
};

export default SideNavigation;
