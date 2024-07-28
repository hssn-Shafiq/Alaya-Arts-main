// File: Navigation.js

import { BasketToggle } from '@/components/basket';
import { HOME, SIGNIN } from '@/constants/routes';
import PropType from 'prop-types';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserNav from '@/views/account/components/UserAvatar';
import Badge from './Badge';
import FiltersToggle from './FiltersToggle';
import SearchBar from './SearchBar';
import logo from '@/images/alaya-arts-removebg.png';
import * as ROUTE from '@/constants/routes';
import { CloseCircleOutlined, MenuOutlined } from '@ant-design/icons';
// import './Navigation.css';

const Navigation = (props) => {
  const {
    isAuthenticating, basketLength, disabledPaths, user
  } = props;
  const { pathname } = useLocation();
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const onClickLink = (e) => {
    if (isAuthenticating) e.preventDefault();
  };

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  return (
    <>
      <nav className="mobile-navigation">
        <div className="mobile-navigation-main">
          <div className="mobile-navigation-logo">
            <div className="logo">
              <Link onClick={onClickLink} to="/"><img alt="Logo" src={logo} style={{ height: '45px' }} /></Link>
            </div>
          </div>

          <BasketToggle>
            {({ onClickToggle }) => (
              <button
                className="button-link navigation-menu-link basket-toggle"
                onClick={onClickToggle}
                disabled={disabledPaths.includes(pathname)}
                type="button"
              >
                <Badge count={basketLength}>
                  <i className="fa fa-shopping-bag" style={{ fontSize: '2rem' }} />
                </Badge>
              </button>
            )}
          </BasketToggle>
            
             <button
                className="button-link navigation-menu-link" onClick={toggleSideNav} >
          <MenuOutlined className='text-light fs-1'  />

                </button>

          <ul className="mobile-navigation-menu">
            {user ? (
              <li className="mobile-navigation-item">
                <UserNav />
              </li>
            ) : (
              <>
                {pathname !== SIGNIN && (
                  <li className="mobile-navigation-item">
                    <Link
                      className="navigation-menu-link"
                      onClick={onClickLink}
                      to={SIGNIN}
                    >
                      Sign In
                    </Link>
                  </li>
                )}
              </>
            )}
          </ul>
        </div>
        <div className="mobile-navigation-sec">
          <SearchBar padding="2" />
          <FiltersToggle>
            <button className="button-link button-small" type="button">
              <i className="fa fa-filter text-info" />
            </button>
          </FiltersToggle>
        </div>
      </nav>

      <div className={`side-navigation ${isSideNavOpen ? 'open' : ''}`}>
        <div className="side-navigation-header d-flex align-items-center justify-content-between">
          <h2 className='text-light fw-bold fs-1 mb-0'>
          Menu
          </h2>
          <CloseCircleOutlined className='text-light close-icon fs-1' onClick={toggleSideNav} />
        </div>
        <ul className="side-navigation-menu">
        <li ><Link onClick={toggleSideNav} activeClassName="navigation-menu-item navigation-bottom-menu-item" exact to={ROUTE.HOME}>Home</Link></li>
        <li ><Link onClick={toggleSideNav} activeClassName="navigation-menu-item navigation-bottom-menu-item" to={ROUTE.SHOP}>Shop All</Link></li>
        <li ><Link onClick={toggleSideNav} activeClassName="navigation-menu-item navigation-bottom-menu-item" to={ROUTE.STICHED_PRODUCTS}>Pret</Link></li>
        <li ><Link onClick={toggleSideNav} activeClassName="navigation-menu-item navigation-bottom-menu-item" to={ROUTE.UNSTICHED_PRODUCTS}>Unstiched</Link></li>
        <li ><Link onClick={toggleSideNav} activeClassName="navigation-menu-item navigation-bottom-menu-item" to={ROUTE.KIDS_PRODUCTS}>Kids Collections</Link></li>
        <li ><Link onClick={toggleSideNav} activeClassName="navigation-menu-item navigation-bottom-menu-item" to={ROUTE.ACCESSORIES_PRODUCTS}>Accessories</Link></li>
        <li ><Link onClick={toggleSideNav} activeClassName="navigation-menu-item navigation-bottom-menu-item" to={ROUTE.CONTACT_US}>Contact Us</Link></li>
        <li ><Link onClick={toggleSideNav} activeClassName="navigation-menu-item navigation-bottom-menu-item" to={ROUTE.ABOUT_US}>About Us</Link></li>
          
          {/* Add more links as needed */}
        </ul>
      </div>

      <div className={`overlay ${isSideNavOpen ? 'show' : ''}`} onClick={toggleSideNav}></div>
    </>
  );
};

Navigation.propTypes = {
  isAuthenticating: PropType.bool.isRequired,
  basketLength: PropType.number.isRequired,
  disabledPaths: PropType.arrayOf(PropType.string).isRequired,
  user: PropType.oneOfType([
    PropType.bool,
    PropType.object
  ]).isRequired
};

export default Navigation;
