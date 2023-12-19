import React, { useState } from 'react';
import AutoSuggest from 'react-autosuggest';
import { IoIosSearch } from 'react-icons/io';

import router from 'next/router';

import api from '../lib/api';

let lastSuggestionsRequest = null;

const ProductsAutoComplete = () => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const onChange = (_, { newValue, method }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = (value) => {
    clearTimeout(lastSuggestionsRequest);
    console.log(value);
    if (value.value.length > 2) {
      lastSuggestionsRequest = setTimeout(() => {
        api()
          .get('/api/v1/products/autosuggest/' + encodeURIComponent(value.value))
          .then(response => setSuggestions(response.data))
          .catch(error => {
            console.log('Error on fetching of the suggestions list:', error);
          });
      }, 500);
    } else {
      setSuggestions([]);
    }
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (e, item) => {
    e.preventDefault();
    
    setValue(item.suggestion.name.replace(/<\/?[^>]+(>|$)/g, ""));
    router.push(`/product/${item.suggestion.url}`);

    return false;
  }

  const getSuggestionValue = (hit) => {
    return hit.gram_name.replace(/<\/?[^>]+(>|$)/g, "");
  }

  const renderInputComponent = (inputProps) => {
    return (
      <div>
        <input {...inputProps} />
        <button type='button'>
          <IoIosSearch />
        </button>
      </div>
    );
  }

  function renderSuggestion (hit) {
    return (
      <div className='result-container border-bottom'>
        <a href='#' className='reslut d-flex space-between p-3'>
          <div className='img mr-2'>
            <img
              src={`https://3dinfinite-public.s3.us-east-2.amazonaws.com/products/images/${hit.image_url}`}
              alt=''
            />
          </div>
          <div className='rest'>
            <h5
              className='text-nowrap'
              dangerouslySetInnerHTML={{__html: hit.gram_name}}
            ></h5>
            <p
              className='my-2'
              dangerouslySetInnerHTML={{__html: hit.gram_brand_name}}
            ></p>
            <p
              dangerouslySetInnerHTML={{__html: hit.gram_categories}}
            ></p>
          </div>
        </a>
      </div>
    );
  }

  const inputProps = {
    placeholder: 'Search for a product...',
    onChange: onChange,
    value: value || '',
    type: 'search'
  };

  return (
    <div>
      <AutoSuggest
        suggestions={suggestions || []}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        renderInputComponent={renderInputComponent}
        inputProps={inputProps}
      />
    </div>
  );
}

export default ProductsAutoComplete;
