import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

function User(props) {
  return (
    <div className="media align-self-center text-white ">
      <img className="mr-3 rounded-circle " src={props.profile.avatar} style={{width: '100px', height: '100px'}} alt="" />
      <div className="media-body">
        <h5 className="mt-0">{props.profile.name}</h5>
        {props.profile.bio}
        <div>
          {(props.profile.user === props.user._id && (
            <button className="btn btn-white btn-sm " onClick={props.toggleModal}>
              Edit profile
            </button>
          )) || <button className="btn btn-white btn-sm invisible" />}
          {/* TODO: Add favorite button */}
        </div>
        <hr />
      </div>
    </div>
  );
}

User.propTypes = {
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(User);
