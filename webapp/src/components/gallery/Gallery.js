import React, { Component } from 'react';
import './Gallery.css';
import { connect } from 'react-redux';

class GalleryComponent extends Component {
  render() {
    let { items, clicked } = this.props;
    return (
      <div className="gallery-wrapper">
        {
          items && items.length > 0 && items.map((item, i) => (
            <div key={i} className="gallery-item" onClick={(e) => clicked(i)}><img alt="gallery" src={item} /></div>
          ))
        }
      </div>
    );
  }
}

export default connect(
  (store) => ({
    items: store.gallery
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