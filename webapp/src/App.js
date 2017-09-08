import React, { Component } from "react";
import "./App.css";
import { connect } from 'react-redux';
import TimeHeader from "./components/time_header/TimeHeader";
import Location from "./components/location/Location";
import DayAndNight from "./components/day_and_night/DayAndNight";
import HandleBar from "./components/handle_bar/HandleBar";
import List from "./components/list/List";
import Gallery from "./components/gallery/Gallery";
import GalleryShow from "./components/gallery_show/GalleryShow";
import Canvas3D from "./components/canvas/Canvas3D";
import Diary from "./components/diary/Diary";
import { group } from './utils';

const MatterItemList = connect(
  (store) => ({
    items: [
      '你好！可以试试多开',
      '音频，然后延时播放。比如说在10ms时播放第二个音频'
    ]
  }),
  (dispatch) => ({})
)(List);

const MatterPeopleList = connect(
  (store) => ({
    items: [
      'XXX',
      'YYY'
    ]
  }),
  (dispatch) => ({})
)(List);

class App extends Component {

  constructor(props) {
    super(props);
    this.rerender = this.rerender.bind(this);

    let UA = window.navigator.userAgent,
      isAndroid = /android|adr/gi.test(UA),
      isIos = /iphone|ipod|ipad/gi.test(UA) && !isAndroid; // 据说某些国产机的UA会同时包含 android iphone 字符

    this.isAndroid = isAndroid;
    this.isMobile = isAndroid || isIos;  // 粗略的判断
    this.lastOrientation = 128;
  }

  screen() {
    if (!this.isMobile) {
      return;
    }

    if (this.lastOrientation === window['orientation']) {
      return;
    }
    this.lastOrientation = window['orientation'];

    let width = Math.min(window.screen.availWidth, window.screen.availHeight);
    let height = Math.max(window.screen.availWidth, window.screen.availHeight);
    if (!window['orientation'] || window['orientation'] === 180 || window['orientation'] === 0) {
      this.landscape = false;
      fixScreen(this.isAndroid, 750, width);
    } else if (window['orientation'] === 90 || window['orientation'] === -90) {
      this.landscape = true;
      fixScreen(this.isAndroid, 750 / width * height, height);
    }
  }

  rerender() {
    this.screen();
    this.forceUpdate();
  }

  componentWillMount() {
    this.screen();
    window.addEventListener('resize', this.rerender);
    if ("onorientationchange" in window) {
      window.addEventListener('orientationchange', this.rerender);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.rerender);
    if ("onorientationchange" in window) {
      window.removeEventListener('orientationchange', this.rerender);
    }
  }

  render() {
    let ratio = (window.innerWidth - 300) / (window.innerHeight - 200);
    return (
      <div className="App">
        <GalleryShow />
        <div className="App-header">
          <div className="App-header-left">
            <TimeHeader />
          </div>
          <div className="App-header-right">
            <DayAndNight />
          </div>
        </div>
        <div className="App-middle">
          <Location />
        </div>
        <div className="App-left">
          <div className="App-left-top">
            <MatterItemList title="事项" />
          </div>
          <div className="App-left-bottom">
            <MatterPeopleList title="参与人物" />
          </div>
        </div>
        <div className="App-right">
          <div className="App-right-top">
            <div className={group({
              "App-right-top-top": ratio < 2,
              "App-right-top-left-top": ratio >= 2
            })}>
              <Diary />
            </div>
            <div className={group({
              "App-right-top-bottom-left": ratio < 2,
              "App-right-top-left-bottom": ratio >= 2
            })}>
              <Gallery />
            </div>
            <div className={group({
              "App-right-top-bottom-right": ratio < 2,
              "App-right-top-right": ratio >= 2
            })}>
              <Canvas3D />
            </div>
          </div>
          <div className="App-right-bottom">
            <HandleBar />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
