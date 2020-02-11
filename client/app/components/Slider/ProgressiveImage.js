import React, { Component } from "react";
const omit = (obj, omitKey) =>
  Object.keys(obj).reduce((result, key) => {
    if (key !== omitKey) {
      result[key] = obj[key];
    }
    return result;
  }, {});

const overlayStyles = {
  position: "absolute",
  filter: "blur(2px)",
  transition: "opacity ease-in 1000ms",
  clipPath: "inset(0)"
};

export default class ProgressiveImage extends Component {
  constructor(props) {
    super(props);
    this.state = { highResImageLoaded: false };
  }
  render() {
    const { overlaySrc } = this.props;
    const { highResImageLoaded } = this.state;
    let filteredProps = omit(this.props, "overlaySrc");
    return (
      <>
        <img
          {...filteredProps}
          className="d-none"
          onLoad={(e) => {
            this.setState({ highResImageLoaded: true });
            e.target.className = this.props.className;
          }}
          ref={img => {
            this.highResImage = img;
          }}
          src={this.props.src}
        />
        <img
          {...filteredProps}
          className={`${this.props.className} ${overlayStyles}`}
          {...highResImageLoaded && { className : "d-none"  }}
          src={overlaySrc}
        />
      </>
    );
  }
}
