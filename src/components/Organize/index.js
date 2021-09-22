import React from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import { Officer } from './Officer'
import { Category } from './Category'
import { Member } from './Member'

export const Organize = () => (
    <Tabs
        fill
        variant="pills"
        defaultActiveKey="officer"
        className="my-3 rounded menu bg-secondary"
    >
        <Tab eventKey="officer" title="幹部名單" tabClassName="text-white">
            <Officer />
        </Tab>
        <Tab eventKey="category" title="活動類別" tabClassName="text-white">
            <Category />
        </Tab>
        <Tab eventKey="user" title="全部成員" tabClassName="text-white">
            <Member />
        </Tab>
    </Tabs>
)
