import React from 'react';
import { connect } from "react-redux";
import { Modal, Button, Form, Input, Select, message, Row, Col, Checkbox, DatePicker } from 'antd';
import { LockOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import moment from "moment";

import { createEmployee, updateEmployee, getFile } from "../../../server/config";

import { host, port } from "../../../server/host";

import FileUpload from "../../../commonComponents/FileUpload";

import "../../pages.scss";
import {createUsers, updateUsers} from "../../../server/config/admin/Users";
import {getAnalizByUserId} from "../../../server/config/admin/Analiz";

const { Option } = Select;
const { TextArea } = Input;

const initialParams = {
    address: null,
    birthday: null,
    fullname:null,
    serie: null,
    sex: null,
    uuid:null,

    // analiz

    researchRu:null,
    researchEn:null,
    status:null,
    laboratoryId:null,
    samplingId:null,
    resultDate:null
};

class ModalForm extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            isSubmitting: false,
            params: { ...initialParams }
        }
        this.currentForm = React.createRef();
    }

    onFinish = () => {
        const { params } = this.state;
        const objToSend = {
            ...params,
            // birthday: moment(params.birthday).format("YYYY-MM-DD"),
            // resultDate: moment(params.resultDate).valueOf(),
        }

        this.setState({ isSubmitting: true }, () => {

            if (this.props.edit) {
                const userId = objToSend.id;
                delete objToSend.id;

                updateUsers(userId, objToSend).then((res) => {
                    if (res) {
                        this.setState({ isSubmitting: false, visible: false });
                        message.success('Success');
                    } else {
                        this.setState({ isSubmitting: false, visible: false });
                    }
                    this.props.getList();
                    this.currentForm.current.setFieldsValue(initialParams);
                })
            } else {
                createUsers(objToSend).then((res) => {
                    if (res) {
                        this.setState({ isSubmitting: false, visible: false });
                        message.success('Success');
                    } else {
                        this.setState({ isSubmitting: false, visible: false });
                    }
                    this.props.getList();
                    this.currentForm.current.setFieldsValue(initialParams);
                })
            }
        });
    }





    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            params: {
                ...this.state.params,
                [name]: value,
            }
        })
    }

    handleSelectChange = (name, value) => {
        if (name) {
            this.setState({
                params: {
                    ...this.state.params,
                    [name]: value,
                }
            })
        }
    }


    showModal = () => {
        const { edit } = this.props;

        if (edit) {
            const editingObj = this.props.getObj();
            delete editingObj.updateAt;
            delete editingObj.createAt;
            editingObj.attachmentId = editingObj.attachment ? editingObj.attachment.id : null;
            delete editingObj.attachment;

            getAnalizByUserId(editingObj.id).then(res=>{
                let analiz=res.data;
                editingObj.researchRu=analiz.researchRu;
                editingObj.researchEn=analiz.researchEn;
                editingObj.status=analiz.status;
                editingObj.laboratoryId=analiz.laboratory?analiz.laboratory.id:null;
                editingObj.samplingId=analiz.sampling ? analiz.sampling.id:null;
                editingObj.resultDate=analiz.resultDate;


                this.setState({
                    visible: true,
                    params: {
                        ...editingObj,
                    },
                });
            })



        } else {
            this.setState({
                visible: true,
            });
        }
    }

    handleCancel = () => {
        this.setState({
            visible: false,
        })
    }



    render() {
        const {
            isSubmitting,
        } = this.state;

        const {
            address,
            birthday,
            fullname,
            serie,
            sex,

            researchRu,
            researchEn,
            status,
            laboratoryId,
            samplingId,
            resultDate,
            uuid
        } = this.state.params;

        const { edit,samplings,laboratories } = this.props;

        return (
            <React.Fragment>

                {
                    edit ? (
                        <Button onClick={this.showModal} title={"????????????????"}>
                            <EditOutlined />
                        </Button>
                    ) : (
                            <Button type="primary" onClick={this.showModal} title={"???????????????? ??????????"}>
                                <PlusOutlined />
                            </Button>
                        )
                }
                <Modal
                    centered
                    closable={false}
                    maskClosable={false}
                    title={edit ? "????????????????" : "???????????????? ??????????"}
                    visible={this.state.visible}
                    footer={null}
                    width={600}
                    className="lms-form"
                >
                    <Form
                        name="basic"
                        layout="vertical"
                        onFinish={this.onFinish}
                        ref={this.currentForm}
                        initialValues={{
                            address,
                            birthday,
                            fullname,
                            serie,
                            sex,

                            researchRu,
                            researchEn,
                            status,
                            laboratoryId,
                            samplingId,
                            uuid,
                            resultDate,
                        }}
                    >
                        <h3>???????????????????? ?? ????????????????????????</h3>


                        <Row gutter={[16]}>

                            <Col md={24} lg={12}>
                                <Form.Item
                                    label={"ID"}
                                    name="uuid"
                                    rules={[
                                        {
                                            required: true,
                                            message: `id!`,
                                        },
                                    ]}
                                >

                                    <Input
                                        placeholder={"id"}
                                        name="uuid"
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label={"???????????? ??????"}
                                    name="fullname"
                                    rules={[
                                        {
                                            required: true,
                                            message: `???????????? ??????!`,
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder={"???????????? ??????"}
                                        name="fullname"
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Item>



                                <Form.Item
                                    label={"??????????"}
                                    name="address"
                                    rules={[
                                        {
                                            required: true,
                                            message: `??????????!`,
                                        },
                                    ]}
                                >
                                    <TextArea
                                        placeholder={"??????????"}
                                        name="address"
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Item>
                            </Col>

                            <Col md={24} lg={12}>


                                <Form.Item
                                    label={"???????? ????????????????"}
                                    name="birthday"
                                    rules={[
                                        {
                                            required: true,
                                            message: `???????? ????????????????	!`,
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder={"???????? ????????????????"}
                                        name="birthday"
                                        onChange={this.handleInputChange}
                                    />
                                    {/*<DatePicker className="w-100" onChange={this.handleDateChange} />*/}
                                </Form.Item>

                                <Form.Item
                                    label={"??????"}
                                    name="sex"
                                    rules={[
                                        {
                                            required: true,
                                            message: `??????!`,
                                        },
                                    ]}
                                >
                                        <Select
                                            showSearch
                                            placeholder={"??????"}
                                            // mode="multiple"
                                            onChange={(value) => this.handleSelectChange('sex', value)}
                                        >

                                            <Option value="M????????????/Male" key={1}>
                                                M????????????
                                            </Option>

                                            <Option value="??????????????/Female" key={2}>
                                                ??????????????
                                            </Option>

                                        </Select>

                                </Form.Item>

                                <Form.Item
                                    label={"?????????? ?? ?????????? ????????????????"}
                                    name="serie"
                                    rules={[
                                        {
                                            required: true,
                                            message: `?????????? ?? ?????????? ????????????????!`,
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder={"?????????? ?? ?????????? ????????????????"}
                                        name="serie"
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Item>

                            </Col>
                        </Row>



                        <h3>???????????? </h3>
                        <Row gutter={[16]}>

                            <Col md={24} lg={12}>
                                <Form.Item
                                    label={"?????????? ???????????????????????? Ru"}
                                    name="researchRu"
                                >
                                    <Input
                                        placeholder={" ?????????? ???????????????????????? Ru"}
                                        name="researchRu"
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label={"?????????? ???????????????????????? En"}
                                    name="researchEn"
                                >
                                    <Input
                                        placeholder={"?????????? ???????????????????????? En"}
                                        name="researchEn"
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label={"????????????"}
                                    name="status"
                                >
                                    {/*<Input*/}
                                    {/*    placeholder={"????????????"}*/}
                                    {/*    name="status"*/}
                                    {/*    onChange={this.handleInputChange}*/}
                                    {/*/>*/}
                                    <Select
                                        showSearch
                                        placeholder={"????????????"}
                                        // mode="multiple"
                                        onChange={(value) => this.handleSelectChange('status', value)}
                                    >

                                        <Option value=" Positive/?????????????????????????? " key={1}>
                                            Positive/??????????????????????????
                                        </Option>

                                        <Option value=" Negative/?????????????????????????? " key={2}>
                                            Negative/??????????????????????????
                                        </Option>

                                    </Select>
                                </Form.Item>


                            </Col>

                            <Col md={24} lg={12}>

                                <Form.Item
                                    label={"?????????????????????? (????????????????)"}
                                    name="laboratoryId"
                                >
                                    <Select
                                        showSearch
                                        placeholder={"?????????????????????? (????????????????)"}
                                        // mode="multiple"
                                        onChange={(value) => this.handleSelectChange('laboratoryId', value)}
                                    >
                                        {
                                            Array.isArray(laboratories)?laboratories.map((role) => (
                                                <Option value={role.id} key={role.id}>
                                                    {role['nameRu']}
                                                </Option>
                                            )):''
                                        }
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    label={"?????????? ???????????? ??????????????"}
                                    name="samplingId"
                                >
                                    <Select
                                        showSearch
                                        placeholder={"?????????? ???????????? ??????????????"}
                                        // mode="multiple"
                                        onChange={(value) => this.handleSelectChange('samplingId', value)}
                                    >
                                        {
                                            Array.isArray(samplings)?samplings.map((role) => (
                                                <Option value={role.id} key={role.id}>
                                                    {role['nameRu']}
                                                </Option>
                                            )):''
                                        }
                                    </Select>
                                </Form.Item>


                                <Form.Item
                                    label={"???????? ?????????? ??????????????"}
                                    name="resultDate"
                                >


                                    <Input
                                        placeholder={"???????? ?????????? ??????????????"}
                                        name="resultDate"
                                        onChange={this.handleInputChange}
                                    />

                                </Form.Item>

                            </Col>
                        </Row>



                        <Row className="form-footer" justify="end" gutter={[8]}>
                            <Col>
                                <Form.Item>
                                    <Button onClick={this.handleCancel} disabled={isSubmitting}>
                                        ????????????
                                    </Button>
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" loading={isSubmitting}>
                                        Ok
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>


                    </Form>
                </Modal>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    }
}

export default connect(mapStateToProps)(ModalForm);