import React from 'react';
import PropTypes from 'prop-types';
import FaCircle from 'react-icons/lib//fa/circle';

import styles from './SidebarHeader.scss';

const SidebarHeader = ({ team, username }) => (
  <div className={styles.container}>
    <div className={styles.logo}>
      { team.name }
    </div>
    <div className={styles.username}>
      <FaCircle size={12} color="#38978d" style={{ marginRight: 5 }} />
      { username }
    </div>
  </div>
);

SidebarHeader.propTypes = {
  username: PropTypes.string.isRequired,
  team: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
};

export default SidebarHeader;

