import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import Notiflix from 'notiflix';

const API_KEY = '37150177-120515d24bc5803fc768400f4';
const BASE_URL = 'https://pixabay.com/api/';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const fetchImages = () => {
      const url = `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

      setIsLoading(true);
      Notiflix.Loading.standard('Loading...');

      axios
        .get(url)
        .then(response => {
          const newImages = response.data.hits.map(image => ({
            id: image.id,
            webformatURL: image.webformatURL,
            largeImageURL: image.largeImageURL,
          }));

          setImages(prevImages => [...prevImages, ...newImages]);
        })
        .catch(error => {
          Notiflix.Notify.failure('Error fetching images:', error);
        })
        .finally(() => {
          setIsLoading(false);
          Notiflix.Loading.remove();
        });
    };

    if (query) {
      fetchImages();
    }
  }, [query, page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = imageUrl => {
    setModalOpen(true);
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedImage('');
  };

  return (
    <div className="App">
      <Searchbar onSubmit={setQuery} />
      <ImageGallery images={images} onItemClick={handleImageClick} />
      {images.length > 0 && !isLoading && <Button onClick={handleLoadMore} />}
      {isLoading && <Loader />}
      {modalOpen && (
        <Modal
          isOpen={modalOpen}
          imageUrl={selectedImage}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default App;
