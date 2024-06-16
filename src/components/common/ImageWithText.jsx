import bannerImg from '@/images/banner-shop.jpg';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import {SHOP } from '@/constants/routes';

const ImageWithText = () => {
  return(
    <>
    <div className="banner mb-5" >
          <div className="banner-desc">
            <h1 className="text-thin">
              <strong>Discover</strong> 
              &nbsp;style with&nbsp;
              <strong>eligence</strong>
            </h1>
            <p>
            Shopping for clothes should make you feel great and look fabulous, all while saving you money.
            From chic dresses to cozy sweaters, our collection has something for every wardrobe.
            </p>
            <br />
            <Link to={SHOP} className="button">
              Explore Now &nbsp;
              <ArrowRightOutlined />
            </Link>
          </div>
          <div className="banner-img"><img src={bannerImg} alt="" /></div>
        </div>
    </>
  )
}
export default ImageWithText;