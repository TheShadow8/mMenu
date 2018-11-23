import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import Image from '../common/Image';
import { generateBase64FromImage } from '../../utils/image';
import { addPost } from '../../actions/postActions';

export class AddPost extends Component {
  state = {
    text: '',
    imagePreview: null,
    errors: {}
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  imgHandler = e => {
    generateBase64FromImage(e.target.files[0])
      .then(b64 => {
        this.setState({ imagePreview: b64 });
      })
      .catch(e => {
        this.setState({ imagePreview: null });
        console.log(e);
      });
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextFieldGroup placeholder="How about you meal ?" name="text" value={this.state.text} onChange={this.onChange} error={errors.text} />
                <input className=" form-group" type="file" onChange={this.imgHandler} />
                <div className=" form-group new-post__preview-image">{this.state.imagePreview && <Image imageUrl={this.state.imagePreview} />}</div>
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
