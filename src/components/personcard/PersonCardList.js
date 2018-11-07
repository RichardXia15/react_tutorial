import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/PersonCardList.css';

class PersonCardList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isLoading: true,
            error: null,
            selectedUser: null
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        fetch('https://randomuser.me/api/?results=10')
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
            });
    }

    selectUser(user) {
        this.setState({selectedUser: user})
    }

    render() {
        const { users, isLoading, error, selectedUser } = this.state;

        if (isLoading) {
            return (
                <div>isLoading ...</div>
            );
        }
        if (error != null) {
            return (
                <div>
                    {error.message}
                </div>
            );
        }
        return (
            <div className="person-card-list">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-header">
                                People
                            </div>
                            <ul className="list-group list-group-flush">
                                {users.map(function (user, i) {
                                    if (user == selectedUser)
                                    {
                                        return (
                                            <li className="list-group-item selected" key={i}>
                                                <img className="circle-image" src={user.picture.large} alt="Card cap"></img>
                                                {user.name.first + ' ' + user.name.last}
                                            </li>)
                                    }
                                    return (
                                        <li className="list-group-item" onClick={this.selectUser.bind(this, user)} key={i}>
                                            <img className="circle-image" src={user.picture.large} alt="Card cap"></img>
                                            {user.name.first + ' ' + user.name.last}
                                        </li>
                                    );
                                }.bind(this))}
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <PersonInfoCard user={selectedUser}/>
                    </div>
                </div>
            </div>
        );
    }
}

function PersonInfoCard(props) {
    if(!props.user) {
        return (
            <div className="card">
                <div className="card-body">
                    please select a user for more details
                </div>
            </div>
        );
    }

    const { user } = props;

    return (
        <div className="card">
            <div className="card-header">
                <img className="circle-image" src={user.picture.large} alt="Card cap"></img>
                {user.name.first + " " + user.name.last}
            </div>
            <div className="card-body">
                <h5 className="card-title">Username: {user.login.username}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Id: {user.id.name + "-" + user.id.value}</h6>
            </div>
        </div>
    );
}

export default PersonCardList;