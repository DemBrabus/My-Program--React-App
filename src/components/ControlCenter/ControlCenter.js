import React, { Component } from 'react';
import { Route, Redirect, Switch, withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import classes from './ControlCenter.module.scss';

import MainContent from '../HOC/MainContent/MainContent';

import Home from '../Outside/Home/Home';
import UseCases from '../Outside/UseCases/UseCases';
import Prices from '../Outside/Prices/Prices';
import Company from '../Outside/Company/Company';
import SignIn from '../Outside/SignIn/SignIn';
import SignUp from '../Outside/SignUp/SignUp';

import OHeader from '../UI/O-Header/OHeader';
import OMenu from '../UI/O-Menu/OMenu';

import MainView from '../Inside/MainView/MainView';


class ControlCenter extends Component {
  state = {
    oMenu: false,
  }

  
  componentDidMount(){
    this.props.onAuthAutoSignIn()
    window.onresize = () => {
      let width = window.innerWidth;
      if(width > 999){
        this.setState({ oMenu: false })
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    return nextProps !== this.props || nextState !== this.state;
  }

  updateMenuState = () => {
    const oldState = this.state.oMenu;
    this.setState({ oMenu: !oldState })
  }

  AuthSignOut = () => {
    this.props.onAuthSignOut();
  }

  render(){
    // console.log(this.props, this.state);

    

    let oHeader = null;
    let oFooter = null;
    let oMenu = null;
      if(
        this.props.location.pathname === '/home' || 
        this.props.location.pathname === '/use-cases' || 
        this.props.location.pathname === '/prices' || 
        this.props.location.pathname === '/company' || 
        this.props.location.pathname === '/account/sign-in' || 
        this.props.location.pathname === '/account/sign-up'
      ){
        oHeader = <OHeader 
                    signOut={ this.AuthSignOut }
                    token={ this.props.authToken }
                    menu={ this.updateMenuState } />
        oMenu = <OMenu 
                  signOut={ this.AuthSignOut }
                  token={ this.props.authToken }
                  menuState={ this.state.oMenu } 
                  menu={ this.updateMenuState } />
      }


    let mainContent = (
      <MainContent>
        <Route path="/home" component={ Home } />
        <Route path="/use-cases" component={ UseCases } />
        <Route path="/prices" component={ Prices } />
        <Route path="/company" component={ Company } />
        <Route path="/account/sign-in" component={ SignIn } />
        <Route path="/account/sign-up" component={ SignUp } />
        <Redirect to="/home" />
      </MainContent>
    )

    if(this.props.authToken != null){
      mainContent = (
        <MainContent>
          <Route path="/home" component={ Home } />
          <Route path="/use-cases" component={ UseCases } />
          <Route path="/prices" component={ Prices } />
          <Route path="/company" component={ Company } />
          <Route path="/account/sign-in" component={ SignIn } />
          <Route path="/account/sign-up" component={ SignUp } />
          <Route path="/mp" component={ MainView } />
            <Redirect to="/mp" />
        </MainContent>
      )
    }

    let routes = (
      <Switch>
        { mainContent }
      </Switch>
    )

    return (
      <div id="ControlCenter" className={ classes.ControlCenter }>
        
      { oHeader }
      { oMenu }  
      { routes }

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    authToken: state.auth.token,
    redirectToMp: state.auth.redirectToMp
  }
}

const mapDispatchToState = dispatch => {
  return {
    onAuthAutoSignIn: () => dispatch(actions.checkAuthState()),
    onAuthSignOut: () => dispatch(actions.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToState) (withRouter(ControlCenter));