import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/PersonCard.css'

class PersonCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isLoading: true,
            error: null
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        fetch('https://randomuser.me/api/')
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    throw new Error("something went wrong ...")
                }
            }).then(data => {
                this.setState({ users: data.results, isLoading: false });
            }).catch(error => {
                this.setState({ error: error, isLoading: false })
            }
        );
    }


    render() {
        const { users, isLoading, error } = this.state;

        if(isLoading) {
            return (
                <div>is loading ...</div>
            );
        }
        if(error != null) {
            return (
                <div>
                    {error.message}
                </div>
            );
        }

        return (
            <div className="person-card">
                <div className="card">
                    <div className="card-header">
                        <img className="circle-image" src={users[0].picture.large} alt="Card image cap"></img>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{users[0].name.first + ' ' + users[0].name.last}</h5>
                        <p className="card-text">Some quick example 
                            text to build on the card title and make 
                            up the bulk of the card's content.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default PersonCard;