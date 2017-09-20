import React, { Component } from 'react';
import './GalleryShow.css';
import { connect } from 'react-redux';
import { group } from '../../utils';

class GalleryShowComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      keys: ["show-prev", "show-current", "show-next"],
      slot0: 0,
      slot1: 1,
      slot2: 2,
      slot0class: 0,
      slot1class: 1,
      slot2class: 2,
      slot0ani: false,
      slot1ani: false,
      slot2ani: false,
    };

    this.canPrev = true;
    this.canNext = true;
  }

  prev() {
    if (!this.canPrev) {
      return;
    }
    this.canPrev = false;

    let { index } = this.props;
    if (index <= 0) {
      alert('没有了！');
      this.canPrev = true;
      return;
    }

    let { slot0class, slot1class, slot2class } = this.state;
    this.setState({
      slot0class: slot1class,
      slot1class: slot2class,
      slot2class: slot0class,
      slot0ani: slot0class !== 2,
      slot1ani: slot1class !== 2,
      slot2ani: slot2class !== 2
    });

    setTimeout((self) => {
      let { set } = self.props;
      let { slot0, slot1, slot2 } = self.state;
      set(index - 1);
      self.setState({
        slot0: slot1,
        slot1: slot2,
        slot2: slot0
      });
      self.canPrev = true;
    }, 1000, this);
  }

  next() {
    if (!this.canNext) {
      return;
    }
    this.canNext = false;

    let { index, items } = this.props;
    if (index >= items.length - 1) {
      alert('没有了！');
      this.canNext = true;
      return;
    }

    let { slot0class, slot1class, slot2class } = this.state;
    this.setState({
      slot0class: slot2class,
      slot1class: slot0class,
      slot2class: slot1class,
      slot0ani: slot0class !== 0,
      slot1ani: slot1class !== 0,
      slot2ani: slot2class !== 0
    });

    setTimeout((self) => {
      let { set } = self.props;
      let { slot0, slot1, slot2 } = self.state;
      set(index + 1);
      self.setState({
        slot0: slot2,
        slot1: slot0,
        slot2: slot1
      });
      self.canNext = true;
    }, 1000, this);
  }

  condition(key) {
    switch (key) {
      case "show-prev":
        return (index, items) => index > 0 && index < items.length;
      case "show-next":
        return (index, items) => index >= 0 && index < items.length - 1;
      case "show-current":
        return (index, items) => index >= 0 && index < items.length;
      default:
        throw new Error('unhandled key : ' + key);
    }
  }

  item(key) {
    switch (key) {
      case "show-prev":
        return (index, items) => items[index - 1];
      case "show-next":
        return (index, items) => items[index + 1];
      case "show-current":
        return (index, items) => items[index];
      default:
        throw new Error('unhandled key : ' + key);
    }
  }

  render() {
    let { close, show, index, items } = this.props;
    let { keys, slot0, slot1, slot2, slot0class, slot1class, slot2class, slot0ani, slot1ani, slot2ani } = this.state;
    return (
      <div className={group({
        "show": show
      }, ["gallery-show-wrapper"])}>
        <div className={group({
          "show-ani": slot0ani
        }, [keys[slot0class]])}>
          {
            this.condition(keys[slot0])(index, items)
            && <div className="show-panel" style={{ backgroundImage: this.item(keys[slot0])(index, items) }}></div>
          }
        </div>
        <div className={group({
          "show-ani": slot1ani
        }, [keys[slot1class]])}>
          {
            this.condition(keys[slot1])(index, items)
            && <div className="show-panel" style={{ backgroundImage: this.item(keys[slot1])(index, items) }}></div>
          }
        </div>
        <div className={group({
          "show-ani": slot2ani
        }, [keys[slot2class]])}>
          {
            this.condition(keys[slot2])(index, items)
            && <div className="show-panel" style={{ backgroundImage: this.item(keys[slot2])(index, items) }}></div>
          }
        </div>
        <div className="show-handle-left" onClick={(e) => this.prev()}><div></div></div>
        <div className="show-handle-right" onClick={(e) => this.next()}><div></div></div>
        <div className="show-handle-close" onClick={(e) => close()}></div>
      </div>
    );
  }
}

export default connect(
  (store) => ({
    index: store.gallery_show.index,
    show: store.gallery_show.status,
    items: store.gallery.map(item => 'url(' + item + ')')
  }),
  (dispatch) => ({
    close: () => {
      dispatch({
        type: 'GALLERY_SHOW_STATUS',
        status: false
      });
    },
    set: (index) => {
      dispatch({
        type: 'GALLERY_SHOW_STATUS',
        index
      });
    }
  })
)(GalleryShowComponent);