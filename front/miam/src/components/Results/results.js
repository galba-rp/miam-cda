import React from 'react';

const results = (props) => {
    console.log(props.location.state)
    // let order = Object.values(props.location.state)
    const obj = props.location.state.order;
    console.log(obj)
    let order = [];
    for(let i of obj){
        if(i === '🍕'){
            order.push(1);
        }
        if(i === "🍣"){
            order.push(0);
        }
        if(i === "🥦"){
            order.push(-1);
        }
    }
    console.log(order)


    
    return ( 
        <h1>results</h1>
     );
}
 
export default results;