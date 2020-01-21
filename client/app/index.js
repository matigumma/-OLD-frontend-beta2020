import React from 'react';
import ReactDOM from 'react-dom';
import LoadableApp from "./components/App/LoadableApp";
import * as serviceWorker from './serviceWorker';

ReactDOM.render((<LoadableApp />), document.getElementById('root'));

serviceWorker.unregister();

if (module.hot && process.env.NODE_ENV === "development") {
    module.hot.accept("./components/App/LoadableApp", () => {
      const NextApp = require("./components/App/LoadableApp").default;
      ReactDOM.render(<NextApp/>, rootId);
    });
}