import React from 'react';
import Loading from '../../components/Loading'

const Splash = (props) => (
    <div className="d-flex align-items-center flex-column justify-content-center h-100">
        <Loading />
        <span>cargando...</span>
        <img src="/assets/img/Logo.png" alt="Logo Freewaves" />
        <button className="btn btn-primary mt-4" onClick={props.onLogin} >Login</button>
        <button className="btn btn-primary mt-4" onClick={props.onRegister} >Register</button>
    </div>
  );
  
export default Splash