import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

//  Routes
import Content from '../Content';
import Login from '../Login';

class Home extends PureComponent {
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }
    handleLogout() {
        sessionStorage.removeItem("user");
        window.location.reload();
    }
    render() {
        let { user } = this.props;

        return (
            !this.props.user ?
            <Login /> :
            <div className="home">
                <div className="home__header">
                    <span className="home__logo">stevadmin</span>
                    <span className="home__user">
                        Welcome, <b>{ user.Username }</b> | <span className="home__logout"
                        onClick={this.handleLogout}>logout</span>
                    </span>
                </div>

                <div className="home__content">
                    <Content />
                </div>

                <small className="home__footer">
                    stevadmin by <a href="http://stevanus.id/" target="_blank">
                    stevanus.id</a> - © Stevanus Christopel
                </small>
            </div>
            
        );
    }
}

Home.propTypes = {
    user: PropTypes.object
}

Home.defaultProps = {
    user: null
}

export default Home;