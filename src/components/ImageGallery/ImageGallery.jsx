import ImageGalleryItem from 'components/ImageGalleryItem';
import { ImgGallery } from './ImageGallery.styled';
// import { Component } from 'react';
import { PropTypes } from 'prop-types';
// import ImageErrorView from 'components/ImageErrorView';
// import Loader from 'components/Loader';
// import imagesAPI from '../../services/api';


const ImageGallery =({images, openModal})=> (
				<ImgGallery>
					{images && images.map(image => {
						return (
							<ImageGalleryItem
								onClick={openModal}
								key={image.id}
								image={image}
							/>
						);
					})}
				</ImgGallery>
			)

ImageGallery.propTypes = {
	images: PropTypes.array,
};

// class ImageGallery extends Component {
// 	state = {
// 		images: null,
// 		error: null,
// 		status: 'idle',
// 	};
// 	componentDidUpdate(prevProps, prevState) {
// 		const { searchQuery, page, getData, loadMore } = this.props;
// 		if (prevProps.searchQuery !== searchQuery || prevProps.page !== page) {
// 			this.setState({ status: 'pending' });
// 			imagesAPI(searchQuery, page)
// 				.then(response => {
// 					if (response.total !== 0) {
// 						this.setState({
// 							images: response.hits,
// 							status: 'resolved',
// 						});
// 						loadMore(true);
// 						getData(response.hits);
// 					} else {
// 						this.setState({ status: 'rejected' });
// 						loadMore(false);
// 						getData(null);
// 					}
// 				})
// 				.catch(error => this.setState({ error, status: 'rejected' }));
// 		}
// 	}

// 	render() {
// 		const { images, status } = this.state;

// 		if (status === 'idle') {
// 			return <Notify >Please enter the name of the images and photos</Notify>;
// 		}
// 		if (status === 'pending') {
// 			return <Loader />;
// 		}
// 		if (status === 'rejected') {
// 			return (
// 				<ImageErrorView
// 					message={`No images find of ${this.props.searchQuery}`}
// 				/>
// 			);
// 		}
//     if (status === 'resolved') {
  
// 			return (
//         <ImgGallery>
            
// 					{images.map(image => {
// 						return (
// 							<ImageGalleryItem
// 								onClick={this.props.openModal}
// 								key={image.id}
// 								image={image}
// 							/>
// 						);
// 					})}
// 				</ImgGallery>
// 			);
// 		}
// 	}
// }

// ImageGallery.propTypes = {
//   searchQuery: PropTypes.string,
//   page: PropTypes.number,
// 	openModal: PropTypes.func.isRequired,
// 	getData: PropTypes.func.isRequired,
// 	loadMore: PropTypes.func.isRequired,
// };

export default ImageGallery;
