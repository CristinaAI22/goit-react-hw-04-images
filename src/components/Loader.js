import React from 'react';
import Notiflix from 'notiflix';

class Loader extends React.Component {
  componentDidMount() {
    Notiflix.Loading.standard('Loading...');
  }
  render() {
    return null;
  }
}

export default Loader;
