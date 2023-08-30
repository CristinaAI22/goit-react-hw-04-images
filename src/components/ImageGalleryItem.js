import React from 'react';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ id, webformatURL, onClick }) => (
  <li className="ImageGalleryItem">
    <img
      src={webformatURL}
      alt={id}
      onClick={onClick}
      className="ImageGalleryItem-image"
    />
  </li>
);

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
