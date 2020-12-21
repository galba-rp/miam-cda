import React from 'react';
import classes from './modal.module.css';

const modal = (props) => {
    return (
        <div className={[classes.Modal, props.show ? classes[props.modalType] : classes.Hide].join(' ')}>
              {props.children}
          </div>
       
      );
}
 
export default modal;