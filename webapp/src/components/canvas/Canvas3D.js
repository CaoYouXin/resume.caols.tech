import React, { Component } from 'react';
import './Canvas3D.css';
import { connect } from 'react-redux';
import { Canvas3D, p_world_params } from '../../canvas3d';

class Canvas3DComponent extends Component {
  render() {
    return (
      <div ref={(container) => { this.containerEl = container }} className="canvas-wrapper"></div>
    );
  }

  componentDidMount() {
    this.canvas3D = new Canvas3D(this.containerEl);
    this.canvas3D.setupScene.apply(this.canvas3D, p_world_params().concat([false]));
    this.handles = this.canvas3D.startScene('particle_world');

    let coord = this.props.coord;
    this.handles.setCoord(coord.lontitude, coord.latitude);
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