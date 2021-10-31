import React from "react";
import { Tabs as AntdTabs } from "antd";
import "antd/dist/antd.css";

const useGetDashboardTabs = () => {
  return [
    { label: "Summary", component: null },
    { label: "Chart", component: null },
    { label: "Statistics", component: null },
    { label: "Analytics", component: null },
    { label: "Settings", component: null },
  ];
};

function Tabs() {
  const { TabPane } = AntdTabs;
  const tabs = useGetDashboardTabs();

  return (
    <div>
      <AntdTabs
        defaultActiveKey="1"
        onChange={() => {}}
        tabBarStyle={{ color: "#333333", fontFamily: "Poppins" }}
      >
        {tabs.map((tab, idx) => (
          <TabPane tab={tab.label} key={idx}>
            {tab.component}
          </TabPane>
        ))}
      </AntdTabs>
    </div>
  );
}

export default Tabs;
