import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();

  const handleChange = (selectedOption) => {
    const { value } = selectedOption;
    navigate(`/station/${value.split(':').pop()}`);
  };

  const handleInputChange = (inputValue) => {
    setInputValue(inputValue);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (inputValue !== '') {
        fetch(`https://prim.iledefrance-mobilites.fr/marketplace/navitia/coverage/fr-idf/places?q=${inputValue}`, {
          headers: {
            'apikey': process.env.REACT_APP_IDFM_API_KEY
          }
        })
          .then((response) => response.json())
          .then((data) => {
            const options = data.places.map((place) => ({
              value: place.id,
              label: place.name,
            }));
            setOptions(options);
          })
          .catch((error) => console.error(error));
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg py-4 flex items-center w-full">
      <Select
        options={options}
        onInputChange={handleInputChange}
        onChange={handleChange}
        inputValue={inputValue}
        placeholder="Enter station name"
        className="flex-1 cursor-pointer"
      />
    </div>
  );
};

export default SearchBar;