import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = (props) => (
  <div className="d-flex align-items-center flex-column justify-content-center h-100 mt-5">
    <h2>Page <span className="text-muted">{JSON.stringify(props.location.state.from.pathname, null, 2)}</span> not found</h2>
    <Link to="/">Go home</Link>
  </div>
);

export default NotFound;
