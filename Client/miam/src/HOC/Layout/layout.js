import classes from './layout.module.css';
import React from 'react';

const layout = (props) => {

    return ( 
        <main className= {classes.Main}>
            {props.children}
        </main>
     );
}
 
export default layout;