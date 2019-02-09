import React from 'react';
import PropTypes from 'prop-types';

const Preloader = ({height, borderWidth}) => {
  const styles = {
    height: height || '25px',
    width: height || '25px',
    borderWidth: borderWidth || '3px',
  };
  return (
    <div className="preloaderContainer">
      <div className="loader" style={styles} />
    </div>
  );
};

export default Preloader;

Preloader.propTypes = {
  height: PropTypes.string,
  borderWidth: PropTypes.string,
};

Preloader.defaultProps = {
  height: '25px',
  borderWidth: '3px',
};
