import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

import Login from '../Login';

class Home extends PureComponent {
    render() {
        return (
            window.sessionStorage.user ?
            <div>
                <h1>Hello World</h1>
            </div> :
            <Login />
        );
    }
}

export default Home;