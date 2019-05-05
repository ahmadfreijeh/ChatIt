import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
    List, Layout, Row, Col, Avatar, Button
} from 'antd';
import moment from 'moment';

import reqwest from "reqwest";

const send = 'http://localhost:8000/chat/send';

export default class SingleConversation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            conversation: null,
            message: 'dklsao',
            userId: Laravel.user
        }
    }

    componentDidMount() {
        let conversation = JSON.parse(this.props.conv);
        this.setState({
            data: conversation.messages,
            conversation
        })
    }

    send() {
        let data = this.state.data
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
                data = data.concat(res.data);
                this.setState({
                    data,
                });
            },
        });
    }

    render() {
        const {Header, Content, Footer} = Layout;
        return (
            <Layout className="layout">
                <Content style={{padding: '0 50px'}}>
                    <Row>
                        <Col span={24}>
                            <Button onClick={() => this.send()}>
                                Send
                            </Button>
                            <List
                                className="c-list-wrapper"
                                header={`${this.state.data.length} replies`}
                                itemLayout="horizontal"
                                dataSource={this.state.data}
                                renderItem={item => (
                                    <Row type="flex" justify={this.state.userId == item.sender ? 'start' : 'end'}>
                                        <Col span={6}>
                                            <List.Item key={item.id} className="c-list-item">
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
                        </Col>
                    </Row>
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




