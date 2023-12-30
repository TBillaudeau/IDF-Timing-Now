import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { convertTransportMode } from '../utils/stringUtils';

const SearchBar = ({ placeholder, type = '', onSelectionChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);

  const handleChange = (selectedOption) => {
    const { value } = selectedOption;
    onSelectionChange(value);
  };

  const handleInputChange = (inputValue) => {
    setInputValue(inputValue);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (inputValue !== '') {
        let apiUrl = `https://prim.iledefrance-mobilites.fr/marketplace/navitia/coverage/fr-idf/places?q=${inputValue}`;

        if (type) {
          apiUrl += `&type[]=${type}`;
        }

        fetch(apiUrl, {
          headers: {
            'apikey': process.env.REACT_APP_IDFM_API_KEY
          }
        })
          .then((response) => response.json())
          .then((data) => {
            const options = data.places.map((place) => {
              const lines = place.stop_area ? place.stop_area.lines.map((line) => ({
                id: line.id,
                mode: convertTransportMode(line.commercial_mode.name),
              })) : [];

              return {
                value: place.id,
                label: place.name,
                lines: lines,
              };
            });
            setOptions(options);
          })
          .catch((error) => console.error(error));
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [inputValue]);


  const formatOptionLabel = (option) => (
    <div>
      {option.label}
      <div className="flex flex-wrap items-center">
        {Object.entries(
          option.lines
            .filter(line => {
              const order = ['RER', 'TRAIN', 'METRO', 'TRAM', 'BUS'];
              return order.includes(line.mode);
            })
            .reduce((groups, line) => {
              (groups[line.mode] = groups[line.mode] || []).push(line);
              return groups;
            }, {})
        )
          .sort(([a], [b]) => {
            const order = ['RER', 'TRAIN', 'METRO', 'TRAM', 'BUS'];
            return order.indexOf(a) - order.indexOf(b);
          })
          .map(([mode, lines], index) => (
            <div key={index} className="flex items-center mr-2 lg:mr-4">
              <img
                src={`${process.env.PUBLIC_URL}/images/${mode}${localStorage.theme === 'dark' ? '_LIGHT' : ''}.svg`}
                className="h-5 lg:h-10 mr-1"
              />
              {mode !== 'BUS' && lines.map(line => (
                <img
                  key={line.id}
                  src={`${process.env.PUBLIC_URL}/images/${line.id.split(":").pop()}.svg`}
                  alt={`${line.id} (${line.mode})`}
                  className="h-5 lg:h-10 mr-2 lg:mr-4"
                />
              ))}
            </div>
          ))}
      </div>
    </div>
  );


  return (
    <div className="flex items-center w-full">
      <Select
        options={options}
        onInputChange={handleInputChange}
        onChange={handleChange}
        inputValue={inputValue}
        formatOptionLabel={formatOptionLabel}
        placeholder={placeholder}
        className="flex-1 cursor-pointer"
      />
    </div>
  );
};

export default SearchBar;