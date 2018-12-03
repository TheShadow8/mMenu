import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {likePost, unlikePost} from '../../actions/postActions';

function Likes(props) {
  const {post} = props;

  return (
    <div className="mb-1">
      <button
        onClick={() => onLikeClick(props, post._id)}
        type="button"
        className={classnames('btn btn-light mr-1', {
          disabled: findUserLike(props, post.likes),
        })}>
        <i
          className={classnames('fas fa-thumbs-up', {
            'text-info': findUserLike(props, post.likes),
          })}
        />
        <span className="badge badge-light">{post.likes.length}</span>
      </button>
      <button
        onClick={() => onUnlikeClick(props, post._id)}
        type="button"
        className={classnames('btn btn-light mr-1', {
          ' disabled': !findUserLike(props, post.likes),
        })}>
        <i className="text-secondary fas fa-thumbs-down" />
      </button>
    </div>
  );
}

const onLikeClick = (props, id) => {
  props.likePost(id);
};

const onUnlikeClick = (props, id) => {
  props.unlikePost(id);
};

const findUserLike = (props, likes) => {
  const {auth} = props;
  if (likes.filter(like => like.user === auth.user.id).length > 0) {
    return true;
  } else {
    return false;
  }
};

Likes.propTypes = {
  post: PropTypes.object.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  {likePost, unlikePost},
)(Likes);
