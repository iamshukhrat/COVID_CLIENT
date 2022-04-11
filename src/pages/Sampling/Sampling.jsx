import React from 'react';
import { Row, Col, Input, Table, Skeleton, Space, Tag } from "antd";
import { connect } from 'react-redux';

import {deleteLaboratory, getLaboratories} from "../../server/config";

import ModalForm from "./components/ModalForm";
import DeleteConfirm from "../../commonComponents/DeleteConfirm";

import "../pages.scss";
import {deleteSampling, getSampling} from "../../server/config/admin/Sampling";

const { Search } = Input;

class Sampling extends React.Component {
    constructor() {
        super();
        this.state = {
            list: [],
            selectedRowKeys: [],
            isFetching: true,
            totalElements: 0,
            currentPage: 1,
        }
    }

    getCheckedObj = () => {
        const { list, selectedRowKeys } = this.state;
        let newObj = {};

        list.forEach((obj) => {
            if (selectedRowKeys.length === 1 && obj['id'] === selectedRowKeys[0]) {
                newObj = obj;
            }
        })
        return newObj;
    }

    handleClickedRow = (record) => {
        let newList = [];
        const { selectedRowKeys } = this.state;
        const id = record['id'];

        if (this.state.selectedRowKeys.includes(id)) {
            newList = selectedRowKeys.filter((selectedId) => selectedId !== id);
        } else {
            newList = [...selectedRowKeys, id];
        }

        this.setState({
            selectedRowKeys: newList,
        })
    }

    onSelectedRowKeysChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    }

    renderColumns = () => {

        return [
            {
                title: "Hазвание",
                dataIndex: `nameRu`,
            },
        ];
    }

    getList = () => {
        getSampling().then((res) => {
            if (res) {
                this.setState({
                    isFetching: false,
                    selectedRowKeys: [],
                    totalElements: res.data.length,
                    list: res.data,
                })
            } else {
                this.setState({
                    selectedRowKeys: [],
                    isFetching: false,
                })
            }
        })
    }

    setPagenination = (e) => {
        console.log(e);
    }

    componentDidMount() {
        this.getList();
    }

    render() {
        const { list, isFetching, totalElements, currentPage, selectedRowKeys } = this.state;
        const columns = this.renderColumns();


        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectedRowKeysChange,
        }

        const isMultiple = selectedRowKeys.length > 1 ? true : false;
        const isSingle = selectedRowKeys.length === 1 ? true : false;

        return (
            <div className="bg-white site-border">
                <Row align="middle" justify="space-between" className="page-header site-border-bottom">
                    <Col>
                        <h3>
                            Место забора анализа
                        </h3>
                    </Col>
                    <Col>
                        <Space>
                            <ModalForm getList={this.getList} />

                            {
                                isSingle && (
                                    <ModalForm edit getList={this.getList} getObj={this.getCheckedObj} />
                                )
                            }
                            {
                                isSingle && (
                                    <DeleteConfirm selectedIds={selectedRowKeys} getList={this.getList} delete={deleteSampling} />
                                )
                            }
                            <Search
                                key={1}
                                placeholder="Qidirish"
                                onSearch={value => console.log(value)}
                                style={{ width: 200 }}
                            />
                        </Space>
                    </Col>
                </Row>

                {
                    isFetching ? (
                        <Skeleton active />
                    ) : (
                            <Table
                                tableLayout="fixed"
                                bordered
                                size="small"
                                rowSelection={rowSelection}
                                columns={columns}
                                dataSource={list}
                                rowKey="id"
                                scroll={{ x: 700 }}
                                onRow={(record) => {
                                    return {
                                        onClick: () => {
                                            this.handleClickedRow(record);
                                        },
                                    };
                                }}
                            />
                        )
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps)(Sampling);