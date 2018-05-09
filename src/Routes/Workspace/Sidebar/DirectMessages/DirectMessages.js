import React from 'react';
import PropTypes from 'prop-types';
import FaCircle from 'react-icons/lib/fa/circle';

import styles from './DirectMesssages.scss';

const DirectMessages = ({ directMessages }) => (
  <div>
    <h2 className={styles.title}>Direct Messages</h2>
    <div className={styles.users}>
      {directMessages.map(user => (
        <div key={user.id} className={styles.userWrapper}>
          <a
            href={`/${user.username}`}
            className={styles.username}
          >
            <FaCircle size={11} color="#38978d" style={{ marginRight: 5 }} />
            <span>
              { user.username }
            </span>
          </a>
        </div>
      ))}
    </div>
  </div>
);

DirectMessages.propTypes = {
  directMessages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

export default DirectMessages;
