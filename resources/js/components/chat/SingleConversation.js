import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
    List, Layout, Row, Col, Avatar, Button, Input, PageHeader, Menu, Icon, Empty
} from 'antd';
import moment from 'moment';
import reqwest from "reqwest";
import {Scrollbars} from 'react-custom-scrollbars';
import History from './History.js';

const send = 'http://localhost:8000/chat/send';

export default class SingleConversation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            conversation: null,
            receivers: null,
            message: '',
            userId: Laravel.user
        }
    }

    componentWillMount() {
        window.Echo.private('chat.channel.' + this.state.userId)
            .listen('ChatEvent', (e) => {
                this.concatData(e.data)
            });

        let conversation = JSON.parse(this.props.conv);
        this.setState({
            data: conversation.messages,
            receivers: conversation.receivers,
            conversation
        })
    }

    componentDidMount() {
        this.scrollDown();
    }

    send() {
        reqwest({
            url: send,
            type: 'json',
            method: 'post',
            headers: {
                'X-CSRF-TOKEN': Laravel.token,
            },
            data: {
                message: this.state.message,
                conversation_id: this.state.conversation.id
            },
            success: (res) => {
                this.concatData(res.data)
            },
        });
    }

    concatData(newData) {
        let data = this.state.data.concat(newData);
        this.setState({
            data,
            message: ''
        });
        this.scrollDown();
    }

    scrollDown() {
        this.refs.scrollbar.scrollToBottom();
    }

    render() {
        const {Header, Content, Footer, Sider} = Layout;
        const {TextArea} = Input;

        return (
            <Layout className="layout">
                <Content style={{padding: '0px 50px'}}>
                    <Layout style={{background: '#fff'}} className="chat-box-main-container">
                        <Sider width={400} style={{background: '#fff'}}>
                            <History/>
                        </Sider>
                        <Content style={{padding: '0 24px', minHeight: 280}}>
                            <Row>
                                <Col lg={{span: 24}}>
                                    <PageHeader
                                        onBack={() => window.location.href = "/home"}
                                        title={this.state.receivers[0].name}
                                        subTitle={this.state.receivers[0].email}
                                    />
                                </Col>
                                <Col className="chat-box-bg" lg={{span: 24}}>
                                    <Scrollbars ref='scrollbar' style={{height: 700}} hideTracksWhenNotNeeded={true}>
                                        <List
                                            className="c-list-wrapper chat-box"
                                            itemLayout="horizontal"
                                            dataSource={this.state.data}
                                            locale={{emptyText: <Empty className="empty-style"/>}}
                                            renderItem={item => (
                                                <Row type="flex"
                                                     justify={this.state.userId == item.sender ? 'start' : 'end'}>
                                                    <Col xs={{span: 24}} md={{span: 10}} lg={{span: 10}}>
                                                        <List.Item key={item.id}
                                                                   className={['c-list-item', this.state.userId == item.sender ? 'message-box-green left' : 'message-box-white right']}>
                                                            <List.Item.Meta
                                                                avatar={<Avatar
                                                                    src="https://wallpapercave.com/wp/wp3350839.jpg"/>}
                                                                title={
                                                                    <small>{moment(item.created_at).format('DD-MMMM-YYYY')}</small>}
                                                                description={item.message}
                                                            />
                                                        </List.Item>
                                                    </Col>
                                                </Row>
                                            )}/>
                                    </Scrollbars>
                                </Col>
                                <Col lg={{span: 24}}>
                                    <TextArea rows={2} className="message-input" placeholder="Type a message"
                                              onPressEnter={() => this.send()}
                                              onChange={(e) => this.setState({message: e.target.value})}
                                              value={this.state.message}/>
                                </Col>
                            </Row>
                        </Content>
                    </Layout>
                </Content>
            </Layout>
        );
    }
}

if (document.getElementById('single-conversation')) {
    const element = document.getElementById('single-conversation')
    const props = Object.assign({}, element.dataset)
    ReactDOM.render(<SingleConversation {...props}/>, element);
}




