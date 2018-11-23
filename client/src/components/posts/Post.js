import React from 'react';

function Post(props) {
  const { posts } = props;

  console.log(props.posts);

  return posts.map(post => {
    console.log(post.comments[0]);
    let comment;
    post.comments.length > 0 ? (comment = post.comments[0].text) : '';
    console.log(post.comments[0]);
    return (
      <div className="col-12 align-self-center" key={post._id}>
        <img className="img-thumbnail" src={post.imagePath} />
        <h4>
          {post.name}: {post.text}
        </h4>
        <div>{post.likes.length} Likes</div>
        <hr />
        <h5> {comment} </h5>
      </div>
    );
  });
}

export default Post;
