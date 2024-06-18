
import luxury_lawn from '@/images/luxury_lawn.jpg';
import luxury_pret from '@/images/pret1.jpg';
import lawn from '@/images/lawn.jpg';
import pret_unstiched from '@/images/pret2.jpg';
import kids from '@/images/kids.jpg';
import Embroided_Unstitched from '@/images/img3.jpg';



const ImageGallery = () => {


  return(
    <>
    <section className="carousel image_gallery_section">
  <div className="carousel__container">
    <div className="carousel-item" data-aos="fade-up">
      <img className="carousel-item__img" src={luxury_lawn} alt="people" />
      <div className="carousel-item__details">
        <div className="controls">
          <span className="fas fa-play-circle" />
          <span className="fas fa-plus-circle" />
        </div>
        <a href="#"><h5 className="carousel-item__details--title">Luxury_Lawn</h5></a>
      </div>
    </div>
    <div className="carousel-item" data-aos="fade-up">
      <img className="carousel-item__img" src={luxury_pret} alt="people" />
      <div className="carousel-item__details">
        <div className="controls">
          <span className="fas fa-play-circle" />
          <span className="fas fa-plus-circle" />
        </div>
        <h5 className="carousel-item__details--title">
          Luxury Pret Collection
        </h5>
      </div>
    </div>
    <div className="carousel-item" data-aos="fade-up">
      <img className="carousel-item__img" src={lawn} alt="people" />
      <div className="carousel-item__details">
        <div className="controls">
          <span className="fas fa-play-circle" />
          <span className="fas fa-plus-circle" />
        </div>
        <h5 className="carousel-item__details--title">Premium Lawn</h5>
      </div>
    </div>
    <div className="carousel-item" data-aos="fade-up">
      <img className="carousel-item__img" src={pret_unstiched} alt="people" />
      <div className="carousel-item__details">
        <div className="controls">
          <span className="fas fa-play-circle" />
          <span className="fas fa-plus-circle" />
        </div>
        <h5 className="carousel-item__details--title">Pret Unstiched</h5>
      </div>
    </div>
    <div className="carousel-item" data-aos="fade-up">
      <img className="carousel-item__img" src={kids} alt="people" />
      <div className="carousel-item__details">
        <div className="controls">
          <span className="fas fa-play-circle" />
          <span className="fas fa-plus-circle" />
        </div>
        <h5 className="carousel-item__details--title">Kids Fashion</h5>
      </div>
    </div>
    <div className="carousel-item" data-aos="fade-up">
      <img className="carousel-item__img" src={Embroided_Unstitched} alt="people" />
      <div className="carousel-item__details">
        <div className="controls">
          <span className="fas fa-play-circle" />
          <span className="fas fa-plus-circle" />
        </div>
        <h5 className="carousel-item__details--title">
          Embroided_Unstitched_Suit
        </h5>
      </div>
    </div>
  </div>
</section>

    
    </>
  )
}

export default  ImageGallery;