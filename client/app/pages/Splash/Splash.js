import React from 'react';
import loadable from '@loadable/component'
import Loading from '../../components/Loading'
import '../../styles/main.scss';
const App = loadable(()=>import('../../components/App/App'), {
	fallback: <div className="d-flex align-items-center flex-column justify-content-center h-100">
              <Loading />
              {/* <button className="btn btn-primary mt-4" onClick={props.onLogin} >Login</button>
              <button className="btn btn-primary mt-4" onClick={props.onRegister} >Register</button> */}
            </div>,
  })
const Splash = () => (
    <App />
  );
  
export default Splash