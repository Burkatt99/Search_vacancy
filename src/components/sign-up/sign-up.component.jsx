import React, { useState } from "react";
import { connect } from "react-redux";
import './sign-up.styles.jsx';
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { SignUpContainer, SignUpTitle } from "./sign-up.styles.jsx";
import { signUptStart } from "../../redux/users/user.actions.js";

const SignUp = ({ signUptStart }) => {
  const[userCredentials, setCredentials] = useState({
    email: '', 
    password: '',
    confirmPassword: '',
    displayName: ''
  });

  const { displayName, email, password, confirmPassword } = userCredentials;

  const handleSubmit = async event => {
      event.preventDefault();  
      if (password !== confirmPassword) {
        alert("passwords don't match");
        return;
      }
      signUptStart({ displayName, email, password});
    };
  
  const handleChange = event => {
      const { name, value } = event.target;
      setCredentials({...userCredentials,[name]: value });
    };

      return (
        <SignUpContainer>
          <SignUpTitle>I do not have a account</SignUpTitle>
          <span>Sign up with your email and password</span>
          <form className='sign-up-form' onSubmit={handleSubmit}>
            <FormInput
              type='text'
              name='displayName'
              value={displayName}
              onChange={handleChange}
              label='Display Name'
              required
            />
            <FormInput
              type='email'
              name='email'
              value={email}
              onChange={handleChange}
              label='Email'
              required
            />
            <FormInput
              type='password'
              name='password'
              value={password}
              onChange={handleChange}
              label='Password'
              required
            />
            <FormInput
              type='password'
              name='confirmPassword'
              value={confirmPassword}
              onChange={handleChange}
              label='Confirm Password'
              required
            />
            <CustomButton type='submit'>SIGN UP</CustomButton>
          </form>
        </SignUpContainer>
      );
    }


  const mapDispatchToProps = dispatch =>({
    signUptStart: userCredentials => dispatch(signUptStart(userCredentials))
  })

export default connect(null, mapDispatchToProps)(SignUp);