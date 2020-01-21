import React, { Component } from 'react';

class Splash extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <div className="d-flex align-items-center flex-column justify-content-center h-100">
                <img src="/assets/img/Logo.png" alt="Logo Freewaves" />
                <button className="btn btn-primary mt-4" onClick={this.props.onLogin} >Login</button>
                <button className="btn btn-primary mt-4" onClick={this.props.onRegister} >Register</button>
            </div>
        );
    }
}

export default Splash;