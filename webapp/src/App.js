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
import BookSelector from "./components/book_selector/Books";
import { group, fixScreen } from './utils';

const MatterItemList = connect(
  (store) => ({
    items: []
  }),
  (dispatch) => ({})
)(List);

const MatterPeopleList = connect(
  (store) => ({
    items: []
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
    if (width === window.screen.availWidth) {
      this.landscape = false;
      fixScreen(this.isAndroid, 750, width);
    } else if (width === window.screen.availHeight) {
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
        <BookSelector />

        <div className="App-TimeHeader">
          <TimeHeader />
        </div>

        <div className="App-DayAndNight">
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
          "App-Diary-Landscape-16-9": this.isMobile && this.landscape && ratio >= 1.5,
          "App-Diary-Landscape-1-1": this.isMobile && this.landscape && ratio < 1.5,
          "App-Diary-PC-16-9": !this.isMobile && ratio >= 2,
          "App-Diary-PC-1-1": !this.isMobile && ratio < 2
        })}>
          <Diary />
        </div>

        <div className={group({
          "App-Gallery-Mobile": this.isMobile && !this.landscape,
          "App-Gallery-Landscape-16-9": this.isMobile && this.landscape && ratio >= 1.5,
          "App-Gallery-Landscape-1-1": this.isMobile && this.landscape && ratio < 1.5,
          "App-Gallery-PC": !this.isMobile
        })}>
          <Gallery />
        </div>

        <div className={group({
          "App-Canvas3D-Mobile": this.isMobile && !this.landscape,
          "App-Canvas3D-Landscape-16-9": this.isMobile && this.landscape && ratio >= 1.5,
          "App-Canvas3D-Landscape-1-1": this.isMobile && this.landscape && ratio < 1.5,
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
