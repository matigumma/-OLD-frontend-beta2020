import React from 'react';
import {render} from 'react-dom';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-123642441-1');
ReactGA.pageview(window.location.pathname + window.location.search);
//import loadable from '@loadable/component'
//import * as serviceWorker from './serviceWorker';
//import './styles/main.scss';
//const App = lazy(() => import('./components/App/App.jsx'))
import App from './components/App/App.jsx'
//import Splash from './pages/Splash/Splash'
//const App = loadable(()=>import('./components/App/App'))
render((
    <App/>
  ), 
  document.getElementById('root')
);

//serviceWorker.unregister();

/* if (module.hot && process.env.NODE_ENV === "development") {
    module.hot.accept("./components/App/LoadableApp", () => {
      const NextApp = require("./components/App/LoadableApp").default;
      ReactDOM.render(<NextApp/>, rootId);
    });
} */