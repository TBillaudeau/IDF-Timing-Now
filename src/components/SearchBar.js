import React, { useState, useEffect } from 'react';
import Select, { components } from 'react-select';
import { useNavigate } from 'react-router-dom';
import { convertTransportMode } from '../utils/stringUtils';
import { LineLogoByLineID } from "../utils/dataHelpers";

const SearchBar = ({ label, placeholder, type = '', onSelectionChange }) => {
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
                src={`${process.env.PUBLIC_URL}/images/${mode}.svg`}
                className="h-5 lg:h-10 mr-1"
              />
              {mode !== 'BUS' && lines.map(line => (
                <LineLogoByLineID lineID={line.id.split(":").pop()} className="h-5 lg:h-10 mr-2 lg:mr-4" />
              ))}
            </div>
          ))}
      </div>
    </div>
  );

  // const Control = ({ children, ...props }) => (
  //   <components.Control {...props} className='text-sm'>
  //   {label ? <span className="pl-2 font-bold text-sm text-purple-800">{label}</span> : null} {children}
  //   </components.Control>
  // );

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
        // components={{ Control }}
      />
    </div>
  );
};

export default SearchBar;