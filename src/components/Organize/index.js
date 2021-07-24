import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { Officer } from './officer';

export const Organize = () => (
  <Tabs fill variant="pills" defaultActiveKey="officer" className="my-3 rounded menu bg-secondary" >
    <Tab eventKey="officer" title="幹部名單" tabClassName="text-white">
      <Officer />
    </Tab>
    <Tab eventKey="category" title="活動類別" tabClassName="text-white">
      <h1>活動類別</h1>
    </Tab>
    <Tab eventKey="user" title="全部成員" tabClassName="text-white">
      <h1>全部成員</h1>
    </Tab>
  </Tabs>
)