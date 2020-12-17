import React, { Component } from 'react';

class WelcomePage extends Component {
    state = { 
        name: ''
     }
    render() { 
        return ( 
            <form>
        <h1>Hello</h1>
        <p>Enter your name:</p>
        <input
          type="text"
        />
      </form>
         );
    }
}
 
export default WelcomePage;