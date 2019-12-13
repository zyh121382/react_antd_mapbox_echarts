import React, { Component } from 'react';
// eslint-disable-next-line
import { Row, Col, Button, PageHeader, Descriptions } from 'antd';

class HelloWorld extends Component{
    render(){
        return (
            <div>
                <PageHeader
                    ghost={false}
                    onBack={() => window.history.back()}
                    title="Hello World"
                    subTitle="交通数据分析"
                />
            </div>
        );
    };
}

export default HelloWorld;
