import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
    List, message, Avatar, Spin, Row, Col, Layout, Badge, Button, notification, Popconfirm
} from 'antd';
import reqwest from 'reqwest';
import {Scrollbars} from 'react-custom-scrollbars';

const history = 'http://localhost:8000/chat/history';
const deleteApi = 'http://localhost:8000/chat/history/delete';
const deleteMessage = 'Are you sure to delete this conversation?';

export default class History extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            hasMore: true,
            userId: Laravel.user
        }
    }

    /*
    * Show popup side notification containing sender and teh data
    * */
    receiveMessageSideNotification(sender, data) {
        notification.open({
            message: sender,
            description: data.message,
        });
    };

    componentDidMount() {
        /*
         *  Listening for events based on private channel related to the ( end user )
         *  on receiving data append single object to data array (state)
         * */
        window.Echo.private('chat.channel.' + this.state.userId)
            .listen('ChatEvent', (e) => {

                this.receiveMessageSideNotification(e.sender.name, e.data)

                //Get the conversation then push the data t messages array
                let conversationId = e.data.conversation_id;
                let conversation = this.state.data.find(x => x.id === conversationId);
                conversation.messages.push(e.data);

                //then set the state of this conversation to the updated conversation
                this.setState({
                    data: this.state.data.map(el => (el.id === conversationId ? conversation : el))
                });
            });

        this.fetchData((res) => {
            this.setState({
                data: res,
                loading: false,
            });
        });
    }

    fetchData(callback) {
        reqwest({
            url: history,
            type: 'json',
            method: 'get',
            contentType: 'application/json',
            success: (res) => {
                callback(res.data);
            },
        });
    }

    deleteConversation(item, index) {
        reqwest({
            url: deleteApi,
            type: 'json',
            method: 'delete',
            headers: {
                'X-CSRF-TOKEN': Laravel.token,
            },
            data: {
                conversation_id: item.id
            },
            success: (res) => {
                this.setState({
                    data: this.state.data.filter((_, i) => i !== index)
                });
            },
        });
    }

    render() {
        const {Header, Content, Footer} = Layout;
        return (
            <Row>
                <Col span={24}>
                    <Scrollbars ref='scrollbar' style={{height: 700}} hideTracksWhenNotNeeded={true}>
                        <div className="chat-infinite-container">
                            <List
                                dataSource={this.state.data}
                                renderItem={(item, index) => (
                                    <List.Item key={item.id} className="c-list-item">
                                        <Badge count={item.messages.length} className="c-list-item-badge">
                                            <a href={'chat/single/conversation/' + item.id + '/' + item.token}
                                               className="head-example"/>
                                        </Badge>
                                        <List.Item.Meta
                                            avatar={<Avatar
                                                src="https://wallpapercave.com/wp/wp3350839.jpg"/>}
                                            title={<a
                                                href={'/chat/single/conversation/' + item.id + '/' + item.token}>{item.name}</a>}
                                            description={item.receivers[0].name}
                                        />
                                        <div>
                                            <Popconfirm placement="top" title={deleteMessage}
                                                        onConfirm={() => this.deleteConversation(item, index)}
                                                        okText="Yes" cancelText="No">
                                                <Button type="danger" shape="circle" icon="delete"/>
                                            </Popconfirm>
                                        </div>
                                    </List.Item>
                                )}>
                                {this.state.loading && this.state.hasMore && (
                                    <div className="chat-loading-container">
                                        <Spin/>
                                    </div>
                                )}
                            </List>
                        </div>
                    </Scrollbars>
                </Col>
            </Row>
        );
    }
}

if (document.getElementById('history')) {
    const element = document.getElementById('history')
    const props = Object.assign({}, element.dataset)
    ReactDOM.render(<History {...props}/>, element);
}




