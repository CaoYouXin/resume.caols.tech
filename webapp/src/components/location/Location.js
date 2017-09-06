import React, {Component} from "react";
import "./Location.css";

class Location extends Component {
    render() {
        return (
            <div className="location-wrapper v-mid-box">
                <span className="location-notation">地点：</span><span className="location">大同</span>
            </div>
        );
    }
}

export default Location;