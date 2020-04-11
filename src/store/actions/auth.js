import * as actionTypes from './_actionTypes';
import axios from 'axios';
import axiosInstance from '../../axios';

//Start ------
  const authStart = () => {
    return {
      type: actionTypes.AUTH_START
    }
  }


//Clears ------
  export const clearSignUpRedirect = () => {
    return {
      type: actionTypes.AUTH_CLEAR_SIGNUP_REDIRECT
    }
  }
  export const clearSignInRedirect = () => {
    return {
      type: actionTypes.AUTH_CLEAR_SIGNIN_REDIRECT
    }
  }


//Sign UP ------
  const authSignUpSuccess = () => {
    return {
      type: actionTypes.AUTH_SIGNUP_SUCCESS
    }
  }
  const authSignUpFail = (error) => {
    return {
      type: actionTypes.AUTH_SIGNUP_FAIL,
      error: error
    }
  }


//Sign In ------
  const authSignInSuccess = (token, userId) => {
    return {
      type: actionTypes.AUTH_SIGNIN_SUCCESS,
      token: token,
      userId: userId
    }
  }
  const authSignInFail = (error) => {
    return {
      type: actionTypes.AUTH_SIGNIN_FAIL,
      error: error
    }
  }


//Logout ------
  export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expiration')
    localStorage.removeItem('userId')
    return {
      type: actionTypes.AUTH_LOGOUT
    }
  }


//Check Auth Timeout ------
export const checkAuthTimeout = (expiration) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, expiration * 1000)
  }
}


//Store User ------
  const authStoreUser = (user) => {
    const userId = user.userId;
    const firstName = user.firstName;
    const lastName = user.lastName;
    return {
      type: actionTypes.AUTH_STORE_USER,
      userId: userId,
      userName: `${firstName} ${lastName}`
    }
  }


//Auth Get User ------
  const authGetUser = (userId) => {
    return dispatch => {
      axiosInstance.get('/users.json')
        .then(response => {
          let user = {};
          for(let key in response.data){
            if(response.data[key].userId === userId ){
              user = { ...response.data[key] }
            }
          }
          dispatch(authStoreUser(user))
        })
        .catch(error => {
          console.log(error);
        })
    } 
  }


//Add New User To FB ------
  const authAddUserToData = (userId, firstName, lastName) => {
    return dispatch => {
      const newUserData = {
        userId: userId,
        firstName: firstName,
        lastName: lastName
      };
      axiosInstance.post('/users.jso', newUserData)
        .then(response => {
        })
        .catch(error => {
          console.log('New User Error: ', error);
        })
    }
  }


//Auth Sign Up ------
export const authSignUp = (firstName, lastName, email, password) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBtPWk_avJpC2OxHIUHswLIiQ6pW9dgJ6I';
    axios.post(url, authData)
      .then(response => {
        dispatch(authAddUserToData(response.data.localId, firstName, lastName));
        dispatch(authSignUpSuccess())
      })
      .catch(error => {
        dispatch(authSignUpFail(error.response.data.error.message))
      })
  }
}


//Auth Sign In ------
export const authSignIn = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBtPWk_avJpC2OxHIUHswLIiQ6pW9dgJ6I', authData)
      .then(response => {
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('userID', response.data.localId);
        localStorage.setItem('expiration', expirationDate);
        dispatch(authSignInSuccess(response.data.idToken, response.data.localId))
        dispatch(authGetUser(response.data.localId))
      })
      .catch(error => {
        dispatch(authSignInFail(error.response.data.error.message))
      })
  }
}


//Check Auth ------
export const checkAuthState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if(!token){
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expiration'));
      if(expirationDate < new Date()){
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('userID');
        dispatch(authSignInSuccess(token, userId));
        dispatch(authGetUser(userId));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  }
}