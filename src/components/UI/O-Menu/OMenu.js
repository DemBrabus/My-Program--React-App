import React from 'react';
import classes from './OMenu.module.scss';
import { NavLink } from 'react-router-dom'

const OMenu = (props) => {

  let styles = [ classes.OMenu ];
  if( props.menuState ){
    styles = [ classes.OMenu, classes.OMenuOpen ]
  }

  let signIn = null;
  let signUp = null;
  if(props.token == null){
    signIn = (
      <NavLink 
        to="/account/sign-in" 
        activeClassName={ classes.active } 
        className={ classes.NavLink }
        onClick={ props.menu }>
        Sign In
      </NavLink>
    )
    signUp = (
      <NavLink 
        to="/account/sign-up" 
        activeClassName={ classes.active } 
        className={ classes.NavLink }
        onClick={ props.menu }>
        Get MP For Free
      </NavLink>
    )
  }
   let myProgram = null;
   let signOut = null;
  if(props.token != null){
    myProgram = (
      <NavLink 
        to="/mp" 
        activeClassName={ classes.active } 
        className={ classes.NavLink }
        onClick={ props.menu }>
        View My Dashboard
      </NavLink>
    )
    const signOutClick = () => {
      props.menu()
      props.signOut()
    }
    signOut = (
      <p 
        onClick={ props.signOut }
        className={ classes.SignOut }
        onClick={ signOutClick }>
        Sign Out
      </p>
    )
  }

  return (
    <div className={ styles.join(' ')}>
      <div className={ classes.OMenuInner }>

        <div 
          className={ classes.ExitWrap }>
          <div 
            className={ classes.Exit }
            onClick={ props.menu }>
            <div className={ classes.ExitBar }></div>
            <div className={ classes.ExitBar }></div>
          </div>
        </div>

        <nav className={ classes.Nav }>
        <NavLink 
          to="/use-cases" 
          activeClassName={ classes.active } 
          className={ classes.NavLink }
          onClick={ props.menu }>
          Use Cases
        </NavLink>
        <NavLink 
          to="/prices" 
          activeClassName={ classes.active } 
          className={ classes.NavLink }
          onClick={ props.menu }>
          Prices
        </NavLink>
        <NavLink 
          to="/company" 
          activeClassName={ classes.active } 
          className={ classes.NavLink }
          onClick={ props.menu }>
          Company
        </NavLink>

        { signIn }
        { signUp }

        { signOut }
        { myProgram }
        

      </nav>

      </div>
    </div>
  )
}

export default OMenu;