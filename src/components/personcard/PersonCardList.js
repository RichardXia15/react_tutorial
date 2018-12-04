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
        fetch('http://localhost:1234/users/many/5')
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    throw new Error("something went wrong ...")
                }
            }).then(data => {
                this.setState({ users: data, isLoading: false });
            }).catch(error => {
                this.setState({ error: error, isLoading: false })
            });
    }

    handleChange(event) {
        var temp = this.state.selectedUser;

        switch(event.target.id) {
            case "FirstNameForm":
                temp.name.first = event.target.value;
                this.setState({selectedUser: temp});
                break;
            case "LastNameForm":
                temp.name.last = event.target.value;
                this.setState({selectedUser: temp});
                break;
            case "EmailForm":
                temp.email = event.target.value;
                this.setState({selectedUser: temp});
                break;
        }
    }

    saveUser() {
        const {selectedUser} = this.state;
        var temp = {
            name: {
                title: selectedUser.name.title,
                first: selectedUser.name.first,
                last: selectedUser.name.last
            },
            email: selectedUser.email
        };

        fetch('http://localhost:1234/users/'+ selectedUser._id +'/update', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(temp)
        })
        .then(res => res.text())
        .then(res => alert(res))
    }

    selectUser(user) {
        this.setState({selectedUser: user});
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
                                    if (user === selectedUser)
                                    {
                                        return (
                                            <li className="list-group-item selected" key={i}>
                                                <img className="circle-image" src={user.picture} alt="Card cap"></img>
                                                {user.name.first + ' ' + user.name.last}
                                            </li>)
                                    }
                                    return (
                                        <li className="list-group-item" onClick={this.selectUser.bind(this, user)} key={i}>
                                            <img className="circle-image" src={user.picture} alt="Card cap"></img>
                                            {user.name.first + ' ' + user.name.last}
                                        </li>
                                    );
                                }.bind(this))}
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <PersonInfoCard user={selectedUser} handleChange={this.handleChange.bind(this)} 
                            saveUser={this.saveUser.bind(this)} />
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

    const { user, handleChange, saveUser } = props;

    return (
        <div className="card">
            <div className="card-header">
                <div className="row">
                    <div className="col-md-6">
                        <img className="circle-image" src={user.picture} alt="Card cap"></img>
                        {user.name.first + " " + user.name.last}
                    </div>
                </div>
            </div>
            <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted">Id: {user._id}</h6>
                <form>
                    <div className="form-group">
                        <label htmlFor="FirstNameForm">First Name:</label>
                        <input type="text" className="form-control" id="FirstNameForm" 
                            value={user.name.first} onChange={handleChange}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="LastNameForm">Last Name:</label>
                        <input type="text" className="form-control" id="LastNameForm" 
                            value={user.name.last} onChange={handleChange}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="EmailForm">Email:</label>
                        <input type="text" className="form-control" id="EmailForm" 
                            value={user.email} onChange={handleChange}></input>
                    </div>
                </form>
                <a className="btn btn-primary" onClick={saveUser}>Save Changes</a>
            </div>
        </div>
    );
}

export default PersonCardList;