import React, { Component } from "react";
import "./HandleBar.css";
import { group } from '../../utils';

class HandleBar extends Component {
    render() {
        return (
            <div className="handles-wrapper v-mid-box">
                <div className={group(null, ["button", this.props.status])}></div>
            </div>
        );
    }
}

export default HandleBar;
