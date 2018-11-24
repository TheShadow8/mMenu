import React from 'react';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/postActions';

function Comment(props) {
  const { comment, postId, auth, deleteComment } = props;

  return (
    <div className="card card-body mb-3 comment">
      <div className="row">
        <div className="col-md-2">
          {/* TODO: link to user profile */}
          <a href="profile.html">
            <img className="rounded-circle d-none d-md-block" src={comment.avatar} alt="" />
          </a>
          <br />
          <p className="text-center">{comment.name}</p>
        </div>
        <div className="col-md-10">
          <p className="lead">{comment.text}</p>
          {comment.user === auth.user.id ? (
            <button onClick={() => deleteComment(postId, comment._id)} type="button" className="btn btn-danger mr-1">
              <i className="fas fa-times" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

const mapStatetoProps = state => ({ auth: state.auth });

export default connect(
  mapStatetoProps,
  { deleteComment }
)(Comment);
