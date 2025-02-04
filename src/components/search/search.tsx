import React, { useEffect, useState } from 'react';
import styles from './search.module.css'
import { TMoviesListData } from '../../utils/type';

type SearchBarProps = {
  setSearchTerm: (term: string) => void;
  results: TMoviesListData[];
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchTerm, results }) => {
    const [inputValue, setInputValue] = useState('');
    const [noResults, setNoResults] = useState(false); // Состояние для отслеживания отсутствия результатов
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);
      setNoResults(false); // Сбрасываем состояние отсутствия результатов при вводе нового значения
    };
  
    const handleSearch = () => {
      setSearchTerm(inputValue);
      setInputValue(''); // Очищаем поле ввода после отправки
    };

  // Проверяем наличие результатов при изменении массива результатов
  useEffect(() => {
    if (results.length === 0 && inputValue) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }
  }, [results, inputValue]);

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Введите название..."
        value={inputValue} // Устанавливаем значение из состояния
        onChange={handleChange}
        className={styles.searchInput}
      />
      <button className={styles.searchButton} onClick={handleSearch}>Поиск</button>
      
    </div>
  );
};

export default SearchBar;