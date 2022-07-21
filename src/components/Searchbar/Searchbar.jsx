import { Component } from 'react';
import { toast } from 'react-toastify';
import { PropTypes } from 'prop-types';

import {
  SearchbarContainer,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

class SearchBar extends Component {
  state = {
    searchQuery: '',
  };

  handleValueChange = event => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      toast.warn('Enter the word');
      return;
    }
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };
  render() {
    return (
      <>
        <SearchbarContainer>
          <SearchForm onSubmit={this.handleSubmit}>
            <SearchFormButton type="submit">
              <SearchFormButtonLabel>Search</SearchFormButtonLabel>
            </SearchFormButton>

            <SearchFormInput
              name="searchQuery"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={this.state.searchQuery}
              onChange={this.handleValueChange}
            />
          </SearchForm>
        </SearchbarContainer>
      </>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
// const Searchbar = () => (
// <>
//   <SearchbarContainer>
//     <SearchForm>
//       <SearchFormButton type="submit">
//         <SearchFormButtonLabel>Search</SearchFormButtonLabel>
//       </SearchFormButton>

//       <SearchFormInput

//         type="text"
//         autocomplete="off"
//         autofocus
//         placeholder="Search images and photos"
//       />
//     </SearchForm>
//   </SearchbarContainer>
// </>
// );

// export default Searchbar;
