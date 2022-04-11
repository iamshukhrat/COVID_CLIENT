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
                        <Button onClick={this.showModal} title={"Изменить"}>
                            <EditOutlined />
                        </Button>
                    ) : (
                            <Button type="primary" onClick={this.showModal} title={"Добавить новое"}>
                                <PlusOutlined />
                            </Button>
                        )
                }
                <Modal
                    centered
                    closable={false}
                    maskClosable={false}
                    title={edit ? "Изменить" : "Добавить новое"}
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
                        <h3>Информация о пользователе</h3>


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
                                    label={"Полное имя"}
                                    name="fullname"
                                    rules={[
                                        {
                                            required: true,
                                            message: `Полное имя!`,
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder={"Полное имя"}
                                        name="fullname"
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Item>



                                <Form.Item
                                    label={"Адрес"}
                                    name="address"
                                    rules={[
                                        {
                                            required: true,
                                            message: `Адрес!`,
                                        },
                                    ]}
                                >
                                    <TextArea
                                        placeholder={"Адрес"}
                                        name="address"
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Item>
                            </Col>

                            <Col md={24} lg={12}>


                                <Form.Item
                                    label={"Дата рождения"}
                                    name="birthday"
                                    rules={[
                                        {
                                            required: true,
                                            message: `Дата рождения	!`,
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder={"Дата рождения"}
                                        name="birthday"
                                        onChange={this.handleInputChange}
                                    />
                                    {/*<DatePicker className="w-100" onChange={this.handleDateChange} />*/}
                                </Form.Item>

                                <Form.Item
                                    label={"Пол"}
                                    name="sex"
                                    rules={[
                                        {
                                            required: true,
                                            message: `Пол!`,
                                        },
                                    ]}
                                >
                                        <Select
                                            showSearch
                                            placeholder={"Пол"}
                                            // mode="multiple"
                                            onChange={(value) => this.handleSelectChange('sex', value)}
                                        >

                                            <Option value="Mужчина/Male" key={1}>
                                                Mужчина
                                            </Option>

                                            <Option value="Женщина/Female" key={2}>
                                                Женщина
                                            </Option>

                                        </Select>

                                </Form.Item>

                                <Form.Item
                                    label={"Серия и номер паспорта"}
                                    name="serie"
                                    rules={[
                                        {
                                            required: true,
                                            message: `Серия и номер паспорта!`,
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder={"Серия и номер паспорта"}
                                        name="serie"
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Item>

                            </Col>
                        </Row>



                        <h3>Анализ </h3>
                        <Row gutter={[16]}>

                            <Col md={24} lg={12}>
                                <Form.Item
                                    label={"Метод исследования Ru"}
                                    name="researchRu"
                                >
                                    <Input
                                        placeholder={" Метод исследования Ru"}
                                        name="researchRu"
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label={"Метод исследования En"}
                                    name="researchEn"
                                >
                                    <Input
                                        placeholder={"Метод исследования En"}
                                        name="researchEn"
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label={"Статус"}
                                    name="status"
                                >
                                    {/*<Input*/}
                                    {/*    placeholder={"Статус"}*/}
                                    {/*    name="status"*/}
                                    {/*    onChange={this.handleInputChange}*/}
                                    {/*/>*/}
                                    <Select
                                        showSearch
                                        placeholder={"Статус"}
                                        // mode="multiple"
                                        onChange={(value) => this.handleSelectChange('status', value)}
                                    >

                                        <Option value=" Positive/Положительный " key={1}>
                                            Positive/Положительный
                                        </Option>

                                        <Option value=" Negative/Отрицательный " key={2}>
                                            Negative/Отрицательный
                                        </Option>

                                    </Select>
                                </Form.Item>


                            </Col>

                            <Col md={24} lg={12}>

                                <Form.Item
                                    label={"Лаборатория (название)"}
                                    name="laboratoryId"
                                >
                                    <Select
                                        showSearch
                                        placeholder={"Лаборатория (название)"}
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
                                    label={"Место забора анализа"}
                                    name="samplingId"
                                >
                                    <Select
                                        showSearch
                                        placeholder={"Место забора анализа"}
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
                                    label={"Дата сдачи анализа"}
                                    name="resultDate"
                                >


                                    <Input
                                        placeholder={"Дата сдачи анализа"}
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
                                        Отмена
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