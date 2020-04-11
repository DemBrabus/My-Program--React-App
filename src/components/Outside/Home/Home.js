import React, { Component } from 'react';
import classes from './Home.module.scss';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class Home extends Component{

  componentDidMount(){
  }

  render(){

    if(this.props.redirectToMp){
      this.props.history.replace('/mp')
    }

    return (
      <div className={ classes.Home }>
        <h1>Home Page</h1>
      </div>
    )
  }
};

const mapStateToProps = state => {
  return {
    redirectToMp: state.auth.redirectToMp
  }
}

export default connect(mapStateToProps, null)(withRouter(Home));