import { useEffect } from 'react';
import Notiflix from 'notiflix';

export const Loader = () => {
  useEffect(() => {
    Notiflix.Loading.standard('Loading...');
  }, []);

  return null;
};

export default Loader;
