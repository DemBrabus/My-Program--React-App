import React, { Component } from 'react';
import classes from './MainView.module.scss';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

class MainView extends Component {
  state = {

  }

  componentDidMount(){
    this.props.onClearSignInRedirect()
  }

  render(){
    
    return (
      <div className={ classes.MainView }>
        <h1>Welcome to My Program!</h1>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClearSignInRedirect: () => dispatch(actions.clearSignInRedirect())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);