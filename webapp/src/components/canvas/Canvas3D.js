import React, { Component } from 'react';
import './Canvas3D.css';
import { connect } from 'react-redux';
import { Canvas3D, p_world_params } from '../../canvas3d';

class Canvas3DComponent extends Component {
  constructor(props) {
    super(props);
    this.handleResize = this.handleResize.bind(this);
  }

  render() {
    return (
      <div ref={(container) => { this.containerEl = container }} className="canvas-wrapper"></div>
    );
  }

  componentDidMount() {
    this.canvas3D = new Canvas3D(this.containerEl);
    this.canvas3D.setupScene.apply(this.canvas3D, ["particle_world", ...p_world_params(), false]);
    this.handles = this.canvas3D.startScene("particle_world");

    let coord = this.props.coord;
    if (coord.lontitude !== null && coord.latitude !== null) {
      this.handles.setCoord(coord.lontitude, coord.latitude);
    }

    window.addEventListener('resize', this.handleResize);
    if ("onorientationchange" in window) {
      window.addEventListener('orientationchange', this.handleResize);
    }
  }

  handleResize() {
    this.canvas3D.resizeRenderer(this.containerEl);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    if ("onorientationchange" in window) {
      window.removeEventListener('orientationchange', this.handleResize);
    }
  }

  componentDidUpdate(prevProps) {
    let coord = this.props.coord;
    if (coord.status !== prevProps.coord.status) {
      this.handles.setCoord(coord.lontitude, coord.latitude);
    }
  }
}

export default connect(
  (store) => ({
    coord: store.cursor_coord
  }),
  (dispatch) => ({})
)(Canvas3DComponent);