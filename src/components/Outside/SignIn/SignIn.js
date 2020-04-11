import React, { Component } from 'react';
import classes from './SignIn.module.scss';
import { connect } from 'react-redux';
import Input from '../../UI/Form/Input/Input';
import Button from '../../UI/Form/Button/Button';
import * as actions from '../../../store/actions/index';

class Login extends Component {
  state = {
    SignInForm: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email Address*'
        },
        validation: {
          required: true,
          isEmail: true
        },
        value: '',
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password*'
        },
        validation: {
          required: true,
          minLength: 8
        },
        value: '',
        valid: false,
        touched: false
      }
    },
    formIsValid: false,
    formButton: {
      submit: {
        name: 'Sign In',
        color: '#bbb'
      }
    }
  }

  componentDidMount(){
    this.props.onClearSignUpRedirect();
  }

  checkValidity = (value, rules) => {
    let isValid = true;
    if(rules.required){
      isValid = value.trim() !== '' && isValid
    }
    if(rules.isEmail){
      
    }
    if(rules.minLength){
      isValid = value.length >= rules.minLength && isValid
    }
    return isValid;
  }

  inputChangeHandler = (event, inputName) => {
    const updatedSignInForm = {
      ...this.state.SignInForm,
      [inputName]: {
        ...this.state.SignInForm[inputName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.SignInForm[inputName].validation),
        touched: true
      }
    }
    this.setState({ SignInForm: updatedSignInForm })
  }

  submitHandler = (event) => {
    event.preventDefault();
      this.props.onAuth(this.state.SignInForm.email.value,
      this.state.SignInForm.password.value);
      
  }

  render(){

    if(this.props.successfulSignIn){
      this.props.history.replace('/mp')
    }


    const formElementArray = [];
      for(let key in this.state.SignInForm){
        formElementArray.push({
          id: key,
          config: this.state.SignInForm[key]
        })
      };

    let formInputs = formElementArray.map(element => (
      <Input
        key={ element.id }
        id={ element.id }
        elementType={ element.config.elementType }
        elementConfig={ element.config.elementConfig }
        value={ element.config.value }
        invalid={ !element.config.valid }
        shouldValidate={ element.config.validation }
        touched={ element.config.touched }
        changed={ (event) => this.inputChangeHandler(event, element.id) }
         />
    ))

    if(
      this.state.SignInForm.email.valid && 
      this.state.SignInForm.password.valid){
      if(this.state.formIsValid === false){
          this.setState({ formIsValid: true })
        }
    }

    let errorMessage = null;
    if(this.props.error != null){
      if(this.props.error === 'EMAIL_NOT_FOUND'){
        errorMessage = 'Your email was not found'
      } else if(this.props.error === 'INVALID_PASSWORD'){
        errorMessage = 'Your password was incorrect'
      } else if(this.props.error === 'USER_DISABLED'){
        errorMessage = 'There is an issue with your account, please contact support'
      } 
    }

    const content = (
      <div className={ classes.Content }>
        <p className={ classes.PageTitle }>Sign In</p>
        <p className={ classes.PageErrorMessage }>{ errorMessage }</p>
        <form onSubmit={ this.submitHandler } className={ classes.Form }>
          { formInputs }
          <Button
            disabled={ this.state.formIsValid ? false : true }
            buttonColor={ this.state.formButton.submit.color }
            buttonText={ this.state.formButton.submit.name }
                                                              />
        </form>
      </div>
    )


    return (
      <div className={ classes.SignIn }>
        { content }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    authToken: state.auth.token,
    successfulSignIn: state.auth.successfulSignIn,
    error: state.auth.error,
    loading: state.auth.loading
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(actions.authSignIn(email, password)),
    onClearSignUpRedirect: () => dispatch(actions.clearSignUpRedirect())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);