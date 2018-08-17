import React, { Component } from 'react';

import Login from '../auth/Login';
import Register from '../auth/Register';

class Landing extends Component {
    render() {
        return (
            <div className="landing">
                <div className="dark-overlay landing-inner text-light">
                    <Login />
                    <Register />

                </div>
            </div >
        )
    }
}

export default Landing;