import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
    Menu, Icon
} from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            current: 'user',
        }
    }

    componentDidMount() {
    }

    handleClick(e) {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }

    render() {
        return (
            <Menu
                onClick={(e) => this.handleClick(e)}
                selectedKeys={[this.state.current]}
                mode="horizontal">
                <Menu.Item key="mail">
                    <Icon type="mail"/>
                </Menu.Item>
                <SubMenu title={<span className="submenu-title-wrapper" key="user"><Icon
                    type="setting"/>Welcome, {this.props.name}</span>}>
                    <MenuItemGroup title="Item 2">
                        <Menu.Item key="setting:3">Option 3</Menu.Item>
                    </MenuItemGroup>
                </SubMenu>
            </Menu>
        );
    }
}

if (document.getElementById('nav-bar')) {
    const element = document.getElementById('nav-bar')
    const props = Object.assign({}, element.dataset)
    ReactDOM.render(<NavBar {...props}/>, element);
}




