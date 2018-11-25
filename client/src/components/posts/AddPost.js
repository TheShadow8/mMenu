import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import TextFieldGroup from '../common/TextFieldGroup';
import Image from '../common/Image';
import { generateBase64FromImage } from '../../utils/image';
import { addPost } from '../../actions/postActions';

export class AddPost extends Component {
  state = {
    text: '',
    image: null,
    imagePreview: null
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  imgHandler = e => {
    if (e.target.value) {
      generateBase64FromImage(e.target.files[0])
        .then(b64 => {
          this.setState({ imagePreview: b64 });
        })
        .catch(e => {
          this.setState({ imagePreview: null });
          console.log(e);
        });

      this.setState({ image: e.target.files[0] });
    } else {
      this.setState({ imagePreview: null });
    }
  };

  onSubmit = e => {
    e.preventDefault();

    const { user } = this.props.auth;

    const newPost = {
      name: user.name,
      avatar: user.avatar,
      text: this.state.text,
      image: this.state.image
    };

    this.props.addPost(newPost, this.props.history);
  };

  render() {
    const { errors } = this.props;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-body">
            {errors.postError && <div className="text-danger mt-0">{errors.postError}</div>}
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextFieldGroup placeholder="How about you meal ?" name="text" value={this.state.text} onChange={this.onChange} error={errors.text} />
                <input
                  className={classnames('form-control form-control-md', {
                    'is-invalid': errors.invalidError
                  })}
                  type="file"
                  name="image"
                  onChange={this.imgHandler}
                  required
                />
                {errors.invalidError && <div className="invalid-feedback mt-0">{errors.invalidError}</div>}
                <div className=" form-group new-post__preview-image mt-2">
                  {this.state.imagePreview && <Image imageUrl={this.state.imagePreview} />}
                </div>
              </div>

              <button type="submit" className="btn btn-white">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addPost }
)(AddPost);
