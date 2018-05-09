import React from 'react';
import ReactLoadable from 'react-loadable';
import Loading from './Loading';

const Loadable = options => ReactLoadable({
  loading: Loading,
  delay: 200,
  timeout: 2000,
  ...options,
  render: () => (
    <div
      style={{ padding: '20px 0', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <div className="lds-dual-ring" />
    </div>
  ),
});

export default Loadable;

