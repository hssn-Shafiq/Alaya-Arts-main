import * as Route from '@/constants/routes';
import logo from '@/images/alaya-arts-removebg.png';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { FacebookFilled, FacebookOutlined } from "@ant-design/icons"
import { Link } from 'react-router-dom';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Footer = () => {
  const { pathname } = useLocation();

  const visibleOnlyPath = [
    Route.HOME,
    Route.SHOP,
    Route.PRIVACY_POLICY
  ];

  return !visibleOnlyPath.includes(pathname) ? null : (

    <footer className="footer">
    <div className="container">
      <div className="row">
        <div className="footer-col">
          <h4>company</h4>
          <ul>
            <li>
              <Link to="#">about us</Link>
            </li>
            <li>
              <Link to="#">Terms & Conditions</Link>
            </li>
            <li>
              <Link to="/privacy_policy">privacy policy</Link>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>get help</h4>
          <ul>
            <li>
              <Link to="#">FAQ</Link>
            </li>
            <li>
              <Link to="#">returns</Link>
            </li>
            <li>
              <Link to="/all_orders">order status</Link>
            </li>
            <li>
              <Link to="#">Contact Us</Link>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>online shop</h4>
          <ul>
            <li>
              <Link to={"/stiched"}>Pret Collection</Link>
            </li>
            <li>
              <Link to="/unstiched">Unstiched Collection</Link>
            </li>
            <li>
              <Link to="/kids">Kids Collection</Link>
            </li>
            <li>
              <Link to="#">Accessories</Link>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>follow us</h4>
          <div className="social-links" style={{marginLeft:"2em"}}>
            <Link to="#" title='follow alaya arts on facebook'>
              <i className="fab fa-facebook-f" />
              {/* <FontAwesomeIcon icon="fa-brands fa-facebook-f" /> */}
            </Link>
            <Link to="#" title='follow alaya arts on twitter'>
              <i className="fab fa-twitter" />
            </Link>
            <Link to="#" title='follow alaya arts on instagram'>
              <i className="fab fa-instagram" />
            </Link>
            <Link to="#" title='follow alaya arts on linkedin '>
              <i className="fab fa-linkedin-in" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
  

  );
};

export default Footer;
