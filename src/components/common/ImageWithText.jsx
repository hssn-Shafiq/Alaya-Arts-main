import React from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { SHOP } from '@/constants/routes';

const ImageWithText = ({ t1, t2, t3, desc, link, img, place }) => {
  return (
    <div className="banner mb-5" style={{ display: 'flex', flexDirection: place === 1 ? 'row' : 'row-reverse' }}>
      <div className="banner-desc" style={{ order: place }}>
        <h1 className="text-thin" style={{ fontSize: "15px" }}>
          <strong>{t1}</strong>
          &nbsp;{t2}&nbsp;
          <strong>{t3}</strong>
        </h1>
        <p style={{ fontSize: "12px", lineHeight: "1.12" }}>{desc}</p>
        <br />
        <Link to={link} className="button" style={{ fontSize: '10px' }}>
          Explore Now &nbsp;
          <ArrowRightOutlined />
        </Link>
      </div>
      <div className="banner-img">
        <img src={img} alt="" />
      </div>
    </div>
  );
};

export default ImageWithText;
