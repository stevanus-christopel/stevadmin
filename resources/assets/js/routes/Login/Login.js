import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

//  Routes
import Home from '../Home';

//  Components
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';

class Login extends PureComponent {
    componentDidMount(){
        
    }
    render() {
        return (
            <div className="login">
                <div className="login__box">
                    <h1>Welcome.</h1>
                    <p>Login to manage your website content.</p>
                    <TextInput type="text" placeholder="Username" />
                    <TextInput type="password" placeholder="Password" />
                    <Button medium>Login</Button>
                    <div className="login__error"></div>

                    <small className="login__author">
                        powered by <a href="http://stevanus.id/" target="_blank">stevadmin</a>
                    </small>
                </div>
            </div>
        );
    }
}

export default Login;