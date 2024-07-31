/* eslint-disable indent */
import {
  FilterOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import * as ROUTE from "@/constants/routes";
import logo from "@/images/alaya-arts-removebg.png";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import UserAvatar from "@/views/account/components/UserAvatar";
import BasketToggle from "../basket/BasketToggle";
import Badge from "./Badge";
import FiltersToggle from "./FiltersToggle";
import MobileNavigation from "./MobileNavigation";
import SearchBar from "./SearchBar";

const Navigation = () => {
  const navbar = useRef(null);
  const { pathname } = useLocation();
  const store = useSelector((state) => ({
    basketLength: state.basket.length,
    user: state.auth,
    isAuthenticating: state.app.isAuthenticating,
    isLoading: state.app.loading,
  }));

  const scrollHandler = () => {
    if (navbar.current && window.screen.width > 480) {
      if (window.pageYOffset >= 70) {
        navbar.current.classList.add("is-nav-scrolled");
      } else {
        navbar.current.classList.remove("is-nav-scrolled");
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  const onClickLink = (e) => {
    if (store.isAuthenticating) e.preventDefault();
  };

  // disable the basket toggle to these pathnames
  const basketDisabledpathnames = [
    ROUTE.CHECKOUT_STEP_1,
    ROUTE.CHECKOUT_STEP_2,
    ROUTE.CHECKOUT_STEP_3,
    ROUTE.SIGNIN,
    ROUTE.SIGNUP,
    ROUTE.FORGOT_PASSWORD,
  ];

  if (store.user && store.user.role === "ADMIN") {
    return null;
  }
  if (window.screen.width <= 800) {
    return (
      <MobileNavigation
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...store}
        disabledPaths={basketDisabledpathnames}
        pathname={pathname}
      />
    );
  }
  return (
    <>
      <nav className="navigation  justify-content-between" ref={navbar}>
        <div className="logo">
          <Link onClick={onClickLink} to="/">
            <img alt="Logo" src={logo} />
          </Link>
        </div>
        <div className="right-part d-flex align-items-center gap-3">
          {(pathname === ROUTE.SHOP || pathname === ROUTE.SEARCH) && (
            <FiltersToggle>
              <button className="button-muted button-small" type="button">
                Filters &nbsp;
                <FilterOutlined />
              </button>
            </FiltersToggle>
          )}
          <SearchBar />
          <ul className="navigation-menu">
            <li className="navigation-menu-item">
              <BasketToggle>
                {({ onClickToggle }) => (
                  <button
                    className="button-link navigation-menu-link basket-toggle"
                    disabled={basketDisabledpathnames.includes(pathname)}
                    onClick={onClickToggle}
                    type="button"
                  >
                    <Badge count={store.basketLength}>
                      <ShoppingOutlined
                        style={{ fontSize: "2rem", color: "white" }}
                      />
                    </Badge>
                  </button>
                )}
              </BasketToggle>
            </li>
            {store.user ? (
              <li className="navigation-menu-item">
                <UserAvatar />
              </li>
            ) : (
              <li className="navigation-menu-item">
                {pathname !== ROUTE.SIGNIN && (
                  <Link
                    onClick={onClickLink}
                    to={ROUTE.SIGNIN}
                    className="button-link navigation-menu-link"
                  >
                    <UserOutlined
                      style={{ fontSize: "2rem", color: "white" }}
                    />
                  </Link>
                )}
              </li>
            )}
          </ul>
        </div>
      </nav>
      <div className="header-bottom">
        <ul className="navbar-nav d-flex w-100 justify-content-evenly ">
          <li>
            <NavLink
              activeClassName="navigation-menu-item navigation-bottom-menu-item"
              exact
              to={ROUTE.HOME}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName="navigation-menu-item navigation-bottom-menu-item"
              to={ROUTE.SHOP}
            >
              Shop All
            </NavLink>
          </li>
          <li className="nav-item dropdown navigation-bottom-menu-item">
            <NavLink
              className="nav-link dropdown-toggle"
              to={ROUTE.STICHED_PRODUCTS}
              id="pretDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Pret
            </NavLink>
            <ul className="dropdown-menu" aria-labelledby="pretDropdown">
            <li>
                <NavLink className="dropdown-item mb-4" to={ROUTE.STICHED_PRODUCTS}>
                  All Pret Collection
                </NavLink>
              </li>
              <li>
                <NavLink className="dropdown-item mb-4" to={ROUTE.WINTER_STICHED_PRODUCTS}>
                  Winter Collection
                </NavLink>
              </li>
              <li>
              <NavLink className="dropdown-item mb-4" to={ROUTE.SUMMER_STICHED_PRODUCTS}>
                  Summer Collection
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="nav-item dropdown navigation-bottom-menu-item">
            <NavLink
              className="nav-link dropdown-toggle"
              to={ROUTE.UNSTICHED_PRODUCTS}
              id="unstichedDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Unstiched
            </NavLink>
            <ul className="dropdown-menu" aria-labelledby="unstichedDropdown">
            <li>
                <NavLink className="dropdown-item mb-4" to={ROUTE.UNSTICHED_PRODUCTS}>
                  All UnStiched Collection
                </NavLink>
              </li>
              <li>
                <NavLink className="dropdown-item mb-4" to={ROUTE.WINTER_UNSTICHED_PRODUCTS}>
                  Winter Collection
                </NavLink>
              </li>
              <li>
              <NavLink className="dropdown-item mb-4" to={ROUTE.SUMMER_UNSTICHED_PRODUCTS}>
                  Summer Collection
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="nav-item dropdown navigation-bottom-menu-item">
            <NavLink
              className="nav-link dropdown-toggle"
              to={ROUTE.KIDS_PRODUCTS}
              id="unstichedDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Kids
            </NavLink>
            <ul className="dropdown-menu" aria-labelledby="unstichedDropdown">
            <li>
                <NavLink className="dropdown-item mb-4" to={ROUTE.KIDS_PRODUCTS}>
                  All Kids Collection
                </NavLink>
              </li>
              <li>
                <NavLink className="dropdown-item mb-4" to={ROUTE.WINTER_KIDS_PRODUCTS}>
                  Winter Collection
                </NavLink>
              </li>
              <li>
              <NavLink className="dropdown-item mb-4" to={ROUTE.WINTER_KIDS_PRODUCTS}>
                  Summer Collection
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <NavLink
              activeClassName="navigation-menu-item navigation-bottom-menu-item"
              to={ROUTE.ACCESSORIES_PRODUCTS}
            >
              Accessories
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName="navigation-menu-item navigation-bottom-menu-item"
              to={ROUTE.CONTACT_US}
            >
              Contact Us
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName="navigation-menu-item navigation-bottom-menu-item"
              to={ROUTE.ABOUT_US}
            >
              About Us
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navigation;
