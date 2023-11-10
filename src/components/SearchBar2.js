import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const SearchBar = ({ lineIDparams }) => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();
  let { lineID } = useParams();
  if (typeof lineIDparams !== 'undefined') {
    lineID = lineIDparams;
  }

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

  const handleChange = (event) => {
    navigate(`/search?line=${lineID}&stop_area=${event.target.value.split(':').pop()}`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg  flex items-center w-full">
      <select
        value={inputValue}
        onChange={handleChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 h-12 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
        <option value="">Sélectionnez une station</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchBar;