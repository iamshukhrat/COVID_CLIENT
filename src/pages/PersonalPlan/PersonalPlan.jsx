import React from 'react';
import { PageHeader, Tabs } from "antd";

import DemoTable from "./components/DemoTable";

import "../pages.scss";

const { TabPane } = Tabs;

const MySubject = () => {
    return (
        <div className="bg-white site-border">
            <PageHeader
                className="site-border-bottom"
                title="Kalendar reja"
            />
            <Tabs defaultActiveKey="1">
                <TabPane tab="Ma'ruza" key="1">
                    <DemoTable />
                </TabPane>
                <TabPane tab="Labaratoriya" key="2">
                    <DemoTable />
                </TabPane>
            </Tabs>
        </div>
    );
}

export default MySubject;