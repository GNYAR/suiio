import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import styled from 'styled-components';
import { Officer } from './officer/index';

const Style = styled.div`
    // .menu {
    //     color: #f00 !important;
    // }
`;

export const Organize = () => (
    <Style>
        <Tabs fill variant="pills" defaultActiveKey="officer" className="my-3 rounded menu bg-secondary" >
            <Tab eventKey="officer" title="幹部名單" tabClassName="text-white">
                <Officer />
            </Tab>
            <Tab eventKey="authority" title="權限管理" tabClassName="text-white">
                <h1>權限管理</h1>
            </Tab>
            <Tab eventKey="category" title="活動類別" tabClassName="text-white">
                <h1>活動類別</h1>
            </Tab>
            <Tab eventKey="user" title="全部成員" tabClassName="text-white">
                <h1>全部成員</h1>
            </Tab>
        </Tabs>
    </Style>
)