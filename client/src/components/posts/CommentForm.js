import React, {Component} from 'react';
import {connect} from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import {addComment} from '../../actions/postActions';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({errors: newProps.errors});
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const {user} = this.props.auth;
    const {postId} = this.props;

    const newComment = {
      content: this.state.content,
      name: user.name,
      avatar: user.avatar,
    };

    this.props.addComment(postId, newComment);
    this.setState({content: ''});
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    const {errors} = this.state;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup placeholder="Reply to post" name="content" value={this.state.content} onChange={this.onChange} error={errors.content} />
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

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  {addComment},
)(CommentForm);
