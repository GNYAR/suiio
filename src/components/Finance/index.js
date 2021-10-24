import React from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import { Account } from './Account'
import { Statement } from './Statement'

export const Finance = () => (
    <Tabs
        fill
        variant="pills"
        defaultActiveKey="account"
        className="my-3 rounded menu bg-secondary"
    >
        <Tab eventKey="account" title="收支明細" tabClassName="text-white">
            <Account />
        </Tab>
        <Tab eventKey="statement" title="財務報表" tabClassName="text-white">
            <Statement />
        </Tab>
    </Tabs>
)
