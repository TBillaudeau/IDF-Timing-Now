import React, { useState } from 'react';
import Select from 'react-select';
import stationsData from '../assets/emplacement-des-gares-idf.json';
import { useNavigate } from 'react-router-dom';

// Helper function to remove accents from a string
const removeAccents = (str) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

// Helper function to get options based on user input
const getOptions = (inputValue) => {
  const value = removeAccents(inputValue.trim().toLowerCase());
  const options = stationsData
    .filter(
      (station) =>
        station.fields.nom_zdl &&
        removeAccents(station.fields.nom_zdl.toLowerCase()).includes(value)
    )
    .map((station) => ({
      value: station.fields.id_ref_lda,
      label: `${station.fields.nom_zdl} (${station.fields.res_com})`,
      mode: station.fields.res_com,
      line: station.fields.idrefligc,
    }));
  return options;
};

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState(getOptions(inputValue));
  const navigate = useNavigate(); // Get history from React Router

  const handleChange = (selectedOption) => {
    const { value, line } = selectedOption;
    navigate(`/line/${line}/${value}`);
  };

  const handleInputChange = (inputValue) => {
    setInputValue(inputValue);
    setOptions(getOptions(inputValue));
  };

  return (
    <div className="bg-white rounded-lg p-6 flex items-center w-full">
      <h2 className="xl:text-xl font-semibold border-1 mr-4">Station :</h2>
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