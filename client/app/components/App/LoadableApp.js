import React, { Component } from "react";
import Loadable from "react-loadable";
import Loading from '../Loading'

const LoadApp = Loadable({
  loader: () => import("./App"),
  delay: 3000,
  loading: Loading,
  timeout: 10000 // 10 seconds
});
export default class LoadableApp extends Component {
  render() {
    return <LoadApp/>
  }
}