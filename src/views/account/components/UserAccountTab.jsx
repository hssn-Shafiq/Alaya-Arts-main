/* eslint-disable indent */
import { ImageLoader } from '@/components/common';
import { ACCOUNT_EDIT } from '@/constants/routes';
import { displayDate } from '@/helpers/utils';
import PropType from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

const UserProfile = (props) => {
  const profile = useSelector((state) => state.profile);

  return (
    <div className="user-profile mb-5">
      <div className="user-profile-block">
        <div className="user-profile-banner">
          <div className="user-profile-banner-wrapper">
            <ImageLoader
              alt="Banner"
              className="user-profile-banner-img"
              src={profile.banner}
            />
          </div>
          <div className="user-profile-avatar-wrapper">
            <ImageLoader
              alt="Avatar"
              className="user-profile-img"
              src={profile.avatar}
            />
          </div>
          <button
            className="button button-small user-profile-edit"
            onClick={() => props.history.push(ACCOUNT_EDIT)}
            type="button"
          >
            Edit Account
          </button>
        </div>
        <div className="user-profile-details">
          <h2 className="user-profile-name mb-3">{profile.fullname}</h2>
          <span className='fs-3 fw-medium'>Email</span>
          <br />
          <h5 className="text-subtle  fs-3 fw-bold">{profile.email}</h5>
          <span className='fs-3 fw-medium'>Address</span>
          <br />
          {profile.address ? (
            <h5 className="text-subtle  fs-3 fw-bold">{profile.address}</h5>
          ) : (
            <h5 className="text-subtle  fs-3 fw-bold">Address not set</h5>
          )}
          <span className='fs-3 fw-medium'>Mobile</span>
          <br />
          {profile.mobile ? (
            <h5 className="text-subtle  fs-3 fw-bold">{profile.mobile.value}</h5>
          ) : (
            <h5 className="text-subtle  fs-3 fw-bold">Mobile not set</h5>
          )}
          <span className='fs-3 fw-medium'>Date Joined</span>
          <br />
          {profile.dateJoined ? (
            <h5 className="text-subtle  fs-3 fw-bold">{displayDate(profile.dateJoined)}</h5>
          ) : (
            <h5 className="text-subtle  fs-3 fw-bold">Not available</h5>
          )}
        </div>
      </div>
    </div>
  );
};

UserProfile.propTypes = {
  history: PropType.shape({
    push: PropType.func
  }).isRequired
};

export default withRouter(UserProfile);
