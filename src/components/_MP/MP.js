import React from 'react';
import ControlCenter from '../ControlCenter/ControlCenter';
import classes from './MP.module.scss';

const MP = () => {
  return (
    <div id="MP" className={ classes.MP } data-react data-firebase>
      <ControlCenter />
    </div>
  );
}

export default MP;
