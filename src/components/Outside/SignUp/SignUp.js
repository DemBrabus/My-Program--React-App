import React, { Component } from 'react';
import classes from './SignUp.module.scss';
import Input from '../../UI/Form/Input/Input';
import Button from '../../UI/Form/Button/Button';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { withRouter } from 'react-router';

class SignUp extends Component {
  state = {
    SignUpForm: {
      firstName: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'First Name*'
        },
        validation: {
          required: true,
        },
        value: '',
        valid: false,
        touched: false
      },
      lastName: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Last Name*'
        },
        validation: {
          required: true,
        },
        value: '',
        valid: false,
        touched: false
      },
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
        name: 'Sign Up',
        color: '#bbb'
      }
    }
  }

  componentDidMount(){

  }

  shouldComponentUpdate(nextProps, nextState){
    return nextProps !== this.props || nextState !== this.state;
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
    const updatedSignUpForm = {
      ...this.state.SignUpForm,
      [inputName]: {
        ...this.state.SignUpForm[inputName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.SignUpForm[inputName].validation),
        touched: true
      }
    }
    this.setState({ SignUpForm: updatedSignUpForm })
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.SignUpForm.firstName.value,
      this.state.SignUpForm.lastName.value,
      this.state.SignUpForm.email.value,
      this.state.SignUpForm.password.value,
    )
  }



  render(){

    // console.log(this.props);
    

    if(this.props.successfulSignUp){
      this.props.history.replace('/account/sign-in');
    }

    if(
      this.state.SignUpForm.firstName.valid &&
      this.state.SignUpForm.lastName.valid &&
      this.state.SignUpForm.email.valid && 
      this.state.SignUpForm.password.valid) {
        if(this.state.formIsValid === false){
          this.setState({ formIsValid: true })
        }
      }

    const formElementArray = [];
      for(let key in this.state.SignUpForm){
        formElementArray.push({
          id: key,
          config: this.state.SignUpForm[key]
        })
      }
    
    let errorMessage = null;
      if(this.props.error != null){
        if(this.props.error === 'EMAIL_EXISTS'){
          errorMessage = 'This email is already in use'
        } else if(this.props.error === 'OPERATION_NOT_ALLOWED'){
          errorMessage = 'There is an issue with your account, please contact support'
        } else if(this.props.error === 'TOO_MANY_ATTEMPTS_TRY_LATER'){
          errorMessage = 'One too many attempts have been made, try again later.'
        } else if(this.props.error === 'INVALID_EMAIL'){
          errorMessage = 'Please complete our sign up form'
        }
      }

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
    ));

    let content = (
      <div className={ classes.Content }>

          <p className={ classes.PageTitle }>Ready to get started?</p>

          <p className={ classes.PageErrorMessage }>{ errorMessage }</p>
          <form onSubmit={ this.submitHandler } className={ classes.Form }>
            { formInputs }
            <p className={ classes.PasswordText }>Password must be at least 8 characters</p>
            <Button
              disabled={ this.state.formIsValid ? false : true }
              buttonColor={ this.state.formButton.submit.color }
              buttonText={ this.state.formButton.submit.name } />
          </form>
        </div>
    )


    return (
      <div className={ classes.SignUp }>
        { content }
      </div>
    )
  }
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token != null,
    successfulSignUp: state.auth.successfulSignUp
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (firstName, lastName, email, password) => dispatch(actions.authSignUp(firstName, lastName, email, password)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUp));