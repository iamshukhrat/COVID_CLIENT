import React, { useState } from 'react';
import { Table } from 'antd';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        width: 150,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        width: 150,
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
];

const data = [];
for (let i = 0; i < 15; i++) {
    data.push({
        key: i,
        name: `Kalendar reja ${i}`,
        age: 32,
        address: `Toshkent no. ${i}`,
    });
}


const DemoTable = () => {
    const [pageSize, setPageSize] = useState(10);

    return (
        <Table
            columns={columns}
            dataSource={data}
            onChange={(e) => setPageSize(e.pageSize)}
            pagination={{ pageSize }}
            tableLayout="fixed"
        />
    )
}

export default DemoTable;