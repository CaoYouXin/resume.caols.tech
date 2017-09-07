import React, { Component } from "react";
import "./App.css";
import { connect } from 'react-redux';
import TimeHeader from "./components/time_header/TimeHeader";
import Location from "./components/location/Location";
import DayAndNight from "./components/day_and_night/DayAndNight";
import HandleBar from "./components/handle_bar/HandleBar";
import List from "./components/list/List";
import Text from "./components/text/Text";
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

// const DiaryContentList = connect(
//   (store) => ({
//     items: [

//     ]
//   }),
//   (dispatch) => ({})
// )(List);

class App extends Component {

  constructor(props) {
    super(props);
    this.rerender = this.rerender.bind(this);
  }

  rerender() {
    this.forceUpdate();
  }

  componentWillMount() {
    window.addEventListener('resize', this.rerender);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.rerender);
  }

  render() {
    let ratio = (window.innerWidth - 200) / (window.innerHeight - 300);
    return (
      <div className="App">
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
              <Text fontSize="15" text="    面部识别解锁已然是一项即将成为全面屏时代的标配技术，其技术成熟度将直接决定其应用体验。即将发布新机的苹果通过收购与研究，资料显示其已经掌握了足够成熟的面部识别技术。而在国内手机厂商中，以vivo为例，在早先的产品中，早已加入了部分面部识别技术在拍照功能上，凭借之前的积累，加之后期的深入研究，想必其面部识别技术的成熟度也已经达到、甚至高于国际水平，所以才敢于将即将发布的首款全面屏旗舰机X20的前置home键去掉。" />
            </div>
            <div className={group({
              "App-right-top-bottom-left": ratio < 2,
              "App-right-top-left-bottom": ratio >= 2
            })}>

            </div>
            <div className={group({
              "App-right-top-bottom-right": ratio < 2,
              "App-right-top-right": ratio >= 2
            })}>

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
