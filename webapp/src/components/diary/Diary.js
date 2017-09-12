import React, { Component } from 'react';
import './Diary.css';
import { connect } from 'react-redux';
import Text from '../text/Text';
import md5 from 'md5';
import deepequals from 'deep-equal';

class DiaryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      length: this.props.contents.length ? 1 : 0
    };
    this.next = this.next.bind(this);
  }

  next() {
    this.setState({
      length: this.state.length + 1
    });
  }

  componentDidUpdate(prevProps) {
    if (!deepequals(prevProps.contents, this.props.contents)) {
      this.setState({
        length: this.props.contents.length ? 1 : 0
      });
    }
  }

  render() {
    let { contents } = this.props;
    let { length } = this.state;

    return (
      <div className="diary-wrapper">
        {
          contents && contents.length > 0 && contents.slice(0, length).map((content, idx) => {
            return (
              <div key={md5(content)} className="diary-paragraph">
                <Text text={content} finished={this.next} />
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default connect(
  (store) => ({
    contents: store.diary.contents.map(content => '    ' + content)
  }),
  (dispatch) => ({})
)(DiaryComponent);