import React from 'react';
import PropTypes from 'prop-types';

import styles from './Channels.scss';

const Channels = ({ channels }) => (
  <div className={styles.container}>
    <h2 className={styles.title}>Channels</h2>
    <div className={styles.channels}>
      {channels.map((c, i) => (
        <div
          key={c.id}
          className={`${styles.channelContainer} ${i === 0 ? 'selected' : ''}`}
        >
          <a href={`/${c.name}`} className={styles.channelName}>
            { `# ${c.name}` }
          </a>
        </div>
      ))}
    </div>
  </div>
);

Channels.propTypes = {
  channels: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

export default Channels;
