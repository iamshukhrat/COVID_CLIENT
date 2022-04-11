import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Drawer, Button } from 'antd';
import {
    ReadOutlined,
    AppstoreOutlined,
    CheckCircleOutlined,
    CalendarOutlined,
    SnippetsOutlined,
    FormOutlined,
    StarOutlined,
    UnorderedListOutlined,
    UserOutlined,
    BankOutlined,
    ForkOutlined,
    BookOutlined,
    TranslationOutlined,
    ScheduleOutlined,
    UsergroupAddOutlined,
    HistoryOutlined,
    PartitionOutlined,
    ApartmentOutlined,
    SafetyOutlined,
    TeamOutlined,
    OrderedListOutlined,
    HighlightOutlined,
    FileDoneOutlined,
    MenuOutlined,
    AuditOutlined,
} from '@ant-design/icons';

import { connect } from 'react-redux';

const { SubMenu } = Menu;

const menus = [
    {
        path: '/dashboard',
        label: "Пользователи",
        icon: <AppstoreOutlined />,
    },
    {
        path: '/laboratory',
        label: " Лаборатория (название)",
        icon: <AppstoreOutlined />,
    },
    {
        path: '/sampling',
        label: " Место забора анализа",
        icon: <AppstoreOutlined />,
    },


]

class HorizontalMenus extends React.Component {
    state = {
        current: this.props.location.pathname,
        isDrawerOpen: false,
    };

    openDrawer = () => this.setState({ isDrawerOpen: true });

    closeDrawer = () => this.setState({ isDrawerOpen: false });

    handleClick = e => {
        this.setState({ current: e.key });
    }

    render() {
        const { current, isDrawerOpen } = this.state;

        return (
            <React.Fragment>
                <Menu className="visible-md visible-lg" onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
                    {
                        menus.map((menu) => (
                                        <Menu.Item key={menu.path} >
                                            <Link to={menu.path}>
                                                {menu.icon}
                                                {menu.label}
                                            </Link>
                                        </Menu.Item>

                                )
                        )
                    }
                </Menu>

                <Button onClick={this.openDrawer} className="visible-xs visible-sm drawer-btn">
                    <MenuOutlined />
                </Button>

                <Drawer
                    title={"Меню"}
                    placement="right"
                    onClose={this.closeDrawer}
                    visible={isDrawerOpen}
                    bodyStyle={{
                        padding: 0
                    }}
                >
                    <Menu mode="inline" onClick={this.handleClick} selectedKeys={[current]}>
                        {
                            menus.map((menu) => (
                                            <Menu.Item key={menu.path} >
                                                <Link to={menu.path}>
                                                    {menu.icon}
                                                    {menu.label}
                                                </Link>
                                            </Menu.Item>

                                    )
                            )
                        }
                    </Menu>
                </Drawer>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

export default withRouter(connect(mapStateToProps)(HorizontalMenus));