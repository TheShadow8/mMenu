import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addComment } from '../../actions/postActions';

import TextAreaFieldGroup from '../Common/TextAreaFieldGroup';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { postId, profile } = this.props;

    const newComment = {
      content: this.state.content,
      name: profile.name,
      avatar: profile.avatar
    };

    this.props.addComment(postId, newComment);
    this.setState({ content: '' });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Reply to post"
                  name="content"
                  value={this.state.content}
                  onChange={this.onChange}
                  error={errors.content}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CommentForm.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  addComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.auth.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addComment }
)(CommentForm);
