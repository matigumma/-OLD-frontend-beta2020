import React, {Suspense, lazy} from 'react';
import {render} from 'react-dom';
//import * as serviceWorker from './serviceWorker';
import './styles/main.scss';
const App = lazy(() => import('./components/App/App.jsx'))
//import App from './components/App/App.jsx'
import Splash from './pages/Splash/Splash'

render((
  <Suspense fallback={<Splash/>}>
    <App/>
  </Suspense>
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