import { useEffect } from 'react';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, onLoad, src, alt }) => {
  useEffect(() => {
    const closePictureByEscape = e => {
      if (e.code !== 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', closePictureByEscape);
    return () => window.removeEventListener('keydown', closePictureByEscape);
  }, [onClose]);

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
        <img className={styles.Image} src={src} alt={alt}></img>
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
