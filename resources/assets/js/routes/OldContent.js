import React, { Component } from 'react';
 
/* Stateless component or pure component
 * { product } syntax is the object destructing
 */
const OldContent = ({content, onDelete}) => {
    
  const divStyle = {
      /*code omitted for brevity */
  }
 
  //if the props product is null, return Product doesn't exist
  if(!content) {
    return(<div style={divStyle}>  Content Doesnt exist </div>);
  }
     
  //Else, display the product data
  return(  
    <div style={divStyle}> 
      <h2> {content.contentCode} </h2>
      <p> {content.page} </p>
      <h3> {content.content} </h3>
      <h3> {content.createdBy} </h3>
      <h3> {content.created_at} </h3>
      <h3> {content.lastModifiedBy} </h3>
      <h3> {content.updated_at} </h3>
      <button onClick={onDelete}>Delete</button>
    </div>
  )
}
 
export default OldContent ;