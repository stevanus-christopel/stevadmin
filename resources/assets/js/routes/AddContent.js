import React, { Component } from 'react';

class AddContent extends Component {
 
    constructor(props) {
      super(props);
         /* Initialize the state. */
         this.state = {
            newContent: {
                contentCode: '',
                page: '',
                content: '',
                createdBy: '',
                lastModifiedBy: ''
            }
          }
       
      //Boilerplate code for binding methods with `this`
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleInput = this.handleInput.bind(this);
    }
     
    /* This method dynamically accepts inputs and stores it in the state */
    handleInput(key, e) {
       
      /*Duplicating and updating the state */
      var state = Object.assign({}, this.state.newContent); 
      state[key] = e.target.value;
      this.setState({newContent: state });
    }
   /* This method is invoked when submit button is pressed */
    handleSubmit(e) {
      //preventDefault prevents page reload   
      e.preventDefault();
      /*A call back to the onAdd props. The current
       *state is passed as a param
       */
      this.props.onAdd(this.state.newContent);
    }
   
    render() {
      const divStyle = {
          /*Code omitted for brevity */ }
       
      return(
        <div> 
          <h2> Add new content </h2>
          <div style={divStyle}> 
          <form onSubmit={this.handleSubmit}>
            <label> Code: 
             { /*On every keystroke, the handeInput method is invoked */ }
              <input type="text" onChange={(e)=>this.handleInput('contentCode',e)} />
            </label>
             
            <label> Page: 
              <input type="text" onChange={(e)=>this.handleInput('page',e)} />
            </label>
             
             <label> Content: 
               <input type="text" onChange={(e)=>this.handleInput('content',e)} />
             </label>
             
             <label> CreatedBy: 
               <input type="text" onChange={(e)=>this.handleInput('createdBy',e)} />
             </label>
             
             <label> LastModifiedBy: 
               <input type="text" onChange={(e)=>this.handleInput('lastModifiedBy',e)} />
             </label>
             
           { /* Input fields for Price and availability omitted for brevity */}
   
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>)
    }
  }
   
  export default AddContent;