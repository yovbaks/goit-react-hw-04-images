import { ImgGalleryItem, ImgGalleryItemImg } from './ImageGalleryItem.styled';
import { PropTypes } from 'prop-types';

const ImageGalleryItem = ({ image: { webformatURL, tags, id }, onClick }) => {
  return (
    <>
      <ImgGalleryItem onClick={onClick} data-id={id}>
        <ImgGalleryItemImg src={webformatURL} alt={tags} />
      </ImgGalleryItem>
    </>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  tags: PropTypes.array,
  id: PropTypes.number,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
