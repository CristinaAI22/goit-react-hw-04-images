import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.inputValue);
  };

  handleChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.inputValue}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
