import React, { Component } from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';


class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            emailReg: '',
            passwordReg: '',
            passwordReg2: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.emailReg,
            password: this.state.passwordReg,
            password2: this.state.passwordReg2,

        };
        this.props.registerUser(newUser);

    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    render() {
        const { errors } = this.state;
        const { isRegisted } = this.props.auth;

        let registed;
        if (isRegisted === true) {
            registed =
                <div className="align-center">

                    <h2 className="text-center mt-2">
                        <i className="far fa-check-circle fa-2x text-success"></i> Registed, Time to eat !</h2>
                </div>
        }
        else {
            registed = ''
        }

        return (
            <div className='container main-center'>

                <h1 className="pb-4 text-center">Looking for some food ?</h1>
                {registed}
                <form className={classnames('form-horizontal', {
                    'invisible': (isRegisted === true)
                })} noValidate onSubmit={this.onSubmit}>
                    <TextFieldGroup
                        label="Name:"
                        placeholder="Your Name"
                        name="name"
                        type="text"
                        value={this.state.name}
                        onChange={this.onChange}
                        error={errors.name}
                    />

                    <TextFieldGroup
                        label="Email:"
                        placeholder="Email Address"
                        name="emailReg"
                        type="email"
                        value={this.state.emailReg}
                        onChange={this.onChange}
                        error={errors.emailReg}
                    />


                    <TextFieldGroup
                        label="Password:"
                        placeholder="Password"
                        name="passwordReg"
                        type="password"
                        value={this.state.passwordReg}
                        onChange={this.onChange}
                        error={errors.passwordReg}
                    />


                    <TextFieldGroup
                        label="Confirm Password:"
                        placeholder="Confirm Password"
                        name="passwordReg2"
                        type="password"
                        value={this.state.passwordReg2}
                        onChange={this.onChange}
                        error={errors.passwordReg2}
                    />

                    <div className="form-group ">
                        <button type="submit" className="btn btn-primary btn-lg btn-block">Register</button>
                    </div>



                </form>
                <footer className="text-white text-center">
                    Copyright &copy; {new Date().getFullYear()} mMenu
                  </footer>
            </div>



        )
    }
}

Register.propTypes = {
    registerUser: propTypes.func.isRequired,
    auth: propTypes.object.isRequired,
    errors: propTypes.object.isRequired,

};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { registerUser })(Register);