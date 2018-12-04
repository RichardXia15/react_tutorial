import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="google.com">Random User App</a>
            </nav>
        );
    }
}

export default Navbar;