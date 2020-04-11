import * as actionTypes from '../actions/_actionTypes';
import updateObject from '../utility';

const initState = {
  userId: null,
  user: null, 
  token: null,
  error: null,
  loading: null,
  successfulSignUp: false,
  successfulSignIn: false,
  redirectToMp: false,
  signedIn: false
}

//Start ------
  const authStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
  }


//Clears ------
  const authClearSignUpRedirect = (state, action) => {
    return updateObject(state, {successfulSignUp: false})
  }
  const authClearSignInRedirect = (state, action) => {
    return updateObject(state, {successfulSignIn: false, redirectToMp: false})
  }


//Logout ------
  const authLogout = (state, action) => {
    return updateObject(state, {token: null, user: null, userId: null, signedIn: null, loading: null})
  }



//Sign Up ------
  const authSignUpSuccess = (state, action) => {
    return updateObject(state, {error: null, loading: false, successfulSignUp: true })
  }
  const authSignUpFail = (state, action) => {
    return updateObject(state, {error: action.error, loading: false, })
  }



//Sign In ------
  const authSignInSuccess = (state, action) => {
    return updateObject(state, {token: action.token, userId: action.userId, error: null, loading: null, signedIn: true, successfulSignIn: true, redirectToMp: true})
  }
  const authSignInFail = (state, action) => {
    return updateObject(state, {loading: null, error: action.error})
  }


//Store User ------
  const authStoreUser = (state, action) => {
    return updateObject(state, {userId: action.userId, user: action.userName})
  }


//Reducer
const authReducer = (state = initState, action) => {
  switch (action.type){
    case actionTypes.AUTH_START: return authStart(state, action);

    case actionTypes.AUTH_SIGNUP_SUCCESS: return authSignUpSuccess(state, action);
    case actionTypes.AUTH_SIGNUP_FAIL: return authSignUpFail(state, action);

    case actionTypes.AUTH_SIGNIN_SUCCESS: return authSignInSuccess(state, action);
    case actionTypes.AUTH_SIGNIN_FAIL: return authSignInFail(state, action);

    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);

    case actionTypes.AUTH_STORE_USER: return authStoreUser(state, action);

    case actionTypes.AUTH_CLEAR_SIGNUP_REDIRECT: return authClearSignUpRedirect(state, action);
    case actionTypes.AUTH_CLEAR_SIGNIN_REDIRECT: return authClearSignInRedirect(state, action);

    default: return state;
  }
}

export default authReducer;