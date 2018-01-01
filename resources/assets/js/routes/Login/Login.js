import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

//  Routes
import Home from '../Home';

//  Components
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';

class Login extends PureComponent {
    constructor(props) {
        super(props);
  
        this.state = {
            username: '',
            password: '',
            isLoading: false,
            error: null,
        };

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleKeyPressPassword = this.handleKeyPressPassword.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    handleChangeUsername(event) {
        this.setState({username: event.target.value});
    }
    handleChangePassword(event) {
        this.setState({password: event.target.value});
    }
    handleKeyPressPassword(event) {
        if(event.key == 'Enter'){
            this.handleLogin();
        }
    }
    handleLogin() {
        if(this.state.username.length === 0) {
            this.setState({error: 'Please enter username.'});
        } else if(this.state.password.length === 0) {
            this.setState({error: 'Please enter password.'});
        } else {
            this.setState({
                isLoading: true
            });

            fetch('api/contents/', {
                method:'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            })
            .then(response => {
                return response.json();
            })
            .then(data => {
                if(data.exception) {
                    this.setState({
                        error: 'System error. Please contact administrator.',
                        isLoading: false
                    });
                } else if(data.length < 1) {
                    this.setState({
                        error: 'Wrong username or password.',
                        isLoading: false
                    });
                }else {
                    sessionStorage.user = JSON.stringify(data[0]);
                    
                    this.setState({
                        error: null,
                        isLoading: false
                    });
                }
            });
        }
    }
    render() {
        let { username, password, isLoading, error } = this.state;
        
        return (
            window.sessionStorage.user ?
            <Home user={JSON.parse(window.sessionStorage.user)} /> :
            <div className="login">
                <div className="login__box">
                    <h1>Welcome.</h1>
                    <p>Login to manage your website.</p>
                    
                    <TextInput block autoFocus type="text" placeholder="Username" value={username}
                        onChange={this.handleChangeUsername} />
                    <TextInput block type="password"
                        placeholder="Password" value={password}
                        onChange={this.handleChangePassword}
                        onKeyPress={this.handleKeyPressPassword} />
                    <Button primary medium onClick={this.handleLogin} disabled={isLoading}>Login</Button>

                    {
                        (!error && isLoading) &&
                        <div className="login__loading">Please wait...</div>
                    }
                    
                    {
                        (error && !isLoading) &&
                        <div className="login__error">{ error }</div>
                    }

                    <small className="login__author">
                        powered by <a href="http://stevanus.id/" target="_blank">stevadmin</a>
                    </small>
                </div>
            </div>
        );
    }
}

export default Login;