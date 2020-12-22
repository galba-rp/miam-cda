import React from 'react';
import classes from './modal.module.css';
import Button from '../Button/button';

const modal = (props) => {
    //console.log(props.show)
    return (
        <div className={props.show ? classes.Show : classes.Hide}>
         
              {props.children}
            
          </div>
       
      );
}
 
export default modal;