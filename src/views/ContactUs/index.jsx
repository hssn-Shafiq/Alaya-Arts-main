import React, { useState, useEffect } from 'react';
import firebaseInstance from '@/services/firebase';
import { useDocumentTitle, useScrollTop } from '@/hooks';
import { displayActionMessage } from '@/helpers/utils';
import { useSelector } from 'react-redux';

const ContactUs = () => {
  useDocumentTitle('Contact | Alaya Arts');
  useScrollTop();
  
  const profile = useSelector((state) => state.profile);
  const [formData, setFormData] = useState({
    name: profile.fullname ? profile.fullname.split(' ')[0] : '',
    email: profile.email || '',
    message: ''
  });
  const [loading, setLoading]  = useState(false);

  useEffect(() => {
    // Update formData if profile data changes
    setFormData({
      name: profile.fullname ? profile.fullname.split(' ')[0] : '',
      email: profile.email || '',
      message: ''
    });
  }, [profile]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const id = firebaseInstance.firebase.firestore().collection("contact_details").doc().id;
      await firebaseInstance.addContactDetails(id, formData);
      displayActionMessage('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      console.error("Error adding contact details: ", error);
      displayActionMessage('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact_us_main">
      <div className="contact_us">
        <div className="row">
          <div className="col-lg-6 form_fields mb-5 mb-lg-0">
            <form
              className="contact-form"
              data-aos="fade-up"
              data-aos-delay={200}
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <label className="text-black" htmlFor="name">Your Name</label><br />
                <input
                  type="text"
                  className="form-control"
                  placeholder='Enter your name'
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="text-black" htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder='name@info.com'
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="text-black" htmlFor="message">Message</label>
                <textarea
                  className="form-control"
                  id="message"
                  cols={30}
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your message"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
          <div className="col-lg-5 ml-auto contact_icons">
            <div className="quick-contact-item d-flex align-items-center mb-4">
              <i className="fa-solid fa-house flaticon-house" />
              <address className="text mb-0 ms-3">
                Riwend Road Lahore
              </address>
            </div>
            <div className="quick-contact-item d-flex align-items-center mb-4">
              <i className="fa-solid fa-phone flaticon-phone-call" />
              <address className="text mb-0  ms-3">+92 348 8831990</address>
            </div>
            <div className="quick-contact-item d-flex align-items-center mb-4">
              <i className="fa-solid fa-envelope flaticon-mail" />
              <address className="text mb-0  ms-3">alayaarts2021@gmail.com</address>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
