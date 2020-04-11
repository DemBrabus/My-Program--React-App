import React from 'react';
import classes from './MainContent.module.scss';
import { withRouter } from 'react-router';

const MainContent = (props) => {
  let mainContentClasses = [classes.MainContent]
  if(props.location.pathname.includes('/mp') ){
    mainContentClasses = [classes.MainContent, classes.MPMainContent]
  }
  return (
    <div className={ mainContentClasses.join(' ')}>
      { props.children }
    </div>
  )
}
export default withRouter(MainContent);