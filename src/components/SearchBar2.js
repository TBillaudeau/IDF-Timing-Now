import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useNavigate, useParams } from 'react-router-dom';

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();
  const { lineID } = useParams();

  useEffect(() => {
    const fetchOptions = async () => {
      const response = await fetch(`https://api-iv.iledefrance-mobilites.fr/lines/line:IDFM:${lineID}/stops`);
      const data = await response.json();
      const options = data.map((stopArea) => ({
        value: stopArea.id,
        label: stopArea.name,
      }));
      setOptions(options);
    };
    fetchOptions();
  }, []);

  const handleChange = (selectedOption) => {
    navigate(`/search?line=${lineID}&stop_area=${selectedOption.value.split(':').pop()}`);
  };

  const handleInputChange = (inputValue) => {
    setInputValue(inputValue);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 xl:p-6 flex items-center w-full">
      <h2 className="xl:text-xl font-semibold border-1 mr-4 dark:text-white">Station :</h2>
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