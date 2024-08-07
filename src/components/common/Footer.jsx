import * as Route from '@/constants/routes';
import logo from '@/images/alaya-arts-removebg.png';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { pathname } = useLocation();

  const visibleOnlyPath = [
    Route.HOME,
    Route.SHOP,
    Route.PRIVACY_POLICY,
    Route.STICHED_PRODUCTS,
    Route.UNSTICHED_PRODUCTS,
    Route.KIDS_PRODUCTS,
    Route.RECOMMENDED_PRODUCTS,
    Route.ACCESSORIES_PRODUCTS,
    Route.WINTER_KIDS_PRODUCTS,
    Route.SUMMER_KIDS_PRODUCTS,
    Route.SUMMER_UNSTICHED_PRODUCTS,
    Route.WINTER_UNSTICHED_PRODUCTS,
    Route.WINTER_STICHED_PRODUCTS,
    Route.SUMMER_STICHED_PRODUCTS,
    Route.CONTACT_US,
    // Route.,
    Route.ABOUT_US,
    Route.FAQ,
    Route.TERM_CONDITION,
    Route.RETURN_EXCHANGE,
  ];

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top whenever pathname changes
  }, [pathname]);

  useEffect(() => {
    var tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }, []);

  return !visibleOnlyPath.includes(pathname) ? null : (
    <footer className="footer pb-0">
      <div className="container">
        <div className="row">
          <div className="footer-col col-md-3">
            <h4>company</h4>
            <ul>
              <li>
                <Link to="/about_us">about us</Link>
              </li>
              <li>
                <Link to="/term_condition">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/privacy_policy">privacy policy</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col col-md-3">
            <h4>get help</h4>
            <ul>
              <li>
                <Link to="/FAQ">FAQ</Link>
              </li>
              <li>
                <Link to="/return_exchange">Return & Exchange</Link>
              </li>
              <li>
                <Link to="/all_orders">order status</Link>
              </li>
              <li>
                <Link to="/contact_us">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col col-md-3">
            <h4>online shop</h4>
            <ul>
            <li>
                <Link to="/collection/shop">Shop All</Link>
              </li>
              <li>
                <Link to="/collection/stiched">Pret Collection</Link>
              </li>
              <li>
                <Link to="/collection/unstiched">Unstiched Collection</Link>
              </li>
              <li>
                <Link to="/collection/kids">Kids Collection</Link>
              </li>
              <li>
                <Link to="/collection/recommended">Accessories</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col col-md-3">
            <h4>follow us</h4>
            <div className="social-links">
              <a href="https://www.facebook.com/profile.php?id=61562088893728&mibextid=JRoKGi" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Follow Alaya Arts on Facebook" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f" />
              </a>
              {/* <a href="https://twitter.com" data-bs-toggle="tooltip" data-bs-placement="top" title="Follow Alaya Arts on Twitter" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter" />
              </a> */}
              <a href="https://www.instagram.com/alaya.arts?igsh=NTZ3YW04NWF2M3Bp" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Follow Alaya Arts on Instagram" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram" />
              </a>
              {/* <a href="https://www.linkedin.com" data-bs-toggle="tooltip" data-bs-placement="left" title="Follow Alaya Arts on LinkedIn" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in" />
              </a> */}
            </div>
            
            <img src={logo} alt="alaya arts" width={100} />
          </div>
        </div>
      </div>
        <div className="row mt-3 py-5 border-top">
          <div className="col-md-12 col-sm-10 text-center copyrights_text ">
            <p className='mb-0 fs-2 px-5 text-light'>copyright @ 2024 All Rights Reserved | <a href="/" className='text-light  text-decoration-underline'>Alaya Arts</a></p>
          </div>
        </div>
    </footer>
  );
};

export default Footer;
