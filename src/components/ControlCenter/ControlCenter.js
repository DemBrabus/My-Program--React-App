import React, { Component } from 'react';
import { Route, Redirect, Switch, withRouter } from 'react-router';
import { connect } from 'react-redux';

import classes from './ControlCenter.module.scss';

import Home from '../Outside/Home/Home';
import Overview from '../Outside/Overview/Overview';
import Services from '../Outside/Services/Services';
import Pricing from '../Outside/Pricing/Pricing';
import Support from '../Outside/Support/Support';
import Login from '../Outside/Login/Login';
import SignUp from '../Outside/SignUp/SignUp';

import OHeader from '../UI/O-Header/oHeader';


class ControlCenter extends Component {
  state = {

  }

  componentDidMount(){

  }

  shouldComponentUpdate(){

  }

  render(){
    console.log(this.props);


    let oHeader = null;
    if(
      this.props.location.pathname === '/home' || 
      this.props.location.pathname === '/overview' || 
      this.props.location.pathname === '/services' || 
      this.props.location.pathname === '/pricing' || 
      this.props.location.pathname === '/support' || 
      this.props.location.pathname === '/account/signin' || 
      this.props.location.pathname === '/account/signup'
    ){
      oHeader = <OHeader />
    }

    let routes = (
      <Switch>
        <Route path="/home" component={ Home } />
        <Route path="/overview" component={ Overview } />
        <Route path="/services" component={ Services } />
        <Route path="/pricing" component={ Pricing } />
        <Route path="/support" component={ Support } />
        <Route path="/account/login" component={ Login } />
        <Route path="/account/signup" component={ SignUp } />
        <Redirect to="/home" />
      </Switch>
    )

    return (
      <div id="ControlCenter" className={ classes.ControlCenter }>
        
      { oHeader }  
      { routes }

      </div>
    )
  }
}

export default withRouter(ControlCenter);