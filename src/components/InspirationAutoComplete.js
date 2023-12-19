import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Highlight,
  connectAutoComplete,
  Pagination
} from 'react-instantsearch-dom';
import AutoSuggest from 'react-autosuggest';
import { IoIosSearch } from 'react-icons/io';

class InspirationAutoComplete extends Component {
  static propTypes = {
    hits: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentRefinement: PropTypes.string.isRequired,
    refine: PropTypes.func.isRequired,
    onSuggestionSelected: PropTypes.func.isRequired,
    onSuggestionCleared: PropTypes.func.isRequired
  };

  state = {
    value: this.props.currentRefinement
  };

  onChange = (_, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.props.refine(value);
  };

  onSuggestionsClearRequested = () => {
    this.props.refine();
  };

  getSuggestionValue(hit) {
    return hit.name;
  }

  renderInputComponent(inputProps) {
    return (
      <div>
        <input {...inputProps} />
        <button type='button'>
          <IoIosSearch />
        </button>
      </div>
    );
  }

  renderSuggestion(hit) {
    return (
      <div className='result-container border-bottom'>
        <a href='#' className='reslut d-flex space-between p-3'>
          <div className='img mr-2'>
            <img
              height='50px'
              src={`https://3dinfinite-public.s3.us-east-2.amazonaws.com/products/images/${hit.image_main}`}
              alt=''
            />
          </div>
          <div className='rest'>
            <h5 className='text-nowrap'>
              <Highlight
                attribute='name'
                hit={hit}
                tagName='mark'
              />
            </h5>
            <p className='mt-2'>
              <Highlight
                attribute='brand.name'
                hit={hit}
                tagName='mark'
              />
            </p>
          </div>
        </a>
      </div>
    );
  }

  render() {
    const { hits, onSuggestionSelected } = this.props;
    const { value } = this.state;

    const inputProps = {
      placeholder: 'Search images ...',
      onChange: this.onChange,
      value,
      type: 'search'
    };

    return (
      <div>
        <AutoSuggest
          suggestions={hits}
          onSuggestionsFetchRequested={
            this.onSuggestionsFetchRequested
          }
          onSuggestionsClearRequested={
            this.onSuggestionsClearRequested
          }
          onSuggestionSelected={onSuggestionSelected}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          renderInputComponent={this.renderInputComponent}
          inputProps={inputProps}
        />
      </div>
    );
  }
}

export default connectAutoComplete(InspirationAutoComplete);
