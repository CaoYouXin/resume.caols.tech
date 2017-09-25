import React, { Component } from 'react';
import './Gallery.css';
import { connect } from 'react-redux';
import { getAPI } from '../../http';

class GalleryComponent extends Component {
  render() {
    let { data, idx, details, clicked } = this.props;

    let items = [];
    if (data[idx]) {
      let fetchId = data[idx].fetchId || data[idx].secondFetchId;

      if (fetchId !== null) {
        let detail = details[fetchId];
        items = detail.DiaryPhotoes || [];
      }
    }

    return (
      <div className="gallery-wrapper">
        {
          items && items.length > 0 && items.map((item, i) => (
            <div key={i} className="gallery-item" onClick={(e) => clicked(i)}><img alt="gallery" src={getAPI('server') + '/' + item.DiaryPhotoUrl} /></div>
          ))
        }
      </div>
    );
  }
}

export default connect(
  (store) => ({
    data: store.item_selector.data,
    idx: store.item_selector.idx,
    details: store.details
  }),
  (dispatch) => ({
    clicked: (idx) => {
      dispatch({
        type: 'GALLERY_SHOW_STATUS',
        status: true,
        index: idx
      });
    }
  })
)(GalleryComponent);