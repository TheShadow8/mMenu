import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {deleteComment} from '../../actions/postActions';

function Comment({comment, postId, auth, deleteComment}) {
  return (
    <div className="media mb-3">
      <div className="col-2 text-center">
        <Link to={`/profile/${comment.user}`}>
          <img className="rounded-circle mx-auto" src={comment.avatar} style={{width: '55px', height: '55px'}} alt="" />
        </Link>
      </div>

      <div className="media-body">
        <p>
          <Link className="lead text-white" to={`/profile/${comment.user}`}>
            {comment.name}
          </Link>
          : {comment.content}
        </p>
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
