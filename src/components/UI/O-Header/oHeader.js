import React from 'react';
import classes from './OHeader.module.scss';
import { NavLink } from 'react-router-dom'

const OHeader = (props) => {

  let signIn = null;
  let signUp = null;
  if(props.token == null){
    signIn = (
      <NavLink 
        to="/account/sign-in" 
        activeClassName={ classes.active } 
        className={ classes.NavLink }>
        Sign In
      </NavLink>
    )
    signUp = (
      <NavLink 
        to="/account/sign-up" 
        activeClassName={ classes.active } 
        className={ classes.NavLink }>
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
        className={ classes.NavLink }>
        View My Dashboard
      </NavLink>
    )
    signOut = (
      <p 
        onClick={ props.signOut }
        className={ classes.SignOut }>
        Sign Out
      </p>
    )
  }
  

  return (
    <div className={ classes.OHeader }>

      <NavLink to="/home" className={ classes.LogoWrap }>
        <h1 className={ classes.Name }>
          My Program
        </h1>
      </NavLink>

      <nav className={ classes.Nav }>
        <NavLink 
          to="/use-cases" 
          activeClassName={ classes.active } 
          className={ classes.NavLink }>
          Use Cases
        </NavLink>
        <NavLink 
          to="/prices" 
          activeClassName={ classes.active } 
          className={ classes.NavLink }>
          Prices
        </NavLink>
        <NavLink 
          to="/company" 
          activeClassName={ classes.active } 
          className={ classes.NavLink }>
          Company
        </NavLink>

        { signIn }
        { signUp }

        { signOut }
        { myProgram }
        

      </nav>

      <div 
        className={ classes.MenuToggle }
        onClick={ props.menu }>
        <div className={ classes.ToggleBar }></div>
        <div className={ classes.ToggleBar }></div>
      </div>

    </div>
  )
}

export default OHeader;
