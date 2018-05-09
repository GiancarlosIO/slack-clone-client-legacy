/* eslint-disable function-paren-newline */
// import Loadable from 'Components/Loadable';
import Loadable from 'react-loadable';
import Loading from 'Components/Loadable/Loading';

const LoadableChannels = Loadable({
  loading: Loading,
  delay: 200,
  timeout: 2000,
  loader: () => import(
    /* webpackChunkName: "Channels" */
    /* webpackPrefetch: true */
    './Channels',
  ),
});

export default LoadableChannels;
