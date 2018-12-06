import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {generateBase64FromImage} from '../../utils/image';
import {editProfile} from '../../actions/authActions';
import {getUserPosts} from '../../actions/postActions';

import './Profile.css';
import User from './User';
import UserPostList from './UserPostList';
import Modal from '../Common/Modal';
import TextFieldGroup from '../Common/TextFieldGroup';

export class MyProfile extends Component {
  state = {
    show: false,
    name: '',
    bio: '',
    image: null,
    imagePreview: null,
    errors: {},
  };

  componentDidMount() {
    this.props.getUserPosts(this.props.user._id);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({errors: newProps.errors});
    }
  }

  toggleModal = () => {
    this.setState({
      show: !this.state.show,
      imagePreview: null,
    });
  };

  onSubmitModal = e => {
    // TODO: Validate, show errors
    e.preventDefault();

    let name, bio, image;
    this.state.name ? (name = this.state.name) : (name = this.props.profile.name);
    this.state.bio ? (bio = this.state.bio) : (bio = this.props.profile.bio);
    this.state.image ? (image = this.state.image) : (image = null);
    const newProfile = {
      name,
      image,
      bio,
    };

    this.props.editProfile(newProfile);

    this.toggleModal();
  };

  onChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  imgHandler = e => {
    if (e.target.value) {
      generateBase64FromImage(e.target.files[0])
        .then(b64 => {
          this.setState({imagePreview: b64});
        })
        .catch(e => {
          this.setState({imagePreview: null});
          console.log(e);
        });

      this.setState({image: e.target.files[0]});
    } else {
      this.setState({imagePreview: null});
    }
  };

  render() {
    const {show, errors} = this.state;
    const {profile} = this.props;
    const {userPosts, loading} = this.props.post;

    return (
      <div>
        <User toggleModal={this.toggleModal} profile={profile} />

        <UserPostList userPosts={userPosts} loading={loading} />

        <Modal show={show} toggleModal={this.toggleModal} title="Edit Profile" action="Save" actionModal={this.onSubmitModal}>
          {(this.state.imagePreview && (
            <img className="mb-3 rounded-circle" src={this.state.imagePreview} style={{width: '100px', height: '100px'}} alt="" />
          )) || <img className="mb-3 rounded-circle" src={profile.avatar} style={{width: '100px', height: '100px'}} alt="" />}
          <form>
            <TextFieldGroup
              placeholder={profile.name}
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              error={errors.name}
              label="Name"
            />
            <TextFieldGroup placeholder={profile.bio} name="bio" value={this.state.bio} onChange={this.onChange} error={errors.bio} label="Bio" />
            <label className="cols-sm-2 control-label m-0">Avatar</label>
            <input
              className={classnames('form-control form-control-md', {
                'is-invalid': errors.invalidError,
              })}
              type="file"
              name="image"
              onChange={this.imgHandler}
              required
            />
            <small className="form-text text-muted">Choose your new avatar</small>
            {errors.invalidError && <div className="invalid-feedback mt-0">{errors.invalidError}</div>}
          </form>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  profile: state.auth.profile,
  errors: state.errors,
  post: state.post,
});

MyProfile.propTypes = {
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  getUserPosts: PropTypes.func.isRequired,
  editProfile: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  {getUserPosts, editProfile},
)(MyProfile);
