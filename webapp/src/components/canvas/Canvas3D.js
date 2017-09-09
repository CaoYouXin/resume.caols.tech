import React, { Component } from 'react';
import './Canvas3D.css';
import { init3d } from '../../canvas3d';

class Canvas3DComponent extends Component {
  render() {
    return (
      <div ref={(container) => { this.containerEl = container }} className="canvas-wrapper"></div>
    );
  }

  componentDidMount() {
    init3d(this.containerEl);
  }
}

export default Canvas3DComponent;