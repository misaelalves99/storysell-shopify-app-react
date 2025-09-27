import React, { useState } from 'react';
import styles from './Tabs.module.css';

type Tab = { id: string; label: string; content: React.ReactNode };
type TabsProps = { tabs: Tab[] };

export const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id);

  return (
    <div>
      <div className={styles.tabList}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? styles.active : ''}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={styles.tabContent}>
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};
