import React, {Component} from "react";
import "./App.css";
import TimeHeader from "./time_header/TimeHeader";
import Location from "./location/Location";
import DayAndNight from "./day_and_night/DayAndNight";
import HandleBar from "./handle_bar/HandleBar";
import Text from "./text/Text";
import List from "./list/List";

class App extends Component {
    render() {
        const matterItems = [
            '你好！可以试试多开',
            '音频，然后延时播放。比如说在10ms时播放第二个音频'
        ];
        const matterPeople = [
            'XXX',
            'YYY'
        ];

        return (
            <div className="App">
                <div className="App-header">
                    <div className="App-header-left">
                        <TimeHeader/>
                    </div>
                    <div className="App-header-right">
                        <DayAndNight status="normal"/>
                    </div>
                </div>
                <div className="App-middle">
                    <Location/>
                </div>
                <div className="App-left">
                    <div className="App-left-top">
                        <List title="事项" items={matterItems}/>
                    </div>
                    <div className="App-left-bottom">
                        <List title="参与人物" items={matterPeople}/>
                    </div>
                </div>
                <div className="App-right">
                    <div className="App-right-top">
                        <Text fontSize="20" maxWidth="500px" text="你好！<audio>的接口里有声音播放速度的接口，但是多浏览器支持没有做过测试，楼主小心使用。"/>
                    </div>
                    <div className="App-right-bottom">
                        <HandleBar status="next"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
