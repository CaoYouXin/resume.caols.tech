import React, { Component } from 'react';
import './Gallery.css';
import { connect } from 'react-redux';

class GalleryComponent extends Component {
  render() {
    let { items, clicked } = this.props;
    return (
      <div className="gallery-wrapper">
        {
          items && items.length && items.map((item, i) => (
            <div key={i} className="gallery-item" onClick={(e) => clicked(i)}><img alt="gallery" src={item} /></div>
          ))
        }
      </div>
    );
  }
}

export default connect(
  (store) => ({
    items: ["https://cbu01.alicdn.com/img/ibank/2015/153/083/2532380351_774203266.400x400.jpg", "https://theartgalleryumd.files.wordpress.com/2011/10/dsc0017.jpg", "http://image.cn.made-in-china.com/2f0j01MvwEJITdSLqS/PVC%E7%AE%B1%E5%8C%85%E5%B8%83%EF%BC%8C%E9%80%8F%E6%98%8E%E7%BD%91%E6%A0%BC%E5%B8%83.jpg", "http://www.weimeifan.net/wp-content/uploads/2017/06/e9f99887bcbe07cf96768e3556c86df8.jpg"]
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