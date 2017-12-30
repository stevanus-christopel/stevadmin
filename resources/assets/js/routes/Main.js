import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import OldContent from './OldContent';
import AddContent from './AddContent';
 
/* Main Component */
class Main extends Component {
 
  constructor() {
   
    super();
    //Initialize the state in the constructor
    this.state = {
        contents: [],
        currentContent: null,
    }
    this.handleAddContent = this.handleAddContent.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  /*componentDidMount() is a lifecycle method
   * that gets called after the component is rendered
   */
  componentDidMount() {
    /* fetch API in action */
    fetch('/api/stv_contents')
        .then(response => {
            return response.json();
        })
        .then(contents => {
            //Fetched product is stored in the state
            this.setState({ contents });
        });
  }
   
  handleClick(content) {
   //handleClick is used to set the state
   this.setState({currentContent:content});
  
 }

 handleAddContent(content) {
     
    /*Fetch API for post request */
    fetch( 'api/stv_contents/', {
        method:'post',
        /* headers are important*/
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
         
        body: JSON.stringify(content)
    })
    .then(response => {
        return response.json();
    })
    .then( data => {
        //update the state of products and currentProduct
        this.setState((prevState)=> ({
            contents: prevState.contents.concat(data),
            currentProduct : data
        }))
    })
  
  }

  handleDelete() {
    const currentContent = this.state.currentContent;
    fetch( 'api/stv_contents/' + this.state.currentContent.id, 
        { method: 'delete' })
        .then(response => {
          /* Duplicate the array and filter out the item to be deleted */
          var array = this.state.contents.filter(function(item) {
          return item !== currentContent
        });
      
        this.setState({ contents: array, currentContent: null});
   
    });
  }

  handleUpdate(content) {
 
    const currentContent = this.state.currentContent;
    fetch( 'api/stv_contents/' + currentContent.id, {
        method:'put',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
    })
    .then(response => {
        return response.json();
    })
    .then( data => {
        /* Updating the state */
        var array = this.state.contents.filter(function(item) {
          return item !== currentContent
      })
        this.setState((prevState)=> ({
            contents: array.concat(content),
            currentContent : content
        }))
    }) 
  }
 
 renderContents() {
    return this.state.contents.map(content => {
        return (
            /* When using list you need to specify a key
             * attribute that is unique for each list item
            */
            <li onClick={() =>this.handleClick(content)} key={content.id}>
                { content.contentCode } 
            </li>      
        );
    })
  }
   
  render() {
   /* Some css code has been removed for brevity */
    return (
        <div>
            <AddContent onAdd={this.handleAddContent} />
           
           <OldContent content={this.state.currentContent} onDelete={this.handleDelete} />

            <div>
             <h3> All contents </h3>
              <ul>
                { this.renderContents() }
              </ul> 
            </div> 
        </div>
       
    );
  }
}

export default Main;


/* The if statement is required so as to Render the component on pages that have a div with an ID of "root";  
*/
if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}