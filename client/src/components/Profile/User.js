import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

export class User extends Component {
  render() {
    return (
      <div className="media align-self-center ">
        <img className="mr-3 rounded-circle " src={this.props.user.avatar} style={{width: '100px'}} alt="" />
        <div className="media-body">
          <h5 className="mt-0">{this.props.user.name}</h5>
          {this.props.user.bio}
          <div>
            <button className="btn btn-white btn-sm mt-3">Edit profile</button>
          </div>
          <hr />
        </div>
      </div>
    );
  }
}

User.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(User);
