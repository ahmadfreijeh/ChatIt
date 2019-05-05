import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
    List, message, Avatar, Spin, Button, Row, Col,Layout
} from 'antd';
import reqwest from 'reqwest';
import InfiniteScroll from 'react-infinite-scroller';

const fakeDataUrl = 'http://localhost:8000/chat/history';

export default class History extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            hasMore: true,
        }
    }

    componentDidMount() {
        this.fetchData((res) => {
            this.setState({
                data: res,
            });
        });
    }

    fetchData(callback) {
        reqwest({
            url: fakeDataUrl,
            type: 'json',
            method: 'get',
            contentType: 'application/json',
            success: (res) => {
                callback(res.data);
            },
        });
    }

    handleInfiniteOnLoad() {
        let data = this.state.data;
        this.setState({
            loading: true,
        });
        if (data.length > 14) {
            message.warning('Infinite List loaded all');
            this.setState({
                hasMore: false,
                loading: false,
            });
            return;
        }
        this.fetchData((res) => {
            data = data.concat(res.results);
            this.setState({
                data,
                loading: false,
            });
        });
    }

    render() {
        const { Header, Content, Footer } = Layout;
        return (
            <Layout className="layout">
                <Content style={{ padding: '0 50px' }}>

                    <Row>
                        <Col span={24}>
                            <div className="demo-infinite-container">
                                <InfiniteScroll
                                    initialLoad={false}
                                    pageStart={0}
                                    loadMore={this.handleInfiniteOnLoad}
                                    hasMore={!this.state.loading && this.state.hasMore}
                                    useWindow={false}
                                >
                                    <List
                                        dataSource={this.state.data}
                                        renderItem={item => (
                                            <List.Item key={item.id} className="c-list">
                                                <List.Item.Meta
                                                    avatar={<Avatar
                                                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                                                    title={<a href="https://ant.design">{item.name}</a>}
                                                    description={item.receivers[0].name}
                                                />
                                                <div>
                                                    <Button type="primary" shape="circle" icon="delete"/>

                                                </div>
                                            </List.Item>
                                        )}
                                    >
                                        {this.state.loading && this.state.hasMore && (
                                            <div className="demo-loading-container">
                                                <Spin/>
                                            </div>
                                        )}
                                    </List>
                                </InfiniteScroll>
                            </div>
                        </Col>
                    </Row>

                </Content>
            </Layout>
        );
    }
}

if (document.getElementById('history')) {
    const element = document.getElementById('history')
    const props = Object.assign({}, element.dataset)
    ReactDOM.render(<History {...props}/>, element);
}



