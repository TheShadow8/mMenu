import React from 'react';
import PropTypes from 'prop-types';

function User(props) {
  return (
    <div className="media align-self-center text-white ">
      <img className="mr-3 rounded-circle " src={props.user.avatar} style={{width: '100px', height: '100px'}} alt="" />
      <div className="media-body">
        <h5 className="mt-0">{props.user.name}</h5>
        {props.user.bio}
        <div>
          <button className="btn btn-white btn-sm mt-3" onClick={props.toggleModal}>
            Edit profile
          </button>
        </div>
        <hr />
      </div>
    </div>
  );
}

User.propTypes = {
  user: PropTypes.object.isRequired,
};

export default User;
