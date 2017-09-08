import React, { Component } from "react";
import "./App.css";
import "./dynamic-layouts";
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
import { group, fixScreen } from './utils';

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
    console.log(ratio);
    return (
      <div className="App">
        <GalleryShow />

        <div className={group({
          "App-TimeHeader-Mobile": this.isMobile && !this.landscape,
          "App-TimeHeader-Landscape": this.isMobile && this.landscape,
          "App-TimeHeader-PC": !this.isMobile
        })}>
          <TimeHeader />
        </div>

        <div className={group({
          "App-DayAndNight-Mobile": this.isMobile && !this.landscape,
          "App-DayAndNight-Landscape": this.isMobile && this.landscape,
          "App-DayAndNight-PC": !this.isMobile
        })}>
          <DayAndNight />
        </div>

        <div className={group({
          "App-Location-Mobile": this.isMobile && !this.landscape,
          "App-Location-Landscape": this.isMobile && this.landscape,
          "App-Location-PC": !this.isMobile
        })}>
          <Location />
        </div>

        <div className={group({
          "App-MatterItem-Mobile": this.isMobile && !this.landscape,
          "App-MatterItem-Landscape": this.isMobile && this.landscape,
          "App-MatterItem-PC": !this.isMobile
        })}>
          <MatterItemList title="事项" />
        </div>

        <div className={group({
          "App-MatterPeople-Mobile": this.isMobile && !this.landscape,
          "App-MatterPeople-Landscape": this.isMobile && this.landscape,
          "App-MatterPeople-PC": !this.isMobile
        })}>
          <MatterPeopleList title="参与人物" />
        </div>

        <div className={group({
          "App-Diary-Mobile": this.isMobile && !this.landscape,
          "App-Diary-Landscape": this.isMobile && this.landscape,
          "App-Diary-PC-16-9": !this.isMobile && ratio >= 2,
          "App-Diary-PC-1-1": !this.isMobile && ratio < 2
        })}>
          <Diary />
        </div>

        <div className={group({
          "App-Gallery-Mobile": this.isMobile && !this.landscape,
          "App-Gallery-Landscape": this.isMobile && this.landscape,
          "App-Gallery-PC": !this.isMobile
        })}>
          <Gallery />
        </div>

        <div className={group({
          "App-Canvas3D-Mobile": this.isMobile && !this.landscape,
          "App-Canvas3D-Landscape": this.isMobile && this.landscape,
          "App-Canvas3D-PC-16-9": !this.isMobile && ratio >= 2,
          "App-Canvas3D-PC-1-1": !this.isMobile && ratio < 2
        })}>
          <Canvas3D />
        </div>


        <div className={group({
          "App-HandleBar-Mobile": this.isMobile && !this.landscape,
          "App-HandleBar-Landscape": this.isMobile && this.landscape,
          "App-HandleBar-PC": !this.isMobile
        })}>
          <HandleBar />
        </div>

      </div>
    );
  }
}

export default App;
