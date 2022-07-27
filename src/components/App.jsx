import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Modal from 'components/Modal';
import ImageErrorView from 'components/ImageErrorView';
import Loader from 'components/Loader';
import imagesAPI from '../services/api';
import { Notify } from './ImageGallery/ImageGallery.styled';
import { useState, useEffect } from 'react';
import { AppContainer } from './App.styled';

export const App = () => {
	
	const [images, setImages] = useState([]);
	const [id, setId] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [loadMore, setLoadMore] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [isEmpty, setIsEmpty] = useState(false);
	const [error, setError] = useState(null);
	const perPage = 12;

	useEffect(() => {
		getPhotos(searchQuery, page);
	}, [searchQuery, page]);

	const getPhotos = async (query, page) => {
		if (!query) return;
		setIsLoading(true);
		try {
			const { hits, totalHits } = await imagesAPI(query, page);
			if (hits.length === 0) {
				setIsEmpty(true);
			}
			setImages(prevImages => [...prevImages, ...hits]);
			setLoadMore(page < Math.ceil(totalHits / perPage));
		} catch (error) {
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const handleFormSubmit = searchQuery => {
		setSearchQuery(searchQuery);
		setPage(1);
		setLoadMore(false);
		setImages([]);
		setIsEmpty(false);
	};

	const openModal = e => {
		setShowModal(true);
		setId(e.currentTarget.dataset.id);
	};

	return (
		<AppContainer>
			<SearchBar onSubmit={handleFormSubmit} />
			<ToastContainer position="top-center" autoClose={3000} />

			{isLoading && <Loader />}
			{error && <ImageErrorView
					message={error}
				/>}
			{isEmpty && (
				<ImageErrorView
					message={`No images with name '${searchQuery}'`}
				/>
			)}
			{searchQuery ? (
				<ImageGallery openModal={openModal} images={images} />
			) : (
				<Notify>Enter a search query</Notify>
			)}

			{loadMore && <Button onClick={() => setPage(page => page + 1)} page={page} />}
			{showModal && (
				<Modal images={images} id={Number(id)} onClose={e => setShowModal(false)} />
			)}
		</AppContainer>
	);
};











// export class App extends Component {
//   state = {
//     images: [],
//     id: null,
//     searchQuery: '',
//     page: 1,
//     isLoading: false,
//     loadMore: false,
//     showModal: false,
//     isEmpty: false,
//     error: null,
//     per_page: 12,
//   };




//   // state = {
//   //   images: null,
//   //   id: null,
//   //   searchQuery: '',
//   //   page: 1,
//   //   loadMore: false,
//   //   showModal: false,
//   // };

//   // handleFormSubmit = searchQuery => {
//   //   this.setState({ searchQuery: searchQuery, page: 1, loadMore: false });
//   // };

//   // loadMore = () => {
//   //   this.setState(prevState => ({ page: prevState.page + 1 }));
//   // };

//   // changeButtonLoadMore = status => {
//   //   this.setState({ loadMore: status });
//   // };

//   // openModal = e => {
//   //   this.setState({
//   //     showModal: true,
//   //     id: e.currentTarget.dataset.id,
//   //   });
//   // };

//   // closeModal = e => {
//   //   this.setState({
//   //     showModal: false,
//   //   });
//   // };

//   // getData = images => {
//   //   this.setState({ images });
//   // };

//   // +++++++++++++++++++++++++++++++++++++++++++++++++++++++
//   componentDidUpdate(_, prevState) {
//     const { searchQuery, page } = this.state;
//     if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
//       this.getPhotos(searchQuery, page);
//     }
//   }

//   getPhotos = async (query, page) => {
//     if (!query) return;
//     this.setState({ isLoading: true });
//     try {
//       const { hits, totalHits } = await imagesAPI(query, page);
//       console.log(hits, totalHits);
//       if (hits.length === 0) {
//         this.setState({ isEmpty: true });
//       }
//       this.setState(prevState => ({
//         images: [...prevState.images, ...hits],
//         loadMore: this.state.page < Math.ceil(totalHits / this.state.per_page),
//       }));
//     } catch (error) {
//       this.setState({ error: error.message });
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   handleFormSubmit = searchQuery => {
//     this.setState({
//       searchQuery: searchQuery,
//       page: 1,
//       loadMore: false,
//       images: [],
//       isEmpty: false,
//     });
//   };

//   loadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   openModal = e => {
//     this.setState({
//       showModal: true,
//       id: e.currentTarget.dataset.id,
//     });
//   };

//   closeModal = e => {
//     this.setState({
//       showModal: false,
//     });
//   };

//   // ===================================================

//   render() {
//     const {
//       searchQuery,
//       page,
//       loadMore,
//       showModal,
//       images,
//       id,
//       isEmpty,
//       isLoading,
//     } = this.state;
//     return (
//       <div>
//         <AppContainer>
//           <SearchBar onSubmit={this.handleFormSubmit} />
//           <ToastContainer position="top-center" autoClose={3000} />
//           <ImageGallery
//             openModal={this.openModal}
//             getData={this.getData}
//             searchQuery={searchQuery}
//             page={page}
//             loadMore={this.changeButtonLoadMore}
//           />
//           {isLoading && <Loader />}
//           {isEmpty && (
//             <ImageErrorView
//               message={`No images with name'${this.state.searchQuery}'`}
//             />
//           )}
//           {searchQuery ? (
//             <ImageGallery openModal={this.openModal} images={images} />
//           ) : (
//             <Notify>Enter a search query</Notify>
//           )}
//           {loadMore && <Button onClick={this.loadMore} page={page} />}
//           {showModal && (
//             <Modal images={images} id={Number(id)} onClose={this.closeModal} />
//           )}
//         </AppContainer>
//       </div>
//     );
//   }
// }
