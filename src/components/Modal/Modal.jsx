import { useEffect, useCallback } from 'react';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, onLoad, src, alt }) => {

    const closePictureByEscape = useCallback((e) => {
      if (e.code === 'Escape') {
        onClose();
      }
    },[onClose])


  useEffect(() => {
    window.addEventListener('keydown', closePictureByEscape);
    return () =>{
      window.removeEventListener('keydown', closePictureByEscape)
    }
  },[closePictureByEscape])


  const closePicture = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const pictureLoaded = () => {
    onLoad(false);
  };

  return createPortal(
    <div className={styles.Overlay} onClick={closePicture}>
      <div className={styles.Modal} onLoad={pictureLoaded}>
        <img className={styles.Image} src={src} alt={alt} />
      </div>
    </div>,
    modalRoot,
  );
};

Modal.propTypes = {
  onClose: PropTypes.func,
  onLoad: PropTypes.func,
  src: PropTypes.string,
  alt: PropTypes.string,
};

export default Modal;
