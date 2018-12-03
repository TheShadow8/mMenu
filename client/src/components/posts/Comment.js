import React from 'react';
import {connect} from 'react-redux';
import {deleteComment} from '../../actions/postActions';

function Comment(props) {
  const {comment, postId, auth, deleteComment} = props;

  return (
    <div className="media">
      {/* TODO: link to user profile */}

      <div className="col-1 mr-3">
        <a href="">
          <img className="rounded-circle " src={comment.avatar} alt="" />
        </a>
        <p className="text-center ">{comment.name}</p>
      </div>

      <div className="media-body">
        <p className="lead">{comment.content}</p>
        {comment.user === auth.user.id ? (
          <small>
            <a
              href=""
              onClick={e => {
                e.preventDefault();
                deleteComment(postId, comment._id);
              }}
              className="text-danger mr-1">
              Delete
            </a>
          </small>
        ) : null}
      </div>
    </div>
  );
}

const mapStatetoProps = state => ({auth: state.auth});

export default connect(
  mapStatetoProps,
  {deleteComment},
)(Comment);
