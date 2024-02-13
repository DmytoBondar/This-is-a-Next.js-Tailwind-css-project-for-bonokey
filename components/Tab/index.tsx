import React, { useState } from 'react';

const Tab = ({ label, activeTab, onClick }) => {
  const isActive = activeTab === label;

  return (
    <li>
      <a
        onClick={() => onClick(label)}
        href="javascript:void(0)"
        aria-current="page"
        className={`inline-block px-4 py-2 rounded-t-lg ${isActive ? 'text-gray-900 bg-blue_gray-100_3f font-semibold' : ''}`}
      >
        {label}
      </a>
    </li>
  );
};

const TabPanel = ({ children, activeTab, label }) => {
  if (activeTab !== label) return null;
  return <div>{children}</div>;
};

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const onClickTab = tab => {
    setActiveTab(tab);
  };

  return (
    <div>
      <ul className="flex flex-wrap justify-center gap-2 font-medium text-center text-gray-500 text-lg">
        {children.map(child => (
          <Tab
            key={child.props.label}
            activeTab={activeTab}
            label={child.props.label}
            onClick={onClickTab}
          />
        ))}
      </ul>
      <div className="rounded-lg bg-blue_gray-100_3f p-4">
        {children.map(child => (
          <TabPanel
            key={child.props.label}
            activeTab={activeTab}
            label={child.props.label}
          >
            {child.props.children}
          </TabPanel>
        ))}
      </div>
    </div>
  );
};

export { Tabs, Tab, TabPanel };