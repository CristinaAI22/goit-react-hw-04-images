import Modal from './Modal';
import axios from 'axios';
import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Notiflix from 'notiflix';

const API_KEY = '37150177-120515d24bc5803fc768400f4';
const BASE_URL = 'https://pixabay.com/api/';

class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    modalOpen: false,
    selectedImage: '',
  };

  handleSubmit = query => {
    this.setState({ query, images: [], page: 1 }, this.fetchImages);
  };
  fetchImages = () => {
    const { query, page } = this.state;
    const url = `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

    this.setState({ isLoading: true });

    Notiflix.Loading.standard('Loading...');

    axios
      .get(url)
      .then(response => {
        const newImages = response.data.hits.map(image => ({
          id: image.id,
          webformatURL: image.webformatURL,
          largeImageURL: image.largeImageURL,
        }));

        this.setState(prevState => ({
          images: [...prevState.images, ...newImages],
        }));
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      })
      .finally(() => {
        this.setState({ isLoading: false });
        Notiflix.Loading.remove();
      });
  };

  handleLoadMore = () => {
    this.setState(
      prevState => ({ page: prevState.page + 1 }),
      this.fetchImages
    );
  };

  handleImageClick = imageUrl => {
    this.setState({ modalOpen: true, selectedImage: imageUrl });
  };

  handleCloseModal = () => {
    this.setState({ modalOpen: false, selectedImage: '' });
  };

  render() {
    const { images, modalOpen, selectedImage, isLoading } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={images} onItemClick={this.handleImageClick} />
        {images.length > 0 && !isLoading && (
          <Button onClick={this.handleLoadMore} />
        )}
        {isLoading && <Loader />}
        {modalOpen && (
          <Modal
            isOpen={modalOpen}
            imageUrl={selectedImage}
            onClose={this.handleCloseModal}
          />
        )}
      </div>
    );
  }
}

export default App;
