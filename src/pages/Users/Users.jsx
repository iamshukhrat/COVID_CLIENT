import React from 'react';
import { Row, Col, Input, Table, Skeleton, message, Space, Tag, Select } from "antd";
import { connect } from 'react-redux';

import {
    getLaboratories
} from "../../server/config";

import ModalForm from "./components/ModalForm";
import DeleteConfirm from "../../commonComponents/DeleteConfirm";
import { paginationDefaultItemCount } from "../../constants";

import "../pages.scss";
import {deleteUser, getUsers, getUsersLike, updateUsers} from "../../server/config/admin/Users";
import {getSampling} from "../../server/config/admin/Sampling";
import {Link} from "react-router-dom";

const { Search } = Input;
const { Option } = Select;

class Users extends React.Component {
    constructor() {
        super();
        this.state = {
            list: [],
            text:null,
            selectedRowKeys: [],
            isFetching: true,
            totalElements: 0,
            currentPage: 1,

            laboratories:[],
            samplings:[],
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

    updateEmployee = (id, obj) => {
        updateUsers(id, obj).then((res) => {
            if (res && res.data) {
                message.success('Success');
            }
        })
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
            selectedRowKeys: newList
        })
    }

    onSelectedRowKeysChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    }

    renderColumns = () => {

        return [
            {
                title:"Полное имя",
                dataIndex: 'fullname',
            },

            {
                title:" Дата рождения",
                dataIndex: 'birthday',
            },
            {
                title:"Серия и номер паспорта",
                dataIndex: 'serie',
            },
            {
                title:"Пол",
                dataIndex: 'sex',
            },
            {
                title: "увидеть",
                dataIndex: 'username',
                render:username=>(
                    <a href={'/report/'+username}>Korish</a>
                )
            }
            ,


        ];
    };

    getList = () => {
        const { currentPage, text} = this.state;
        const current = currentPage - 1;
        
        if (current >= 0) {{
            (text?getUsersLike(text, current, paginationDefaultItemCount):getUsers(current, paginationDefaultItemCount))
                .then((res) => {
                    if (res) {
                        let users=res.data.content;
                        let list=[];
                        users.map(function (u) {
                      if (u.id!=1){
                          list.push(u);
                      }
                        })
                        this.setState({
                            isFetching: false,
                            selectedRowKeys: [],
                            totalElements: res.data.totalElements-1,
                            list:list
                        })
                    } else {
                        this.setState({
                            selectedRowKeys: [],
                            isFetching: false,
                        })
                    }
                })
            }
        }
    };

    getCollections=()=>{
        getLaboratories().then(res=>{
            this.setState({
                laboratories:res.data
            })
        })

        getSampling().then(res=>{
           this.setState({
               samplings:res.data
           })
        })
        this.getList();
    }

    handlePaginationChange = (page) => {
        this.setState({
            currentPage: page,
        }, () => this.getList());
    }

    handleSearchText = (value) => {
        this.setState({
            text: value,
        }, () => this.getList());
    }

    componentDidMount() {
        this.getCollections();
    }

    render() {
        const {
            list,
            isFetching,
            totalElements,
            currentPage,
            selectedRowKeys,

            laboratories,
            samplings

        } = this.state;
        const columns = this.renderColumns();

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectedRowKeysChange,
        }


        const isMultiple = selectedRowKeys.length > 1 ? true : false;
        const isSingle = selectedRowKeys.length === 1 ? true : false;
        const {  edit } = this.props;
        return (
            <div className="bg-white site-border">
                <Row justify="space-between" className="page-header site-border-bottom">
                    <Col>
                        <Space>
                            <h3>
                                Пользователи
                            </h3>

                        </Space>
                    </Col>
                    <Col>
                        <Space>
                            <ModalForm laboratories={laboratories} samplings={samplings}  getList={this.getList} />

                            {
                                isSingle && (
                                    <ModalForm edit laboratories={laboratories} samplings={samplings}  getList={this.getList} getObj={this.getCheckedObj} />
                                )
                            }
                            {
                                selectedRowKeys.length!==0&&(
                                    <DeleteConfirm selectedIds={selectedRowKeys} getList={this.getList} deleteFunction={deleteUser} />
                                )
                            }
                            <Search
                                key={1}
                                placeholder="Qidirish"
                                onSearch={value => this.handleSearchText(value)}
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
                                pagination={{
                                    current: currentPage,
                                    total: totalElements,
                                    pageSize:10,
                                    onChange: this.handlePaginationChange,
                                    showTotal: (totalElements) => `ВСЕ: ${totalElements}`,
                                }}
                                tableLayout="fixed"
                                bordered
                                size="small"
                                rowSelection={rowSelection}
                                columns={columns}
                                dataSource={list}
                                rowKey="id"
                                scroll={{ x: 1000 }}
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
        lang: state.initial_data.lang,
        langs: state.initial_data.langs,
    }
}

export default connect(mapStateToProps)(Users);