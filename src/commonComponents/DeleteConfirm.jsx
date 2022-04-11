import React from 'react';
import {connect} from "react-redux";
import {Modal, Button, Row, Col, message} from 'antd';
import {DeleteOutlined, ExclamationCircleOutlined} from '@ant-design/icons';

class DeleteConfirm extends React.Component {
    state = {visible: false, isSubmitting: false};

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        this.setState({isSubmitting: true});
        const {selectedIds, deleteFunction} = this.props;
         selectedIds.map((select) => {
            deleteFunction(select).then((res) => {
                    if (res) {
                        this.setState({isSubmitting: false, visible: false});
                        this.props.getList();
                        message.success('Success');
                    } else {
                        this.setState({isSubmitting: false, visible: false});
                        message.error('error deleting')
                    }
                }
            )})
        // ) : '';
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const {isSubmitting, visible} = this.state;


        return (
            <React.Fragment>
                <Button danger onClick={this.showModal} loading={isSubmitting}>
                    <DeleteOutlined/>
                </Button>
                <Modal
                    title={"удалять"}
                    centered
                    width={350}
                    visible={visible}
                    onOk={this.handleOk}
                    okType="danger"
                    okText={"удалять"}
                    cancelText={"Отмена"}
                    confirmLoading={isSubmitting}
                    onCancel={this.handleCancel}
                >
                    <Row align="middle" gutter={[8]}>
                        <Col>
                            <ExclamationCircleOutlined style={{color: "orange", fontSize: "20px"}}/>
                        </Col>
                        <Col>
                            {"Вы уверены, что хотите это удалить?"}
                        </Col>
                    </Row>
                </Modal>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {}
}

export default connect(mapStateToProps)(DeleteConfirm);