import React, { Component } from 'react';
import { connect } from 'react-redux';

export class User extends Component {
  render() {
    return (
      <div className="media  col-sm-12 align-self-center ">
        <img className="mr-3" src={this.props.user.avatar} style={{ width: '100px' }} alt="" />
        <div className="media-body">
          <h5 className="mt-0">{this.props.user.name}</h5>
          {this.props.user.bio}

          <div>
            <button className="btn btn-white btn-sm mt-3">Edit profile</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(User);
