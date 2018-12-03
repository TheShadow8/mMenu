import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

function PostColumn({posts}) {
  return posts.map(post => (
    <div key={post._id}>
      <Link to={`/post/${post._id}`}>
        <img src={post.imagePath} alt="" />
      </Link>
    </div>
  ));
}

PostColumn.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostColumn;
