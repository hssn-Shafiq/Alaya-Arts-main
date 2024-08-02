import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BasketToggle } from '@/components/basket';
import { HOME, SIGNIN } from '@/constants/routes';
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
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const onClickLink = (e) => {
    if (isAuthenticating) e.preventDefault();
  };

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  const handleDropdownToggle = (dropdown) => {
    setDropdownOpen(dropdownOpen === dropdown ? null : dropdown);
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
          <button className="button-link navigation-menu-link" onClick={toggleSideNav}>
            <MenuOutlined className="text-light fs-1" />
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
          <h2 className="text-light fw-bold fs-1 mb-0">Menu</h2>
          <CloseCircleOutlined className="text-light close-icon fs-1" onClick={toggleSideNav} />
        </div>
        <ul className="side-navigation-menu">
          <li>
            <Link onClick={toggleSideNav} to={ROUTE.HOME}>
              Home
            </Link>
          </li>
          <li>
            <Link onClick={toggleSideNav} to={ROUTE.SHOP}>
              Shop All
            </Link>
          </li>
          <li>
            <div className="nav-item dropdown">
              <button className="nav-link dropdown-toggle w-100 d-flex justify-content-between  p-3 " onClick={() => handleDropdownToggle('pret')}>
                Pret
              </button>
              <ul className={`dropdown-menu ${dropdownOpen === 'pret' ? 'show' : ''}`}>
                <li>
                  <Link className="dropdown-item" onClick={toggleSideNav} to={ROUTE.STICHED_PRODUCTS}>
                    All Pret Collection
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" onClick={toggleSideNav} to={ROUTE.WINTER_STICHED_PRODUCTS}>
                    Winter Collection
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" onClick={toggleSideNav} to={ROUTE.SUMMER_STICHED_PRODUCTS}>
                    Summer Collection
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <div className="nav-item dropdown">
              <button className="nav-link dropdown-toggle w-100 d-flex justify-content-between p-3 " onClick={() => handleDropdownToggle('unstitched')}>
                Unstitched
              </button>
              <ul className={`dropdown-menu ${dropdownOpen === 'unstitched' ? 'show' : ''}`}>
                <li>
                  <Link className="dropdown-item" onClick={toggleSideNav} to={ROUTE.UNSTICHED_PRODUCTS}>
                    All Unstitched Collection
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" onClick={toggleSideNav} to={ROUTE.WINTER_UNSTICHED_PRODUCTS}>
                    Winter Collection
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" onClick={toggleSideNav} to={ROUTE.SUMMER_UNSTICHED_PRODUCTS}>
                    Summer Collection 
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <div className="nav-item dropdown">
              <button className="nav-link dropdown-toggle w-100 d-flex justify-content-between p-3" onClick={() => handleDropdownToggle('kids')}>
                Kids
              </button>
              <ul className={`dropdown-menu ${dropdownOpen === 'kids' ? 'show' : ''}`}>
                <li>
                  <Link className="dropdown-item" onClick={toggleSideNav} to={ROUTE.KIDS_PRODUCTS}>
                    All Kids Collection
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" onClick={toggleSideNav} to={ROUTE.WINTER_KIDS_PRODUCTS}>
                    Winter Collection
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" onClick={toggleSideNav} to={ROUTE.SUMMER_KIDS_PRODUCTS}>
                    Summer Collection
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <Link onClick={toggleSideNav} to={ROUTE.ACCESSORIES_PRODUCTS}>
              Accessories
            </Link>
          </li>
          <li>
            <Link onClick={toggleSideNav} to={ROUTE.CONTACT_US}>
              Contact Us
            </Link>
          </li>
          <li>
            <Link onClick={toggleSideNav} to={ROUTE.ABOUT_US}>
              About Us
            </Link>
          </li>
        </ul>
      </div>
      <div className={`overlay ${isSideNavOpen ? 'show' : ''}`} onClick={toggleSideNav}></div>
    </>
  );
};

Navigation.propTypes = {
  isAuthenticating: PropTypes.bool.isRequired,
  basketLength: PropTypes.number.isRequired,
  disabledPaths: PropTypes.arrayOf(PropTypes.string).isRequired,
  user: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]).isRequired
};

export default Navigation;
