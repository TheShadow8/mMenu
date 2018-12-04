import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {Link} from 'react-router-dom';

import {generateBase64FromImage} from '../../utils/image';
import {addPost} from '../../actions/postActions';

import './AddPost.css';
import TextFieldGroup from '../Common/TextFieldGroup';
import TextAreaFieldGroup from '../Common/TextAreaFieldGroup';
import Image from '../Common/Image';

export class AddPost extends Component {
  state = {
    title: '',
    content: '',
    image: null,
    imagePreview: null,
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

  onSubmit = e => {
    e.preventDefault();

    const {user} = this.props.auth;

    const newPost = {
      name: user.name,
      avatar: user.avatar,
      title: this.state.title,
      content: this.state.content,
      image: this.state.image,
    };

    this.props.addPost(newPost, this.props.history);
  };

  render() {
    const {errors} = this.props;

    return (
      <div className="row">
        <div className="col-sm-12 align-self-center ">
          {errors.postError && <div className="text-danger mt-0">{errors.postError}</div>}
          <form className="form-group w-75 mx-auto" onSubmit={this.onSubmit}>
            <TextFieldGroup placeholder="Introdution !" name="title" value={this.state.title} onChange={this.onChange} error={errors.title} />
            <TextAreaFieldGroup
              placeholder="Direction :) "
              name="content"
              value={this.state.content}
              onChange={this.onChange}
              error={errors.content}
              rows="8"
            />

            <input
              className={classnames('form-control form-control-md mt-2', {
                'is-invalid': errors.invalidError,
              })}
              type="file"
              name="image"
              onChange={this.imgHandler}
              required
            />
            {errors.invalidError && <div className="invalid-feedback mt-0">{errors.invalidError}</div>}
            <div className=" form-group new-post__preview-image mt-2">{this.state.imagePreview && <Image imageUrl={this.state.imagePreview} />}</div>

            <button type="submit" className="btn btn-white mr-2">
              Submit
            </button>
            <Link to="/">
              <button className="btn btn-dark">Cancel</button>
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

AddPost.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  {addPost},
)(AddPost);
