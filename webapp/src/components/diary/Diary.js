import React, { Component } from 'react';
import './Diary.css';
import { connect } from 'react-redux';
import Text from '../text/Text';
import md5 from 'md5';

class DiaryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      length: 0,
      contents: []
    };
    this.next = this.next.bind(this);
  }

  next() {
    this.setState({
      length: this.state.length + 1
    });
  }

  componentWillUpdate(nextProps) {
    if (nextProps.idx !== this.props.idx) {
      let { items, idx, details } = nextProps;
      let item = items[idx];

      if (!item) {
        this.setState({
          contents: [],
          length: 0
        });
        return;
      }

      if (item.fetchId !== null) {
        let detail = details[item.fetchId];
        let contents = detail.DiaryPageContent.split('</p><p>');
        this.setState({
          contents,
          length: contents.length ? 1 : 0
        });
      } else if (item.milestone === null) {
        this.setState({
          contents: ['‘' + item.title + '’ 结束了。'],
          length: 1
        });
      } else {
        this.setState({
          contents: ['‘' + item.title + '’ 中完成了‘' + item.milestone + '’ 。'],
          length: 1
        });
      }
    }
  }

  componentDidMount() {
    let { items, idx, details } = this.props;
    let item = items[idx];

    if (!item) {
      this.setState({
        contents: [],
        length: 0
      });
      return;
    }

    if (item.fetchId !== null) {
      let detail = details[item.fetchId];
      console.log(detail);
      let contents = detail.DiaryPageContent.split('</p><p>');
      this.setState({
        contents,
        length: contents.length ? 1 : 0
      });
    } else if (item.milestone === null) {
      this.setState({
        contents: ['‘' + item.title + '’ 结束了。'],
        length: 1
      });
    } else {
      this.setState({
        contents: ['‘' + item.title + '’ 中完成了‘' + item.milestone + '’ 。'],
        length: 1
      });
    }
  }

  render() {
    let { length, contents } = this.state;

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
    items: store.item_selector.data,
    idx: store.item_selector.idx,
    details: store.details
  }),
  (dispatch) => ({})
)(DiaryComponent);