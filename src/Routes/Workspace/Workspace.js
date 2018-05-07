import React, { Component } from 'react';

// components
import SidebarHeader from './Sidebar/SidebarHeader';
import Channels from './Sidebar/Channels';
import DirectMessages from './Sidebar/DirectMessages';

import styles from './Workspace.css';

class Workspace extends Component {
  state = {
    abc: 1,
  }

  render() {
    console.log(this.state);
    return (
      <div className={styles.maxContainer}>
        <div className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <SidebarHeader
              team={{ name: 'Crehana' }}
              username="nexus"
            />
          </div>
          <div className={styles.sidebarContent}>
            <Channels
              channels={[
                { id: 1, name: 'general' },
                { id: 2, name: 'random' },
                { id: 3, name: 'developers2' },
              ]}
            />
            <DirectMessages
              directMessages={[
                { id: 1, username: 'nexus' },
                { id: 2, username: 'nexus2' },
                { id: 3, username: 'nexus3' },
                { id: 4, username: 'nexus4' },
              ]}
            />
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.bodyHeader}>
            HEADER
          </div>
          <div className={styles.bodyContent}>
            <h2>BODY</h2>
            <h2>BODY</h2>
            <h2>BODY</h2>
            <h2>BODY</h2>
            <h2>BODY</h2>
            <h2>BODY</h2>
            <h2>BODY</h2>
            <h2>BODY</h2>
            <h2>BODY</h2>
            <h2>BODY</h2>
            <h2>BODY</h2>
            <h2>BODY</h2>
            <h2>BODY</h2>
            <h2>BODY</h2>
            <h2>BODY</h2>
            <h2>BODY</h2>
            <h2>BODY</h2>
            <h2>BODY</h2>
            <h2>BODY</h2>
            <h2>BODY</h2>
            <h2>BODY</h2>
            <h2>BODY</h2>
            <h2>BODY</h2>
            <h2>BODY</h2>
            <h2>BODY</h2>
            <h2>BODY</h2>
            <h2>BODY</h2>
            <h2>BODY</h2>
            <h2>BODY</h2>
            <h2>BODY</h2>
            <h2>BODY</h2>
            <h2>BODY</h2>
            <h2>BODY</h2>
            <h2>BODY</h2>
            <h2>BODY</h2>
            <h2>BODY</h2>
            <h2>BODY</h2>
            <h2>BODY</h2>
            <h2>BODY</h2>
            <h2>BODY</h2>
            <h2>BODY</h2>
            <h2>BODY</h2>
            <h2>BODY</h2>
            <h2>BODY</h2>
            <h2>BODY</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default Workspace;
