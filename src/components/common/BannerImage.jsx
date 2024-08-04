import React from "react";
import {
  DownCircleFilled,
  DownCircleOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const BannerImage = ({ backgroundImage, display_content, position }) => {
  return (
    <>
      <div
        className="banner_image_parent mb-5"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: position,
        }}
      >
        <div className="banner_image">
          <div className={`banner_image_content ${display_content}`}>
            <div className="down_icon">
              <DownOutlined />
            </div>
            <div className="shop_btn">
              <Link to="/collection/shop">
                <button>Shop Now</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BannerImage;
