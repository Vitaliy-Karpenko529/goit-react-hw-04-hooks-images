import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from './services/api-image';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Load from './components/Loader';
import Modal from './components/Modal';
import styles from './App.module.css';

function App() {
  const [query, setQuery] = useState('');
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alt, setAlt] = useState('');
  const [activeButton, setActiveButton] = useState(false);
  const [modalPictures, setModalPictures] = useState('');

  const onFormSubmit = query => {
    setQuery(query);
    setPictures([]);
    setPage(1);
    setError(null);
    setIsLoading(true);
  };

  useEffect(() => {
    if (!query) {
      setPictures([]);
      return;
    }
    setIsLoading(true);

    API.fetchPicturesApi(query, page)
      .then(({ hits }) => {
        if (hits.length === 0) {
          return toast.error(` Not found) ${query}!`, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        setPictures(prevState => [...prevState, ...hits]);
        setPage(page);
        setActiveButton(false);
      })

      .catch(error => setError('Please, try again'))
      .finally(setIsLoading(false));
  }, [page, query]);

  const onLoadMorePictures = () => {
    setPage(prevState => prevState + 1);
    onScroll();
  };

  const onScroll = () => {
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 1000);
  };

  const onOpenModal = e => {
    e.preventDeafult();
    setModalPictures(e.target.dataset.largeImageURL);
    setOpenModal(true);
    setAlt(e.target.alt);
  };

  const onCloseModal = () => setOpenModal(false);

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={onFormSubmit} />
      {isLoading && <Load />}
      {pictures.length > 0 && !error && (
        <>
          <ImageGallery openModal={onOpenModal} pictures={pictures} />
          <Button fetchPicturesApi={onLoadMorePictures} status={activeButton} />
        </>
      )}

      {openModal && (
        <Modal onClose={onCloseModal} src={modalPictures} alt={alt} />
      )}

      {error && <p className={styles.error}>{error}</p>}
      <ToastContainer autoClose={3000} theme={'colored'} />
    </div>
  );
}

export default App;
