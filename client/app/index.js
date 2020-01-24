import React, {Suspense, lazy} from 'react';
import ReactDOM from 'react-dom';
//import * as serviceWorker from './serviceWorker';
import './styles/main.scss';
import Loading from './components/Loading';
//import App from './components/App/App.jsx'
const App = lazy(() => import('./components/App/App.jsx'));

/* import loadable from '@loadable/component'

const LoadableApp = loadable(() => import('./components/App/App.jsx')) */

ReactDOM.render((<Suspense fallback={Loading}><App /></Suspense>), document.getElementById('root'));

//serviceWorker.unregister();

/* if (module.hot && process.env.NODE_ENV === "development") {
    module.hot.accept("./components/App/LoadableApp", () => {
      const NextApp = require("./components/App/LoadableApp").default;
      ReactDOM.render(<NextApp/>, rootId);
    });
} */