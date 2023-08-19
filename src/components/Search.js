import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import stationsData from '../emplacement-des-gares-idf.json';
import { useNavigate } from 'react-router-dom';

// Helper function to remove accents from a string
const removeAccents = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };
  
  // Helper function to get suggestions based on user input
  const getSuggestions = (value) => {
    const inputValue = removeAccents(value.trim().toLowerCase());
    const inputLength = inputValue.length;
  
    return inputLength === 0
      ? []
      : stationsData.filter(
          (station) =>
            station.fields.nom_zdl &&
            removeAccents(station.fields.nom_zdl.toLowerCase()).includes(
              inputValue
            )
        );
  };
  
  
  const TrainDepartureDisplay = () => {
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate(); // Get history from React Router

    const onChange = (_, { newValue }) => {
      setValue(newValue);
    };
  
    const onSuggestionsFetchRequested = ({ value }) => {
      setSuggestions(getSuggestions(value));
    };
  
    const onSuggestionsClearRequested = () => {
      setSuggestions([]);
    };
  
    const getSuggestionValue = (suggestion) => suggestion.fields.nom_zdl;
  
    const renderSuggestion = (suggestion) => (
    <div className="border p-2">
        <div className="text-lg font-semibold">{suggestion.fields.nom_zdl}</div>
        <div className="text-gray-500">Mode: {suggestion.fields.res_com}</div>
    </div>      
    );
  
    const onSuggestionSelected = async (_, { suggestion }) => {
        const { id_ref_lda, idrefligc } = suggestion.fields;

        navigate(`/line/${idrefligc}/${id_ref_lda}`);

      };
  
    const inputProps = {
      placeholder: 'Enter station name',
      value,
      onChange,
    };
  
    return (
      <div className="bg-white rounded-lg p-6 flex items-center">
        <h2 className="text-xl font-semibold border-1 mr-4">Search Station :</h2>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          onSuggestionSelected={onSuggestionSelected}
          inputProps={inputProps}
        />
      </div>
    );
  };
  
  export default TrainDepartureDisplay;