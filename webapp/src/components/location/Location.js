import React, { Component } from "react";
import "./Location.css";
import { connect } from 'react-redux';
import { group } from '../../utils';

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      init: false
    };
  }

  componentWillUpdate(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.setState({
        init: true
      });

      setTimeout((self) => {
        self.setState({
          init: false
        });
      }, 361, this);
    }
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.location !== this.props.location) {
  //     this.setState({
  //       init: false
  //     });
  //   }
  // }

  render() {
    let { location } = this.props;
    let { init } = this.state;
    return (
      <div className="location-wrapper v-mid-box">
        <span className="location-notation">地点：</span><span className={group({
          "init": init
        }, ["location"])}>{location}</span>
      </div>
    );
  }
}

export default connect(
  (store) => ({
    location: store.location
  }),
  (dispatch) => ({})
)(Location);