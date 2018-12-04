import React, {Component} from 'react';
import PropTypes from 'prop-types';

import PostImage from './PostImage';
export class PostColumn extends Component {
  // state = {
  //   isHover: false,
  // };

  // onMouseEnterPost = () => this.setState({isHover: true});

  // onMouseLeavePost = () => this.setState({isHover: false});

  render() {
    // let hoverLayout = '';
    // this.state.isHover ? hoverLayout : (hoverLayout = 'hidden');
    // console.log(this.state.isHover, hoverLayout);

    // console.log(this.props.posts);
    return this.props.posts.map(post => (
      <div
        className="post__image"
        key={post._id}
        //  onMouseEnter={this.onMouseEnterPost} onMouseLeave={this.onMouseLeavePost}
      >
        <PostImage post={post} />
      </div>
    ));
  }
}

PostColumn.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostColumn;
