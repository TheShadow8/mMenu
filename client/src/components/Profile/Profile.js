import React, {Component} from 'react';
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

export class Profile extends Component {
  state = {
    show: false,
    name: '',
    bio: '',
    image: null,
    imagePreview: null,
  };

  componentDidMount() {
    this.props.getUserPosts(this.props.user._id);
  }

  toggleModal = () => {
    this.setState({
      show: !this.state.show,
      imagePreview: null,
    });
  };

  onSubmitModal = e => {
    e.preventDefault();

    let name, bio, image;
    this.state.name ? (name = this.state.name) : (name = this.props.user.name);
    this.state.bio ? (bio = this.state.bio) : (bio = this.props.user.bio);
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
    const {show} = this.state;
    const {errors, user} = this.props;
    const {userPosts, loading} = this.props.post;

    return (
      <div>
        <User toggleModal={this.toggleModal} user={user} />

        <UserPostList userPosts={userPosts} loading={loading} />

        <Modal show={show} toggleModal={this.toggleModal} title="Edit Profile" action="Save" actionModal={this.onSubmitModal}>
          {(this.state.imagePreview && (
            <img className="mb-3 rounded-circle" src={this.state.imagePreview} style={{width: '100px', height: '100px'}} alt="" />
          )) || <img className="mb-3 rounded-circle" src={user.avatar} style={{width: '100px', height: '100px'}} alt="" />}
          <form>
            <TextFieldGroup placeholder={user.name} name="name" value={this.state.name} onChange={this.onChange} error={errors.name} label="Name" />
            <TextFieldGroup placeholder={user.bio} name="bio" value={this.state.bio} onChange={this.onChange} error={errors.bio} label="Bio" />
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
  errors: state.errors,
  post: state.post,
});

export default connect(
  mapStateToProps,
  {getUserPosts, editProfile},
)(Profile);
