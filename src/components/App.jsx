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
