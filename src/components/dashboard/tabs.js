import React from "react";
import { Tabs as AntdTabs } from "antd";
import "antd/dist/antd.css";
import Chart from "./chart";

const useDashboardTabs = () => {
  return [
    { label: "Summary", Component: () => null },
    { label: "Chart", Component: Chart },
    { label: "Statistics", Component: () => null },
    { label: "Analytics", Component: () => null },
    { label: "Settings", Component: () => null },
  ];
};

function Tabs() {
  const { TabPane } = AntdTabs;
  const tabs = useDashboardTabs();

  return (
    <div>
      <AntdTabs
        defaultActiveKey="1"
        onChange={() => {}}
        tabBarStyle={{ color: "var(--black2)", fontFamily: "Poppins" }}
      >
        {tabs.map((tab, idx) => {
          const { Component, label } = tab;
          return (
            <TabPane tab={label} key={label}>
              <Component />
            </TabPane>
          );
        })}
      </AntdTabs>
    </div>
  );
}

export default Tabs;
