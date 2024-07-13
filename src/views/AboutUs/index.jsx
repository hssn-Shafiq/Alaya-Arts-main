import React from 'react';
import img1 from "@/images/digital print2.jpg";
import img2 from "@/images/digital print.jpg";
import img3 from "@/images/accessories03.jpg";
import img4 from "@/images/ready to wear.jpg";


const AboutUs = () => {
  return (
    <>
      <div
        className="main"
        style={{ margin: "10px auto", padding: "4rem", width: "70%" }}
      >
        <h1 className="text-center fw-bold">ABOUT US</h1>
        <img src={img1} alt="Alaya Arts" style={{ width: "100%", height: "auto", marginTop:"10px", marginBottom:"20px"}} />
        <p>
          <strong>ALAYA ARTS</strong>! As the name itself implies, aims to
          deliver the best shopping experience to customers. In 2021, Alaya Arts
          started their journey with the goal of providing premium quality
          fabrics through their physical store. Starting with a small team of 5
          members, our focus was to deliver a comfortable and hassle-free
          service to our valued customers. Now, with a large team of customer
          care and sales representatives, we are satisfying the needs of more
          than 250,00 customers nationwide.
        </p>
        <h3>OUR PROMISE</h3>
        <p>
          <strong>100% Genuine Products</strong> - No fakes and no duplicates.
          We have made it our mission to offer only 100% genuine products in
          their original packaging at Alaya Arts. We work hard to provide you
          with the largest selection of authentic and brand-new products of the
          highest quality.
        </p>
        <img src={img2} alt="Our Promise" style={{ width: "100%", height: "auto", marginTop:"10px", marginBottom:"20px" }} />
        <p>
          <strong>Safe & Secure Payments</strong> - Whether you pay cash on
          delivery or conveniently with one of our pre-payment methods, such as
          credit/debit card, Easypay, or JazzCash, your privacy is important to
          us, and we keep your data secure. For further information, please
          visit our Privacy Agreement Page.
        </p>
        <p>
          <strong>Easy Returns</strong> - Returns and replacements are easy and
          free of charge. For further information on the detailed terms, as well
          as on how to return your product, please visit our Returns & Refunds
          Page.
        </p>

        <p>
          <strong>ALAYA ARTS</strong> launched their online shopping store with
          the best quality fabrics and accessories from famous brands, including
          Lakhani (LSM), Warda, Orient Textile, Alkaram, Sana Safinaz, Amna
          Ismail, and many more. Alaya Arts is the best destination for online
          fabric and accessory shopping in Pakistan. "High Choice - Low Price"
          is not only our tagline but the philosophy behind our business.
        </p>

        <h3>
          Enrich Your Experience of Online Shopping in Pakistan with
          AlayaArts.pk
        </h3>
        <p>
          Experience a convenient and hassle-free way of online shopping in
          Pakistan. AlayaArts.pk takes your style statement to a whole new
          territory by placing an extensive variety of top-class brands within
          easy reach. Shop online for designer clothing and accessories like you
          have never done before from the comfort of your home. We strive to
          make sure that the best collections of designer clothing and
          accessories are brought to your computer screen.
        </p>

        <h3>Buy it Online 24/7</h3>
        <img src={img4} alt="Our Promise" style={{ width: "100%", height: "auto", marginTop:"10px", marginBottom:"20px" }} />

        <p>
          Online shopping in Pakistan has never been so easy. Get your desired
          product delivered to your home with ease. Whether you live in the mega
          cities of Karachi, Lahore, Islamabad, or reside in small towns like
          Pasni or Mirpur Mathelo, we deliver to any corner of Pakistan with our
          free shipping offer. Do you not have a credit/debit card? No issue!
          Take advantage of our Cash on Delivery (COD) service by just ordering
          your desired product and selecting COD as a payment method. What if
          you don’t like the product you purchased? No worries! With our
          Hassle-Free 7-day return policy, we will replace your product free of
          cost. Discover special discount offers and don’t forget to explore our
          bundle offers.
        </p>

        <h3>Keep Your Style Updated By Staying Connected</h3>
        <p>
          Our online fashion shop is frequently updated to provide you with the
          latest style advice and help you find the perfect item to wear on any
          occasion. Visit our Facebook page and blog to keep yourself ahead of
          the fashion curve. Stay in touch with our dedicated customer service
          to resolve any of your queries or give suggestions by calling (+92)
          33-33-142-222 or emailing us at info@alayaarts.pk. We provide you with
          a world of valuable information on the latest clothing brands and
          accessories you need to elevate your look to the next level.
        </p>

        <img src={img3} alt="Shop Now" style={{ width: "100%", height: "auto" }} />
        <p>
          Crave the finest fashion that Pakistan has to offer? Looking to find
          the style that matches your personality? Look no further than
          AlayaArts.pk. Envisioned as a one-stop, hassle-free premium shopping
          experience for shoppers across Pakistan, AlayaArts.pk brings the best
          of Pakistani trends to your fingertips; fashion to breeze through the
          seasons and flaunt at every event, fitting those hard-to-identify
          moods. Our mission is simple: Sell Pakistan’s finest. High Choice –
          Low Price.
        </p>

        <p>
          For more from AlayaArts.pk, take a virtual tour and follow us on 
           <a href="https://www.instagram.com/alaya.arts?igsh=NTZ3YW04NWF2M3Bp"> <span className="fw-bold text-primary">Instagram</span></a>, <a href="https://www.facebook.com/profile.php?id=61562088893728&mibextid=JRoKGi"> <span className="fw-bold text-primary">Facebook</span></a>. Let our products inspire
          your best style!
        </p>
      </div>
    </>
  );
};

export default AboutUs;
