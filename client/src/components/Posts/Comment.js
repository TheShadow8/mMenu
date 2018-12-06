import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {deleteComment} from '../../actions/postActions';

function Comment({comment, postId, auth, deleteComment}) {
  return (
    <div className="media">
      {/* TODO: link to user profile */}

      <div className="col-2 mr-3">
        <img className="rounded-circle " src={comment.avatar} alt="" />

        <h6 className="text-center">{comment.name}</h6>
      </div>

      <div className="media-body">
        <p className="lead">{comment.content}</p>
        {comment.user === auth.user._id ? (
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

Comment.propTypes = {
  auth: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStatetoProps = state => ({auth: state.auth});

export default connect(
  mapStatetoProps,
  {deleteComment},
)(Comment);
