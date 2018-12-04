import React from 'react';
import PropTypes from 'prop-types';

import './PostThumbs.css';
import PostColumn from './PostColumn';

function PostThumbs({posts}) {
  let postThumbs;
  const postsColOne = [];
  const postsColTwo = [];
  const postsColThree = [];

  posts.map((post, index) => {
    if (index % 3 === 0) {
      return postsColOne.push(post);
    } else if (index % 3 === 1) {
      return postsColTwo.push(post);
    } else {
      return postsColThree.push(post);
    }
  });

  postThumbs = (
    <div className="col-12 post-thumbnails">
      <div>
        <PostColumn posts={postsColOne} />
      </div>

      <div>
        <PostColumn posts={postsColTwo} />
      </div>
      <div>
        <PostColumn posts={postsColThree} />
      </div>
    </div>
  );

  return postThumbs;
}

PostThumbs.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostThumbs;
