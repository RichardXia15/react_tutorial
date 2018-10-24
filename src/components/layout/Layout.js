import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../navbar/Navbar';
import PersonCardList from '../personcard/PersonCardList';

class Layout extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className="container">
                    <PersonCardList/>
                </div>
            </div>
        );
    }
}

export default Layout;