import React, {Component} from "react";
import "./HandleBar.css";

class HandleBar extends Component {
    render() {
        let buttonClassName = 'button ';
        buttonClassName += this.props.status;

        return (
            <div className="handles-wrapper v-mid-box">
                <div className={buttonClassName}></div>
            </div>
        );
    }
}

export default HandleBar;
