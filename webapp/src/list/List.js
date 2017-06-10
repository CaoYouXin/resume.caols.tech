import React, {Component} from "react";
import "./List.css";
import Text from "../text/Text";

class List extends Component {

    render() {
        let listItems = this.props.items.map((item) => {
            return (<li key={item}><Text fontSize="20" maxWidth="calc(300px - 2em)" text={item}/></li>);
        });

        return (
            <div className="list-wrapper">
                <div className="list title">{this.props.title}</div>
                <ul className="list content">{listItems}</ul>
            </div>
        );
    }
}

export default List;
