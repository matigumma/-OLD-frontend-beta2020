import React, {lazy} from 'react';
import ReactDOM from 'react-dom';
//import * as serviceWorker from './serviceWorker';
import './styles/main.scss';
import App from './components/App/App.jsx'

ReactDOM.render((<App/>), document.getElementById('root'));

//serviceWorker.unregister();

/* if (module.hot && process.env.NODE_ENV === "development") {
    module.hot.accept("./components/App/LoadableApp", () => {
      const NextApp = require("./components/App/LoadableApp").default;
      ReactDOM.render(<NextApp/>, rootId);
    });
} */