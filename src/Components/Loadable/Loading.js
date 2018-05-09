import React from 'react';
import PropTypes from 'prop-types';

const Loading = ({ error, retry, pastDelay, timedOut }) => {
  if (error) {
    return (
      <div>
        <span>Error to load this part of the app</span>
        <br />
        <button onClick={retry}>Retry</button>
      </div>
    );
  }

  if (timedOut) {
    return (
      <div>
        <span>Taking a long time...</span>
        <br />
        <button onClick={retry}>Retry</button>
      </div>
    );
  }

  if (pastDelay) {
    return (
      <div
        style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <div className="lds-dual-ring" />
      </div>
    );
  }

  return null;
};

Loading.defaultProps = {
  error: false,
};

Loading.propTypes = {
  timedOut: PropTypes.bool.isRequired,
  error: PropTypes.bool,
  pastDelay: PropTypes.bool.isRequired,
  retry: PropTypes.func.isRequired,
};

export default Loading;
