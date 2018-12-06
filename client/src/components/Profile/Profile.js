import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getUserPosts} from '../../actions/postActions';
import {getOtherUserProfile} from '../../actions/authActions';

import User from './User';
import UserPostList from './UserPostList';

export class Profile extends Component {
  componentDidMount() {
    this.props.getUserPosts(this.props.match.params.id);
    this.props.getOtherUserProfile(this.props.match.params.id);
  }

  render() {
    const {otherProfile} = this.props;
    const {userPosts, loading} = this.props.post;

    return (
      <div>
        <User profile={otherProfile} />
        <UserPostList userPosts={userPosts} loading={loading} />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  otherProfile: state.auth.otherProfile,
  errors: state.errors,
  post: state.post,
});

Profile.propTypes = {
  errors: PropTypes.object.isRequired,
  otherProfile: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  getUserPosts: PropTypes.func.isRequired,
  getOtherUserProfile: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  {getOtherUserProfile, getUserPosts},
)(Profile);
