import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';
import { ImSearch } from 'react-icons/im';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const inputChange = event => {
    setQuery(event.target.value.toLowerCase());
  };

  const searchbarFormSubmit = event => {
    event.preventDefault();
    if (query.trim() === '') {
      return toast.warn('Please, enter your query');
    }
    onSubmit(query.trim());
    setQuery('');
  };

  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={searchbarFormSubmit}>
        <button type="submit" className={styles.SearchFormButton}>
          <ImSearch />
          <span className={styles.SearchFormButtonLabel}>Search</span>
        </button>
        <input
          className={styles.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search pictures and photos"
          value={query}
          onChange={inputChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

export default Searchbar;
