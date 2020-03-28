import React from 'react';
import classes from './oHeader.module.scss';
import { NavLink } from 'react-router-dom'

const OHeader = (props) => {

  return (
    <div className={ classes.OHeader }>

      <NavLink to="/home" className={ classes.LogoWrap }>
        <h1 className={ classes.Name }>
          My Program
        </h1>
      </NavLink>

      <nav className={ classes.Nav }>
        <NavLink 
          to="/home" 
          activeClassName={ classes.active } 
          className={ classes.NavLink }>
          Home
        </NavLink>
        <NavLink 
          to="/overview" a
          ctiveClassName={ classes.active } 
          className={ classes.NavLink }>
          Overview
        </NavLink>
        <NavLink 
          to="/services" a
          ctiveClassName={ classes.active } 
          className={ classes.NavLink }>
          Services
        </NavLink>
        <NavLink 
          to="/pricing" 
          activeClassName={ classes.active } 
          className={ classes.NavLink }>
          Pricing
        </NavLink>
        <NavLink 
          to="/support" 
          activeClassName={ classes.active } 
          className={ classes.NavLink }>
          Support
        </NavLink>
        <NavLink 
          to="/account/signin" 
          activeClassName={ classes.active } 
          className={ classes.NavLink }>
          Sign In
        </NavLink>
        <NavLink 
          to="/account/signup" 
          activeClassName={ classes.active } 
          className={ classes.NavLink }>
          Get Started
        </NavLink>
      </nav>

      <div className={ classes.MenuToggle }>
        <div className={ classes.ToggleBar }></div>
        <div className={ classes.ToggleBar }></div>
      </div>

    </div>
  )
}

export default OHeader;
